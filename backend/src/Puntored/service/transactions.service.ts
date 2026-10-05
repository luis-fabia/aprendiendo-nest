import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AppLogger } from '../../logger/app.logger.js';

@Injectable()
export class TransactionsService {

    constructor(
        private prisma: PrismaService,
        private appLogger: AppLogger
    ) { }


    async GetallTransaccion() {

        this.appLogger.log('TRANSACTIONS_REQUEST');

        const resultado = await this.prisma.transaction.findMany()
        console.log(resultado)

        if (resultado.length > 0) {
            this.appLogger.log(
                'TRANSACTIONS_SUCCESS',
                {
                    count: resultado.length
                }
            );
        }
        else {
            this.appLogger.error(
                'TRANSACTIONS_FAILED'
            );
        }
        return resultado

    }

}
