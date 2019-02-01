import React, { Component } from 'react';
import {combineReducers, createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import './vacationStyles.css';
import checkmark from './checkmark.png';
import xmark from './xmark.png';
import Header from './header.js';

const unbooked='unbooked';
const booked='booked';
const unbook='unbook';
const book='book';
const flight='flight';
const destination='destination';
const hotel='hotel';
const slideLeft='slideLeft';
const slideRight='slideRight';
const flightSlide='flightSlide';
const destinationSlide='destinationSlide';
const hotelSlide='hotelSlide';

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

const bookActionCreator=(payload)=>{
  return {type:book, payload: payload}
}

const unBookActionCreator=(payload)=>{
  return {type:unbook, payload: payload}
}

const slideLeftActionCreator=(payload)=>{
  return {type:slideLeft, payload: payload}
}

const slideRightActionCreator=(payload)=>{
  return {type:slideRight, payload: payload}
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

const sliderReducer=(state=sliderInitialState,action)=>{
  switch(action.type){
    case slideLeft:
      switch(action.payload){
        case flightSlide:
          if(state.flightSlider==0) return state;
          return Object.assign({},state,{flightSlider:state.flightSlider-1})
        case destinationSlide:
          if(state.destinationSlider==0) return state;
          return Object.assign({},state,{destinationSlider:state.destinationSlider-1})
        case hotelSlide:
          if(state.hotelSlider==0) return state;
          return Object.assign({},state,{hotelSlider:state.hotelSlider-1})
      }
    case slideRight:
      switch(action.payload){
        case flightSlide:
          // if(state.flightSlider==0) return state;
          return Object.assign({},state,{flightSlider:state.flightSlider+1})
        case destinationSlide:
          // if(state.destinationSlider==0) return state;
          return Object.assign({},state,{destinationSlider:state.destinationSlider+1})
        case hotelSlide:
          // if(state.hotelSlider==0) return state;
          return Object.assign({},state,{hotelSlider:state.hotelSlider+1})
      }
    default:
      return state;
  }
}

const rootReducer=combineReducers({
  bookReducer:bookReducer,
  sliderReducer:sliderReducer
})

const store=createStore(rootReducer);

store.subscribe(()=>{
  console.log('State changed to',store.getState());
});

const mapStateToProps=(state)=>{
  return {
    flightStatus: state.bookReducer.flightStatus,
    destinationStatus: state.bookReducer.destinationStatus,
    hotelStatus: state.bookReducer.hotelStatus
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    book:function(payload){
      dispatch(bookActionCreator(payload))
    },
    unbook:function(payload){
      dispatch(unBookActionCreator(payload))
    },

  }
}

class BookerButtons extends Component{
  render(){
    return(
      <div className='Booker'>
        <h2>{this.props.title}</h2>
        <img className='optionImage' src={this.props.image}/><br/>
        <button className='leftButton'>&lt;</button>
        <button className='rightButton'>&gt;</button>
        <button className='bookButton' onClick={()=>this.props.book(this.props.booking)}>Book Now</button>
        <button className='unbookButton' onClick={()=>this.props.unbook(this.props.booking)}>Unbook</button>
      </div>
    )
  }
}

const Checkmark=(props)=>{
  switch(props.checked){
    case booked:
      return(
        <img className='Checkmark' src={checkmark}/>
      )
    case unbooked:
      return(
        <img className='Checkmark' src={xmark}/>
      )
    default: return this;
  }
}

class DisplayStatus extends Component{
  render(){
    return(
      <div id='DisplayStatus'>
        <h3>Your flight is {this.props.flightStatus}<Checkmark checked={this.props.flightStatus}/></h3>
        <h3>Your destination is {this.props.destinationStatus}<Checkmark checked={this.props.destinationStatus}/></h3>
        <h3>Your hotel is {this.props.hotelStatus}<Checkmark checked={this.props.hotelStatus}/></h3>
      </div>
    )
  }
}

const Booker = connect(mapStateToProps,mapDispatchToProps)(BookerButtons);
const Display = connect(mapStateToProps)(DisplayStatus);

const flightOptions=[
  <Booker booking={flight} title='Trusty Airlines' image="https://www.gannett-cdn.com/presto/2018/12/04/PLOU/e1a042e7-402a-413e-913d-c16e0d0b115f-GettyImages-912360406.jpg?width=534&height=401&fit=bounds&auto=webp"/>,
  <Booker booking={flight} title='NotTrusty Airlines' image="https://img1.coastalliving.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2018/01/main/aruba-flamingo-beach-685013591.jpg?itok=D2VWh31m"/>
]

const App=()=>{
  return(
    <div>
      <Header/>
      <Provider store={store}>
        <Display/>
        <div id='appContainer'>
          {flightOptions[0]}
          <Booker booking={destination} title='Aruba' image="https://img1.coastalliving.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2018/01/main/aruba-flamingo-beach-685013591.jpg?itok=D2VWh31m"/>
          <Booker booking={hotel} title='Holiday Inn' image="http://ihg.scene7.com/is/image/ihg/holiday-inn-the-colony-4629618286-4x3"/>
        </div>
      </Provider>
    </div>
  )
}

export default App;
