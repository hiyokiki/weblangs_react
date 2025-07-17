import React, { Component } from 'react'

class Header extends Component {
  shouldComponentUpdate(nextProps, nextState){   
    return false; 
  }
  render() {
    console.log('Header.js 실행');
    return (
      <>
        <header>
          <h1
            onClick={()=>{
              this.props.onChangeMode();
            }}
          
          >{this.props.title}</h1>
          <p>{this.props.desc}</p>
        </header>       
      </>
    )
  }
}

export default Header;
