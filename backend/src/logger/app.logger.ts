import { Injectable, Logger } from "@nestjs/common";
import { ElasticService } from "./elastic.service.js";

@Injectable()
export class AppLogger {

    private readonly logger = new Logger(AppLogger.name);

    constructor(private elasticService: ElasticService) {}

    log(event: string, data?: object) {

        const datos = {
            event,
            level: "INFO",
            ...data,
            timestamp: new Date().toISOString()
        };

        this.logger.log(datos);
        this.elasticService.indexLog(datos);
    }

    warn(event: string, data?: object) {

        const datos = {
            event,
            level: "WARN",
            ...data,
            timestamp: new Date().toISOString()
        };

        this.logger.warn(datos);
        this.elasticService.indexLog(datos);
    }

    error(event: string, data?: object) {

        const datos = {
            event,
            level: "ERROR",
            ...data,
            timestamp: new Date().toISOString()
        };

        this.logger.error(datos);
        this.elasticService.indexLog(datos);
    }
}