import { Controller, Get, Param } from '@nestjs/common';
import { HistoriqueService } from './historique.service';

@Controller('historique')
export class HistoriqueController {
  constructor(private readonly historiqueService: HistoriqueService) {}

  @Get()
  findAll() {
    return this.historiqueService.findAll();
  }

  @Get(':id_demande')
  findOne(@Param('id_demande') id_demande: number) {
    return this.historiqueService.findSome(+id_demande);
  }
}
