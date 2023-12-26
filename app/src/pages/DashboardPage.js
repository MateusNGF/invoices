import './css/DashboardPage.css'

import {useState, useEffect} from 'react'

import GraphicComponent from "../components/GraphicComponent";
import SearchBarComponent from "../components/SearchBarComponent";
import LoadComponent from "../components/LoadComponent";

import ApiService from '../utils/Api'
import { agroupInvoicesByDate } from "../services/InvoiceServices";

export default function DashboardPage() {
    const [invoicesAgrupedByCompetency, setInvoicesAgrupedByCompetency] = useState({})
    const [loadingState, setLoadingState] = useState(false)


    useEffect(() => {
        requestAPIAndUpdateContent()
    }, [])

    async function requestAPIAndUpdateContent(filters){
        if (loadingState){
            alert("Há um carregamento em andamento, aguarde e tente novamente.")
        }

        const loadingTimeout = setTimeout(() => {
            setLoadingState(true);
        }, 500);

        setLoadingState(true)
        try{
            setInvoicesAgrupedByCompetency({})
            const invoices = await ApiService.listInvoicesByFilters(filters);
            setInvoicesAgrupedByCompetency(agroupInvoicesByDate(invoices))
        }catch(e){
            alert("Não foi possivel atualizar a lista de faturas.")
        }finally{
            clearInterval(loadingTimeout)
            setLoadingState(false)
        }
    }


    const quantityAnalysisInKwh = {
        labels: Object.keys(invoicesAgrupedByCompetency),
        datasets: [
            {
                label: 'Consumo de energia eletrica - kWh',
                data: calculateTotalQuantityEnergyConsumed(Object.values(invoicesAgrupedByCompetency)),
                backgroundColor: '#AFF4C6',
            },
            {
                label: 'Energia compensada GD - kWh',
                data: calculateTotalQuantityEnergyCompensated(Object.values(invoicesAgrupedByCompetency)),
                backgroundColor: '#96B5A1', // Cor diferente para o segundo conjunto de dados

            },
        ]
    }

    const spendingAnalysisInReais = {
        labels: Object.keys(invoicesAgrupedByCompetency),
        datasets: [
            {
                label: 'Valor total sem descontos - R$',
                data: calculateTotalPriceEnergyConsumedWithoutGD(Object.values(invoicesAgrupedByCompetency)),
                backgroundColor: '#2C5C3C',
            },
            {
                label: 'Economina GD - R$',
                data: calculateSavingPriceWithGB(Object.values(invoicesAgrupedByCompetency)),
                backgroundColor: '#618F70', // Cor diferente para o segundo conjunto de dados
            },
        ]
    }
    
    return (
        <div>
            <SearchBarComponent
                onSearch={requestAPIAndUpdateContent}
            />
            {
                loadingState ?
                    <LoadComponent title="Carregando dados..." /> :
                    (
                        <div className="graphic-container">
                            <GraphicComponent
                                labels={quantityAnalysisInKwh.labels}
                                datasets={quantityAnalysisInKwh.datasets}
                            />
                             <GraphicComponent
                                labels={spendingAnalysisInReais.labels}
                                datasets={spendingAnalysisInReais.datasets}
                            />
                        </div> 
                    )
            }
        </div>
    );
}



function calculateTotalQuantityEnergyConsumed(invoicesInMonth = []) {
    let debug = invoicesInMonth.map(month =>
        month.reduce((acc, invoice) =>
            acc + (invoice.energyElectrical?.quantity + invoice.energyScee?.quantity)
            , 0))

    console.log(debug);
    return debug
}

function calculateTotalQuantityEnergyCompensated(invoicesInMonth = []) {
    let debug = invoicesInMonth.map(month =>
        month.reduce((acc, invoice) =>
            acc + invoice.energyCompensated?.quantity, 0)
        , 0)

    console.log(debug);
    return debug
}


function calculateTotalPriceEnergyConsumedWithoutGD(invoicesInMonth = []) {
    let debug = invoicesInMonth.map(month =>
        month.reduce((acc, invoice) =>
            acc + (invoice.energyElectrical?.price + invoice.energyScee?.price + invoice?.municipalContribution)
            , 0))

    console.log(debug);
    return debug
}


function calculateSavingPriceWithGB(invoicesInMonth = []) {
    let debug = invoicesInMonth.map(month =>
        month.reduce((acc, invoice) =>
            acc + (Math.abs(invoice.energyCompensated?.price))
            , 0))

    console.log(debug);
    return debug
}