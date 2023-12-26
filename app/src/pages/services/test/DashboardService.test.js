import DashboardService from '../DashboardService';
import dataMocked from '../test/mock/invoices.mock.json'

describe('DashboardService Testing', () => {
  describe('Testing One Month', () => {
    const invoicesInMonth = dataMocked.slice(0, 1);
    it('Calculates total quantity of consumed energy', () => {
      const result = DashboardService.calculateTotalQuantityEnergyConsumed(invoicesInMonth);
      const someAtOne = invoicesInMonth[0][0]?.energyElectrical?.quantity + invoicesInMonth[0][0]?.energyScee?.quantity;
      const someAtTwo = invoicesInMonth[0][1]?.energyElectrical?.quantity + invoicesInMonth[0][1]?.energyScee?.quantity;
      expect(result).toEqual([someAtOne + someAtTwo]);
    });

    it('Calculates total quantity of compensated energy ', () => {
      const result = DashboardService.calculateTotalQuantityEnergyCompensated(invoicesInMonth);
      const someEnergyCompensated = invoicesInMonth[0][0]?.energyCompensated?.quantity + invoicesInMonth[0][1]?.energyCompensated?.quantity;
      expect(result).toEqual([someEnergyCompensated]);
    });

    it('Calculates total price of consumed energy without municipal contribution', () => {
      const result = DashboardService.calculateTotalPriceEnergyConsumedWithoutGD(invoicesInMonth);
      const somePriceOne = invoicesInMonth[0][0]?.energyElectrical?.price + invoicesInMonth[0][0]?.energyScee?.price + invoicesInMonth[0][0]?.municipalContribution;
      const somePriceTwo = invoicesInMonth[0][1]?.energyElectrical?.price + invoicesInMonth[0][1]?.energyScee?.price + invoicesInMonth[0][1]?.municipalContribution;
      expect(result).toEqual([somePriceOne + somePriceTwo]);
    });

    it('calculates saving price with GB', () => {
      const result = DashboardService.calculateSavingPriceWithGB(invoicesInMonth);
      const compensatedOne = invoicesInMonth[0][0]?.energyCompensated?.price;
      const compensatedTwo = invoicesInMonth[0][1]?.energyCompensated?.price;
      expect(result).toEqual([Math.abs(compensatedOne + compensatedTwo)]);
    });
  });

  describe('Testing Two Months', () => {
    const invoicesInMonth = dataMocked
    it('Calculates total quantity of consumed energy', () => {
      const result = DashboardService.calculateTotalQuantityEnergyConsumed(invoicesInMonth);
      const someAtOneOne = invoicesInMonth[0][0]?.energyElectrical?.quantity + invoicesInMonth[0][0]?.energyScee?.quantity;
      const someAtOneTwo = invoicesInMonth[0][1]?.energyElectrical?.quantity + invoicesInMonth[0][1]?.energyScee?.quantity;
      const someAtTwoOne = invoicesInMonth[1][0]?.energyElectrical?.quantity + invoicesInMonth[1][0]?.energyScee?.quantity;
      const someAtTwoTwo = invoicesInMonth[1][1]?.energyElectrical?.quantity + invoicesInMonth[1][1]?.energyScee?.quantity;
      expect(result).toEqual([someAtOneOne + someAtOneTwo, someAtTwoOne + someAtTwoTwo]);
    });

    it('Calculates total quantity of compensated energy ', () => {
      const result = DashboardService.calculateTotalQuantityEnergyCompensated(invoicesInMonth);
      const someEnergyCompensatedOne = invoicesInMonth[0][0]?.energyCompensated?.quantity + invoicesInMonth[0][1]?.energyCompensated?.quantity;
      const someEnergyCompensatedTwo = invoicesInMonth[1][0]?.energyCompensated?.quantity + invoicesInMonth[1][1]?.energyCompensated?.quantity;
      expect(result).toEqual([someEnergyCompensatedOne, someEnergyCompensatedTwo]);
    });

    it('Calculates total price of consumed energy without municipal contribution', () => {
      const result = DashboardService.calculateTotalPriceEnergyConsumedWithoutGD(invoicesInMonth);
      const somePriceOneOne = invoicesInMonth[0][0]?.energyElectrical?.price + invoicesInMonth[0][0]?.energyScee?.price + invoicesInMonth[0][0]?.municipalContribution;
      const somePriceOneTwo = invoicesInMonth[0][1]?.energyElectrical?.price + invoicesInMonth[0][1]?.energyScee?.price + invoicesInMonth[0][1]?.municipalContribution;
      const somePriceTwoOne = invoicesInMonth[1][0]?.energyElectrical?.price + invoicesInMonth[1][0]?.energyScee?.price + invoicesInMonth[1][0]?.municipalContribution;
      const somePriceTwoTwo = invoicesInMonth[1][1]?.energyElectrical?.price + invoicesInMonth[1][1]?.energyScee?.price + invoicesInMonth[1][1]?.municipalContribution;
      expect(result).toEqual([somePriceOneOne + somePriceOneTwo, somePriceTwoOne + somePriceTwoTwo]);
    });

    it('calculates saving price with GB', () => {
      const result = DashboardService.calculateSavingPriceWithGB(invoicesInMonth);
      const compensatedOneOne = invoicesInMonth[0][0]?.energyCompensated?.price;
      const compensatedOneTwo = invoicesInMonth[0][1]?.energyCompensated?.price;
      const compensatedTwoOne = invoicesInMonth[1][0]?.energyCompensated?.price;
      const compensatedTwoTwo = invoicesInMonth[1][1]?.energyCompensated?.price;
      expect(result).toEqual([Math.abs(compensatedOneOne + compensatedOneTwo), Math.abs(compensatedTwoOne + compensatedTwoTwo)]);
    });
  });
});