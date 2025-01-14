
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRolEnums = this.reflector.getAllAndOverride<Role[]>(
            'roles',
            [context.getHandler(), context.getClass()],
        );
        console.log(requiredRolEnums);
        
        if (!requiredRolEnums) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        console.log(user);
        
        return requiredRolEnums.some((role) => user?.role?.includes(role))
    }
}