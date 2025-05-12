// backend/src/app.module.ts 
import { Module } from '@nestjs/common'; 
import { BOMController } from './modules/bom/bom.controller'; 
import { BOMService } from './modules/bom/bom.service'; 
import { DatabaseModule } from './core/database/database.module'; 
 
@Module({ 
  imports: [DatabaseModule], 
  controllers: [BOMController], 
  providers: [BOMService], 
}) 
export class AppModule {} 