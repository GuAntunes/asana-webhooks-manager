# Asana Webhooks Manager (Integration Excheduler)

Sistema criado com a finalidade de gerenciar os eventos de webhooks gerados pelo asana, realizando a integração com o sistema Excheduler.

### Installation

Asana Webhooks Manager requires [Node.js](https://nodejs.org/) v6.9+ and [Mongo.db](https://www.mongodb.com/) to run.

##### 1. Install the dependencies


```sh
$ sudo apt-get update
$ sudo apt install nodejs
$ sudo apt install npm
$ sudo apt install npm
$ sudo apt install -y mongodb
```
##### 2. Creating an Asana App
###### 2.1 Realize o login no asana selecione **Minhas configurações de perfil** no menu superior direito

{img_01}

###### 2.2 Selecione na aba **Aplicativos** a opção **Gerenciar aplicativos de desenvolvedor**

{img_02}

###### 2.3 Selecione a opção **Novo aplicativo**
{img_03}

###### 2.4 Digite o nome do aplicativo e clique em **Criar aplicativo**
{img_04}

###### 2.5 Neste momento é apresentado na tela o **client_id** e **client_secret** que será utilizado na aplicação, digite no campo **URLs de redirecionamento** - > "https://{host}/oauth/asana" e clique no botão adicionar **adicionar**
{img_05}

###### 2.6 Na aba de **Configurações** digite no campo **Site do aplicativo** - > "https://{host}"
{img_06}

##### 3. Criação do token de acesso
###### 3.1 Na tela de gerenciamento de aplicativos selecione a opção **Novo token de acesso**

{img_07}

###### 3.2 Digite o nome do token e clique no botão **Criar token**

{img_08}

###### 3.3 Neste momento é gerado o token para acessar a API do Asana, copie e guarde este token pois será utilizado na aplicação.

{img_09}

##### 4. Atualizando configurações
###### 4.1 O Asana Webhooks Manager usa o fluxo OAuth do Asana para permitir que você "Entre com o Asana".
###### Usando o seu editor de texto de sua escolha, atualize o arquivo de configuração localizado em <"your awm directory"> / config / asana.js Seguindo os valores das capturas de tela acima, o arquivo de configuração modificado deve ser muito semelhante a este:
.
```sh
module.exports = {
    clientId: "{client_id}",
    clientSecret: "{client_secret}",
    redirectUri: "{host}/oauth/asana",
    token: "{token}"
};
```

###### 4.2 Configurações do MongoDB
###### O AWM usa o MongoDB para armazenar informações de webhooks, para usá-las posteriormente na validação de cargas úteis de eventos recebidos em relação ao seu "segredo de webhook".
###### Para que o AWM funcione corretamente, você precisará editar outro arquivo de configuração localizado em <"seu diretório awm">/config/mongodb.js com suas informações do MongoDB.
.
```sh
module.exports = {
    username: null,    //MongoDB user (optional)
    password: null,    //MongoDB password (optional)
    host: "127.0.0.1", //Mongo hosts
    port: "27017",     //Port
    database: "awm"    //Database name
};
```

###### 4.3 Configurações das seções do excheduler
###### Para a integração com o excheduler deve-se selecionar quais seções (colunas) devem ser consideradas e análisadas, é necessário indica-las em um array no arquivo <"seu diretório awm">/config/excheduler.js. É possível buscar essa informação através do API Explorer do Asana.
.
```sh
module.exports = {
    sections: [
        '233662735431123',
        '244466376922123',
        '250293255888123',
        '250293255888123'
    ]
};
```

###### 4.4 Configurações da conexão com o excheduler
###### Para configurar a conexão do excheduler com o AWM é necessário alterar o arquivo <"seu diretório awm">/config/database.js
.
```sh
module.exports = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sisaloc_play'
}
```













### Plugins

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |


### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma test
```
#### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```
### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
docker build -t joemccann/dillinger:${package.json.version} .
```
This will create the dillinger image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of Dillinger.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/dillinger:${package.json.version}
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

#### Kubernetes + Google Cloud

See [KUBERNETES.md](https://github.com/joemccann/dillinger/blob/master/KUBERNETES.md)


### Todos

 - Write MORE Tests
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
