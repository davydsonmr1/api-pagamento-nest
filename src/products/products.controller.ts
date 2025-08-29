
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Define o controlador e o prefixo da rota como '/v1/products'.
@Controller('v1/products')
export class ProductsController {
    // O decorador @UseGuards aplica o guard AuthGuard('jwt') a este método.
    // Isso garante que apenas usuários com um token JWT válido possam acessar.
    @UseGuards(AuthGuard('jwt'))
    // Mapeia o método para uma requisição GET em '/v1/products'.
    @Get()
    // O método 'getProducts' lida com a requisição.
    // @Request() injeta o objeto da requisição, incluindo o 'req.user' validado.
    // req é a requisição HTTP, ali no send quando envia o token. req.username(exemplo) é quando voce busca um dado armazenado no token ex: req.sub é injetado pelo guard
    getProducts(@Request() req) {
        console.log({ user: req.user });
        const user = req.user;
        console.log("Usuário autenticado: ", `${user.username}`);

        const produtos = [
            { produto: 1, name: 'Produto A', user: 1 },
            { produto: 2, name: 'Produto B', user: 2 },
            { produto: 3, name: 'Produto C', user: 2 },
            { produto: 5, name: 'Produto D', user: 2 },
            { produto: 6, name: 'Produto E', user: 1 },
            { produto: 4, name: 'Produto F', user: 1 }
        ]


        return produtos.filter(p => p.user === user.userId); // filtra os produtos do usuario logado
        
    }
    
    
}


// fazer mais usuarios
// cadastras mais produtos por usuario (check)