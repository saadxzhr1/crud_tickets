import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDemandeDto } from './dto/createDemande.dto';
import { UpdateDemandeDto } from './dto/updateDemande.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Demandes } from './entities/demande.entity';
import { DemandesResponseDto } from './dto/demandesResponse.dto';

@Injectable()
export class DemandesService {
  // Injecter le repository
  constructor(
    @InjectRepository(Demandes)
    private demandesRepository: Repository<Demandes>,
  ) {}

  // Ajouter demande
  async create(createDemandeDto: CreateDemandeDto): Promise<string> {
    const demande = this.demandesRepository.create({
      ...createDemandeDto,
      supprimer: false,
    });
    await this.demandesRepository.save(demande);
    return `Demande ${demande.titre} Ajouter avec success`;
  }

  // Charger tous les demandes
  async findAll(): Promise<DemandesResponseDto[]> {
    const demandes = await this.demandesRepository.find({
      where: { supprimer: false },
      order: { date_creation: 'DESC' },
    });
    if (!demandes) {
      throw new NotFoundException('Aucune demande trouvée');
    }
    return demandes.map((demande) => ({
      id: demande.id,
      titre: demande.titre,
      details: demande.details,
      status: demande.status,
      dateCreation: demande.date_creation,
      dateDerniereModification: demande.date_der_mod,
    }));
  }

  // Trouver demande par id
  async findOne(id: number): Promise<DemandesResponseDto> {
    const demande = await this.demandesRepository.findOneBy({ id });
    if (!demande) {
      throw new NotFoundException(`Demande ${id} non trouvée`);
    }
    return {
      id: demande.id,
      titre: demande.titre,
      details: demande.details,
      status: demande.status,
    };
  }

  // Modifier demande
  async update(
    id: number,
    updateDemandeDto: UpdateDemandeDto,
  ): Promise<string> {
    const demande = await this.demandesRepository.findOneBy({ id });
    if (!demande) {
      throw new NotFoundException(`Demande ${id} non trouvée`);
    }
    Object.assign(demande, updateDemandeDto);
    await this.demandesRepository.save(demande);
    return `Demande ${demande.titre} modifiée avec success`;
  }

  // Supprimer demande (soft delete)
  async remove(id: number) {
    const demande = await this.demandesRepository.findOneBy({ id });
    if (!demande) {
      throw new NotFoundException(`Demande ${id} non trouvée`);
    }
    demande.supprimer = true;
    await this.demandesRepository.save(demande);
    return { message: 'Demande ' + demande.titre + ' supprimee avec success' };
  }
}
