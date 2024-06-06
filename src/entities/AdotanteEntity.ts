import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "./Endereco";
import PetEntity from "./PetEntity";
import { criaSenhaCriptografada } from "../utils/senhaCriptografada";

@Entity()
export default class AdotanteEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column({ unique: true})
    celular: string;

    @Column()
    senha: string;

    @Column({ nullable: true })
    foto?: string;

    @OneToOne(() => EnderecoEntity, {
        nullable: true, 
        cascade: true, 
        eager: true
    })
    @JoinColumn()
    endereco?: EnderecoEntity;

    @OneToMany(() => PetEntity, (pet) => pet.adotante)
    pets!: PetEntity[];

    constructor(
        nome: string,
        celular: string,
        senha: string,
        foto?: string,
        endereco?: EnderecoEntity
    ){
        this.nome = nome;
        this.celular = celular;
        this.senha = senha;
        this.foto = foto;
        this.endereco = endereco;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private async criptografaSenha(senha: string) {
        this.senha = criaSenhaCriptografada(this.senha);
    }
}