/*
 * Copyright (c) 2019. Philemon GLOBLEHI, Back-end developer
 * Phone: (+225) 79-08-10-50
 * Email: philemongloblehi@gmail.com
 * CreatedAt 04/11/2019 12:06
 */

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const accessToken = context.switchToHttp().getRequest();

    if (!this.jwtService.verify(accessToken)) {

      throw new UnauthorizedException('Session expiré');

    }
    return true;
  }
}
