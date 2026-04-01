import { IsNotEmpty } from 'class-validator';

export class CreateDemandeDto {
  id: number;

  @IsNotEmpty()
  titre: string;
  @IsNotEmpty()
  details: string;
  @IsNotEmpty()
  status: string;
}
