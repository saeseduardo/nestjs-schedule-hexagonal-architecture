import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class TypeormUserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;
}
