class DateFormarter {
  private monthsAbbr = {
    JAN: 1,
    FEV: 2,
    MAR: 3,
    ABR: 4,
    MAI: 5,
    JUN: 6,
    JUL: 7,
    AGO: 8,
    SET: 9,
    OUT: 10,
    NOV: 11,
    DEZ: 12,
  };

  ParseFormatedDateMonthYearToDate(date: string) {
    const [monthAbbr, yearStr] = date.split('/');
    const month = this.monthsAbbr[monthAbbr.toUpperCase()];
    const year = parseInt(yearStr, 10);

    return new Date(year, month);
  }
}

export default new DateFormarter();
