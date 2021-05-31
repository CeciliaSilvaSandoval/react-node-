import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm'; 

import Address from './address.entity';
import Company from './company.entity';

@Entity()
class User {
    
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column({unique:true})
    email?: string;

    @Column()
    password?: string;

    @Column()
    phone?: string;

    @OneToOne(() => Address, address => address.user, {cascade: true})
    // @JoinColumn( {name: 'addressId'} )
    address?: Address;

    @OneToOne(() => Company, company => company.user, {cascade: true})
    // @JoinColumn( {name: 'companyId'} )
    company?: Company;
   
}

export default User;
