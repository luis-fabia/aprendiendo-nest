import { Controller, Get, UseGuards } from '@nestjs/common';
import {TransactionsService} from '../service/transactions.service.js'
import { JwtAuthGuard } from '../../auth-login/jwt-auth.guard.js'


@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {

    constructor(private transactionsService: TransactionsService) {}

    @Get()
    async GetallTransaccion() {
        const response = await this.transactionsService.GetallTransaccion()
        return response
    }

}
