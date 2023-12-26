import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class InvoiceRepository {

  constructor(private readonly database: PrismaService) { }

  create(contentEntity: any) {
    return this.database.invoice.create({
      data: {
        competency: new Date(contentEntity?.competency),
        numberInvoice: contentEntity?.numberInvoice,
        serieInvoice: contentEntity?.serieInvoice,
        numberClient: contentEntity?.numberClient,
        energyElectrical: JSON.stringify(contentEntity?.energyElectrical),
        energyScee: JSON.stringify(contentEntity?.energySCEE),
        energyCompensated: JSON.stringify(contentEntity?.energyCompensated),
        municipalContribution: contentEntity?.municipalContribution,
        fileName: contentEntity?.fileName,
        totalPrice: contentEntity?.totalPrice
      }
    })
  }


  async listInvoices(params: {
    skip?: number;
    take?: number;
    text?: string,
    startDate?: string,
    where ?: any,
    endDate?: string,
    orderBy?: any;
  }) {
    let { skip, take, text, where, orderBy, startDate, endDate } = params;

    let _where: any = {
      ...where
    }

    if (text) {
      _where = {
        ..._where,
        OR :[
          {
            numberClient: { contains: text, mode: 'insensitive' }
          },
          {
            numberInvoice: { contains: text, mode: 'insensitive' }
          }
        ]
      }
    }

    if (startDate && endDate) {
      _where = {
        ..._where,
        competency: {
          gte: startDate,
          lte: endDate,
        }
      }
    }

    const data = await this.database.invoice.findMany({
      skip,
      take,
      where: _where,
      orderBy,
    });

    return data.map(item => ({
      ...item,
      energyElectrical: JSON.parse(item.energyElectrical),
      energyScee: JSON.parse(item.energyScee),
      energyCompensated: JSON.parse(item.energyCompensated),
    }))
  }

  deleteInvoice(id: number) {
    return this.database.invoice.delete({
      where: {id}
    })
  }
}