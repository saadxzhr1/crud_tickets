import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Demandes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titre!: string;

  @Column()
  details!: string;

  @Column()
  status!: string;

  @Column()
  supprimer?: boolean;

  @Column()
  date_creation?: Date;

  @Column()
  date_der_mod?: Date;
}

export enum DemandesStatus {
  Brouillon = 'Brouillon',
  Soumise = 'Soumise',
  VALIDE = 'Validée',
}
