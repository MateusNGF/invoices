import './css/SearchBarComponent.css'

export default function SearchBarComponent({ onSearch }) {
    const getContentOfDatesInputs = (target) => {
        const startDate = document.getElementById('start-date-input').value
        const endDate = document.getElementById('end-date-input').value
        const text = document.getElementById('input-text').value

        onSearch({
            startDate,
            endDate,
            text
        })
    }


    return (
        <div className="search-bar">
            <div className="input-bar">
                <input id="input-text"
                    type="text"
                    placeholder="nº do cliente..."
                    onChange={getContentOfDatesInputs}
                    data-testid="input-text"
                />
                <button
                    id='search-button'
                    data-testid="search-button"
                    onClick={getContentOfDatesInputs}
                >
                    Filtrar
                </button>
            </div>
            <div className="date-bar">
                <div className='date-picker-in'>
                    <label>DE</label>
                    <input
                        type="month"
                        id='start-date-input'
                        data-testid="input-start-date"
                        name="month-year"
                        onChange={getContentOfDatesInputs}
                    />
                </div>
                <div className='date-picker-out'>
                    <label>ATÉ</label>
                    <input
                        type="month"
                        id='end-date-input'
                        data-testid="input-end-date"
                        name="month-year"
                        onChange={getContentOfDatesInputs}
                    />
                </div>
            </div>
        </div>
    )
}