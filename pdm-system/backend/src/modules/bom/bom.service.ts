// backend/src/modules/bom/bom.service.ts 

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BOM } from './bom.entity'; 

 
@Injectable()
export class BOMService {
  constructor(
    @InjectRepository(BOM)
    private readonly bomRepository: Repository<BOM>,
  ) {}
 
  async generateBOMTree(id: string): Promise<BOM> {
    const bom = await this.bomRepository.findOne({
      where: { id },
      relations: ['children'],
    });
    if (!bom) {
      throw new Error('BOM not found');
    }
    return bom;
  }
}
