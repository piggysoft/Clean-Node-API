import env from '../../../../main/config/env'
import { MongoHelper as sut } from './mongo'

describe('Mongo Helper', () => {

  beforeAll(async () => {
    await sut.connect(env.mongoTest)
  })

  afterAll(async () => {
    await sut.disconnect
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })

})