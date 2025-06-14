# Backend para Vitrine de Carros

Este projeto é um backend para um sistema de Vitirne de carros, permitindo cadastro, busca, atualização, exclusão de carros e envio de mensagens de interesse. Ele utiliza Node.js, Express, MongoDB (via Mongoose) e faz upload de imagens para o Cloudinary.

## Principais Tecnologias

* Node.js: Ambiente de execução JavaScript.
* Express: Framework para criar APIs REST.
* MongoDB + Mongoose: Banco de dados NoSQL e ODM para modelagem dos dados.
* Cloudinary: Armazenamento de imagens na nuvem.
* Multer: Middleware para upload de arquivos.
* dotenv: Gerenciamento de variáveis de ambiente.
* CORS: Controle de acesso entre domínios.

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1. Clone o repositório do projeto:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd <NOME_DO_DIRETORIO>
   ```
3. Instale as dependências do projeto:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes informações:
   ```plaintext
   MONGO_URI=<string_de_conexao_com_mongodb>
   CLOUDINARY_CLOUD_NAME=<nome_da_conta_cloudinary>
   CLOUDINARY_API_KEY=<chave_de_api_cloudinary>
   CLOUDINARY_API_SECRET=<segredo_de_api_cloudinary>
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Estrutura de Pastas

* `src/`: Contém a lógica do projeto.
	+ `config/`: Arquivos de configuração do projeto.
		- `db.js`: Conecta ao MongoDB usando a URI do arquivo .env.
		- `cloudinary.js`: Configura o Cloudinary com as credenciais do .env.
		- `multer.js`: Configura o Multer para armazenar imagens diretamente no Cloudinary, na pasta carros.
		- `car.js`: Define o modelo do carro no MongoDB, incluindo campos como modelo, ano, preço, imagem principal e galeria de imagens.
	+ `controllers/`: Controladores que lidam com as requisições e respostas da API. Cada controlador é responsável por uma funcionalidade específica.
		- `carController.js`: Recebe as requisições das rotas, chama os métodos do serviço e retorna as respostas HTTP. Validações de ID, tratamento de erros, etc.
		- `messageController.js`: Permite o envio de mensagens de interesse em um carro. Gera um link do WhatsApp com os dados do carro e do interessado.
	+ `routes/`: Camada que define as rotas da API. Cada rota é mapeada para um controlador específico.
		- `carRoutes.js`: Define as rotas para CRUD de carros e busca com filtros. Usa o Multer para upload de imagens.
		- `messageRoutes.js`: Permite o envio de mensagens de interesse em um carro.
	+ `services/`: Serviços que oferecem funcionalidades genéricas para uso em mais de um controlador. No caso, o serviço de `MessageService` é responsável por gerar links para envio de mensagens via WhatsApp.
		- `carService.js`: Lógica de negócio para criar, buscar, atualizar, deletar e filtrar carros. No método create, salva as URLs das imagens do Cloudinary no banco de dados.
		- `messageService.js`: Gera um link do WhatsApp com os dados do carro e do interessado.
	+ `index.js`: Ponto de entrada do projeto, responsável por inicializar a aplicação e importar as dependências necessárias.

## Fluxo de Upload de Imagens

O upload é feito via Multer, que salva as imagens no Cloudinary. O serviço de carros (carService.js) salva no banco apenas a URL retornada pelo Cloudinary, não o caminho local.

## Variáveis de Ambiente (.env)

* `PORT`: Porta do servidor.
* `MONGO_URI`: URI do MongoDB.
* `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Credenciais do Cloudinary.
* `NODE_ENV`, `DEV_URL`, `PROD_URL`: Configurações de ambiente e CORS.

## Como funciona o CRUD de Carros

* `POST /cars`: Cria um carro com imagens.
* `GET /cars`: Lista carros com paginação.
* `GET /cars/:id`: Busca um carro pelo ID.
* `PUT /cars/:id`: Atualiza dados do carro.
* `DELETE /cars/:id`: Remove um carro.
* `GET /search`: Busca carros com filtros (modelo, preço, ano, etc).

## Mensagens

* `POST /messages/message`: Envia mensagem de interesse, retorna link do WhatsApp.

## Observações

* As imagens não ficam na pasta local, mas sim no Cloudinary.
* O campo imagemPrincipal e os itens da galeria no banco são URLs do Cloudinary.
* O frontend deve usar essas URLs para exibir as imagens.

