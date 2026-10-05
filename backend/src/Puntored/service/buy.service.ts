import { HttpException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { Buydto } from '../controller/../dto/buy.dto.js'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../service/auth.service.js'
import { PrismaService } from '../../prisma/prisma.service.js'
import { AppLogger } from '../../logger/app.logger.js';


@Injectable()
export class BuyService {

    constructor(
        private configService: ConfigService,
        private authService: AuthService,
        private prisma: PrismaService,
        private appLogger: AppLogger) { }

    async BuyRecharge(body: Buydto) {

        try {
            const PUNTORED_AUTH_URL = this.configService.get('PUNTORED_AUTH_URL')
            const Token = this.authService.token

            this.appLogger.log('PURCHASE_REQUEST', {
                cellPhone: body.cellPhone,
                suppierID: body.supplierId,
                value: body.value
            })

            const resultado = await fetch(`${PUNTORED_AUTH_URL}/buy`, {
                method: 'POST',
                headers: {
                    'authorization': `${Token}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            console.log(resultado)

            const datos = await resultado.json()

            this.appLogger.log(
                'PURCHASE_SUCCESS',
                {
                    transactionId: datos.transactionalID,
                    value: datos.value,
                    supplierId: datos.supplierId
                }
            );

            if (!resultado.status) {

                this.appLogger.error(
                    'PURCHASE_FAILED',
                    {
                        statusCode: resultado.status
                    }
                );

                throw new HttpException(
                    datos,
                    resultado.status
                );
            }


            await this.prisma.transaction.create({
                data: {
                    supplierId: body.supplierId,
                    cellPhone: body.cellPhone,
                    value: body.value,
                    transactionalID: datos.transactionalID,
                }
            })

            return datos

        }
        catch (error) {
            console.log(error)
            if (error instanceof HttpException) {
                throw error;
            }


            this.appLogger.error(
                'PURCHASE_ERROR'
            );

            throw new ServiceUnavailableException(
                "No Fue posible Comunicarse con Puntored"
            )
        }
    }
}
