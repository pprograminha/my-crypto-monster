import { Router } from 'express';

import { usersRouter } from '../../modules/users/routes/users.routes';

import { charactersRouter } from '../../modules/characters/routes/characters.routes';
import { userCharacterRouter } from '../../modules/characters/routes/user_characters.routes';

import { weaponsRouter } from '../../modules/weapons/routes/weapons.routes';
import { userWeaponRouter } from '../../modules/weapons/routes/user_weapons.routes';
import { chestsRouter } from '../../modules/chests/routes/chests.routes';
import { logsRouter } from '../../modules/logs/routes/logs.routes';
import { salesRouter } from '../../modules/sales/routes/sales.routes';
import { premiumPassesRouter } from '../../modules/premium_passes/routes/premium_passes.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/characters', charactersRouter);
router.use('/weapons', weaponsRouter);
router.use('/user-weapons', userWeaponRouter);
router.use('/user-characters', userCharacterRouter);
router.use('/chests', chestsRouter);
router.use('/logs', logsRouter);
router.use('/sales', salesRouter);
router.use('/premium-passes', premiumPassesRouter);

export { router };
