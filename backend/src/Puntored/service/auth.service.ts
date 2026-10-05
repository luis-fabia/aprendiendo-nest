import { HttpException, Injectable, Post, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { AuthDto } from '../dto/auth.dth.js'
import { AppLogger } from '../../logger/app.logger.js';

@Injectable()
export class AuthService {


    constructor(private configService: ConfigService,
        private appLogger: AppLogger
    ) { }


    token: string



    async getValidToken() {
        this.appLogger.log('LOGIN_REQUEST');
        if (this.token) {
            this.appLogger.log('LOGIN_SUCCESS');
            return this.token;
        }

        const body = {
            user: this.configService.get('PUNTORED_USER'),
            password: this.configService.get('PUNTORED_PASSWORD')
        };
        this.appLogger.log('LOGIN_SUCCESS');
        return await this.getToken(body);
    }

    async getToken(body: AuthDto) {

        const PUNTORED_AUTH_URL = this.configService.get('PUNTORED_AUTH_URL')
        const PUNTORED_HEADER = this.configService.get('PUNTORED_HEADER')
        const PUNTORED_API_KEY = this.configService.get('PUNTORED_API_KEY')



        try {

            const response = await fetch(`${PUNTORED_AUTH_URL}/auth/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        [PUNTORED_HEADER]: PUNTORED_API_KEY,
                    },
                    body: JSON.stringify(body),
                },
            );


            const data = await response.json();

            if (!response.ok) {
                throw new HttpException(
                    data,
                    response.status
                )

            }

            this.token = data.token
            this.appLogger.log('LOGIN_SUCCESS');
            return this.token

        } catch (error) {

            if (error instanceof HttpException) {
                throw error
            }


            this.appLogger.warn(
                'LOGIN_FAILED',
                {
                    statusCode: 401
                }
            );

            throw new ServiceUnavailableException(
                "No Fue posible la Autentificacion"
            )
        }
    }
}
