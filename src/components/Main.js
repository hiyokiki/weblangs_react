import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';

class Main extends Component {

  render() {
    console.log('Main.js 실행');
    let className = 'd-flex gap-2 flex-column justify-content-end';
    if(this.props.mode === 'welcome'){
      className += ' d-none';
    }
    return (
      <>
        <main className='shadow p-3 mb-5 bg-body-tertiary rounded'>
          <article>
            <h2>{this.props.data.title}</h2>
            <p>{this.props.data.desc}</p>            
            <div className={className}>
              <p>난이도: {this.props.data.difficulty}</p>            
              <hr/>
              <div className='d-flex gap-2 justify-content-end'>
                <Button variant="secondary" className="btn-sm" onClick={()=>{
                this.props.onChangeMode();
              }}>Modify</Button>
                <Button 
                  variant="danger" 
                  className="btn-sm" 
                  onClick={()=>{
                    this.props.deleteForm(this.props.data.id);
                  }}
                >Delete</Button>
              </div>
            </div>
          </article>
        </main> 
      </>
    )
  }
}

export default Main;
