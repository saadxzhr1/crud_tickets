import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandesModule } from './demandes/demandes.module';
import { DataSource } from 'typeorm';
import { Demandes } from './demandes/entities/demande.entity';
import { HistoriqueModule } from './historique/historique.module';
import { Historique } from './historique/entities/historique.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'saad',
      password: 'S@ad123',
      database: 'testtechnique',
      entities: [Demandes, Historique],
      synchronize: false,
    }),
    DemandesModule,
    HistoriqueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
