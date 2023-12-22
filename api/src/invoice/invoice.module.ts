import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { PrismaService } from 'src/database/prisma.service';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports :[
    MulterModule.register({
      limits: {
        fileSize: 1024 * 1024 * 20, // 20MB (ajuste conforme necessário)
      }
    })
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, PrismaService],
})
export class InvoiceModule {}
