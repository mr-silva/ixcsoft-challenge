import { createHash } from 'crypto'

export class EncodePassword {
  public static execute(password: string): string {
    const sha256 = (str: string) => createHash('sha256').update(str).digest('hex')
    const encodedPassword = sha256(
      sha256(`${process.env.PASS_SECRET}${password}${process.env.PASS_SECRET}`)
    )

    return encodedPassword
  }
}
