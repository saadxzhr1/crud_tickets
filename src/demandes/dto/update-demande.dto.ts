import { PartialType } from '@nestjs/mapped-types';
import { CreateDemandeDto } from './create-demande.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateDemandeDto extends PartialType(CreateDemandeDto) {
  @ApiProperty()
  @IsNotEmpty()
  titre!: string;

  @ApiProperty()
  @IsNotEmpty()
  details!: string;

  @ApiProperty()
  @IsNotEmpty()
  status!: string;
}

export enum DemandesStatus {
  Brouillon = 'Brouillon',
  Soumise = 'Soumise',
  VALIDE = 'Validée',
}
