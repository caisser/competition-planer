import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../../../users/emun/userRole.enum';
import { Roles } from '../metadata/roles.decorator';
import JwtAuthenticationGuard from '../../../common/guards/jwtAuthentication.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(JwtAuthenticationGuard, RolesGuard),
  );
}
