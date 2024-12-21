import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@ApiTags('Karyawan')
@UseGuards(JwtGuard)
@Controller('employee')
@ApiBearerAuth()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Tambah karyawan baru' })
  @ApiResponse({ status: 201, description: 'Karyawan berhasil ditambahkan' })
  @ApiResponse({ status: 400, description: 'Data karyawan tidak valid' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Dapatkan semua karyawan' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Halaman yang diminta' })
  @ApiQuery({ name: 'limit', required: false, example: 10, description: 'Jumlah data per halaman' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.employeeService.findAll(+page, +limit);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Dapatkan karyawan berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Karyawan berhasil ditemukan' })
  @ApiResponse({ status: 404, description: 'Karyawan tidak ditemukan' })
  async findOne(@Param('id') id: number) {
    return this.employeeService.findOne(+id);
  }

  @Get(':id/with-leaves')
  @ApiOperation({ summary: 'Dapatkan karyawan dengan data cuti' })
  @ApiResponse({ status: 200, description: 'Karyawan dengan data cuti berhasil ditemukan' })
  @ApiResponse({ status: 404, description: 'Karyawan tidak ditemukan' })
  async findOneWithLeaves(@Param('id') id: number) {
    return this.employeeService.findOneWithLeaves(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Perbarui data karyawan' })
  @ApiResponse({ status: 200, description: 'Data karyawan berhasil diperbarui' })
  @ApiResponse({ status: 404, description: 'Karyawan tidak ditemukan' })
  async update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus karyawan berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Karyawan berhasil dihapus' })
  @ApiResponse({ status: 404, description: 'Karyawan tidak ditemukan' })
  async remove(@Param('id') id: number) {
    return this.employeeService.remove(+id);
  }
}
