// 1. user-response.dto.ts
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class DemandesResponseDto {
  @Expose() id!: number;
  @Expose() titre!: string;
  @Expose() details!: string;
  @Expose() status!: string;
  @Expose() date_creation?: Date;
  @Expose() date_der_mod?: Date;
  // password is not exposed
}
