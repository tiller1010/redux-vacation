import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import './vacationStyles.css';

const initialState={
  bookStatus: 'unbooked'
}

const bookActionCreator=()=>{
  return {type:'book'}
}

const reducer=(state=initialState,action)=>{
  switch(action.type){
    case 'book':
      return {bookStatus:'booked'}
    default:
      return state;
  }
}

const store=createStore(reducer);

store.subscribe(()=>{
  console.log('State changed to',store.getState());
});

const mapStateToProps=(state)=>{
  return {bookStatus:state.bookStatus}
}

const mapDispatchToProps=(dispatch)=>{
  return {
    bookHotel:function(){
      dispatch(bookActionCreator())
    }
  }
}

class BookerButton extends Component{
  render(){
    return(
      <div className='BookerButton'>
        <img className='hotelImage' src={this.props.img}/>
        <button onClick={this.props.bookHotel}>Book Now</button>
      </div>
    )
  }
}

const Booker = connect(mapStateToProps,mapDispatchToProps)(BookerButton);

const App=()=>{
  return(
    <Provider store={store}>
      <Booker img="http://ihg.scene7.com/is/image/ihg/holiday-inn-the-colony-4629618286-4x3"/>
    </Provider>
  )
}

export default App;
