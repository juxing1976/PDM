// backend/src/core/database/database.module.ts 
import { Module } from '@nestjs/common'; 
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { BOM } from './../../modules/bom/bom.entity';
@Module({ 
  imports: [ 
    TypeOrmModule.forRootAsync({ 
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({ 
        type: 'mysql', 
        host: configService.get('DB_HOST'), 
        port: configService.get('DB_PORT'), 
        username: configService.get('DB_USERNAME'), 
        password: configService.get('DB_PASSWORD'), 
        database: configService.get('DB_DATABASE'), 
        entities: [BOM], 
        synchronize: true, // 开发环境可使用，生产环境建议关闭 
      }), 
    }), 
  ], 
}) 
export class DatabaseModule {} 