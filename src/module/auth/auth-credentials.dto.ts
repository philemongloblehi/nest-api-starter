/*
 * Copyright (c) 2019. Philemon GLOBLEHI, Back-end developer
 * Phone: (+225) 79-08-10-50
 * Email: philemongloblehi@gmail.com
 * CreatedAt 15/10/2019 00:25
 */

import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserRole } from './user.role';
import {ApiModelProperty} from '@nestjs/swagger';
import {Unique} from 'typeorm';

@Unique(['userName', 'email'])
export class AuthCredentialsDto {

  @ApiModelProperty()
  // @IsString()
  // @MinLength(4, {message: 'Longueur minimale est de 4 caractères'})
  // @MaxLength(20, {message: 'Longueur maximale est de 20 caractères'})
  userName: String;

  @ApiModelProperty()
  // @IsString()
  // @MinLength(8, {message: 'Longueur minimale est de 8 caractères'})
  // @MaxLength(20, {message: 'Longueur maximale est de 20 caractères'})
  // @Matches(
  //   /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  //   {message: 'Le mot de passe doit contenir des caractères spéciaux'}
  //   )
  password: String;

  @ApiModelProperty()
  // @IsString()
  firstName: String;

  @ApiModelProperty()
  // @IsString()
  lastName: String;

  @ApiModelProperty()
  // @IsString()
  // @IsEmail()
  email: String;

  @ApiModelProperty()
  raisonSociale: String;

  @ApiModelProperty({ enum: ['UTILISATEUR', 'ADMIN', 'SUPER_ADMIN']})
  // @IsString()
  role: UserRole;

  @ApiModelProperty()
  statut: boolean;

  @ApiModelProperty()
  contact: String;


}
