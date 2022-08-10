import { User as PrismaUser } from "@prisma/client";

type User = PrismaUser & {
  password: undefined;
  wallet: undefined;
};

type Instance<T extends PrismaUser> = T extends PrismaUser ? User : never;

type InstanceType = 'user';

export function instanceToInstance<T extends PrismaUser>(
  instance_type: InstanceType,
  instance: T,
): Instance<T> {
  const instanceFormatted = {
    user: {
      ...(instance as PrismaUser),
      password: undefined,
      wallet: undefined,
    } as Instance<T>,
  }[instance_type];

  return instanceFormatted as Instance<T>;
}
