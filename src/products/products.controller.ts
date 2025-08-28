import { Controller } from '@nestjs/common';
import { Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/products')
export class ProductsController {

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getProducts(@Request() req) {
        console.log(req.user);
        return [
            { produto: 1, name: 'Produto A' },
            { produto: 2, name: 'Produto B' }
        ];
    }
}
