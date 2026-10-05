import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@elastic/elasticsearch';
import { Logger } from "@nestjs/common";

    @Injectable()
    export class ElasticService {

        private readonly client: Client;
        private readonly logger = new Logger(ElasticService.name);

        constructor(
            private readonly configService: ConfigService
        ) {

            this.client = new Client({
                node: this.configService.get<string>('ELASTICSEARCH_URL'),
                auth: {
                    apiKey: this.configService.get<string>(
                        'ELASTICSEARCH_API_KEY'
                    )!
                }
            });
        }

        async indexLog(data: object) {


            try {
                await this.client.index({
                    index: 'puntored-logs',
                    document: data
                });

            }
            catch (error) {
                this.logger.error(
                    'No fue posible enviar el log a Elasticsearch',
                    error
                );
            }

        }


        async testConnection() {
            const response = await this.client.info();
            console.log(response);
        }

    }
