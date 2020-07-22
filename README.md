# Asana Webhooks Manager (Integration Excheduler)

Sistema criado com a finalidade de gerenciar os eventos de webhooks gerados pelo asana, realizando a integração com o sistema Excheduler.

### Installation

Asana Webhooks Manager requer [Node.js](https://nodejs.org/) v6.9+ e [Mongo.db](https://www.mongodb.com/) para rodar.

##### 1. Instalar dependências


```sh
$ sudo apt-get update
$ sudo apt install nodejs
$ sudo apt install npm
$ sudo apt install npm
$ sudo apt install -y mongodb
```
##### 2.Criando um Asana App
###### 2.1 Realize o login no asana selecione **Minhas configurações de perfil** no menu superior direito

(public/img/documentation/img_01.png)

###### 2.2 Selecione na aba **Aplicativos** a opção **Gerenciar aplicativos de desenvolvedor**

(public/img/documentation/img_02.png)

###### 2.3 Selecione a opção **Novo aplicativo**
(public/img/documentation/img_03.png)

###### 2.4 Digite o nome do aplicativo e clique em **Criar aplicativo**
(public/img/documentation/img_04.png)

###### 2.5 Neste momento é apresentado na tela o **client_id** e **client_secret** que será utilizado na aplicação, digite no campo **URLs de redirecionamento** - > "https://{host}/oauth/asana" e clique no botão adicionar **adicionar**
(public/img/documentation/img_05.png)

###### 2.6 Na aba de **Configurações** digite no campo **Site do aplicativo** - > "https://{host}"
(public/img/documentation/img_06.png)

##### 3. Criação do token de acesso
###### 3.1 Na tela de gerenciamento de aplicativos selecione a opção **Novo token de acesso**

(public/img/documentation/img_07.png)

###### 3.2 Digite o nome do token e clique no botão **Criar token**

(public/img/documentation/img_08.png)

###### 3.3 Neste momento é gerado o token para acessar a API do Asana, copie e guarde este token pois será utilizado na aplicação.

(public/img/documentation/img_09.png)

##### 4. Atualizando configurações
###### 4.1 O Asana Webhooks Manager usa o fluxo OAuth do Asana para permitir que você "Entre com o Asana".
###### Usando o seu editor de texto de sua escolha, atualize o arquivo de configuração localizado em <"your awm directory"> / config / asana.js Seguindo os valores das capturas de tela acima, o arquivo de configuração modificado deve ser muito semelhante a este:
&nbsp;
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
&nbsp;
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
&nbsp;
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
&nbsp;
```sh
module.exports = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sisaloc_play'
}
```

##### 5. Criação do webhook
###### **Baixe a collection Asana no postman para seguir os próximos passos ou utilize a API Asana Explorer**

###### 5.1 Para criar o webhook é necessário que a aplicação esteja rodando, para isso utilize o seguinte comando para instalar os pacotes e iniciar a aplicação
&nbsp;
```sh
$ cd asana-webhooks-manager/
$ npm install
$ node server.js
```

###### 5.2 Para criar o webhook utilize a chamada **Create Webhook** e atualize as seguintes informações do body para cada projeto no qual o asana deve monitorar os eventos.
&nbsp;
```sh
{
  "data": {
    "filters": [
      {
        "action": "added",
        "resource_type": "task",
        "resource_subtype": "default_task"
      }
    ],
    "resource": "{project_id}",
    "target": "{host}/events/incoming/{project_id}"
  }
}
```
(public/img/documentation/img_10.png)


