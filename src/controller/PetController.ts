import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet.ts";
import EnumEspecie from "../enum/EnumEspecie.js";
import PetRepository from "../repositories/PetRepository.js";
import PetEntity from "../entities/PetEntity.js";
import EnumPorte from "../enum/EnumPorte.js";

const listaDePets: TipoPet[] = [];

export default class PetController {
  constructor(private repository: PetRepository) {}
  criaPet(req: Request, res: Response) {
    const { nome, especie, porte, dataNasci, adotado } = <PetEntity>req.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ 
        error: "Especie inválida" 
      });
    }

    if (porte && !(porte in EnumPorte)) {
      return res.status(400).json({ 
        error: "Porte inválido" 
      });
    }

    const novoPet = new PetEntity(
      nome,
      especie,
      dataNasci,
      adotado,
      porte
    );

    this.repository.criaPet(novoPet);
    return res.status(200).json(novoPet);
  }

  async listaPets(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPet();
    return res.status(200).json(listaDePets);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    )

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(
      Number(id)
    )

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async adotaPet(req: Request, res: Response){
    try {
      const petId = Number(req.params.pet_id);
      const adotanteId = Number(req.params.id_adotante);
  
      if (isNaN(petId) || isNaN(adotanteId)) {
        return res.status(400).json({ error: 'ID do pet ou do adotante inválido.' });
      }

      const result = await this.repository.adotaPet(petId, adotanteId);
    
      if (result.success) {
        return res.status(200).json({ message: 'Pet adotado com sucesso!' });
      } else {
        return res.status(404).json({ error: result.message });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async buscaPorCampoGenerico(req: Request, res: Response){
    const {campo, valor} = req.query;
    const listaDePets = await this.repository.buscaPorCampoGenerico(campo as keyof PetEntity, valor as string);
    return res.status(200).json(listaDePets);
  }
}
