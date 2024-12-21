import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { LeaveModule } from './leave/leave.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AdminModule,
    EmployeeModule,
    LeaveModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
