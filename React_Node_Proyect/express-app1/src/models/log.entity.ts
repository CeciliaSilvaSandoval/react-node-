import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'; 

@Entity()
class Log{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    origin?: string;

    @Column()
    status?: number;

    @Column()
    message?: string;
}

export default Log;
