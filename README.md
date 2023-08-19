# LocalStack Lab! 🧪🚀

Bem-vindo ao repositório LocalStack Lab! Este repositório serve como um exemplo simples de como usar a imagem LocalStack para simular os serviços da AWS. A arquitetura do código contido neste repositório tem o objetivo de produzir mensagens para uma fila SQS, que são posteriormente consumidas por outro serviço e enviadas para uma tabela DynamoDB.

## Primeiros Passos 🛠️

### Pré-requisitos 📋

* Node.js >= 16v
* Docker
* Docker-compose

### Inicializando os Serviços 🚀

```sh
chmod +x scripts/*.sh

npm i # Instale as dependências

docker-compose up # Use a flag -d para executar em modo daemon

./scripts/setup.sh # Cria a fila SQS e a tabela DynamoDB na instância LocalStack
```

## Executando 🏃‍♂️

```sh
node src/send-sqs-messages.js # Gera mensagens na fila SQS

./scripts/checking-sqs.sh # (Opcional) Verifica os atributos da fila

node process-sqs-messages.js # Consome mensagens e as adiciona à tabela DynamoDB

./scripts/checking-sqs.sh # (Opcional) Verifica os itens na tabela DynamoDB
```

Este repositório demonstra uma abordagem simplificada para usar o LocalStack a fim de emular serviços da AWS localmente. Use-o para adquirir experiência prática com os componentes da AWS e suas interações, tudo dentro de um ambiente controlado. Sinta-se à vontade para experimentar e explorar diferentes cenários, aprimorando sua compreensão da dinâmica do desenvolvimento em nuvem.