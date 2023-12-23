import { Controller, Post, Body, UseInterceptors, UploadedFile, Get} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  async list(@Body() query : any) {
    return await this.invoiceService.listInvoices({
      skip: query?.skip ?? 0,
      take: query?.take ?? 10,
      text: query.text,
      where: query.where,
      orderBy: query.orderBy
    })
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
    try{
      return  await this.invoiceService.processInformationPDFtoJSON(file)
    }catch(e){
      console.error(e)
    }
  }
}
