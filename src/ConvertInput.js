import React from 'react';
import './App.css';

function ConvertInput(props){
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount,
    } = props
    return(
        <div className="inputContainer">
            <select className='selectCurrency'
                    value={selectedCurrency}
                    onChange={onChangeCurrency} >
                {currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <input className='inputCurrency'
                   type="number"
                   value={amount}
                   onChange={onChangeAmount} />
        </div>
    )
}

export default ConvertInput;
