import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';


@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  private async isEmailUnique(email: string): Promise<boolean> {
    const existingEmployee = await this.prisma.employee.findUnique({
      where: { email },
    });
    return !existingEmployee;
  }

  async create(dto: CreateEmployeeDto) {
    const isEmailTaken = await this.isEmailUnique(dto.email);
    if (!isEmailTaken) {
      throw new BadRequestException('Email sudah terdaftar.');
    }

    return this.prisma.employee.create({ data: dto });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const totalRecords = await this.prisma.employee.count();

    const employees = await this.prisma.employee.findMany({
      skip,
      take: limit,
    });

    return {
      data: employees,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        totalRecords,
      },
    };
  }

  async findOne(id: number) {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) {
      throw new NotFoundException('Pegawai tidak ditemukan.');
    }
    return employee;
  }

  async findOneWithLeaves(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: { leaves: true },
    });
    if (!employee) {
      throw new NotFoundException('Pegawai tidak ditemukan.');
    }
    return employee;
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    const existingEmployee = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      throw new NotFoundException('Pegawai tidak ditemukan.');
    }

    if (dto.email && dto.email !== existingEmployee.email) {
      const isEmailTaken = await this.isEmailUnique(dto.email);
      if (!isEmailTaken) {
        throw new BadRequestException('Email sudah terdaftar.');
      }
    }

    return this.prisma.employee.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    const employee = await this.prisma.employee.findUnique({ where: { id } });

    if (!employee) {
      throw new NotFoundException('Pegawai tidak ditemukan.');
    }

    return this.prisma.employee.delete({ where: { id } });
  }
}
