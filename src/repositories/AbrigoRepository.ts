import { Repository } from "typeorm";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRepository";
import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/Endereco";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export default class AbrigoRepository implements InterfaceAbrigoRepository{
    constructor(private repository: Repository<AbrigoEntity>){ }

    private async verificaCelularAbrigo(celular: string){
        return await this.repository.findOne({where: { celular }});
    }

    async criaAbrigo(abrigo: AbrigoEntity): Promise<void>{
        if(await this.verificaCelularAbrigo(abrigo.celular)){
            throw new RequisicaoRuim("Celular já cadastrado. Tente novamente.");
        }
        await this.repository.save(abrigo);
    }

    async listaAbrigo(): Promise<AbrigoEntity[]>{
        return await this.repository.find();
    }

    async atualizaAbrigo( id: number, newData: AbrigoEntity){
        const abrigoParaAtuali = await this.repository.findOne({ where: { id } });

        if(!abrigoParaAtuali) {
            throw new NaoEncontrado("Abrigo não encontrado.");
        }

        Object.assign(abrigoParaAtuali, newData);

        await this.repository.save(abrigoParaAtuali);
        return { success: true};
    }

    async deletaAbrigo(id: number){
        const abrigoParaDeletar = await this.repository.findOne({ where: { id } });

        if(!abrigoParaDeletar) {
            throw new NaoEncontrado("Abrigo não encontrado.");
        }

        await this.repository.remove(abrigoParaDeletar);
        return { success: true };
    }

    async atualizadaEnderAbrigo( idAbrigo: number, endereco: EnderecoEntity){
        const abrigo= await this.repository.findOne({where: {id:idAbrigo}});

        if(!abrigo){
            throw new NaoEncontrado("Abrigo não encontrado.");
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
        abrigo.endereco = novoEndereco;
        await this.repository.save(abrigo);
        return { success: true };
    }
}