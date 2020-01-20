import { Module } from '@nestjs/common';
import {Connection} from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AuthModule} from './module/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import {LoggerModule} from './helpers/utils/logger/logger.module';



@Module({
  imports: [
    MulterModule.register({
    dest: './UploadedFiles'
  }),
  TypeOrmModule.forRoot(),
    AuthModule, LoggerModule ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
