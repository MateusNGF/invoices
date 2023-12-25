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