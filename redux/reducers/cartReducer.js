let defaultState = {
    selectedItems: {items: [], restaurantName: ''}
}

// let cartReducer = (state = defaultState, action) => {
//     switch(action.type){
//         case 'ADD_TO_CART':{
//             let newState = {...state};
//             newState.selectedItems = {
//                 items:[...newState.selectedItems, action.payload],
//                 restaurantName:action.payload.restaurantName,
//             };
//             console.log(newState,"saloni");
//             return newState
//         }
//         default:
//             return newState;
//     }
// }

let cartReducer = (state = defaultState, action) => {
    let newState = { ...state }; // Declare newState outside the switch statement
  
    switch (action.type) {
      case 'ADD_TO_CART': {
        if(action.payload.checkboxValue){
            console.log("Add to cart")
        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
  
       
        }else{
            console.log('Remove from cart')
            newState.selectedItems = {
                items:[
                    ...newState.selectedItems.items.filter((item)=>item.title !== action.payload.title),
                ],
                restaurantName: action.payload.restaurantName,
            }
        }
      }
      console.log(newState, "saloni");
      return newState;
      default:
        return newState;
    }
  };

export default cartReducer;