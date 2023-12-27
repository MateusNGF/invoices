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
            const invoices = await ApiService.listInvoicesByFilters({
                take : 500,
                skip: 0,
                ...filters
            });
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
                backgroundColor: 'rgba(177,88,78, 1)',
                borderColor: 'rgba(177,88,78, 1)',
                borderWidth: 2,
                fill: {
                    target: '1',
                    above: 'rgba(177,88,78, 0.4)',
                }
            },
            {
                label: 'Energia Compensada GD - kWh',
                data: DashboardService.calculateTotalQuantityEnergyCompensated(Object.values(invoicesAgrupedByCompetency)),
                backgroundColor: 'rgba(50,139,91, 1)', // Cor diferente para o segundo conjunto de dados
                borderColor: 'rgba(50,139,91, 1)',
                borderWidth: 2,
                fill: {
                    target: 'origin',
                    above: 'rgba(50,139,91, 0.4)',
                }
            },
        ]
    }

    const spendingAnalysisInReais = {
        labels: Object.keys(invoicesAgrupedByCompetency),
        datasets: [
            {
                label: 'Valor total sem GD - R$',
                data: DashboardService.calculateTotalPriceEnergyConsumedWithoutGD(Object.values(invoicesAgrupedByCompetency)),
                backgroundColor: 'rgba(177,88,78, 1)',
                borderColor: 'rgba(177,88,78, 1)',
                borderWidth: 2,
                fill: {
                    target: '1',
                    above: 'rgba(177,88,78, 0.4)',
                }
            },
            {
                label: 'Economina GD - R$',
                data: DashboardService.calculateSavingPriceWithGB(Object.values(invoicesAgrupedByCompetency)),
                backgroundColor: 'rgba(50,139,91, 1)', // Cor diferente para o segundo conjunto de dados
                borderColor: 'rgba(50,139,91, 1)',
                borderWidth: 2,
                fill: {
                    target: 'origin',
                    above: 'rgba(50,139,91, 0.4)',
                }
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