import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';
import { JsonView } from '../../helpers/utils/JsonView';

@ApiUseTags('Authentification')
@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('auths/signup')
  public async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    const user = await this.authService.signUp(authCredentialsDto);
    return JsonView.dataResponse(user, '', HttpStatus.OK);
  }

  @Post('auths/signin')
  public async signIn(@Body('authCredentialsDto', new ValidationPipe({transform: true})) authCredentialsDto: AuthCredentialsDto) {
    const user = await this.authService.signIn(authCredentialsDto);
    return JsonView.dataResponse(user, '', HttpStatus.OK);
  }

  @Get('users')
  public async getAll() {
    const users = await this.authService.getUsers();
    return JsonView.dataResponse(users, '', HttpStatus.OK);
  }

  @Get('users/:usersId')
  public async getOne(@Param('usersId') usersId) {
    const  user = await this.authService.getOneUsers(usersId);
    if(user)
      return JsonView.dataResponse(user, '', HttpStatus.OK);
    throw new HttpException("Cet utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
  }

  @Get('users/:usersId/activate/:status')
  public async getActivateUser(@Param('usersId') usersId, @Param('status') status) {
    const  user = await this.authService.getActivateUser(usersId, status);
    if(user)
      return JsonView.dataResponse(user, '', HttpStatus.OK);
    throw new HttpException("Cet utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
  }

  @Put('users/:usersId')
  public async update(@Param('usersId') usersId, @Body(new ValidationPipe({transform: true})) usersDto) {
    const user = await this.authService.updateUsers(usersId, usersDto);
    if (user)
      return JsonView.dataResponse(user, '', HttpStatus.OK);
    throw new HttpException("Echec de la mise a jour", HttpStatus.NOT_MODIFIED);
  }

  @Put('users/:usersId/reset-password')
  public async resetPasswordUser(@Param('usersId') usersId, @Body('oldPassword') oldPassword, @Body('newPassword') newPassword) {
    const user = await this.authService.resetPasswordUser(usersId, oldPassword, newPassword);
    if (user)
      return JsonView.dataResponse(user, '', HttpStatus.OK);
    throw new HttpException("Echec de la modification du mot de passe", HttpStatus.NOT_MODIFIED);
  }

  // @Put('users/:usersId/reinitialized-password')
  // public async reinitializedPassword(@Param('usersId') usersId, @Body('password') newPassword) {
  //   const user = await this.authService.reinitializePassword(usersId, newPassword);
  //   if (user)
  //     return JsonView.dataResponse(user, '', HttpStatus.OK);
  //   throw new HttpException("Echec de la reinitialisation du mot de passe", HttpStatus.NOT_MODIFIED);
  // }

  @Delete('users/:usersId')
  public async remove(@Param('usersId') usersId) {
    const user = await this.authService.removeUsers(usersId);
    if (user)
      return JsonView.dataResponse(user, '', HttpStatus.OK);
    throw new HttpException("Cet utilisateur n'a pas été trouvé", HttpStatus.NOT_FOUND);
  }


}
