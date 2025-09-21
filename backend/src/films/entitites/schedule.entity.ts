import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Film } from "./film.entity";

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    daytime: Date;

    @Column()
    hall: number;

    @Column()
    rows: number;

    @Column()
    seats: number;

    @Column()
    price: number;

    @Column('text', { array: true })
    taken: string[];

    @Column('uuid')
    filmid: string;

    @ManyToOne(() => Film, (film) => film.schedule, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'filmid' })
    film: Film;
}