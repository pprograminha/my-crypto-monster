import { User } from "@prisma/client";

export interface ITokenProvider {
  generate(user: User): string;
  verify(token: string): void;
}
