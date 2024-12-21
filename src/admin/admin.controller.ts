import { Body, Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AdminDto } from './dto/admin.dto';

@UseGuards(JwtGuard)
@ApiTags('Admin')
@Controller('admin')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: 'Mengambil daftar semua admin' })
  @ApiResponse({ status: 200, description: 'Berhasil mengambil daftar admin.' })
  findAll() {
    return this.adminService.findAll();
  }

  @Get('me')
  @ApiOperation({ summary: 'Mengambil profil admin yang sedang login' })
  @ApiResponse({ status: 200, description: 'Berhasil mengambil profil admin.' })
  @ApiResponse({ status: 401, description: 'Admin belum login atau token tidak valid.' })
  getProfile(@Request() req) {
    return this.adminService.findOne(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mengambil data admin berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Berhasil mengambil data admin berdasarkan ID.' })
  @ApiResponse({ status: 404, description: 'Admin tidak ditemukan.' })
  findOne(@Param('id') id: number) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Memperbarui data admin' })
  @ApiResponse({ status: 200, description: 'Berhasil memperbarui data admin.' })
  @ApiResponse({ status: 400, description: 'Data yang diberikan tidak valid.' })
  @ApiResponse({ status: 404, description: 'Admin tidak ditemukan.' })
  update(@Param('id') id: number, @Request() req, @Body() updateAdminDto: AdminDto) {
    return this.adminService.update(id, updateAdminDto, req.user.sub);
  }
}
