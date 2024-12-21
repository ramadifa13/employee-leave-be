import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLeaveDto) {
    const { employeeId, startDate, endDate } = dto;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = (end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;

    if (duration < 1) {
      throw new BadRequestException(
        'Tanggal mulai cuti harus lebih kecil dari tanggal selesai cuti.',
      );
    }

    const leavesThisYear = await this.prisma.leave.count({
      where: {
        employeeId,
        startDate: { gte: new Date(new Date().getFullYear(), 0, 1) },
        endDate: { lte: new Date(new Date().getFullYear(), 11, 31) },
      },
    });

    if (leavesThisYear + duration > 12) {
      throw new BadRequestException(
        'Jumlah cuti yang diambil melebihi batas 12 hari dalam setahun.',
      );
    }

    const leaveThisMonth = await this.prisma.leave.findMany({
      where: {
        employeeId,
        startDate: {
          gte: new Date(start.getFullYear(), start.getMonth(), 1),
          lte: new Date(start.getFullYear(), start.getMonth() + 1, 0),
        },
      },
    });

    if (leaveThisMonth.length > 0) {
      throw new BadRequestException('Hanya diperbolehkan satu cuti per bulan.');
    }

    return this.prisma.leave.create({ data: dto });
  }

  findAll() {
    return this.prisma.leave.findMany({ include: { employee: true } });
  }

  findOne(id: number) {
    return this.prisma.leave.findUnique({
      where: { id },
      include: { employee: true },
    });
  }

  async update(id: number, dto: UpdateLeaveDto) {
    const { employeeId, startDate, endDate } = dto;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = (end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;

    if (duration < 1) {
      throw new BadRequestException(
        'Tanggal mulai cuti harus lebih kecil dari tanggal selesai cuti.',
      );
    }

    const leavesThisYear = await this.prisma.leave.count({
      where: {
        employeeId,
        startDate: { gte: new Date(new Date().getFullYear(), 0, 1) },
        endDate: { lte: new Date(new Date().getFullYear(), 11, 31) },
      },
    });

    const currentLeave = await this.prisma.leave.findUnique({
      where: { id },
    });

    const remainingLeaveDays =
      leavesThisYear -
      (currentLeave
        ? (currentLeave.endDate.getTime() - currentLeave.startDate.getTime()) /
            (1000 * 3600 * 24) +
          1
        : 0);

    if (remainingLeaveDays + duration > 12) {
      throw new BadRequestException(
        'Jumlah cuti yang diambil melebihi batas 12 hari dalam setahun.',
      );
    }

    const leaveThisMonth = await this.prisma.leave.findMany({
      where: {
        employeeId,
        startDate: {
          gte: new Date(start.getFullYear(), start.getMonth(), 1),
          lte: new Date(start.getFullYear(), start.getMonth() + 1, 0),
        },
      },
    });

    if (leaveThisMonth.length > 0) {
      throw new BadRequestException('Hanya diperbolehkan satu cuti per bulan.');
    }

    return this.prisma.leave.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.leave.delete({ where: { id } });
  }
}
