# FATURAS - Gerenciando suas economias energéticas 

<p align="center">
  <img src="./documents/img/homepage.png" width="100%" alt="preview app" />
</p>

  O projeto Faturas, é uma aplicação que gerencia contas(faturas) de energia, exclusivamente da CEMIG, dispondo de visualização das faturas processadas e uma secção de análise das mesmas, observando a quantidade e os custos do consumo de energia. Este faz parte de um teste prático realizado pela empresa Lumi para vaga de FullStack. 
Tendo como objetivo cumprir alguns pontos de pré requisitos do sistema e tecnicos do desenvolvimento. O Layout inicial do projeto pode ser encontrado no Figma. <a href="https://www.figma.com/file/0lHddW3Nki4u2khZiriXXq/Untitled?type=whiteboard&node-id=0%3A1&t=GwbVcBDEcFg02gku-1" target="_blank" >Clique para acessar</a>

<br>
<p>
  <h2 align="center"> CONSIDERAÇÕES </h2>
</p>
Nesta secção será abordado as questões tecnicas do desenvolvimento. Portanto, é de extrema importância sua leitura e entendimento.
  
No que tange ao versionamento foi definido a implementação de monorepository, isso significa que a API e o APP são versionando no mesmo repositório. O padrão de commits utilizado foi o <a href="https://medium.com/linkapi-solutions/conventional-commits-pattern-3778d1a1e657" target="_blank" > conventional commits pattern </a>.  

O sistema foi dividida em dois serviços, o serviço Frontend (APP) e o serviço Backend (API) e todas as aplicações utilizam `NodeJs`.<br> 
O APP foi construido utilizando o framework `React`.<br>
A API foi construida utilizando o framework `NestJS`, no padrão `Controller-Service-Repository` utilizando um bando de dados SQL via framework `Prisma`.

Ademais, o software tambem tem suporte para utilização no `Docker`.

* O sistema `não foi desenvolvido para variação da unidade de medida` sendo fixa em kWh `e tambem não suportando variação de Moeda` sendo fixa em Reais.<br>
* O sistema `não possui função de orednação por parte do usuário`.<br>
* Ao que tange a parte de Upload e Download das faturas, em algum momento `esta havendo pequenas perdas de informações deixando o PDF sem as imagens da empresa` e o codigo de barra.<br> 
* Outro ponto importante, são os testes que foram feitos apenas no APP em `Components` e `Services` , podendo ser encontrados em **/test e executados dentro da pasta ./app rodando o comando `npm run test`.<br>
  * Ao inicializar o comando de test pressione a tecla a e ele executará todos os testes.
<div align="center">
  <img src="./documents/img/test-img.png" width="70%" alt="preview test" />
</div>

<br>
<p>
  <h2 align="center"> INICIALIZANDO </h2>
</p>

> Você pode assistir o video onde faço tudo do zero: https://youtu.be/MPFh42cN0V4
<br>

Para inicializar o projeto, certifique-se que você tenha os devidos pré requisitos antes de executar os comandos de inicialização.

```
- Docker version ^23.0.5, build bc4487a.
- Nodejs version 18.0.0.
```
> **!Note** que não é necessário ter o Docker, mas essa documentação, inicialmente, será feita baseando-se apenas nele.

Feitas as devidas verificações dos pré requisitos, depois você `terá que criar os .env em cada serviço APP e API`, 
podendo deixa-los vazios pois as únicas variáveis necessárias o docker compose já faz a inserção na composição. 

.env da API e APP, respectivamente: 
```bash
DATABASE_URL='postgres://admin:admin@localhost:5432/invoice-production'
```
```bash
REACT_APP_API_URL='http://localhost:5000'
```

Agora você precisará executar alguns comandos para preparar o ambiente.

O primeiro comando, referece a instalação das dependencias e o segundo faz todo o trabalho de construir as imagens e montar todo o ecossistema da aplicação.

Na pasta raiz do projeto _onde estão o APP e API_ execute os seguintes comandos.

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


Apos realizar todas essas operações, você poderá acessar atráves do endereço http://localhost:3000/

<h2 align="center"> 
  <a href="http://localhost:3000/" target="_blank" > 
    ACESSAR APLICAÇÃO
  </a> 
</h2>

<br><br>






