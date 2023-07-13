import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import MenuItem from '../components/restaurantDetail/MenuItem';
import { db } from '../firebase';
import { collection, orderBy, limit, onSnapshot, getDocs, query } from 'firebase/firestore';


export default function OrderCompleted() {
    const [lastOrder, setLastOrder] = useState({items: [
        {
            title: "Bologna",
            description: "With butter lettuce, tomato, and sauce bechamel",
            price: "$13.50",
            image: "https://kristineskitchenblog.com/wp-content/uploads/2022/10/lasagna-recipe-16-2.jpg",
        }
    ]});
    const {items, restaurantName} = useSelector ((state) => state.cartReducer.selectedItems)
    const total = items.map((item => Number(item.price.replace('$','')))).reduce((prev,curr) => prev+curr, 0);

const totalUSD = total.toLocaleString('en', {
    style:"currency",
    currency:"USD",
});


useEffect(() => {
    async function getOrder() {
        const q = (query(collection(db, 'orders'), orderBy("createdAt", "desc"), limit(1)));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            setLastOrder(doc.data());
            console.log(doc.data());
        })
    }
    getOrder();
  }, []);


  return (
    <SafeAreaView style={{
        flex:1,
        backgroundColor:"white",
    }}>
        <View style={{
            margin:15,
            alignItems:"center",
            height:"100%",
        }}>
        <LottieView style={{
            height:100,
            alignSelf:"center",
            marginBottom:30, 
        }} source={require('../assets/animations/check-mark.json')}   autoPlay
        speed={0.5} loop={false}/>
      <Text style={{fontSize:20, fontWeight:"bold",}}>Your order at {restaurantName} has been placed for {totalUSD}</Text>
      <ScrollView>
      <MenuItem foods={lastOrder.items} hideCheckbox={true}/> 
      <LottieView style={{
            height:200,
            alignSelf:"center",
            marginBottom:30, 
        }} source={require('../assets/animations/cooking.json')}   autoPlay
        speed={0.5} loop={false}/>
        </ScrollView>
        </View>
    </SafeAreaView>
  )
}
