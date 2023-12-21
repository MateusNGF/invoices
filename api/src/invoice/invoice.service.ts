import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class InvoiceService {

  constructor(private readonly repository: PrismaService) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    return await this.repository.invoice.create({
      data : {
        competency: new Date(createInvoiceDto.competency),
        number_invoice: createInvoiceDto.numberInvoice,
        number_client: createInvoiceDto.numberClient,
        energy_electrical: JSON.stringify(createInvoiceDto.energyElectrical),
        energy_scee: JSON.stringify(createInvoiceDto.energySCEE),
        energy_compensated: JSON.stringify(createInvoiceDto.energyCompensated),
        municipal_contribution: createInvoiceDto.municipalContribution,
        total_price: createInvoiceDto.totalPrice
      }
    })
  }

  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InvoiceWhereUniqueInput;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.repository.invoice.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

}
