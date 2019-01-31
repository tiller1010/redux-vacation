import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import './vacationStyles.css';
import Header from './header.js';

const unbooked='unbooked';
const booked='booked';
const unbook='unbook';
const book='book';
const flight='flight';
const destination='destination';
const hotel='hotel';

const initialState={
  flightStatus: unbooked,
  destinationStatus: unbooked,
  hotelStatus: unbooked
}

const bookActionCreator=(payload)=>{
  return {type:book, payload: payload}
}

const unBookActionCreator=(payload)=>{
  return {type:unbook, payload: payload}
}

const reducer=(state=initialState,action)=>{
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

const store=createStore(reducer);

store.subscribe(()=>{
  console.log('State changed to',store.getState());
});

const mapStateToProps=(state)=>{
  return {
    flightStatus: state.flightStatus,
    destinationStatus: state.destinationStatus,
    hotelStatus: state.hotelStatus
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    book:function(payload){
      dispatch(bookActionCreator(payload))
    },
    unbook:function(payload){
      dispatch(unBookActionCreator(payload))
    }
  }
}

// store.dispatch(bookActionCreator('flight'));

class BookerButtons extends Component{
  render(){
    return(
      <div className='Booker'>
        <h2>{this.props.title}</h2>
        <img className='optionImage' src={this.props.image}/><br/>
        <button className='bookButton' onClick={()=>this.props.book(this.props.booking)}>Book Now</button>
        <button className='unbookButton' onClick={()=>this.props.unbook(this.props.booking)}>Unbook</button>
      </div>
    )
  }
}

class DisplayStatus extends Component{
  render(){
    return(
      <div id='DisplayStatus'>
        <h3>Your flight is {this.props.flightStatus}</h3>
        <h3>Your destination is {this.props.destinationStatus}</h3>
        <h3>Your hotel is {this.props.hotelStatus}</h3>
      </div>
    )
  }
}

const Booker = connect(mapStateToProps,mapDispatchToProps)(BookerButtons);
const Display = connect(mapStateToProps)(DisplayStatus);

const App=()=>{
  return(
    <div>
      <Header/>
      <Provider store={store}>
        <Display/>
        <div id='appContainer'>
          <Booker booking={flight} title='Trusty Airlines' image="https://www.gannett-cdn.com/presto/2018/12/04/PLOU/e1a042e7-402a-413e-913d-c16e0d0b115f-GettyImages-912360406.jpg?width=534&height=401&fit=bounds&auto=webp"/>
          <Booker booking={destination} title='Aruba' image="https://img1.coastalliving.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2018/01/main/aruba-flamingo-beach-685013591.jpg?itok=D2VWh31m"/>
          <Booker booking={hotel} title='Holiday Inn' image="http://ihg.scene7.com/is/image/ihg/holiday-inn-the-colony-4629618286-4x3"/>
        </div>
      </Provider>
    </div>
  )
}

export default App;
