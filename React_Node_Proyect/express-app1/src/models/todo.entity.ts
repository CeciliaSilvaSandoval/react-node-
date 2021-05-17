import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'; 

@Entity()
class Todo {
    
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    userId?: number;

    @Column()
    title?: string;

    @Column()
    completed?: boolean;
}

export default Todo;
