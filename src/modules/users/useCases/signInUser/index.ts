import { SignInController } from './SignInUserController';
import { SignInUseCase } from './SignInUserUseCase';
import { JWTokenProvider } from '../../../../shared/providers/implementations/JWTokenProvider';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { BCryptHashProvider } from '../../../../shared/providers/implementations/BCryptHashProvider';
import { LogsRepository } from '../../../logs/repositories/implementations/LogsRepositories';

const jwtTokenProvider = new JWTokenProvider();
const bcryptHashProvider = new BCryptHashProvider();
const usersRepository = new UsersRepository();
const logsRepository = new LogsRepository();

const signInUseCase = new SignInUseCase(
  usersRepository, 
  logsRepository,
  jwtTokenProvider, 
  bcryptHashProvider
);

const signInController = new SignInController(signInUseCase);

export {
  signInController,
  signInUseCase,
}