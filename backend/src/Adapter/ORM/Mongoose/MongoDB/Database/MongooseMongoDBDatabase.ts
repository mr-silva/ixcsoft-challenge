import mongoose from 'mongoose'

export class MongooseMongoDBDatabase {
  private connectionUri: string

  constructor() {
    const host: string = process.env.MONGODB_HOST
    const username: string = process.env.MONGODB_USERNAME
    const password: string = process.env.MONGODB_PASSWORD
    const database: string = process.env.MONGODB_DATABASE

    this.connectionUri = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`
  }

  public createConnection() {
    mongoose.set('strictQuery', true)

    mongoose.connect(this.connectionUri)

    mongoose.set('debug', process.env.MONGODB_DEBUG === '1')
  }

  public static getConnection() {
    return mongoose.connection
  }

  public async validate() {
    this.createConnection()

    await MongooseMongoDBDatabase.getConnection().asPromise()

    console.log('Mongoose Mongo database is working.')
  }
}
