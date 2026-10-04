import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {Buydto} from '../controller/../dto/buy.dto.js'
import {BuyService} from '../service/buy.service.js'
import { JwtAuthGuard } from '../../auth-login/jwt-auth.guard.js';


@Controller('buy')
@UseGuards(JwtAuthGuard)
export class BuyController {
    
    constructor(private buyservice: BuyService) {}

    @Post() 
    async Buy(@Body() body: Buydto) {
        const compra = await  this.buyservice.BuyRecharge(body)
        return compra
    }

}
