import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetRepository implements InterfacePetRepository{
    private petRepository: Repository<PetEntity>;
    private adotanteRepository: Repository<AdotanteEntity>;

    constructor(
        petRepository: Repository<PetEntity>,
        adotanteRepository: Repository<AdotanteEntity>
    ){
        this.petRepository = petRepository;
        this.adotanteRepository = adotanteRepository;
    }
    
    
    async criaPet(pet: PetEntity): Promise<void> {
        this.petRepository.save(pet);
    }

    async listaPet(): Promise<PetEntity[]> {
        return await this.petRepository.find();
    }

    async atualizaPet(
        id: number, 
        newData: PetEntity
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const petParaAtuali = await this.petRepository.findOne({ where: { id } });

            if(!petParaAtuali) {
                return { 
                    success: false, 
                    message: "Pet não encontrado."
                };
            }

            Object.assign(petParaAtuali, newData);

            await this.petRepository.save(petParaAtuali);
            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Ocorreu um erro ao tentar atualizar o pet.",
            };
        }
    }

    async deletaPet(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const petParaDeletar = await this.petRepository.findOne({ where: { id } });

            if(!petParaDeletar) {
                return { 
                    success: false, 
                    message: "Pet não encontrado."
                };
            }

            await this.petRepository.remove(petParaDeletar);
            return { 
                success: true,
                message: "Pet deletado com sucesso",
            };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Ocorreu um erro ao tentar excluir o pet.",
            };
        } 
    }

    async adotaPet(
        idPet: number,
        idAdotante: number 
    ): Promise<{ success: boolean; message?: string }> {
        const petId = Number(idPet);
        const adotanteId = Number(idAdotante);

        if (isNaN(petId) || isNaN(adotanteId)) {
            return { 
                success: false, 
                message: "ID do pet ou do adotante é inválido, tente novamente." 
            };
        }

        const pet = await this.petRepository.findOne({where: {id: petId}});

        if(!pet){
            return{
                success: false, 
                message: "Pet não encontrado."
            };
        }

        const adotante= await this.adotanteRepository.findOne({where: { id: adotanteId }});

        if(!adotante){
            return{
                success: false, 
                message: "Adotante não encontrado."
            };
        }

        pet.adotante = adotante;
        pet.adotado = true;
        await this.petRepository.save(pet);
        return { success: true };
    }

    async buscaPorCampoGenerico<Tipo extends keyof PetEntity>(
        campo: Tipo, 
        valor: PetEntity[Tipo]
    ): Promise<PetEntity[]> {
        const pets = await this.petRepository.find({ where: { [campo]: valor }});
        return pets;
    }
}