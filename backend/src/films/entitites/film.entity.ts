import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('films')
export class Film {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('double precision')
    rating: number;

    @Column()
    director: string;

    @Column('text', { array: true })
    tags: string[];

    @Column()
    image: string;

    @Column()
    cover: string;

    @Column()
    title: string;

    @Column()
    about: string;

    @Column()
    description: string;

    // @OneToMany() Schedule ещё нет
    // schedule: Schedule[];
}