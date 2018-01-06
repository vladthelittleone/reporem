/**
 * @since 07.01.2018
 * @author Skurishin Vladislav
 */
const fetch = require('node-fetch');
const config = require('./config.json');
const repos = [];

async function remove (name, regExp) {
	try {
		const repoUrl = `https://api.github.com/users/${name}/repos?per_page=200`;
		const resp = await fetch(repoUrl);
		const results = await resp.json();
		const re = new RegExp(regExp);
		results.forEach((repo) => {
			const {name} = repo;
			if (!re || re.exec(name)) {
				if (config.whiteList.indexOf(name) === -1) {
					console.log(name);
					repos.push(repo);
				}
			}
		});
	} catch(e) {
		console.log(e);
	}
}

const name = process.argv[2] || config.name;
const token = process.argv[3] || config.token;
const regExp = process.argv[4] || config.regExp;
const headers = new fetch.Headers();

headers.append('Authorization', `token ${token}`);

remove(name, regExp).then(() => {
	console.log('Remove repositories? [Y, n]');
	const stdin = process.openStdin();
	stdin.addListener('data', (d) => {
		if (d.toString('utf8')
		     .trim()
		     .toLowerCase() === 'y') {
			repos.forEach((repo) => {
				fetch(`https://api.github.com/repos/${repo.full_name}`, {
					method:  'delete',
					headers: headers
				});
			});
			console.log("Finish remove operation");
			stdin.pause();
		}
	});
});
