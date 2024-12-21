import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.admin.findMany();
  }

  async findOne(id: number) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) {
      throw new UnauthorizedException('Admin tidak ditemukan');
    }
    return admin;
  }

  async update(id: number, dto: AdminDto, loggedInAdminId: number) {
    if (id !== loggedInAdminId) {
      throw new UnauthorizedException('Anda tidak memiliki akses untuk mengupdate data admin lain');
    }

    const adminExists = await this.prisma.admin.findUnique({ where: { id } });
    if (!adminExists) {
      throw new UnauthorizedException('Admin tidak ditemukan');
    }

    return this.prisma.admin.update({
      where: { id },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: dto.password,
        birthDate: dto.birthDate,
        gender: dto.gender,
      },
    });
  }
}
