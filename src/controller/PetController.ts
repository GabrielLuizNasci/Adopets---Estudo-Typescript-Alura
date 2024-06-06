import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie.js";
import PetRepository from "../repositories/PetRepository.js";
import PetEntity from "../entities/PetEntity.js";
import EnumPorte from "../enum/EnumPorte.js";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../tipos/tiposPet.js";


export default class PetController {
  constructor(private repository: PetRepository) {}
  criaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
    res: Response<TipoResponseBodyPet>
  ) {
    const { nome, especie, porte, dataNasci, adotado } = <PetEntity>req.body;

    const novoPet = new PetEntity(
      nome,
      especie,
      dataNasci,
      adotado,
      porte
    );

    this.repository.criaPet(novoPet);
    return res.status(200).json({ dados: { id:novoPet.id, nome, especie, porte }});
  }

  async listaPets(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
    res: Response<TipoResponseBodyPet>
  ) {
    const listaDePets = await this.repository.listaPet();
    const dados = listaDePets.map((pet) => {
      return {
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        porte: pet.porte !== null ? pet.porte : undefined,
      };
    });
    return res.status(200).json({dados});
  }

  async atualizaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
    res: Response<TipoResponseBodyPet>
  ) {
    const { id } = req.params;
    await this.repository.atualizaPet(Number(id), req.body as PetEntity);

    return res.sendStatus(204);
  }

  async deletaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
    res: Response<TipoResponseBodyPet>
  ) {
    const { id } = req.params;

    await this.repository.deletaPet(Number(id))
    return res.sendStatus(204);
  }

  async adotaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
    res: Response<TipoResponseBodyPet>
  ){
    const petId = Number(req.params.pet_id);
    const adotanteId = Number(req.params.id_adotante);
  
    await this.repository.adotaPet(petId, adotanteId);
    
    return res.sendStatus(204);   
}

  async buscaPorCampoGenerico(req: Request, res: Response){
    const {campo, valor} = req.query;
    const listaDePets = await this.repository.buscaPorCampoGenerico(campo as keyof PetEntity, valor as string);
    return res.status(200).json(listaDePets);
  }
}
