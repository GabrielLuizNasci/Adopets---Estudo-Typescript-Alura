import EnumEspecie from "../enum/EnumEspecie.js";

type TipoPet={
    id: number;
    nome: string;
    especie: EnumEspecie;
    dataNasci: Date;
    adotado: boolean;
}

export default TipoPet;