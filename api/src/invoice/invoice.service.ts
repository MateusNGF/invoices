import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

import { readFileSync } from 'fs';
import { ParsePDFContent } from 'src/core/ParserPDF';
import { Invoice } from './entities/invoice.entity';
import DateFormarter from 'src/core/DateFormart';

@Injectable()
export class InvoiceService {

  constructor(private readonly repository: PrismaService) {}
  async create(createInvoiceDto?: Partial<Invoice>) {
    return await this.repository.invoice.create({
      data : {
        competency: new Date(createInvoiceDto?.competency),
        number_invoice: createInvoiceDto?.numberInvoice,
        serie_invoice: createInvoiceDto?.serieInvoice,
        number_client: createInvoiceDto?.numberClient,
        energy_electrical: JSON.stringify(createInvoiceDto?.energyElectrical),
        energy_scee: JSON.stringify(createInvoiceDto?.energySCEE),
        energy_compensated: JSON.stringify(createInvoiceDto?.energyCompensated),
        municipal_contribution: createInvoiceDto?.municipalContribution,
        total_price: createInvoiceDto?.totalPrice
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

  async processInformationPDFtoJSON(path : string) {
    const lines = await ParsePDFContent(readFileSync(path))
    const invoice = this.extractInformationFromContent(lines)

    return await this.create(invoice)
  }


  private extractInformationFromContent(content : Array<string>){
    const regexCustom = (text : string) => new RegExp(`\\b${text}\\b`, 'gi')
    const convertToFloat = (value : string) => parseFloat(value.replace(',', '.'))

    const invoice : Partial<Invoice> = {
        numberInvoice: null,
        serieInvoice: null,
        numberClient: null,
        competency: null,
        energyElectrical: {
            quantityKwh: 0,
            price: 0
        },
        energySCEE: {
            quantityKwh: 0,
            price: 0
        },
        energyCompensated: {
            quantityKwh: 0,
            price: 0
        },
        municipalContribution: null,
        totalPrice: null,
    }

    let isPDFValid = false;
    content.forEach((line, index) => {
        if (line.match(regexCustom('TOTAL'))){
            const lineContentSplited = content[index].split(' ').filter(Boolean)
            invoice.totalPrice = convertToFloat(lineContentSplited[1])
            isPDFValid = true
        }

        if (line.match(regexCustom('Nº DO CLIENTE'))){
            const lineContentSplited = content[index+1].split(' ').filter(Boolean)
            invoice.numberClient = lineContentSplited[0]
            isPDFValid = true
        }
       

        if (line.match(regexCustom('Energia ElétricakWh'))){
            const lineContentSplited = content[index].split(' ').filter(Boolean)
            invoice.energyElectrical = {
                quantityKwh: convertToFloat(lineContentSplited[2]),
                price: convertToFloat(lineContentSplited[4])
            }
            isPDFValid = true
        }

        if (line.match(regexCustom('Energia SCEE s/ ICMSkWh'))){
            const lineContentSplited = content[index].split(' ').filter(Boolean)
            invoice.energySCEE = {
                quantityKwh: convertToFloat(lineContentSplited[4]),
                price: convertToFloat(lineContentSplited[6])
            }
            isPDFValid = true
        }

        if (line.match(regexCustom('Energia compensada GD IkWh'))){
            const lineContentSplited = content[index].split(' ').filter(Boolean)
            invoice.energyCompensated = {
                quantityKwh: convertToFloat(lineContentSplited[4]),
                price: convertToFloat(lineContentSplited[6])
            }
            isPDFValid = true
        }

        if (line.match(regexCustom('Referente a'))){
            const lineContentSplited = content[index+1].split(' ').filter(Boolean)
            invoice.competency = DateFormarter.ParseFormatedDateMonthYearToDate(lineContentSplited[0])
            isPDFValid = true
        }

        if (line.match(regexCustom('Contrib Ilum Publica Municipal'))){
            const lineContentSplited = content[index].split(' ').filter(Boolean)
            invoice.municipalContribution = convertToFloat(lineContentSplited[4])
            isPDFValid = true
        }

        if (line.match(regexCustom('NOTA FISCAL N'))){
            const lineContentSplited = content[index].split(' ').filter(Boolean)
            invoice.numberInvoice = lineContentSplited[3]
            invoice.serieInvoice = lineContentSplited[6]
            isPDFValid = true
        }
    })

    if (!isPDFValid){ throw new Error('Invalid PDF') }

    return invoice
  }

}
