import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

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
      <button onClick={this.props.bookHotel}>Book Now</button>
    )
  }
}

const Booker = connect(mapStateToProps,mapDispatchToProps)(BookerButton);

const App=()=>{
  return(
    <Provider store={store}>
      <Booker/>
    </Provider>
  )
}

export default App;
