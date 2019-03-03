import {combineReducers} from 'redux';

const unbooked='unbooked';
const booked='booked';
const unbook='unbook';
const book='book';
const flight='flight';
const destination='destination';
const hotel='hotel';
const slideLeft='slideLeft';
const slideRight='slideRight';
const none='none';

const bookInitialState={
  flightStatus: unbooked,
  destinationStatus: unbooked,
  hotelStatus: unbooked,
  flightChoice: none,
  destinationChoice: none,
  hotelChoice: none,
  flightCost: 0,
  destinationCost: 0,
  hotelCost: 0
}

const sliderInitialState={
  flightSlider: 0,
  destinationSlider: 0,
  hotelSlider: 0
}

const sliderReducer=(state=sliderInitialState,action)=>{
  switch(action.type){
    case slideLeft:
      switch(action.payload){
        case flight:
          if(state.flightSlider===0) return state;
          return Object.assign({},state,{flightSlider:state.flightSlider-1})
        case destination:
          if(state.destinationSlider===0) return state;
          return Object.assign({},state,{destinationSlider:state.destinationSlider-1})
        case hotel:
          if(state.hotelSlider===0) return state;
          return Object.assign({},state,{hotelSlider:state.hotelSlider-1})
      }
    case slideRight:
      switch(action.payload){
        case flight:
          if(state.flightSlider===2) return state;
          return Object.assign({},state,{flightSlider:state.flightSlider+1})
        case destination:
          if(state.destinationSlider===2) return state;
          return Object.assign({},state,{destinationSlider:state.destinationSlider+1})
        case hotel:
          if(state.hotelSlider===2) return state;
          return Object.assign({},state,{hotelSlider:state.hotelSlider+1})
      }
    default:
      return state;
  }
}

const bookReducer=(state=bookInitialState,action)=>{
  switch(action.type){
    case book:
      switch(action.payload.category){
        case flight:
          return Object.assign({},state,{flightStatus: booked, flightChoice: action.payload.choice, flightCost: action.payload.cost});
        case destination:
          return Object.assign({},state,{destinationStatus: booked, destinationChoice: action.payload.choice, destinationCost: action.payload.cost});
        case hotel:
          return Object.assign({},state,{hotelStatus: booked, hotelChoice: action.payload.choice, hotelCost: action.payload.cost});
        default:
          return state;
      }
    case unbook:
      switch(action.payload.category){
        case flight:
          return Object.assign({},state,{flightStatus: unbooked, flightChoice: none, flightCost: 0});
        case destination:
          return Object.assign({},state,{destinationStatus: unbooked, destinationChoice: none, destinationCost: 0});
        case hotel:
          return Object.assign({},state,{hotelStatus: unbooked, hotelChoice: none, hotelCost: 0});
        default:
          return state;
      }
    default:
      return state;
  }
}

const rootReducer=combineReducers({
  bookReducer:bookReducer,
  sliderReducer:sliderReducer
})

export default rootReducer;
