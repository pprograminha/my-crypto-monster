import { v4 as uuid } from 'uuid';
import { prisma } from '../client';
import { BCryptHashProvider } from '../../providers/implementations/BCryptHashProvider';

const main = async () => {
    const userId = uuid();
    const bcryptHashProvider = new BCryptHashProvider()
    
    await prisma.user.create({
        data: {
            id: userId,
            username: process.env.ADMIN_USERNAME || '*****',
            email: process.env.ADMIN_ACCESS || '******@*****.****',
            role: 'admin',
            password: await bcryptHashProvider.generateHash(process.env.ADMIN_PASS || '*****'),
        },
    });
};

main()
  .catch(error => console.error(error))
  .finally(() => console.log('Seeders up!'));
