import { Controller, Get, UseGuards } from '@nestjs/common';
import {GetSupplierService } from '../service/get-supplier.service.js'
import { JwtAuthGuard } from '../../auth-login/jwt-auth.guard.js'
 
@Controller('getSuppliers')
@UseGuards(JwtAuthGuard)
export class GetSuppliersController {
    
    constructor( private getsuppliers: GetSupplierService) {}

    @Get()
    async getallProducts() {
        const respuesta = await this.getsuppliers.GetAllProducts()
        return respuesta
    }

}
