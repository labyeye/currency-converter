import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const Start = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={{ gap: 40, height: windowHeight, width: windowWidth, alignItems: 'center', justifyContent: 'center' }}>
                <LottieView
                    style={{ marginTop: -90, height: "30%", width: "100%", alignSelf: 'center' }}
                    source={require('../../assets/Animations/money.json')} autoPlay={true} loop={true} />
                <Text style={styles.title}>Rate Radar</Text>
                <Text style={styles.desc}>"Convert. Compare. Conquer."
                </Text>
                <TouchableOpacity style={styles.getbtn} onPress={() => navigation.navigate('Main', { screen: 'Detail' })}>
                    <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    getbtn: {
        justifyContent: "center",
        borderRadius: 10,
        width: "90%",
        height: "6%",
        marginTop: 50,
        backgroundColor: '#1E2022'
    },
    title: {
        color: 'black',
        fontSize: 40,
    },
    desc: {
        color: 'black',
        fontSize: 20,
    },
    container: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: '#F0F5F9',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Start;
