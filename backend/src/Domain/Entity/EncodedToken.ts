import * as jwt from 'jsonwebtoken'
import { RoleTypeEnum } from '../../../resources/framework/src'

export class EncodedToken {
  constructor(private token?: string) {}

  public getToken(): string | undefined {
    return this.token
  }

  public static async encode(encodeData: IEncodeData): Promise<EncodedToken> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        encodeData,
        process.env.JWT_SECRET,
        { algorithm: 'HS512', expiresIn: '2 days' },
        (err, token) => {
          if (!!err) reject(err)

          resolve(new EncodedToken(token))
        }
      )
    })
  }

  public static async decode(token: string): Promise<IEncodeData | null> {
    const decodedToken = jwt.decode(token, { json: true })

    if (!decodedToken) return null

    return decodedToken as IEncodeData
  }
}

interface IEncodeData {
  user: {
    id: string
    username: string
    role: RoleTypeEnum
  }
}
