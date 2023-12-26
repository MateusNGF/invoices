import { abreviateDate } from "../utils/Date";



export function agroupInvoicesByDate(invoices = []) {
    const dataGrouped= {}

        invoices.forEach((item, index) => {
            const dateFormated = abreviateDate(item.competency)
            if (dataGrouped[dateFormated]) {
                dataGrouped[dateFormated].push(item)
            } else {
                dataGrouped[dateFormated] = [item]
            }
        })

        return dataGrouped
}