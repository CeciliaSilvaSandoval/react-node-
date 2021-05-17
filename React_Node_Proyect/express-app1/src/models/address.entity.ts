import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'; 

import User from "./user.entity";

@Entity()
class Address {
    
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    city?: string;

    @OneToOne(() => User, user => user.address, {onDelete: 'CASCADE'})
    @JoinColumn()
    user?: User;
}

export default Address;
