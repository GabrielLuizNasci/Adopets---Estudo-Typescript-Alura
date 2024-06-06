import express from "express";
import { AppDataSource } from "../config/dataSource";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { middlewareValidadorBodyAdotante } from "../middleware/validadores/adotanteRequestBody";
import { RequestHandler } from "express-serve-static-core";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/verificaId";


const router = express.Router();
const adodanteRepository = new AdotanteRepository(
    AppDataSource.getRepository("AdotanteEntity")
);

const adotanteController = new AdotanteController(adodanteRepository);
const validatedBodyAdotante: RequestHandler = (req, res, next) => middlewareValidadorBodyAdotante(req, res, next);
const validatedBodyEndereco: RequestHandler = (req, res, next) => middlewareValidadorBodyEndereco(req, res, next);

router.post("/", validatedBodyAdotante, (req, res) => adotanteController.criaAdotante(req, res));
router.get("/", (req, res) => adotanteController.listaAdotante(req, res));
router.put("/:id", verificaIdMiddleware, (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/:id", verificaIdMiddleware, (req, res) => adotanteController.deletaAdotante(req, res));
router.patch("/:id", verificaIdMiddleware, validatedBodyEndereco, (req, res) => adotanteController.atualizadaEnderAdotante(req, res));

export default router;