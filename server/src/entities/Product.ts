import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    price!: number;

    @Column()
    flowers!: string;

    @Column()
    images!: string;

    @Column()
    size!: string;

    @Column()
    material!: string;

    @Column()
    otherinfo!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
}



        