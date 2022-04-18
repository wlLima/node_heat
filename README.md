# NLW-Heat

Projeto feito a partir do evento Next Level Week (NLW) da Rocketseat, como principal gerenciador para autenticação e envio de mensagens tanto do projeto react_heat como para o reactnative_heat

#### O que aprendi neste projeto
 - Prisma ( Typescript ORM )
 - JWT 
 - Uso de sockets
 - Express


## Como rodar o projeto

Primeiro rode o seguinte comando para atualizar as dependencias do projeto:
```
yarn
```

Em seguida, crie uma aplicação OAuth no Github, e adicione o arquivo .env na raiz do projeto contendo o "GITHUB_CLIENT_ID" e "GITHUB_CLIENT_SECRET" dessa aplicação, além de adicionar um hash md5 no "JWT_SECRET" do arquivo .env.

Por fim, execute o comando:

```
yarn dev
```
