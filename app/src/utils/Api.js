class ApiService {
    #url_api = `http://localhost:5000`

    async listInvoicesByFilters(filters){
        const params = new URLSearchParams({
            skip:  '0',
            take: '30',
            text: filters?.text ?? null,
            startDate: filters?.startDate ?? null,
            endDate: filters?.endDate ?? null,
            where: filters?.where ? JSON.stringify(filters?.where) : null,
        })

        const response = await fetch(`${this.#url_api}/invoice?${params.toString()}`, { method: 'GET' })
        return response.json()
    }


    async deleteInvoice(id){
        const query = new URLSearchParams({id})
        const response = await fetch(`${this.#url_api}/invoice?${query.toString()}}`, { method: 'DELETE' })
        return response.json()
    }
}


export default new ApiService()