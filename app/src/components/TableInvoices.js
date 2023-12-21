import ButtonAction from "./ButtonComponent";


import './css/TableInvoices.css';

export default function TableInvoices({ data }) {
    return (
      <div className="table-invoices">

        <table>
          <thead>
            <tr>
              <td>Nº FATURA</td>
              <td>Nº CLIENTE</td>
              <td>DATA</td>
              <td>AÇÃO</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.numberInvoice}>
                <td>{item.numberInvoice}</td>
                <td>{item.numberClient}</td>
                <td>{item.competency}</td>
                <td>
                  <ButtonAction label="Baixar" type="sucess" size="small" />
                  <ButtonAction label="Excluir" type="error" size="small" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      );
}