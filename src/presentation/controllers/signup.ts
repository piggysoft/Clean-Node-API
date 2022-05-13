import { Controller, EmailValidator, HttpRequest, HttpResponse } from './../protocols';
import { badRequest, serverError } from './../helpers/http-helper';
import { MissingParamError, InvalidParamError } from "../errors";

export default class SignUpController implements Controller {

  constructor(private readonly emailValidator: EmailValidator){}

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields: string[] = ["name", "email", "password", "passwordConfirmation"];
    for (const field of requiredFields) {
      if(!httpRequest.body[field]) return badRequest(new MissingParamError(field));
    }

    try {
      const emailIsValid: boolean = this.emailValidator.isValid(httpRequest.body.email);
      if(!emailIsValid) return badRequest(new InvalidParamError("email"));
      return { statusCode: 200, body: {} };
    } catch(error: any) {
      return serverError();
    }
  }

}