import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Historique {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  date_creation!: Date;

  @Column()
  type_action!: string;

  @Column()
  id_demande!: number;

  @Column()
  utilisateur!: string;

  @Column()
  ancienne_valeur!: string;

  @Column()
  nouvelle_valeur!: string;
}
