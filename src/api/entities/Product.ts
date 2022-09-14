import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Product {

    @PrimaryGeneratedColumn({ type: "bigint"})
    id: number

    @Column({length: 50})
    name: string

    @Column()
    description: string

    @Column({ type: "decimal", precision: 18, scale: 2})
    price: number;

    @Column({length: 150})
    imageUrl: string;
}