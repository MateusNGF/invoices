

class DashboardService {

    calculateTotalQuantityEnergyConsumed(invoicesInMonth = []) {
        let debug = invoicesInMonth.map(month =>
            month.reduce((acc, invoice) =>
                 acc + (invoice.energyElectrical?.quantity  + invoice.energyScee?.quantity)
                , 0))
    
        return debug
    }
    
    calculateTotalQuantityEnergyCompensated(invoicesInMonth = []) {
        let debug = invoicesInMonth.map(month =>
            month.reduce((acc, invoice) =>
                acc + invoice.energyCompensated?.quantity, 0)
            , 0)
    
        return debug
    }
    
    
    calculateTotalPriceEnergyConsumedWithoutGD(invoicesInMonth = []) {
        let debug = invoicesInMonth.map(month =>
            month.reduce((acc, invoice) =>
                acc + (invoice.energyElectrical?.price + invoice.energyScee?.price + invoice?.municipalContribution)
                , 0))
    
        return debug
    }
    
    
    calculateSavingPriceWithGB(invoicesInMonth = []) {
        let debug = invoicesInMonth.map(month =>
            month.reduce((acc, invoice) =>
                acc + (Math.abs(invoice.energyCompensated?.price))
                , 0))
    
        return debug
    }

}
export default new DashboardService()