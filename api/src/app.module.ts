import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [ConfigModule.forRoot(), InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
