/*
 * Copyright (c) 2019. Philemon GLOBLEHI, Back-end developer
 * Phone: (+225) 79-08-10-50
 * Email: philemongloblehi@gmail.com
 * CreatedAt 15/10/2019 00:14
 */

import { EntityRepository, getRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './auth-credentials.dto';
import {ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import {Manager} from '../../helpers/utils/manager';

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

  constructor(
    @InjectRepository(UserEntity)
    private readonly  userRepository:Repository<UserEntity>,
  ) {
    super();
  }

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<String> {
    let passwordGenerated = null;
    let passwordHashed;
    const {userName, password, firstName, lastName, email, raisonSociale, role, contact} = authCredentialsDto;
    const salt =  await bcrypt.genSalt();
    if (password) {
      passwordHashed = await this.hashPassword(password, salt);
    } else {
      passwordGenerated = await Manager.generatedPasswordUser();
      passwordHashed = await this.hashPassword(passwordGenerated, salt);
    }
    const user = new UserEntity();
    user.setUserName(userName);
    user.setPassword(passwordHashed);
    user.setSalt(salt);
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setEmail(email);
    user.setRaisonSociale(raisonSociale);
    user.setRole(role);
    user.setContact(contact);
    const userExist = await this.findUserByUserNameOrEmail(user.getUserName(), user.getEmail());
    if (userExist) {
      throw new ConflictException('Le nom d\'utilisateur ou l\'email existe déjà');
    }
    await this.verificationContraintesEntityProperty(user, password);
    try {
      await user.save();
      // Envoie email a l'utilisateur
      /* code ici... */
      // console.log('PASSWORD GENERATED', passwordGenerated);
      return 'Le compte utilisateur a été crée avec succès!'
    } catch (error) {
      throw new InternalServerErrorException('Echec de création du compte utilisateur.');
    }
  }

  public async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<String> {
    const {userName, email, password} = authCredentialsDto;
    const user = await this.findUserByUserNameOrEmail(userName, email);
    if (user && await user.validatePassword(password)) {
      return user.getUserName();
    } else {
      return null;
    }
  }

  protected async hashPassword(password: String, salt: String): Promise<String> {
    return bcrypt.hash(password, salt);
  }

  public async findUserByUserName(userName: String) {
    return await getRepository(UserEntity)
      .createQueryBuilder("user")
      .where("user.userName = :userName", { userName: userName })
      .getOne();
  }

  public async findUserByUserNameOrEmail(userName: String, email: String) {
    return await getRepository(UserEntity)
        .createQueryBuilder("user")
        .where("user.userName = :userName", { userName: userName })
        .orWhere("user.email = :email", { email: email })
        .getOne();
  }

  public async findAll() {
    return await getRepository(UserEntity)
      .createQueryBuilder()
      .getMany();
  }

  public async findById(id: number) {
    return await getRepository(UserEntity)
      .createQueryBuilder("user")
      .where("user.user_id = :userId", { userId: id })
      .getOne();
  }

  public async updated(userId: number, userDto: UserEntity) {
    const salt =  await bcrypt.genSalt();
    const userName = userDto.userName;
    const password = await this.hashPassword(userDto.password, salt);
    const firstName = userDto.firstName;
    const lastName = userDto.lastName;
    const email = userDto.email;
    const raisonSociale = userDto.raisonSociale;
    const role = userDto.role;
    const contact = userDto.contact;
    const statut = userDto.statut;
    // await this.verificationContraintesEntityProperty(userDto, userDto.password);
    return await getRepository(UserEntity)
      .createQueryBuilder()
      .update(UserEntity)
      .set({userName: userName, password: password, salt: salt, firstName: firstName, lastName: lastName, email: email, raisonSociale: raisonSociale, role: role, contact: contact, statut: statut,})
      .where("user_id = :userId", { userId: userId })
      .execute();
  }

  public async updateUser(userId: number, userDto: UserEntity) {
    const userName = userDto.userName;
    const firstName = userDto.firstName;
    const lastName = userDto.lastName;
    const email = userDto.email;
    const raisonSociale = userDto.raisonSociale;
    const role = userDto.role;
    const contact = userDto.contact;
    return await getRepository(UserEntity)
      .createQueryBuilder()
      .update(UserEntity)
      .set({userName: userName, firstName: firstName, lastName: lastName, email: email, raisonSociale: raisonSociale, role: role, contact: contact})
      .where("user_id = :userId", { userId: userId })
      .execute();
  }

  public async deleted(userId: number) {
    return await getRepository(UserEntity)
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where("user_id = :userId", { userId: userId })
      .execute();
  }

  public async verificationContraintesEntityProperty(user: UserEntity, passwordNotHashed = null) {
    const userName = user.getUserName();
    const password = passwordNotHashed;
    if (userName) {
      if (userName.length < 4) {
        throw new HttpException("La longueur minimale du login est de 4 caractères", HttpStatus.BAD_REQUEST);
      } else if (userName.length > 20) {
        throw new HttpException("La longueur maximale du login est de 20 caractères", HttpStatus.BAD_REQUEST);
      }
    }

    if (password) {
      if (password.length < 8) {
        throw new HttpException("La longueur minimale du mot de passe est de 8 caractères", HttpStatus.BAD_REQUEST);
      } else if (password.length > 20) {
        throw new HttpException("La longueur maximale du mot de passe est de 20 caractères", HttpStatus.BAD_REQUEST);
      }
    }

  }

}
