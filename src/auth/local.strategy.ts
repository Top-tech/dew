// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { AuthService } from './auth.service';
// import { ContextIdFactory, ModuleRef } from '@nestjs/core';
//
// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
//     constructor(
//         private moduleRef: ModuleRef
//     ) {
//         super({
//             passReqToCallback: true,
//         });
//     }
//
//     async validate(
//         request: Request,
//         username: string,
//         password: string,
//     ) {
//         const contextId = ContextIdFactory.getByRequest(request);
//         // "AuthService" is a request-scoped provider
//         const authService = await this.moduleRef.resolve(AuthService, contextId);
//         const user = await authService.validateUser(username, password);
//         if (!user) {
//             throw new UnauthorizedException();
//         }
//         return user;
//     }
// }
