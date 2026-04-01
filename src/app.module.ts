import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandesModule } from './demandes/demandes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'saad',
      password: 'SAad123',
      database: 'testtechnique',
      entities: [],
      synchronize: false,
    }),
    DemandesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
