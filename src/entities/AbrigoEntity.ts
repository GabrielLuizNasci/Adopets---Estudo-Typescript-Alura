import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import PetEntity from "./PetEntity";
import EnderecoEntity from "./Endereco";


@Entity()
export default class AbrigoEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column({ unique: true})
    celular: string;

    @Column({ unique: true})
    email: string;

    @Column()
    senha: string;

    @OneToOne(() => EnderecoEntity, {
        nullable: true, 
        cascade: true, 
        eager: true
    })
    @JoinColumn()
    endereco?: EnderecoEntity;

    @OneToMany(() => PetEntity, (pet) => pet.abrigo)
    pets!: PetEntity[];

    constructor(
        nome: string,
        celular: string,
        email: string,
        senha: string,
        endereco?: EnderecoEntity
    ){
        this.nome = nome;
        this.celular = celular;
        this.email = email;
        this.senha = senha;
        this.endereco = endereco;
    }
}