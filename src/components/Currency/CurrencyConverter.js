import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import '../Currency/CurrencyConverter.css';

function CurrencyConverter() {

	// Initializing all the state variables 
	const [info, setInfo] = useState([]);
	const [input, setInput] = useState(0);
	const [from, setFrom] = useState("usd");
	const [to, setTo] = useState("inr");
	const [options, setOptions] = useState([]);
	const [output, setOutput] = useState(0);

	

	// Calling the api whenever the dependency changes
	useEffect(() => {
		Axios.get(
`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
			.then((res) => {
				setInfo(res.data[from]);
			})
	}, [from]);

	// Calling the convert function whenever
	// a user switches the currency
	useEffect(() => {
		setOptions(Object.keys(info));
		convert();
	}, [info])

	// Function to convert the currency
	function convert() {
		var rate = info[to];
		setOutput(input * rate);
	}

	// Function to switch between two currency
	function flip() {
		var temp = from;
		setFrom(to);
		setTo(temp);
	}

	return (
		<>
		<h1 className='m'>Currency Conversion</h1>
		<div className="currency">
			
			<div className="c-heading">
				{/* <h1>Currency converter</h1> */}
			</div>
			<div className="c-container">
				<div className="c-left">
					<h3>Amount</h3>
					<input type="text"
						placeholder="Enter amount"
						onChange={(e) => setInput(e.target.value)} />
				</div>
				<div className="c-middle">
					<h3>From</h3>
					<Dropdown options={options}
						onChange={(e) => { setFrom(e.value) }}
						value={from} placeholder="From" />
				</div>
				<div className="c-switch">
					<HiSwitchHorizontal size="30px"
						onClick={() => { flip() }} />
				</div>
				<div className="c-right">
					<h3>To</h3>
					<Dropdown options={options}
						onChange={(e) => { setTo(e.value) }}
						value={to} placeholder="To" />
				</div>
			</div>
			<div className="c-button-container">
      {/* Center the Convert button */}
      <button className='btn-convert' onClick={() => { convert() }}>
        Convert
      </button>
    </div>
			<div className="c-result">
				{/* <button className='btn-convert' onClick={() => { convert() }}>Convert</button> */}
				<h2 className='convert'>Converted Amount:</h2>
				<p className='convert-amount'>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>

			</div>
		</div>
		</>
	);
}

export default CurrencyConverter;
