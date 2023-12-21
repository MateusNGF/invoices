import './css/SearchBarComponent.css'

export default function SearchBarComponent({ onSearchByText , onChangeDate}) {
    return (
            <div className="search-bar">
                <div className="input-bar">
                    <input id="input1" type="text" placeholder="nº do cliente..."></input>
                    <button onClick={onSearchByText}>Filtrar</button>
                </div>
                <div className="date-bar">
                    <div className='date-picker-in'>
                        <label>DE</label>
                        <input type="month" onChange={onChangeDate} name="month-year" />
                    </div>
                    <div className='date-picker-out'>
                        <label>ATÉ</label>
                        <input type="month" name="month-year"></input>
                    </div>
                </div>
            </div>
    )
}