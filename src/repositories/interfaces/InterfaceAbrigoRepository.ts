import AbrigoEntity from "../../entities/AbrigoEntity";
import EnderecoEntity from "../../entities/Endereco";

export default interface InterfaceAdotanteRepository {
    criaAbrigo(abrigo: AbrigoEntity): void | Promise<void>;

    listaAbrigo(): AbrigoEntity[] | Promise<AbrigoEntity[]>;

    atualizaAbrigo( id: number, abrigo: AbrigoEntity): void;

    deletaAbrigo(id: number): void;

    atualizadaEnderAbrigo( idAbrigo: number, endereco: EnderecoEntity): void;
}