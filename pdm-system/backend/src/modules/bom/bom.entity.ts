// backend/src/modules/bom/bom.entity.ts 
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany, 
    ManyToOne, 
    JoinColumn 
} from 'typeorm';
  import { IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';
  
@Entity()
export class BOM {
    
    /** 使用 uuid 作为主键生成策略 */
    @PrimaryGeneratedColumn({ strategy: 'uuid' })
    id: string;

    /** 物料清单的名称 */
    @Column({type:'string'})
    @IsNotEmpty()
    name: string;
   
    /** 物料清单的价格，保留两位小数 */
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsNumber()
    price: number;
   
    /** 物料清单是否处于激活状态 */
    @Column({ default: true })
    @IsBoolean()
    isActive: boolean;
   
    /** 物料清单的描述信息，可选字段 */
    @Column({ nullable: true })
    @IsOptional()
    description: string;
   
    /** 物料清单的创建时间 */
    @CreateDateColumn()
    createdAt: Date;
   
    /** 物料清单的更新时间 */
    @UpdateDateColumn()
    updatedAt: Date;
   
    /** 父级物料清单关联 */
    @ManyToOne(() => BOM, (bom: BOM) => bom.children, { nullable: true })
     @JoinColumn({ name: 'parentId' })
     parent: BOM | undefined;
 
     @OneToMany(() => BOM, (bom: BOM) => bom.parent)
     children: BOM[];
}