import { Invoice } from "../entities/invoice.entity";

export class CreateInvoiceDto implements Partial<Invoice> {
    numberInvoice: string;
    numberClient: string;
    competency: Date;
    energyElectrical: Invoice.ContentInfo;
    energySCEE: Invoice.ContentInfo;
    energyCompensated: Invoice.ContentInfo;
    municipalContribution: number;
    totalPrice: number;
}
