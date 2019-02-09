import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import './vacationStyles.css';
import checkmark from './checkmark.png';
import xmark from './xmark.png';
import Header from './header.js';
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
        <h3>Your flight is {this.props.flightStatus}<Checkmark checked={this.props.flightStatus}/></h3>
        <h3>Your destination is {this.props.destinationStatus}<Checkmark checked={this.props.destinationStatus}/></h3>
        <h3>Your hotel is {this.props.hotelStatus}<Checkmark checked={this.props.hotelStatus}/></h3>
      </div>
    )
  }
}

const FlightOptions=(props)=>{
  switch(props.flightSlider){
    case 0:
      return(
        <Booker booking={flight} title='Trusty Airlines' image="https://www.gannett-cdn.com/presto/2018/12/04/PLOU/e1a042e7-402a-413e-913d-c16e0d0b115f-GettyImages-912360406.jpg?width=534&height=401&fit=bounds&auto=webp"/>
      )
    case 1:
      return(
        <Booker booking={flight} title='Liberty Airlines' image="https://www.libertytravel.com/sites/default/files/styles/full_size/public/flight-hero.jpg?itok=hhscHSGZ"/>
      )
    case 2:
      return(
        <Booker booking={flight} title='Distance Airlines' image="https://s3.r29static.com//bin/entry/90c/0,0,2000,2400/720x864,80/2014524/image.jpg"/>
      )
    default: return this;
  }
}

const DestinationOptions=(props)=>{
  switch(props.destinationSlider){
    case 0:
      return(
        <Booker booking={destination} title='Aruba' image="https://img1.coastalliving.timeinc.net/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2018/01/main/aruba-flamingo-beach-685013591.jpg?itok=D2VWh31m"/>
      )
    case 1:
      return(
        <Booker booking={destination} title='Fiji' image="https://cdn.newsapi.com.au/image/v1/91c1263a2a357b3673af8ff8362c0c8d?width=1024"/>
      )
    case 2:
      return(
        <Booker booking={destination} title='Costa Rica' image="https://kippewa.com/wp-content/uploads/sites/11/2017/08/costa-rica-waterfall.jpg"/>
      )
    default: return this;
  }
}

const HotelOptions=(props)=>{
  switch(props.hotelSlider){
    case 0:
      return(
        <Booker booking={hotel} title='Holiday Inn' image="http://ihg.scene7.com/is/image/ihg/holiday-inn-the-colony-4629618286-4x3"/>
      )
    case 1:
      return(
        <Booker booking={hotel} title='Fancies Hotel' image="https://www.amtrak.com/content/dam/projects/dotcom/english/public/images/text-with-image-square/hotel-building-pool.jpg/_jcr_content/renditions/cq5dam.web.600.600.jpeg"/>
      )
    case 2:
      return(
        <Booker booking={hotel} title='JW Marriott' image="https://images.trvl-media.com/hotels/5000000/4270000/4268800/4268725/04571eea_z.jpg"/>
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
      </Provider>
    </div>
  )
}

export default App;
