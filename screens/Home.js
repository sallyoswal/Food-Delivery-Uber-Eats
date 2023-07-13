import { View, Text, SafeAreaView, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from '../components/home/SearchBar';
import Categories from '../components/home/Categories';
import RestaurantItems, { localRestaurants } from '../components/home/RestaurantItems';
import {Divider} from 'react-native-elements'
import BottomTabs from '../components/home/BottomTabs';

const YELP_API_KEY = "MYY5-lsQaFOQPcUD6jTWAI9t-WtrX1JXmb6kgtYoaL_AY1Q_R2KgpVsX3JbCySojI05kp7PKtl4ghECcJ6vLYEJVO1Xd9426K7WAGbl7HZgDyfC07not4tiqG4msZHYx"

export default function Home({navigation}) {

    const[restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState('San Francisco');
    const [activeTab, setActiveTab] = useState('Delivery');

    const getRestaurantsFromYelp = () => {
        const yelpUrl=
        `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
    

    const apiOptions= {
        headers:{
            Authorization: `Bearer ${YELP_API_KEY}`,

        },};
        return fetch(yelpUrl,apiOptions)
        .then((res) => res.json())
        .then((json) => setRestaurantData(json.businesses.filter((business)=>
        business.transactions.includes(activeTab.toLowerCase())
                )
            )
        );
        
    };

    useEffect(() => {
        getRestaurantsFromYelp();
    },[city, activeTab]);

  return (
    //This safe area view helps us skip the notch and show our code in proper area
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1, }}>
        <View style={{backgroundColor: 'white', padding: 15}}>
            <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            <SearchBar cityHandler={setCity}/>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Categories/>
        <RestaurantItems restaurantData={restaurantData} navigation={navigation}/>
        </ScrollView>
        <Divider width={1}/>
        <BottomTabs/>
    </SafeAreaView>
  )
}