// import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn } from 'typeorm';
import { UpdateDemandeDto } from './updateDemande.dto';

export class CreateDemandeDto extends UpdateDemandeDto {
  @ApiProperty()
  @CreateDateColumn()
  date_der_mod?: Date;

  //date creation gerrer par db, supprimer par default false
}
