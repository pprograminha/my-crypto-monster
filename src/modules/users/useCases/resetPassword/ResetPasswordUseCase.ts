import { addHours, isAfter } from 'date-fns'
import { AppError } from '../../../../shared/errors/AppError'
import { IHashProvider } from '../../../../shared/providers/IHashProvider'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository'

interface IRequest {
  token: string
  password: string
}

class ResetPasswordUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private userTokensRepository: IUserTokensRepository,
    private hashProvider: IHashProvider
  ) { }

  async execute({ token, password }: IRequest): Promise<void> {
    const userTokens = await this.userTokensRepository.findByToken(token)

    if (!userTokens) throw new AppError('Token does not exists', 401)

    const user = await this.usersRepository.findById(userTokens.user_id)

    if (!user) throw new AppError('User does not exists', 409)

    const amount = 2
    const limitDate = addHours(userTokens.created_at, amount)

    if (isAfter(Date.now(), limitDate)) {
      await this.userTokensRepository.destroy(userTokens.id)

      throw new AppError('Token expired', 401)
    }
    
    user.password = await this.hashProvider.generateHash(password)

    const userUpdated = {
      ...user,
      premium_pass: undefined
    }
    
    await this.usersRepository.save(userUpdated)

    await this.userTokensRepository.destroy(userTokens.id)

  }

}

export { ResetPasswordUseCase }