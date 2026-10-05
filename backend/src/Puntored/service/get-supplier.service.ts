import { HttpException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../service/auth.service.js'
import { AppLogger } from '../../logger/app.logger.js';

@Injectable()
export class GetSupplierService {

    constructor(
        private configService: ConfigService, 
        private authService: AuthService,
        private appLogger: AppLogger) { }

    async GetAllProducts() {

        this.appLogger.log('SUPPLIERS_REQUEST');

        const token = await this.authService.getValidToken()
        const PUNTORED_AUTH_URL = this.configService.get('PUNTORED_AUTH_URL')


        try {

            const peticion = await fetch(`${PUNTORED_AUTH_URL}/getSuppliers`, {
                method: 'GET',
                headers: { 'authorization': `${token}` }
            })


            const datos = await peticion.json()


            if (!peticion.ok) {
                this.appLogger.error(
                    'SUPPLIERS_FAILED',
                    {
                        statusCode: peticion.status
                    }
                );

                throw new HttpException(
                    datos,
                    peticion.status
                )
            }

            this.appLogger.log(
                'SUPPLIERS_SUCCESS',
                {
                    count: datos.length
                }
            );

            return datos


        }
        catch (error) {
            if (error instanceof HttpException) {
                throw error
            }

            this.appLogger.error(
                'SUPPLIERS_ERROR'
            );

            throw new ServiceUnavailableException(
                "No fue Posible la obtencion de los productos "
            );

        }
    }

}

