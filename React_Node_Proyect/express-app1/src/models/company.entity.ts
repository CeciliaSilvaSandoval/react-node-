import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'; 

import User from "./user.entity";

@Entity()
class Company {
    
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @OneToOne(() => User, user => user.company, {onDelete: 'CASCADE'})
    @JoinColumn()
    user?: User;
}

export default Company;
