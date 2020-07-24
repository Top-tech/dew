import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class TokenGuard implements CanActivate {
    private redisClientTitanx: Redis

    constructor(
        private redisService: RedisService
    ) {
        this.redisClientTitanx = this.redisService.getClient('titanx');
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const http = context.switchToHttp();
        const request = http.getRequest<FastifyRequest>();

        if (/auth/.test(request.req.url)) {
            return true;
        }
        if (!request.headers.hasOwnProperty('token')) {
            throw new ForbiddenException('no token');
        }
        const isExist = await this.redisClientTitanx.hget(request.headers.token, '_id');
        if (!isExist) {
            throw new ForbiddenException('Haven\'t login or login expires.')
        }

        return true;
    }
}
