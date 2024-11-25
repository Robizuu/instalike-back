// Importa o framework Express para criar o servidor web
import express from "express";
// Importa a biblioteca multer para lidar com uploads de arquivos
import multer from "multer";
// Importa as funções controladoras para posts vindas de um arquivo separado
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

// Define as configurações de armazenamento para o multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados (pasta uploads/)
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo no servidor (mantém o nome original)
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância de upload do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// (Comentado para Linux/Mac) Define o diretório de destino para uploads (apenas para Windows)
// const upload = multer({ dest: "./uploads" });

// Define uma função para configurar as rotas da aplicação
const routes = (app) => {
  // Habilita o parseamento de dados JSON no corpo das requisições
  app.use(express.json());
  app.use(cors(corsOptions))
  // Rota GET para listar todos os posts (manipulada pela função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (manipulada pela função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa middleware upload.single("imagem") e manipula pela função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função routes para uso em outros arquivos
export default routes;