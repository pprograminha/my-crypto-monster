import { UserToken } from "@prisma/client"

export interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>
  findByToken(token: string): Promise<UserToken | null>
  findByUserId(user_id: string): Promise<UserToken | null>
  destroy(user_token_id: string): Promise<void>
}