export class JsonView {

  /**
   * data for getting data resource of api response
   */
  public data: [];

  /**
   * code for getting code of api response
   */
  public statusCode: number;

  /**
   * message for getting message of api response
   */
  public message: string;

  public constructor(data, message: string = '', statusCode: number = 200) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode
  }




  public static dataResponse(data, message: string = '', statusCode: number = 200) {
    return {
      data: data,
      message: message,
      statusCode: statusCode
    };

  }

}
