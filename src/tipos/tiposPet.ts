import PetEntity from "../entities/PetEntity";


type TipoRequestBodyPet = Omit<PetEntity, "id">;

type TipoRequestParamsPet = { 
    id?: string,
    pet_id?: string,
    id_adotante?: string
};

type TipoResponseBodyPet = {
    dados?: 
    | Pick<PetEntity, "id" | "nome" | "especie" | "porte"> 
    | Pick<PetEntity, "id" | "nome" | "especie" | "porte">[];
    erros?: unknown;
    message?: string;
};

export { TipoRequestBodyPet, TipoResponseBodyPet, TipoRequestParamsPet };