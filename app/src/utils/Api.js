import axios from 'axios'

class ApiService {
    #url_api = process.env.REACT_APP_API_URL

    async listInvoicesByFilters(filters){
        const params = new URLSearchParams({
            skip:  '0',
            take: '30',
            text: filters?.text ?? null,
            startDate: filters?.startDate ?? null,
            endDate: filters?.endDate ?? null,
            where: filters?.where ? JSON.stringify(filters?.where) : null,
        })

        const { data } = await axios.get(`${this.#url_api}/invoice?${params.toString()}`)
        return data
    }


    async deleteInvoice(id) {
        const query = new URLSearchParams({ id })
        const { data } = await axios.delete(`${this.#url_api}/invoice?${query.toString()}}`)
        return data
    }

    async uploadInvoice(data, { onProgress }) {
        const response = await axios.post(`${this.#url_api}/invoice/upload`, data, {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent
                const progress = Math.round((loaded * 100) / total)
                onProgress(progress)
            }
        })

        return response.data
    }
    async downloadInvoice(filename) {
        const query = new URLSearchParams({ filename })
        const response = await axios.get(
            `${this.#url_api}/invoice/download?${query.toString()}`,
            { responseType: 'stream' }
        )

        const streamToBlob = new Blob(
            [response.data],
            { type: response.headers['content-type'] }
        );
        return  window.URL.createObjectURL(streamToBlob);
    }
}


export default new ApiService()