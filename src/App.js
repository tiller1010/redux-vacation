import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import './vacationStyles.css';
import checkmark from './checkmark.png';
import xmark from './xmark.png';
import Header from './header.js';
import Footer from './footer.js';
import Circles from './circles.js';
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
const none='none';
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
    flightChoice: state.bookReducer.flightChoice,
    destinationChoice: state.bookReducer.destinationChoice,
    hotelChoice: state.bookReducer.hotelChoice,
    flightSlider: state.sliderReducer.flightSlider,
    destinationSlider: state.sliderReducer.destinationSlider,
    hotelSlider: state.sliderReducer.hotelSlider,
    flightCost: state.bookReducer.flightCost,
    destinationCost: state.bookReducer.destinationCost,
    hotelCost: state.bookReducer.hotelCost
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
        <span className='cost' style={{position: 'absolute'}}>${this.props.booking.cost}</span>
        <button style={{visibility: this.props.leftVisible}} className='leftButton' onClick={()=>this.props.slideLeft(this.props.booking.category)}>&lt;</button>
        <button style={{visibility: this.props.rightVisible}} className='rightButton' onClick={()=>this.props.slideRight(this.props.booking.category)}>&gt;</button>
        <button className='bookButton' onClick={()=>this.props.book(this.props.booking)}>Book Now</button>
        <button className='unbookButton' onClick={()=>this.props.unbook(this.props.booking)}>Unbook</button>
        <hr className='lineSeperator'/>
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
        <h4 id='displayFlight' className='statusDisplays'>Your flight is {this.props.flightStatus}<Checkmark checked={this.props.flightStatus}/>
          <div className='choiceContainer'>
            {this.props.flightChoice!==none && <h3 className='choice'>{this.props.flightChoice}</h3>}
            {this.props.flightChoice!==none && this.props.destinationChoice!==none && <Circles/>}
          </div>
        </h4>
        <h4 id='displayDestination' className='statusDisplays'>Your destination is {this.props.destinationStatus}<Checkmark checked={this.props.destinationStatus}/>
          <div className='choiceContainer'>
            {this.props.destinationChoice!==none && <h3 id='destinationChoice' className='choice'>{this.props.destinationChoice}</h3>}
            {this.props.destinationChoice!==none && this.props.hotelChoice!==none && <Circles/>}
          </div>
        </h4>
        <h4 id='displayHotel' className='statusDisplays'>Your hotel is {this.props.hotelStatus}<Checkmark checked={this.props.hotelStatus}/>
          <div className='choiceContainer'>
            {this.props.hotelChoice!==none && <h3 className='choice'>{this.props.hotelChoice}</h3>}
          </div>
        </h4>

        <Purchase/>

      </div>
    )
  }
}

const FlightOptions=(props)=>{
  switch(props.flightSlider){
    case 0:
      return(
        <Booker leftVisible='hidden' booking={{category:flight, choice:'Trusty Airlines', cost: 122}} title='Trusty Airlines' image={require("./images/trustyAirlines.jpg")}/>
      )
    case 1:
      return(
        <Booker booking={{category:flight, choice:'Liberty Airlines', cost: 162}} title='Liberty Airlines' image={require("./images/libertyAirlines.jpg")}/>
      )
    case 2:
      return(
        <Booker rightVisible='hidden' booking={{category:flight, choice:'Distance Airlines', cost: 110}} title='Distance Airlines' image={require("./images/distanceAirlines.jpg")}/>
      )
    default: return this;
  }
}

const DestinationOptions=(props)=>{
  switch(props.destinationSlider){
    case 0:
      return(
        <Booker leftVisible='hidden' booking={{category:destination, choice:'Aruba', cost: 177}} title='Aruba' image={require("./images/aruba.jpg")}/>
      )
    case 1:
      return(
        <Booker booking={{category:destination, choice:'Fiji', cost: 104}} title='Fiji' image={require("./images/fiji.jpg")}/>
      )
    case 2:
      return(
        <Booker rightVisible='hidden' booking={{category:destination, choice:'Costa Rica', cost: 184}} title='Costa Rica' image={require("./images/costarica.jpg")}/>
      )
    default: return this;
  }
}

const HotelOptions=(props)=>{
  switch(props.hotelSlider){
    case 0:
      return(
        <Booker leftVisible='hidden' booking={{category:hotel, choice:'Holiday Inn', cost: 134}} title='Holiday Inn' image={require("./images/holidayInn.jpg")}/>
      )
    case 1:
      return(
        <Booker booking={{category:hotel, choice:'Fancies Hotel', cost: 193}} title='Fancies Hotel' image={require("./images/fancies.jpg")}/>
      )
    case 2:
      return(
        <Booker rightVisible='hidden' booking={{category:hotel, choice:'JW Marriott', cost: 123}} title='JW Marriott' image={require("./images/jwMarriott.jpg")}/>
      )
    default: return this;
  }
}

class PurchaseButton extends Component{
  purchaseNow(){
    alert('Thank you, enjoy your stay!')
    store.dispatch(unBookActionCreator({category:flight}));
    store.dispatch(unBookActionCreator({category:destination}));
    store.dispatch(unBookActionCreator({category:hotel}));
  }

  render(){

    let cost=this.props.flightCost+this.props.destinationCost+this.props.hotelCost;

    if(cost > 0){
      return(
        <div className='Purchase'>
          <h4 id='totalCost'>${this.props.flightCost+this.props.destinationCost+this.props.hotelCost}</h4>
          {this.props.flightStatus===booked && this.props.destinationStatus===booked && this.props.hotelStatus===booked && <button className='finalPurchase' onClick={this.purchaseNow}>Book your stay now!</button>}
        </div>
      )
    }

    else return(null);
  }
}

const Booker = connect(mapStateToProps,mapDispatchToProps)(BookerButtons);
const Display = connect(mapStateToProps)(DisplayStatus);
const Fly = connect(mapStateToProps)(FlightOptions);
const Vacation = connect(mapStateToProps)(DestinationOptions);
const Stay = connect(mapStateToProps)(HotelOptions);
const Purchase = connect(mapStateToProps)(PurchaseButton);

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
