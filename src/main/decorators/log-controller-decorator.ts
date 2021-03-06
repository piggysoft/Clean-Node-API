import { LogErrorRepository } from '../../data/protocols/repository/log/log-error-repository'
import { HttpRequest, HttpResponse } from '../../presentation/protocols'
import { Controller } from './../../presentation/protocols/controller'

export class LogControllerDecorator implements Controller {

  constructor(private readonly controller: Controller, private readonly logErrorRepository: LogErrorRepository){}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse: HttpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) await this.logErrorRepository.logError(httpResponse.body.stack)
    return httpResponse
  }

}