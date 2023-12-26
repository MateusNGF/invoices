import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

import DateFormarter from 'src/core/DateFormart';
import { ParsePDFContent } from 'src/core/ParserPDF';
import { Invoice } from './entities/invoice.entity';
import { InvoiceRepository } from './invoice.repository';

@Injectable()
export class InvoiceService {
  constructor(private readonly repository: InvoiceRepository) {}
  create(createInvoiceDto?: Partial<Invoice>) {
    return this.repository.create(createInvoiceDto);
  }

  listInvoices(params: any) {
    return this.repository.listInvoices(params);
  }

  async deleteInvoice(id: number) {
    try {
      await this.repository.deleteInvoice(id);
      return true;
    } catch (e) {
      return false;
    }
  }

  async processInformationPDFtoJSON(fileInformation: Express.Multer.File) {
    const lines = await ParsePDFContent(readFileSync(fileInformation.path));
    const invoice = this.extractInformationFromContent(lines);

    invoice.fileName = fileInformation.filename;

    return this.create(invoice);
  }

  private extractInformationFromContent(content: Array<string>) {
    const regexCustom = (text: string) => new RegExp(`\\b${text}\\b`, 'gi');
    const convertToFloat = (value: string) =>
      parseFloat(value.replace(',', '.'));

    const invoice: Partial<Invoice> = {
      numberInvoice: null,
      serieInvoice: null,
      numberClient: null,
      competency: null,
      energyElectrical: {
        quantity: 0,
        price: 0,
        unit: 'kWh',
      },
      energySCEE: {
        quantity: 0,
        price: 0,
        unit: 'kWh',
      },
      energyCompensated: {
        quantity: 0,
        price: 0,
        unit: 'kWh',
      },
      fileName: null,
      municipalContribution: null,
      totalPrice: null,
    };

    let isPDFValid = false;
    content.forEach(async (line, index) => {
      if (line.match(regexCustom('TOTAL'))) {
        const lineContentSplited = content[index].split(' ').filter(Boolean);

        invoice.totalPrice = convertToFloat(lineContentSplited[1]);

        isPDFValid = true;
      }

      if (line.match(regexCustom('Nº DO CLIENTE'))) {
        const lineContentSplited = content[index + 1]
          .split(' ')
          .filter(Boolean);

        invoice.numberClient = lineContentSplited[0];

        isPDFValid = true;
      }

      if (line.match(regexCustom('Energia ElétricakWh'))) {
        const lineContentSplited = content[index].split(' ').filter(Boolean);

        invoice.energyElectrical.quantity = convertToFloat(
          lineContentSplited[2],
        );
        invoice.energyElectrical.price = convertToFloat(lineContentSplited[4]);

        isPDFValid = true;
      }

      if (line.match(regexCustom('Energia SCEE s/ ICMSkWh'))) {
        const lineContentSplited = content[index].split(' ').filter(Boolean);

        invoice.energySCEE.quantity = convertToFloat(lineContentSplited[4]);
        invoice.energySCEE.price = convertToFloat(lineContentSplited[6]);

        isPDFValid = true;
      }

      if (line.match(regexCustom('Energia compensada GD IkWh'))) {
        const lineContentSplited = content[index].split(' ').filter(Boolean);
        (invoice.energyCompensated.quantity = convertToFloat(
          lineContentSplited[4],
        )),
          (invoice.energyCompensated.price = convertToFloat(
            lineContentSplited[6],
          ));
        isPDFValid = true;
      }

      if (line.match(regexCustom('Referente a'))) {
        const lineContentSplited = content[index + 1]
          .split(' ')
          .filter(Boolean);
        invoice.competency = DateFormarter.ParseFormatedDateMonthYearToDate(
          lineContentSplited[0],
        );
        isPDFValid = true;
      }

      if (line.match(regexCustom('Contrib Ilum Publica Municipal'))) {
        const lineContentSplited = content[index].split(' ').filter(Boolean);
        invoice.municipalContribution = convertToFloat(lineContentSplited[4]);
        isPDFValid = true;
      }

      if (line.match(regexCustom('NOTA FISCAL N'))) {
        const lineContentSplited = content[index].split(' ').filter(Boolean);
        invoice.numberInvoice = lineContentSplited[3];
        invoice.serieInvoice = lineContentSplited[6];
        isPDFValid = true;
      }
    });

    if (!isPDFValid) {
      throw new Error('Invalid PDF');
    }

    return invoice;
  }
}
