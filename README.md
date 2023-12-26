# Getting Started


To run the project on your machine, check the following requirements:

- Nodejs version **^18.0.0**.
- Docker installed on your machine.

Then, in the root of the project, run the following command to build the application and initialize its entire ecosystem.

 >> ### `npm run dck:compose`

> **Note!** An error may occur and the docker compose command is not found, so try running the command: `npm run dck:composev2`. This will resolve it

This command will initialize the frontend application in React, the backend in Node, the database in Postgres and, finally, a database manager to be able to access the database, which is not necessary for initialization and becomes an aid in debugging. 


ANOTAÇÕES
* o versionamento foi feito baseando em monorepo
* o sistema não foi planeja para variação de unidade de medida.
* não foi implementado sistema de ordenação