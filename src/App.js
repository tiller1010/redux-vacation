import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import './vacationStyles.css';
import checkmark from './checkmark.png';
import xmark from './xmark.png';
import Header from './header.js';
import Footer from './footer.js';
import rootReducer from './reducers.js';

const unbooked='unbooked';
const booked='booked';
const unbook='unbook';
const book='book';
const flight='flight';
const destination='destination';
const hotel='hotel';
const slideLeft='slideLeft';
const slideRight='slideRight';

const store=createStore(rootReducer);

store.subscribe(()=>{
  console.log('State changed to',store.getState());
});

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

const mapStateToProps=(state)=>{
  return {
    flightStatus: state.bookReducer.flightStatus,
    destinationStatus: state.bookReducer.destinationStatus,
    hotelStatus: state.bookReducer.hotelStatus,
    flightSlider: state.sliderReducer.flightSlider,
    destinationSlider: state.sliderReducer.destinationSlider,
    hotelSlider: state.sliderReducer.hotelSlider
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
    slideLeft:function(payload){
      dispatch(slideLeftActionCreator(payload))
    },
    slideRight:function(payload){
      dispatch(slideRightActionCreator(payload))
    }
  }
}

class BookerButtons extends Component{
  render(){
    return(
      <div className='Booker'>
        <h2>{this.props.title}</h2>
        <img className='optionImage' src={this.props.image}/><br/>
        <button className='leftButton' onClick={()=>this.props.slideLeft(this.props.booking)}>&lt;</button>
        <button className='rightButton' onClick={()=>this.props.slideRight(this.props.booking)}>&gt;</button>
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
        <h4 id='displayFlight' class='statusDisplays'>Your flight is {this.props.flightStatus}<Checkmark checked={this.props.flightStatus}/></h4>
        <h4 id='displayDestination' class='statusDisplays'>Your destination is {this.props.destinationStatus}<Checkmark checked={this.props.destinationStatus}/></h4>
        <h4 id='displayHotel' class='statusDisplays'>Your hotel is {this.props.hotelStatus}<Checkmark checked={this.props.hotelStatus}/></h4>
      </div>
    )
  }
}

const FlightOptions=(props)=>{
  switch(props.flightSlider){
    case 0:
      return(
        <Booker booking={flight} title='Trusty Airlines' image={require("./images/trustyAirlines.jpg")}/>
      )
    case 1:
      return(
        <Booker booking={flight} title='Liberty Airlines' image={require("./images/libertyAirlines.jpg")}/>
      )
    case 2:
      return(
        <Booker booking={flight} title='Distance Airlines' image={require("./images/distanceAirlines.jpg")}/>
      )
    default: return this;
  }
}

const DestinationOptions=(props)=>{
  switch(props.destinationSlider){
    case 0:
      return(
        <Booker booking={destination} title='Aruba' image={require("./images/aruba.jpg")}/>
      )
    case 1:
      return(
        <Booker booking={destination} title='Fiji' image={require("./images/fiji.jpg")}/>
      )
    case 2:
      return(
        <Booker booking={destination} title='Costa Rica' image={require("./images/costarica.jpg")}/>
      )
    default: return this;
  }
}

const HotelOptions=(props)=>{
  switch(props.hotelSlider){
    case 0:
      return(
        <Booker booking={hotel} title='Holiday Inn' image={require("./images/holidayInn.jpg")}/>
      )
    case 1:
      return(
        <Booker booking={hotel} title='Fancies Hotel' image={require("./images/fancies.jpg")}/>
      )
    case 2:
      return(
        <Booker booking={hotel} title='JW Marriott' image={require("./images/jwMarriott.jpg")}/>
      )
    default: return this;
  }
}

const Booker = connect(mapStateToProps,mapDispatchToProps)(BookerButtons);
const Display = connect(mapStateToProps)(DisplayStatus);
const Fly = connect(mapStateToProps)(FlightOptions);
const Vacation = connect(mapStateToProps)(DestinationOptions);
const Stay = connect(mapStateToProps)(HotelOptions);

const App=()=>{
  return(
    <div>
      <Header/>
      <Provider store={store}>
        <Display/>
        <div id='appContainer'>
          <Fly/>
          <Vacation/>
          <Stay/>
        </div>
        <Footer/>
      </Provider>
    </div>
  )
}

export default App;
