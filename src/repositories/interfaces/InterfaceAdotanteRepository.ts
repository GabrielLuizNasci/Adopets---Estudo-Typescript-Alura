import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/Endereco";

export default interface InterfaceAdotanteRepository {
    criaAdotante(adotante: AdotanteEntity): Promise<void>;

    listaAdotante(): Promise<AdotanteEntity[]>;

    atualizaAdotante( id: number, adotante: AdotanteEntity): Promise<{ success: boolean }>;

    deletaAdotante(id: number): Promise<{ success: boolean }>;

    atualizadaEnderAdotante( idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean }>;
}