/*
 * Copyright (c) 2019. Philemon GLOBLEHI, Back-end developer
 * Phone: (+225) 79-08-10-50
 * Email: philemongloblehi@gmail.com
 * CreatedAt 24/09/2019 10:36
 */


import {Injectable} from '@nestjs/common';
import moment = require('moment');

@Injectable()
export class Manager {

  public constructor() {}

  public static generatedCode(): String {
    let type = 'C';
    let code;
    let length = 5;
    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code = type + "-" + result;
  }

  public static geneCode(index: number) {
    let code = null;
    let count = 0;
    const indexFormatted = index.toString();
    count = indexFormatted.length;
    switch (count) {
      case 1:
        code = '000' + index;
        break;
      case 2:
        code = '00' + index;
        break;
      case 3:
        code = '0' + index;
        break;
      default:
        code = '0' + index;
        break;
    }
    return code;
  }

  public static formattedDate(date: Date) {
    return moment(date).format('YYYY-MM-DD');
  }

  public static generatedPasswordUser(): string {
    let code;
    let length = 8;
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code = result;
  }

}
