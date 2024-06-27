import AbrigoEntity from "../../entities/AbrigoEntity";
import EnderecoEntity from "../../entities/Endereco";

export default interface InterfaceAdotanteRepository {
    criaAbrigo(abrigo: AbrigoEntity): Promise<void>;

    listaAbrigo(): Promise<AbrigoEntity[]>;

    atualizaAbrigo( id: number, abrigo: AbrigoEntity): Promise<{ success: boolean }>;

    deletaAbrigo(id: number): Promise<{ success: boolean }>;

    atualizadaEnderAbrigo( idAbrigo: number, endereco: EnderecoEntity): Promise<{ success: boolean }>;
}