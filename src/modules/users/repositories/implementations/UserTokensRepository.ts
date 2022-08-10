import { UserToken } from "@prisma/client"
import { prisma } from "../../../../shared/prisma/client"
import { v4 as uuid } from "uuid"
import { IUserTokensRepository } from "../IUserTokensRepository"

export class UserTokensRepository implements IUserTokensRepository {
    async findByUserId(user_id: string): Promise<UserToken | null> {
        return prisma.userToken.findFirst({
            where: {
                user_id
            }
        })
    }

    async destroy(user_token_id: string): Promise<void> {
        await prisma.userToken.delete({
            where: {
                id: user_token_id
            }
        })
    }

    async generate(user_id: string): Promise<UserToken> {
        return prisma.userToken.create({
            data: {
                id: uuid(),
                token: uuid(),
                user_id
            }
        })
    }
  async findByToken(token: string): Promise<UserToken | null> {
    return prisma.userToken.findUnique({
        where: {
            token
        }
    })
  }
}