import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/Endereco";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export default class AdotanteRepository implements InterfaceAdotanteRepository{
    constructor(private repository: Repository<AdotanteEntity>){ }

    private async verificaCelularAdotante(celular: string){
        return await this.repository.findOne({where: { celular }});
    }

    async criaAdotante(adotante: AdotanteEntity): Promise<void> {
        if(await this.verificaCelularAdotante(adotante.celular)){
            throw new RequisicaoRuim("Celular já cadastrado. Tente novamente.");
        }
        await this.repository.save(adotante);
    }

    async listaAdotante(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
    }

    async atualizaAdotante(id: number, newData: AdotanteEntity): Promise<{ success: boolean }>{
        const adotanteParaAtuali = await this.repository.findOne({ where: { id } });

        if(!adotanteParaAtuali) {
            throw new NaoEncontrado("Adotante não encontrado.");
        }

        Object.assign(adotanteParaAtuali, newData);

        await this.repository.save(adotanteParaAtuali);
        return { success: true};
    }

    async deletaAdotante(id: number): Promise<{ success: boolean }>{
        const adotanteParaDeletar = await this.repository.findOne({ where: { id } });

        if(!adotanteParaDeletar){
            throw new NaoEncontrado("Adotante não encontrado.");
        }

        await this.repository.remove(adotanteParaDeletar);
        return { success: true };
    }

    async atualizadaEnderAdotante( idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean }>{
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