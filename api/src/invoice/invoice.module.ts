import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from 'src/database/prisma.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 1024 * 1024 * 20, // 20MB (ajuste conforme necessário)
      },
    }),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, PrismaService, InvoiceRepository],
})
export class InvoiceModule {}
