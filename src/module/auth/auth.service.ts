import {HttpException, HttpStatus, Injectable, InternalServerErrorException} from '@nestjs/common';
import {UserRepository} from './user.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {AuthCredentialsDto} from './auth-credentials.dto';
import {JwtService} from '@nestjs/jwt';
import {JwtPayloadInterface} from './jwt-payload.interface';
import {UserEntity} from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<String> {
    return await this.userRepository.signUp(authCredentialsDto);
  }

  public async signIn(authCredentialsDto: AuthCredentialsDto) {
    const userName = await this.userRepository.validateUserPassword(authCredentialsDto);
    if (!userName) {
      throw new HttpException("Le nom utilisateur ou le mot de passe est incorrect", HttpStatus.NOT_FOUND);
    }

    const payload: JwtPayloadInterface = {userName};
    const accessToken = await this.jwtService.sign(payload);

    const user = await this.userRepository.findUserByUserName(userName);

    const {password, salt, ...userObj} = user;
    return {
      accessToken: accessToken,
      user: {...userObj},
    };
  }

  public async getUsers(){
    const users = await this.userRepository.findAll();
    if (users.length > 0) {
      const arrayUsers = [];
      for (let i = 0; i < users.length; i++) {
        const {password, salt, ...userObj} = users[i];
        arrayUsers.push(userObj);
      }
      return arrayUsers;
    }
  }

  public async getOneUsers(usersId: number){
    const user = await this.userRepository.findById(usersId);
    if(user) {
      const {password, salt, ...userObj} = user;
      return {...userObj};
    }
    return null;
  }

  public async getActivateUser(usersId: number, status: boolean){
    const user = await this.userRepository.findById(usersId);
    if(user) {
      user.setStatut(status);
      await this.userRepository.updated(usersId, user);
      const {password, salt, ...userObj} = user;
      return userObj;
    }
    return null;
  }

  public async updateUsers(usersId: number , usersDto: UserEntity)
  {
    await this.userRepository.updateUser(usersId, usersDto);
    const user = await this.userRepository.findById(usersId);
    const {password, salt, ...userObj} = user;
    return userObj;
  }

  public async reinitializePassword(usersId: number , newPassword: String)
  {
    const usersDto = await this.userRepository.findById(usersId);
    if (usersDto) {
      usersDto.setPassword(newPassword);
      await this.userRepository.updated(usersId, usersDto);
      const user = await this.userRepository.findById(usersId);
      const {password, salt, ...userObj} = user;
      return userObj;
    }
    return null;
  }

  public async resetPasswordUser(usersId: number , oldPassword: String, newPassword: String)
  {
    const user = await this.userRepository.findById(usersId);
    if (user) {
      const passwordIsCorrect = await user.validatePassword(oldPassword);
      if (passwordIsCorrect === true) {
        user.setPassword(newPassword);
        await this.userRepository.updated(usersId, user);
        const {password, salt, ...userObj} = user;
        return userObj;
      }
      throw new HttpException("Le mot de passe saisit est incorrect", HttpStatus.NOT_FOUND);
    }
    return null;
  }

  public async removeUsers(usersId: number){
    const user = await this.userRepository.findById(usersId);
    if(!user) {
      return null;
    }
    try {
      await this.userRepository.deleted(usersId);
      const {password, salt, ...userObj} = user;
      return userObj;
    } catch (e) {
      throw new InternalServerErrorException('Impossible de supprimer. Car cet élément est en cours d\'utilisation');
    }

  }


}
