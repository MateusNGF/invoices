

class DashboardService {

    extractContentToGraphicByInvoicesAgrouped(invoicesAgrupedByDate = {}){
        const information = []
        for (const date in Object.keys(invoicesAgrupedByDate)) {
            const listinvoices = invoicesAgrupedByDate[date]


            const totalEnergyElectricalConsumption = listinvoices.reduce((total, invoice) => {
                return total + invoice.energyConsumption
            })
            

        }
    }

}