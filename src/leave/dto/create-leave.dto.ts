import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateLeaveDto {
  @ApiProperty({ description: 'ID karyawan yang mengajukan cuti', example: 1 })
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ description: 'Tanggal mulai cuti', example: '2024-12-20' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: 'Tanggal selesai cuti', example: '2024-12-25' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ description: 'Alasan pengajuan cuti', example: 'Liburan keluarga' })
  @IsNotEmpty()
  reason: string;
}
