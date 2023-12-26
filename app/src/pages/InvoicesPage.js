import { useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadComponent";
import SearchBarComponent from "../components/SearchBarComponent";
import TableInvoices from "../components/TableInvoices";
import ApiService from '../utils/Api';

export default function InvoicesPage() {
    const [listInvoices, setListInvoices] = useState([])
    const [loadingState, setLoadingState] = useState(false)

    async function requestAPIAndUpdateContent(filters){
        if (loadingState){
            alert("Há um carregamento em andamento, aguarde e tente novamente.")
        }

        const loadingTimeout = setTimeout(() => {
            setLoadingState(true);
        }, 500);

        setLoadingState(true)
        try{
            setListInvoices([])
            const invoices = await ApiService.listInvoicesByFilters(filters);
            setListInvoices(invoices)
        }catch(e){
            alert("Não foi possivel atualizar a lista de faturas.")
        }finally{
            clearInterval(loadingTimeout)
            setLoadingState(false)
        }
    }

    useEffect(() => {
        requestAPIAndUpdateContent()
      }, []);

    return (
        <div>
            <SearchBarComponent
                onSearch={requestAPIAndUpdateContent}
            />
            {loadingState ?
                <LoadingIndicator title="Carregando lista de faturas" /> :
                <TableInvoices
                    data={listInvoices}
                    fnDonwload={() => {

                    }}
                    fnDelete={async (item) => {
                        const identificate = `Nº${item.numberInvoice}`
                        const result = window.confirm(`Tem certeza que deseja excluir a fatura ${identificate} esta fatura?`)
                        if (!result) return;
                        
                        const deleted = await ApiService.deleteInvoice(item.id);
                        if (!deleted) alert(`Não foi possivel excluir a fatura ${identificate}.`)

                        setListInvoices(listInvoices.filter((invoice) => invoice.id !== item.id))
                        alert(`Fatura ${identificate} excluída com sucesso`)
                    }}
                />
            }
            
        </div>
    )
}