# FATURAS - Gerenciando suas economias energéticas 

<p align="center">
  <img src="./documents/img/homepage.png" width="100%" alt="preview app" />
</p>

  O projeto Faturas, é uma aplicação que gerencia contas(faturas) de energia, exclusivamente da CEMIG, dispondo de visualização das faturas processas e e sessão de análise das mesmas, observando a quantidade e os custos do consumo de energia.

  Este faz parte de um teste prático realizado pela empresa Lumi para vaga de FullStack. 
Tendo como objetivo cumprir alguns pontos de pré requisitos dos sistemas e tecnicos no desenvolvimento.

O Layout inicial do projeto pode ser encontrado no Figma. <a href="https://www.figma.com/file/0lHddW3Nki4u2khZiriXXq/Untitled?type=whiteboard&node-id=0%3A1&t=GwbVcBDEcFg02gku-1" target="_blank" >Clique para acessar</a>


## CONSIDERAÇÕES
Nesta secção será abordado as questões tecnicas do desenvolvimento. Portanto, é de extrema importância sua leitura e entendimento.
  
No que tange ao versionamento foi definido a implementação de monorepository, isso significa que a API e o APP são versionando na mesmo repositório. O padrão de commits utilizado foi o <a href="https://medium.com/linkapi-solutions/conventional-commits-pattern-3778d1a1e657" target="_blank" > conventional commits pattern </a>.  

A aplicação foi dividida é dividida em duas serviços, o serviço Frontend (APP) e o serviço Backend (API). Todas as aplicações utilizam `NodeJs`. O App foi construida utilizando o framework `React`. No entanto, a API foi construida com o framework `NestJS` no padrão `Controller-Service-Repository` utilizando um bando de dados SQL via framework `Prisma`. Ademais, o software tambem tem suporte para utilização no `Docker`.

## INICIALIZANDO

Para inicializar o projeto, certifique-se que você tenha os devidos pré requisitos antes de executar os comandos de inicialização.

```
- Docker version ^23.0.5, build bc4487a.
- Nodejs version 18.0.0.
```
> **!Note** que não é necessário ter o Docker, mas essa documentação, inicialmente, será feita baseando-se apenas nele.

Feitas as devidas verificações dos pré requisitos, depois você `terá que criar os .env em cada serviço APP e API`, 
podendo deixa-los vazios pois as únicas variáveis necessárias o docker compose já faz a inserção na composição. 
Agora você precisará executar alguns comandos para preparar o ambiente.
O primeiro comando, referece a instalação das dependencias e  
O segundo faz todo o trabalho de construir as imagens e montar todo o ecossistema da aplicação.

Na pasta raiz do projeto - _onde estão o APP e API_ - execute os seguintes comandos.

```bash
npm run deps
npm run dck:compose
```

> **!Note** Pode haver um erro ao executar o comando de compose dizendo que o comando docker compose não foi encontrado, neste caso tente rodar esse comando `npm run dck:composev2`.

<br>
Se não ocorreu nenhum erro, no Windows você pode acessar a interface e verá algo parecido com isso:

<div align="center">
    <img src="./documents/img/docker-preview.png" width="70%" alt="preview docker" />
    <p>Imagem do Docker mostrando os serviços ativos</p>
</div>



ANOTAÇÕES
* ao baixar o projeto execute o comando deps:api para que o sistema consiga gerar o binário e então gerar a imagem docker.
* o versionamento foi feito baseando em monorepo
* o sistema não foi planeja para variação de unidade de medida.
* os testes foram feitos apenas no frontend e somente em components, podem ser encontrados em **/test. 
* não foi implementado sistema de ordenação
* Em algum lugar do upload ou donwload esta perdendo informação e deteriorando o arquivo, desafio de correção.
*


