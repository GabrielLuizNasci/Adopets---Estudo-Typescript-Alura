import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "./Endereco";
import PetEntity from "./PetEntity";

@Entity()
export default class AdotanteEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column()
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
}