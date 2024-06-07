import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AdotanteEntity from "./AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";
import AbrigoEntity from "./AbrigoEntity";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    nome: string;

    @Column()
    especie: EnumEspecie;

    @Column({ nullable: true })
    porte?: EnumPorte;

    @Column()
    dataNasci: Date;

    @Column()
    adotado: boolean;

    @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
    adotante!: AdotanteEntity;

    @ManyToOne(() => AbrigoEntity, (abrigo) => abrigo.pets)
    abrigo!: AbrigoEntity;

    constructor(
        nome: string,
        especie: EnumEspecie,
        dataNasci: Date,
        adotado: boolean,
        porte?: EnumPorte,
    ){
        this.nome = nome;
        this.especie = especie;
        this.dataNasci = dataNasci;
        this.adotado = adotado;
        this.porte = porte;
    }
}