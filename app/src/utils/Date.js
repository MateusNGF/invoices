const months = {
  1 : "JAN",
  2 : "FEV",
  3 : "MAR",
  4 : "ABR",
  5 : "MAI",
  6 : "JUN",
  7 : "JUL",
  8 : "AGO",
  9 : "SET",
  10 : "OUT",
  11 : "NOV",
  12 : "DEZ"
}

export function formatarData(dateString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
    //   day: '2-digit',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    //   timeZoneName: 'short',
    };
  
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(dateString));
  }

  export function abreviateDate(date){
    const month = new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    return `${months[month]}/${year}`
  }