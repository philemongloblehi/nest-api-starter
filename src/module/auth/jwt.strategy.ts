/*
 * Copyright (c) 2019. Philemon GLOBLEHI, Back-end developer
 * Phone: (+225) 79-08-10-50
 * Email: philemongloblehi@gmail.com
 * CreatedAt 15/10/2019 03:25
 */

import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  public async validate(payload: JwtPayloadInterface): Promise<UserEntity> {
    const {userName} = payload;
    const user = await this.userRepository.findUserByUserName(userName);

    if (!user) {
      // throw new UnauthorizedException();
      throw new HttpException("Utilisateur incorrect", HttpStatus.NOT_FOUND);
    }
    return user;

  }

}

@Injectable()
export class ZipJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(err, user, info) {
    if (err || !user) {
      let message = "Authentification invalide. Veuillez vous reconnecter";
      if (info) {
        switch (info.message) {
          case 'No auth token':
          case 'invalid signature':
          case 'jwt malformed':
          case 'invalid token':
          case 'invalid algorithm':
            message = "Authentification invalide. Veuillez vous reconnecter";
            break;
          case 'jwt expired':
            message = "Votre session a expiré. Veuillez vous reconnecter";
            break;
        }
      }
      throw err || new UnauthorizedException(message);
    }
    return user;
  }
}
