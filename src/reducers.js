import {combineReducers, createStore} from 'redux';

const unbooked='unbooked';
const booked='booked';
const unbook='unbook';
const book='book';
const flight='flight';
const destination='destination';
const hotel='hotel';
const slideLeft='slideLeft';
const slideRight='slideRight';

const bookInitialState={
  flightStatus: unbooked,
  destinationStatus: unbooked,
  hotelStatus: unbooked
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
      switch(action.payload){
        case flight:
          return Object.assign({},state,{flightStatus: booked});
        case destination:
          return Object.assign({},state,{destinationStatus: booked});
        case hotel:
          return Object.assign({},state,{hotelStatus: booked});
        default:
          return state;
      }
    case unbook:
      switch(action.payload){
        case flight:
          return Object.assign({},state,{flightStatus: unbooked});
        case destination:
          return Object.assign({},state,{destinationStatus: unbooked});
        case hotel:
          return Object.assign({},state,{hotelStatus: unbooked});
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
