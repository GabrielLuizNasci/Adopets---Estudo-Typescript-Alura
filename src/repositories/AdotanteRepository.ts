import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/Endereco";
import { NaoEncontrado } from "../utils/manipulaErros";


export default class AdotanteRepository implements InterfaceAdotanteRepository{
    constructor(private repository: Repository<AdotanteEntity>){ }

    criaAdotante(adotante: AdotanteEntity): void | Promise<void> {
        this.repository.save(adotante);
    }

    async listaAdotante(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
    }

    async atualizaAdotante(
        id: number, 
        newData: AdotanteEntity
    ): Promise<{ success: boolean; message?: string }> {
        const adotanteParaAtuali = await this.repository.findOne({ where: { id } });

        if(!adotanteParaAtuali) {
            throw new NaoEncontrado("Adotante não encontrado.");
        }

        Object.assign(adotanteParaAtuali, newData);

        await this.repository.save(adotanteParaAtuali);
        return { 
            success: true,
            message: "Adotante atualizado com sucesso."
        };
    }

    async deletaAdotante(id: number): Promise<{ success: boolean; message?: string }> {
        const adotanteParaDeletar = await this.repository.findOne({ where: { id } });

        if(!adotanteParaDeletar) {
            throw new NaoEncontrado("Adotante não encontrado.");
        }

        await this.repository.remove(adotanteParaDeletar);
        return { 
            success: true,
            message: "Adotante deletado com sucesso",
        };
    }

    async atualizadaEnderAdotante(
        idAdotante: number, 
        endereco: EnderecoEntity
    ): Promise<{ success: boolean; message?: string }> {
        const adotante= await this.repository.findOne({where: {id:idAdotante}});

        if(!adotante){
            throw new NaoEncontrado("Adotante não encontrado.");
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
        adotante.endereco = novoEndereco;
        await this.repository.save(adotante);
        return { success: true };
    }
}