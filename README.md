# reporem
This project is created to remove repositories from a github account, using regexp.

### Backup all repos 

``` bash
curl -s https://api.github.com/users/username/repos?per_page=200 | ruby -rubygems -e 'require "json"; JSON.load(STDIN.read).each { |repo| %x[git clone #{repo["clone_url"]} ]}'
```

### Remove repos
* Set in `config.json` file: github username, token, regexp pattern for repos names. Another option: pass parameters via terminal.
* Run command `node main.js`, if you set parameters in `config.json`. Otherwise `node main.js [name] [token] [regExp]`.

> You can also add repos names to white lise in config.json.
