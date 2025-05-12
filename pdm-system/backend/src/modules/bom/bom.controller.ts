// backend/src/modules/bom/bom.controller.ts 
@Controller('bom')
export class BOMController {
  constructor(private bomService: BOMService) {}
 
  @Get(':id/tree')
  async getBOMTree(@Param('id') id: string) {
    return this.bomService.generateBOMTree(id);
  }
}