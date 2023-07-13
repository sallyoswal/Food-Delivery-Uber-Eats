import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const localRestaurants = [
    {
        name:"BeachSide Bar",
        image_url:"https://www.discoverlosangeles.com/sites/default/files/images/2019-01/laxbw-prime-1715-hor-wide.jpg?width=1600&height=1200&fit=crop&quality=78&auto=webp",
        categories:["cafe","bar"],
        price:"$$",
        reviews:1244,
        rating:4.5,
    },
    {
        name:"Besheha Bar",
        image_url:"https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?cs=srgb&dl=pexels-lisa-fotios-1126728.jpg&fm=jpg",
        categories:["Indian","bar"],
        price:"$$",
        reviews:1244,
        rating:4.5,
    },
];

export default function RestaurantItems({navigation, ...props}) {
  return (
         <>
         {props.restaurantData.map((restaurant, index) =>(
            <TouchableOpacity key = {index}  activeOpacity={1} style={{marginBottom:30}} 
            onPress={() => navigation.navigate("RestaurantDetail",{
                name:restaurant.name,
                image:restaurant.image_url,
                price:restaurant.price,
                reviews:restaurant.review_count,
                rating: restaurant.rating,
                categories:restaurant.categories,

            })}>
            <View style={{marginTop:10, padding:15, backgroundColor:"white"}}>
                <RestaurantImage image={restaurant.image_url}/>
                <ResturantInfo name={restaurant.name} rating={restaurant.rating}/>
        </View>
        </TouchableOpacity>
         ))}
         </>   
  )
}

const RestaurantImage = (props) => (
    <>
    <Image source={{uri:props.image}} 
    style={{width:"100%", height: 180}}/>
    <TouchableOpacity style={{position:"absolute", right:20, top: 20}}>
    <MaterialCommunityIcons name="heart-outline" size={25} color="#fff"/>
    </TouchableOpacity>
    </>
)

const ResturantInfo = (props) => (
    <View style={{flexDirection:"row" ,justifyContent: "space-between", alignItems: "center", marginTop:10}}>
       <View> 
            <Text style={{fontSize:15, fontWeight: 'bold'}}>{props.name}</Text>
            <Text style={{fontSize:13, color: "gray"}}>35-45 • min</Text>
        </View>
        <View  style={{backgroundColor:"#eee", height:30, width:30, alignItems:"center",justifyContent:"center", borderRadius:15 }}>
            <Text>{props.rating}</Text>
        </View>
    </View>

)