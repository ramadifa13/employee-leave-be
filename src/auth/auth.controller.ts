import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; 
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@ApiTags('Autentikasi')  
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login pengguna' })  
  @ApiResponse({ status: 200, description: 'Berhasil login dan mendapatkan token' }) 
  @ApiResponse({ status: 401, description: 'Email atau password salah' }) 
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrasi pengguna baru' })
  @ApiResponse({ status: 201, description: 'Pengguna berhasil terdaftar' })
  @ApiResponse({ status: 400, description: 'Email sudah terdaftar' })
  async register(@Body() registerDto: RegisterDto) {
    const { email, password, firstName, lastName, birthDate, gender } = registerDto;
    return this.authService.register(
      email,
      password,
      firstName,
      lastName,
      birthDate,
      gender,
    );
  }
}
