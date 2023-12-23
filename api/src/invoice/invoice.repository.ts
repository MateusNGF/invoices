import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class InvoiceRepository  {
    
    constructor(private readonly database: PrismaService) {}

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
        where?: any;
        orderBy?: any;
      }){
        let { skip, take, text, where, orderBy } = params;

        if (text) {
            where = {
                ...where,
                OR: [
                    {
                        numberClient: {
                            contains: text,
                            mode: 'insensitive',
                        }
                    }
                ]
            }
        }



        if (where?.startData) {
            where = {
                ...where,
                createdAt: {
                    gte: where.startData,
                    lte: where?.endData,
                }
            }
        }

        return this.database.invoice.findMany({
            skip,
            take,
            where,
            orderBy,
        });
    }
}