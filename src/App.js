import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import './vacationStyles.css';

const unbooked='unbooked';
const booked='booked';
const unbook='unbook';
const book='book';
const flight='flight';
const destination='destination';
const hotel='hotel';

const initialState={
  flightStatus: unbooked,
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
        case hotel:
          return Object.assign({},state,{hotelStatus: booked});
        default:
          return state;
      }
    case unbook:
      switch(action.payload){
        case flight:
          return Object.assign({},state,{flightStatus: unbooked});
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

class BookerButton extends Component{
  render(){
    return(
      <div className='BookerButton'>
        <img className='optionImage' src={this.props.img}/>
        <button onClick={()=>this.props.book(this.props.booking)}>Book Now</button>
      </div>
    )
  }
}
//()=>this.props.book('flight')
const Booker = connect(mapStateToProps,mapDispatchToProps)(BookerButton);

const App=()=>{
  return(
    <Provider store={store}>
      <Booker booking='flight' img="https://www.gannett-cdn.com/presto/2018/12/04/PLOU/e1a042e7-402a-413e-913d-c16e0d0b115f-GettyImages-912360406.jpg?width=534&height=401&fit=bounds&auto=webp"/>
      <Booker booking='hotel' img="http://ihg.scene7.com/is/image/ihg/holiday-inn-the-colony-4629618286-4x3"/>
    </Provider>
  )
}

export default App;
