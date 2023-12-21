import SearchBarComponent from "../components/SearchBarComponent";
import TableInvoices from "../components/TableInvoices";

const data = [
    { numberInvoice: 1, numberClient: 'John', competency: new Date().toISOString() }, 
    { numberInvoice: 2, numberClient: 'Jane', competency: new Date().toISOString() }, 
    { numberInvoice: 3, numberClient: 'Bob', competency: new Date().toISOString() },
    { numberInvoice: 4, numberClient: 'Alice', competency: new Date().toISOString() },
    ]
export default function Invoices() {
    return (
        <div>
            <SearchBarComponent/>
            <TableInvoices data={data} headers={['Number Invoice', 'Number Client', 'Proficiency']}/>
        </div>
    )
}