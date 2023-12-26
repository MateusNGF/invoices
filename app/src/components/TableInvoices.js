import { abreviateDate } from "../utils/Date";
import ButtonAction from "./ButtonComponent";

import {formatCurrencyBRL} from '../utils/Currency'


import './css/TableInvoices.css';

export default function TableInvoices({ data, fnDonwload, fnDelete }) {
  return (
    <div className="table-invoices">
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Nº FATURA</td>
              <td>Nº CLIENTE</td>
              <td>COMPETÊNCIA</td>
              <td>VALOR</td>
              <td>AÇÃO</td>
            </tr>
          </thead>
          <tbody>
            {data.length ? data.map((item) => (
              <tr key={item.numberInvoice}>
                <td>{item.id ?? null}</td>
                <td>{item.numberInvoice}</td>
                <td>{item.numberClient}</td>
                <td>{abreviateDate(item.competency)}</td>
                <td>{formatCurrencyBRL(item.totalPrice)}</td>
                <td>
                  <ButtonAction
                    label="Baixar"
                    onClick={() => fnDonwload(item)}
                    type="sucess"
                    size="small"
                  />
                  <ButtonAction
                    label="Excluir"
                    onClick={() => fnDelete(item)}
                    type="error"
                    size="small"
                  />
                </td>
              </tr>
            )): null}
          </tbody>
        </table>
      </div>
  )
}