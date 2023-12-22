import { Controller, Post, Body, UseInterceptors, UploadedFile, Req} from '@nestjs/common';
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
      return  await this.invoiceService.processInformationPDFtoJSON(file.path)
    }catch(e){
      console.error(e)
    }
  }
}
