
class DateFormarter {

    private monthsAbbr = {
        JAN: 0,
        FEV: 1,
        MAR: 2,
        ABR: 3,
        MAI: 4,
        JUN: 5,
        JUL: 6,
        AGO: 7,
        SET: 8,
        OUT: 9,
        NOV: 10,
        DEZ: 11
      };

    ParseFormatedDateMonthYearToDate(date : string){
        const [monthAbbr, yearStr] = date.split('/')
        const month = this.monthsAbbr[monthAbbr.toUpperCase()];
        const year = parseInt(yearStr, 10);

        return new Date(year, month);
    }
}


export default new DateFormarter()