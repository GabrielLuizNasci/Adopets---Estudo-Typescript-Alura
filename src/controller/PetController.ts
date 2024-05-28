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

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ 
        erros: "Especie inválida" 
      });
    }

    if (porte && !(porte in EnumPorte)) {
      return res.status(400).json({ 
        erros: "Porte inválido" 
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
        porte: pet.porte
      };
    });
    return res.status(200).json({dados});
  }

  async atualizaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
    res: Response<TipoResponseBodyPet>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    )

    if (!success) {
      return res.status(404).json({ erros: message });
    }
    return res.sendStatus(204);
  }

  async deletaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
    res: Response<TipoResponseBodyPet>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(
      Number(id)
    )

    if (!success) {
      return res.status(404).json({ erros: message });
    }
    return res.sendStatus(204);
  }

  async adotaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, 
    res: Response<TipoResponseBodyPet>
  ){
    try {
      const petId = Number(req.params.pet_id);
      const adotanteId = Number(req.params.id_adotante);
  
      if (isNaN(petId) || isNaN(adotanteId)) {
        return res.status(400).json({ erros: 'ID do pet ou do adotante inválido.' });
      }

      const result = await this.repository.adotaPet(petId, adotanteId);
    
      if (result.success) {
        return res.status(200).json({ message: 'Pet adotado com sucesso!' });
      } else {
        return res.status(404).json({ erros: result.message });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erros: 'Erro interno do servidor.' });
    }
  }

  async buscaPorCampoGenerico(req: Request, res: Response){
    const {campo, valor} = req.query;
    const listaDePets = await this.repository.buscaPorCampoGenerico(campo as keyof PetEntity, valor as string);
    return res.status(200).json(listaDePets);
  }
}
