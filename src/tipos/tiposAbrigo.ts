import AbrigoEntity from "../entities/AbrigoEntity";


type TipoRequestBodyAbrigo = Omit<AbrigoEntity, "id" | "pets">;

type TipoRequestParamsAbrigo = { id?: string };

type TipoResponseBodyAbrigo = {
    dados?:
        | Pick<AbrigoEntity, "id" | "nome" | "celular" | "email" | "endereco">
        | Pick<AbrigoEntity, "id" | "nome" | "celular" | "email" | "endereco">[];
};

export { TipoRequestBodyAbrigo, TipoResponseBodyAbrigo, TipoRequestParamsAbrigo };