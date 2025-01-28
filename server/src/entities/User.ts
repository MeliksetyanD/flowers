import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({unique:true})
    username!: string;

    @Column({unique:true})
    email!: string;

    @Column()
    password!: string;

    @Column()
    cart!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
}



