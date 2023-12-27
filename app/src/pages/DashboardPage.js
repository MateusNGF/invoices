import './css/DashboardPage.css';

import { useEffect, useState } from 'react';

import GraphicComponent from "../components/GraphicComponent";
import LoadComponent from "../components/LoadComponent";
import SearchBarComponent from "../components/SearchBarComponent";

import { agroupInvoicesByDate } from "../services/InvoiceServices";
import ApiService from '../utils/Api';
import DashboardService from './services/DashboardService';

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
                label: 'Consumo de Energia Elétrica - kWh',
                data: DashboardService.calculateTotalQuantityEnergyConsumed(Object.values(invoicesAgrupedByCompetency)),
                backgroundColor: '#AFF4C6',
            },
            {
                label: 'Energia Compensada GD - kWh',
                data: DashboardService.calculateTotalQuantityEnergyCompensated(Object.values(invoicesAgrupedByCompetency)),
                backgroundColor: '#96B5A1', // Cor diferente para o segundo conjunto de dados

            },
        ]
    }

    const spendingAnalysisInReais = {
        labels: Object.keys(invoicesAgrupedByCompetency),
        datasets: [
            {
                label: 'Valor total sem GD - R$',
                data: DashboardService.calculateTotalPriceEnergyConsumedWithoutGD(Object.values(invoicesAgrupedByCompetency)),
                backgroundColor: '#2C5C3C',
            },
            {
                label: 'Economina GD - R$',
                data: DashboardService.calculateSavingPriceWithGB(Object.values(invoicesAgrupedByCompetency)),
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
                                title='Análise de Consumo - kWh/Mês'
                                labels={quantityAnalysisInKwh.labels}
                                datasets={quantityAnalysisInKwh.datasets}
                            />
                             <GraphicComponent
                                title='Análise dos Custos - R$/Mês'
                                labels={spendingAnalysisInReais.labels}
                                datasets={spendingAnalysisInReais.datasets}
                            />
                        </div> 
                    )
            }
        </div>
    );
}