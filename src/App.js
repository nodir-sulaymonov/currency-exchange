import React, {useEffect, useState} from 'react';
import './App.css';
import ConvertInput from "./ConvertInput";

const api = 'https://api.exchangeratesapi.io/latest'

function App() {
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [exchange, setExchange] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        fetch(api)
            .then(res => res.json())
            .then(data => {
                setCurrencyOptions([data.base, ...Object.keys(data.rates)])
                setFromCurrency(data.base);
            })
    }, [])

    useEffect(() => {
        if (fromCurrency !== isNaN && fromCurrency !== undefined) {
            fetch(`${api}?base=${fromCurrency}`)
                .then(res => res.json())
                .then(data => {
                    setExchange(data.rates);
                    }
                )
        }
    }, [fromCurrency])



    function handleFromAmountChange(e) {
        setAmount(e.target.value)
    }

    return (
        <div className="container">
            <p className="title">
                Currency converter
            </p>
            <ConvertInput
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={amount}
            />
            <ul>
                {Object.keys(exchange).map((value, index) => (
                    <li key={index}
                        className='itemCurrency'>
                        <span>{value}</span>
                        <span>{(exchange[value] * amount).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
