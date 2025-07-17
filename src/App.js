import './App.css';

import React, { Component } from 'react'
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Button from 'react-bootstrap/Button';
import Create from './components/Create';
import Modify from './components/Modify';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode:'welcome',
      selected_id:0,
      max_id:3,
      subject:{title:'React', desc:'Single page application'},
      welcome:{title:'Welcome', desc:'Welcome to React',},
      menus:[
        {id:1, title:'HTML', desc:'Hypertext markup language', difficulty: 1},
        {id:2, title:'CSS', desc:'CSS is for Design', difficulty: 2},
        {id:3, title:'Javascript', desc:'Javascript is for interation', difficulty: 3}
      ]
    }
  }
  getArticles(){
    const {mode} = this.state;
    let _main = null;

    if(mode === 'welcome'){
      _main = <Main data={this.state.welcome} mode={this.state.mode} />;
    } else if(mode === 'read'){
      _main = 
      <Main 
        data={this.getReadArticle()} 
        onChangeMode={(title, desc ,difficulty )=>{
          this.setState({
            mode:'modify'
          });
        }}
        deleteForm={(id)=>{
          console.log(id);
          if(window.confirm('정말 삭제할까요')){
            let _menus = [...this.state.menus];

            let del_id = _menus.findIndex(m=>m.id === id);
            _menus.splice(del_id,1); 

            this.setState({
              mode:'welcome',
              menus:_menus
            });
          }
        }}   
      />;
      /*
      let i = 0;
      while(i<this.state.menus.length){
        let data = this.state.menus[i];
          if(data.id === this.state.selected_id){
          _title = data.title;
          _desc = data.desc;
          }
        i++;
      }     
      */
    } else if(mode === 'create'){
      _main = <Create createForm={(title,desc,difficulty)=>{
        console.log(title, desc);
      let new_max_id=  this.state.max_id = this.state.max_id + 1;

        let _menus =  this.state.menus.concat(
          {id:new_max_id, title:title, desc:desc , difficulty:difficulty}
        )
        this.setState({
          mode:'welcome',
          menus:_menus,
          max_id:new_max_id
        });
      }}/>;
    }else if(mode === 'modify'){
      _main = <Modify 
        data={this.getReadArticle()} 
        modifyForm={(title,desc, difficulty )=>{
          
          //메뉴 내용 수정
          let _menus = this.state.menus.map(m =>           
            m.id === this.state.selected_id 
            // ? {id:m.id, title:title, desc:desc} 
            ? {...m, title, desc, difficulty} 
            :  m
          );
          /*
          let _menus = this.state.menus.map((m)=>{
             if(m.id === this.state.selected_id){
              return{id:m.id, title:title, desc:desc}
            }else{
              return m;
            }
          });
          */

          /*
          let _menus = [...this.state.menus];
          
          let i = 0;
          while(i<_menus.length){
            if(_menus[i].id === this.state.selected_id){
              _menus[i] = {id:_menus[i].id, title:title, desc:desc};
              break;
            }
            i++;
          }
          */
          this.setState({
            mode:'read',
            menus:_menus
          });

        }}      
   
      />;
    }
    return _main;
  }
  getReadArticle(){
    let data = this.state.menus.find(m=> m.id === this.state.selected_id);
    return data;
  }
  render() {
    console.log('App.js 실행');   

    return (
      <div className='container'>
        <Header title={this.state.subject.title} desc={this.state.subject.desc} onChangeMode={()=>{
          this.setState({
            mode:'welcome'
          });
        }} />
        {/* <header>
          <h1 onClick={()=>{
            alert('반갑습니다');
            //this.state.mode = 'read';
            this.setState({
              mode:'read'
            })
          }}>{this.state.subject.title}</h1>
          <p>{this.state.subject.desc}</p>
        </header>        */}
        <Nav data={this.state.menus} onChangeMode={(id)=>{
          console.log(id);
          this.setState({
            mode:'read',
            selected_id:id
          });
        }} />        
        {this.getArticles()}
        <hr/>
        <div className='d-flex justify-content-end'>
          <Button variant="primary" onClick={()=>{
            this.setState({
              mode:'create'
            })
          }}>Create</Button>
        </div>
        
      </div>        
    )
  }
}
export default App;
/*
function App() {
  return (
    <>
      <header>
        <h1>React</h1>
        <p>Single page application</p>
      </header>
      <nav>
        <ul>
          <li><a href="">HTML</a></li>
          <li><a href="">CSS</a></li>
          <li><a href="">Javascript</a></li>
        </ul>
      </nav>
      <main>
        <article>
          <h2>HTML</h2>
          <p>Hypertext Markup language</p>
        </article>
      </main>
    </>
  );
}

export default App;
*/
