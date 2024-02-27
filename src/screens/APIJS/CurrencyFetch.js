import { useState, useEffect } from "react";

const useCurrencyConverter = () => {
   const [baseCurrencies, setBaseCurrencies] = useState([]);
   const [targetCurrencies, setTargetCurrencies] = useState([]);
   const [selectedBaseCurrency, setSelectedBaseCurrency] = useState('');
   const [selectedTargetCurrency, setSelectedTargetCurrency] = useState('');
   const [total, setTotal] = useState('');

   const fetchCurrencies = () => { // Define fetchCurrencies before useEffect
      fetch('https://currency-converter241.p.rapidapi.com/all', {
         method: 'GET',
         headers: {
            'X-RapidAPI-Key': '661c836913msh77663208816974ap191664jsn5ace149e58a9',
            'X-RapidAPI-Host': 'currency-converter241.p.rapidapi.com'
         }
      })
      .then(res => res.json())
      .then(data => {
         const baseList = Object.keys(data.names);
         setBaseCurrencies(baseList);
         setSelectedBaseCurrency(baseList[0]);
      })
      .catch(error => console.error('Error fetching base currencies:', error));
   };

   useEffect(() => {
      fetchCurrencies();
   }, []);

   return {
      baseCurrencies,
      targetCurrencies,
      selectedBaseCurrency,
      selectedTargetCurrency,
      total,
      fetchCurrencies,
   };
};

export default useCurrencyConverter;
