import express from "express";
import { AppDataSource } from "../config/dataSource";
import AbrigoRepository from "../repositories/AbrigoRepository";
import AbrigoController from "../controller/AbrigoController";
import { RequestHandler } from "express-serve-static-core";
import { middlewareValidadorBodyAbrigo } from "../middleware/validadores/abrigoRequestBody";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/verificaId";


const router = express.Router();
const abrigoRepository = new AbrigoRepository(
    AppDataSource.getRepository("AbrigoEntity")
);

const abrigoController = new AbrigoController(abrigoRepository);

const validatedBodyAbrigo: RequestHandler = (req, res, next) => middlewareValidadorBodyAbrigo(req, res, next);
const validatedBodyEndereco: RequestHandler = (req, res, next) => middlewareValidadorBodyEndereco(req, res, next);

router.post("/", validatedBodyAbrigo, (req, res) => abrigoController.criaAbrigo(req, res));
router.get("/", (req, res) => abrigoController.listaAbrigo(req, res));
router.put("/:id", verificaIdMiddleware, (req, res) => abrigoController.atualizaAbrigo(req, res));
router.delete("/:id", verificaIdMiddleware, (req, res) => abrigoController.deletaAbrigo(req, res));
router.patch("/:id", verificaIdMiddleware, validatedBodyEndereco, (req, res) => abrigoController.atualizadaEnderAbrigo(req, res));

export default router;