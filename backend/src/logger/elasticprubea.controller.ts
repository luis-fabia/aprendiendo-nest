import { Controller, Get } from '@nestjs/common';
import { ElasticService } from './elastic.service.js'

@Controller('test-elastic')
export class ElastiController {
    constructor(private elasticService: ElasticService) { }

    @Get()
    async conecion() {
        // const datos = await this.elasticService.testConnection()
        // console.log()

        await this.elasticService.indexLog({
            event: 'TEST',
            message: 'Conexión desde NestJS',
            timestamp: new Date().toISOString()
        });

        return {
            message: 'Log enviado correctamente'
        };

    }

}
