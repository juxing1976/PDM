// backend/src/core/mes/mq.service.ts 
@Injectable()
export class MQService {
  private readonly logger = new Logger(MQService.name);
 
  constructor(private readonly configService: ConfigService) {
    const conn = amqp.connect(this.configService.get('AMQP_URL'));
    this.channel = await conn.createChannel();
  }
 
  async publishBOMUpdate(bomId: string) {
    await this.channel.assertQueue('bom.updates');
    this.channel.sendToQueue('bom.updates', 
      Buffer.from(JSON.stringify({ bomId }))
    );
  }
}