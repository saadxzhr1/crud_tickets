import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateDemandeDto } from './dto/createDemande.dto';
import { UpdateDemandeDto } from './dto/updateDemande.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Demandes } from './entities/demande.entity';
import { DemandesResponseDto } from './dto/demandesResponse.dto';
import { DemandesStatus } from './demandesStatus.enum';
import { ApiQuery } from '@nestjs/swagger';
@Injectable()
export class DemandesService {
  private readonly demandes: Demandes[] = [];

  constructor(
    @InjectRepository(Demandes)
    private demandesRepository: Repository<Demandes>,
  ) {}

  // Ajouter ticket
  async create(createDemandeDto: CreateDemandeDto) {
    const demande = this.demandesRepository.create({
      ...createDemandeDto,
      supprimer: false,
    });
    await this.demandesRepository.save(demande);
    return demande;
  }

  // Charger tous les tickets
  async findAll(): Promise<DemandesResponseDto[]> {
    const demandes = await this.demandesRepository.find({
      where: { supprimer: false },
    });
    return demandes.map((demandes) => ({
      id: demandes.id,
      titre: demandes.titre,
      details: demandes.details,
      status: demandes.status,
      date_creation: demandes.date_creation,
      date_der_mod: demandes.date_der_mod,
    }));
  }

  // Trouver ticket par id
  async findOne(id: number): Promise<DemandesResponseDto[]> {
    const demandes = await this.demandesRepository.find({
      where: { supprimer: false, id: id },
    });
    return demandes.map((demandes) => ({
      id: demandes.id,
      titre: demandes.titre,
      details: demandes.details,
      status: demandes.status,
    }));
  }

  // Modifier ticket
  async update(
    id: number,
    updateDemandeDto: UpdateDemandeDto,
  ): Promise<Demandes> {
    const demande = await this.demandesRepository.findOneBy({ id });

    if (!demande) {
      throw new NotFoundException(`Demande ${id} non trouvée`);
    }

    Object.assign(demande, updateDemandeDto);

    return await this.demandesRepository.save(demande);
  }

  // Supprimer ticket
  remove(id: number) {
    return `This action removes a #${id} demande`;
  }

  /////////////////////////////////////////////////

  //filter by status
  @ApiQuery({ name: 'status', enum: DemandesStatus })
  async filterByRole(
    @Query('status') status: DemandesStatus = DemandesStatus.Brouillon,
  ) {}
}
