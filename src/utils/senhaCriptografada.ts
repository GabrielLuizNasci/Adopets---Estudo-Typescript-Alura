import bcrypt from "bcrypt";

export const criaSenhaCriptografada = async (senha: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(senha, salt);

    return `${salt}:${hash}`;
};