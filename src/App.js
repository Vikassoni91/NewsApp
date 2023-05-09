import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
// import About from './components/About'

import {
  BrowserRouter,
  Route,
  Routes,
  // Link,
  // Switch,
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 6;
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0,
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <>
         {/* <Navbar/> */}
         {/* <News pageSize = {6} country={'in'} category={'sports'}/> */}
        {/* <News pageSize = {6} country={'in'} category={'science'}/> */}
        {/* {console.log(this.apiKey)} */}
        <BrowserRouter>
          <Navbar/>
          <LoadingBar
          height={3}
            color='#f11946'
            progress={this.state.progress}/>
          <Routes>
            {/* <Route exact path='/About' element={<About/>}/> */}
            <Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize = {this.pageSize} country={'in'} category={'general'}/>}/>
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize = {this.pageSize} country={'in'} category={'entertainment'}/>}/>
            <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize = {this.pageSize} country={'us'} category={'business'}/>}/>
            <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize = {this.pageSize} country={'in'} category={'sports'}/>}/>
            <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize = {this.pageSize} country={'in'} category={'health'}/>}/>
            <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize = {this.pageSize} country={'in'} category={'science'}/>}/>
            <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize = {this.pageSize} country={'in'} category={'technology'}/>}/>
          </Routes>
        </BrowserRouter>
      </>
    )
  }
}


