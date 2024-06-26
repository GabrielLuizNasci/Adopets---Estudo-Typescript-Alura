import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/Endereco";

export default interface InterfaceAdotanteRepository {
    criaAdotante(adotante: AdotanteEntity): void | Promise<void>;

    listaAdotante(): AdotanteEntity[] | Promise<AdotanteEntity[]>;

    atualizaAdotante( id: number, adotante: AdotanteEntity): void | Promise<{ success: boolean }>;

    deletaAdotante(id: number): void | Promise<{ success: boolean }>;

    atualizadaEnderAdotante( idAdotante: number, endereco: EnderecoEntity): void | Promise<{ success: boolean }>;
}