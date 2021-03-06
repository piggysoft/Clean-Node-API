import { Validation } from '../../protocols/validation'
import { MissingParamError } from './../../errors/missing-param-error'
import { RequiredFieldValidation } from './required-field-validation'

describe('Required Field Validation', () => {

  test('Should return a MissingParamError if validation fails', () => {
    const sut: Validation = new RequiredFieldValidation('anyField')
    const error: Error|undefined = sut.validate({ name: 'anyName' })
    expect(error).toEqual(new MissingParamError('anyField'))
  })

  test('Should not return if validation succeeds', () => {
    const sut: Validation = new RequiredFieldValidation('name')
    const error: Error|undefined = sut.validate({ name: 'anyName' })
    expect(error).toBeFalsy()
  })

})