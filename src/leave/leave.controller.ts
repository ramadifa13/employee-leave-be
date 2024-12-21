import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@ApiTags('Cuti')
@UseGuards(JwtGuard)
@Controller('leave')
@ApiBearerAuth()
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  @ApiOperation({ summary: 'Ajukan cuti' })
  @ApiResponse({ status: 201, description: 'Cuti berhasil diajukan' })
  @ApiResponse({ status: 400, description: 'Data cuti tidak valid' })
  async create(@Body() createLeaveDto: CreateLeaveDto) {
    return this.leaveService.create(createLeaveDto);
  }

  @Get()
  @ApiOperation({ summary: 'Dapatkan semua pengajuan cuti' })
  @ApiResponse({ status: 200, description: 'Daftar pengajuan cuti berhasil diambil' })
  async findAll() {
    return this.leaveService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Dapatkan pengajuan cuti berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Cuti berhasil ditemukan' })
  @ApiResponse({ status: 404, description: 'Cuti tidak ditemukan' })
  async findOne(@Param('id') id: number) {
    return this.leaveService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Perbarui pengajuan cuti' })
  @ApiResponse({ status: 200, description: 'Cuti berhasil diperbarui' })
  @ApiResponse({ status: 404, description: 'Cuti tidak ditemukan' })
  async update(@Param('id') id: number, @Body() updateLeaveDto: UpdateLeaveDto) {
    return this.leaveService.update(+id, updateLeaveDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus pengajuan cuti berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Cuti berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Cuti tidak ditemukan' })
  async remove(@Param('id') id: number) {
    return this.leaveService.remove(+id);
  }
}
