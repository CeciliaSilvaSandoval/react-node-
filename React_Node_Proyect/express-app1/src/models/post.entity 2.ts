import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'; 

@Entity()
class Post {
    
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    userId?: number;

    @Column()
    title?: string;

    @Column()
    body?: string;
}

export default Post;
