import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ConvertScreen = () => {
   const [inputValue, setInputValue] = useState('');
   const [baseCurrencies, setBaseCurrencies] = useState([]);
   const [targetCurrencies, setTargetCurrencies] = useState([]);
   const [selectedBaseCurrency, setSelectedBaseCurrency] = useState('');
   const [selectedTargetCurrency, setSelectedTargetCurrency] = useState('');
   const [total, setTotal] = useState('');

   useEffect(() => {
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

      fetch('https://currency-converter241.p.rapidapi.com/all', {
         method: 'GET',
         headers: {
            'X-RapidAPI-Key': '661c836913msh77663208816974ap191664jsn5ace149e58a9',
            'X-RapidAPI-Host': 'currency-converter241.p.rapidapi.com'
         }
      })
      .then(res => res.json())
      .then(data => {
         const targetList = Object.keys(data.names);
         setTargetCurrencies(targetList);
         setSelectedTargetCurrency(targetList[1]);
      })
      .catch(error => console.error('Error fetching target currencies:', error));
   }, []);

   const handleConvertPress = () => {
      const convertUrl = `https://currency-converter241.p.rapidapi.com/convert?amount=${inputValue}&from=${selectedBaseCurrency}&to=${selectedTargetCurrency}`;
      
      fetch(convertUrl, {
         method: 'GET',
         headers: {
            'X-RapidAPI-Key': '661c836913msh77663208816974ap191664jsn5ace149e58a9',
            'X-RapidAPI-Host': 'currency-converter241.p.rapidapi.com'
         }
      })
      .then(res => res.json())
      .then(convertedData => {
         console.log('API Response:', convertedData);
         if (convertedData && convertedData.total !== undefined) {
            console.log(`Converted value: ${convertedData.total}`);
            setTotal(convertedData.total);
         } else {
            console.error('Error: Invalid API response');
         }
      })
      .catch(error => console.error('Error converting currencies:', error));
   }

   return (
      <View>
     
         <Picker
            selectedValue={selectedBaseCurrency}
            onValueChange={(itemValue, itemIndex) => setSelectedBaseCurrency(itemValue)}
         >
            {baseCurrencies.map((currency, index) => (
               <Picker.Item key={index} label={currency} value={currency} />
            ))}
         </Picker>

        
         <Picker
            selectedValue={selectedTargetCurrency}
            onValueChange={(itemValue, itemIndex) => setSelectedTargetCurrency(itemValue)}
         >
            {targetCurrencies.map((currency, index) => (
               <Picker.Item key={index} label={currency} value={currency} />
            ))}
         </Picker>

         <TextInput
            placeholder="Enter amount to convert"
            keyboardType='numeric'
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
         />

         <Button title="Convert" onPress={handleConvertPress} />

         <Text>{total}</Text>
      </View>
   );
}

export default ConvertScreen;
