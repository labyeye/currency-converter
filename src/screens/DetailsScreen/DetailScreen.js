import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput } from 'react-native';
import axios from 'axios';

const DetailScreen = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState(''); 

    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            
            const response1 = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/unicode');
            const countriesData = response1.data.data;
            const response2 = await axios.get('https://countriesnow.space/api/v0.1/countries/currency');
            const currencyData = response2.data.data;
            const response3 = await axios.get('https://countriesnow.space/api/v0.1/countries/codes');
            const countriesCode = response3.data.data;
            const mergedData = mergeData(countriesData, currencyData, countriesCode);
            const sortedData = mergedData.sort((a, b) => a.name.localeCompare(b.name));
            setData(sortedData);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const mergeData = (countriesData, currencyData, countriesCode) => {
        const mergedData = countriesData.map(country => {
            const currencyInfo = currencyData.find(currency => currency.name === country.name);
            const countryCodeInfo = countriesCode.find(code => code.name === country.name);
                
            return {
                ...country,
                currency: currencyInfo ? currencyInfo.currency : 'Unknown',
                countryCode: countryCodeInfo ? countryCodeInfo.dial_code : 'Unknown',
            };
        });
        return mergedData;
    };

const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.currency.toLowerCase().includes(searchText.toLowerCase())
);


    return (
        <View style={{ flex: 1, marginTop: 50, gap: 20 }}>
            <View style={{ width: '100%', height: '7%', marginTop: 10, alignItems: 'center' }}>
                <TextInput
                    style={{ width: '90%', backgroundColor: 'white', height: '100%', borderRadius: 40 }}
                    placeholder='Search'
                    textAlign='center'
                    value={searchText}
                    onChangeText={text => setSearchText(text)} // Update search text state
                />
                <Text style={{ alignSelf: 'flex-start', padding: 10, fontSize: 30, fontWeight: '600' }}>Know Your Country</Text>
            </View>
            <FlatList
                data={filteredData} 
                style={{ marginTop: 50 }}
                renderItem={({ item }) => (
                    <View style={{ alignItems: 'center', padding: 10, flexDirection: 'row', width: "100%"}}>
                        <View style={{
                            backgroundColor: "white", width: "100%", backgroundColor: '#F0F5F9', height: "100%", flexDirection: 'row', gap: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, // Controls shadow offset
                            shadowOpacity: 0.6,
                            shadowRadius: 2,
                            elevation: 2, borderRadius: 5
                        }}>
                            <View style={{ padding: 9 }}>
                                <Text style={{ fontSize: 45 }}>{item.unicodeFlag}</Text>
                                <Text style={{ alignSelf: 'center', fontSize: 14 }}>{item.currency}</Text>
                            </View>
                            <View style={{ marginTop: 15, width: '60%', flexDirection: 'column', marginTop: 18, gap: 10 }}>
                                <Text style={{ alignSelf: 'flex-start', fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                                <Text style={{ alignSelf: 'flex-start', fontSize: 18, fontWeight: '300' }}>Dial Code {item.countryCode}</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View >
    );
};

export default DetailScreen;
