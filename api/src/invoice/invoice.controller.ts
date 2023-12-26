import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Query, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import { readFileSync } from 'fs';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  async list(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('text') text: string,
    @Query('where') where: any,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ) {
    return await this.invoiceService.listInvoices({
      skip: skip ? parseInt(skip) : 0,
      take: take ? parseInt(take) : 10,
      text:
        (text && text !== 'null') ? text : null,
      startDate:
        (startDate && startDate !== 'null') ? new Date(startDate).toISOString() : null,
      endDate:
        (endDate && endDate !== 'null') ? new Date(endDate).toISOString() : null,
      where: JSON.parse(where) ?? {}
    })
  }

  @Delete()
  async deleteInvoice(@Query('id') id: any) {
    return await this.invoiceService.deleteInvoice(parseInt(id))
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './tmp/invoices/pdf',
      filename(req, file, callback) {
        const filename = `${Date.now()}.pdf`;
        callback(null, filename);
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return await this.invoiceService.processInformationPDFtoJSON(file)
    } catch (e) {
      console.error(e)
    }
  }

  @Get('/download')
  async downloadFile(@Query('filename') filename: string) {
    return readFileSync(` ${filename}`)
  }
}
