import { RoleTypeEnum } from '../../../Domain'

export type DecodedAuthToken = {
  user: {
    id: string
    name: string
    role: RoleTypeEnum
  }
}
