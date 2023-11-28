import { useEffect, useState } from 'react'
import './App.css'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/UseCurrencyInfo'
import currency from "./assets/currency.jpg";

function App() {
  const[amount, setAmount] = useState(0);
  const[from, setFrom] = useState("usd");
  const[to, setTo] = useState("inr");
  const[result, setResult]= useState(0);
  const currencyInfo = useCurrencyInfo(from);
  const targetCurrencyList =Object.keys(currencyInfo);
  const swap = function (){
    setAmount(result);
    setResult(amount);
    setTo(from);
    setFrom(to);
  }
  const convert = () =>{
    setResult(amount * currencyInfo[to])
  }

    const BackgroundImage = currency;

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('${BackgroundImage}')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={targetCurrencyList}
                            onCurrencyChange={(newCurrency) =>setFrom(newCurrency)}
                            onAmountChange={(newAmount)=> setAmount(newAmount)}
                            selectCurrency={from}
                            amountDisabled ={false}
                            currencyDisabled = {false}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={result}
                            currencyOptions={targetCurrencyList}
                            onCurrencyChange={(newCurrency) =>{setTo(newCurrency);
                            }}
                            onAmountChange={(newResult)=> (setAmount(newResult))}
                            selectCurrency={to}
                            amountDisabled ={true}
                            currencyDisabled = {false}
                            
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg" onSubmit={convert}>
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
