import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../../users/emun/userRole.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
