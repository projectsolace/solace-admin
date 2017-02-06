import React, { Component } from 'react';

import axios from 'axios'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import {fetchReligionData, fetchOccupationData, fetchIncomeData, fetchEthnicityData, fetchEducationData, fetchMaritalData, fetchZipCodeData, fetchGenderData} from '../reducers/admin'
import store from '../store'
import BarChart from './BarChart';
import Slider from 'react-slick';
import { religionTypes, occupationTypes, incomeTypes, ethnicityTypes, educationTypes, maritalStatusTypes, genderTypes } from '../dataList';


export default class Chart extends Component {
  constructor(props){
    super(props);
    this.state = {
      religion: "",
      occupation:"",
      income:"",
      marital:"",
      education:"",
      ethnicity:"",
      zip:"",
      gender:"",
      currentGraph:{personality:[], tone:[]},
      loadingClass:"loader"
    }

    this.onSubmitReligionHandler = this.onSubmitReligionHandler.bind(this)
    this.onSubmitOccupationHandler = this.onSubmitOccupationHandler.bind(this)
    this.onSubmitIncomeHandler = this.onSubmitIncomeHandler.bind(this)
    this.onSubmitMaritalHandler = this.onSubmitMaritalHandler.bind(this)
    this.onSubmitEducationHandler = this.onSubmitEducationHandler.bind(this)
    this.onSubmitEthnicityHandler = this.onSubmitEthnicityHandler.bind(this)
    this.onSubmitZipHandler = this.onSubmitZipHandler.bind(this)
    this.onSubmitGenderHandler = this.onSubmitGenderHandler.bind(this)

  }

   Loader() {<div className="loader">Loading...</div>}


  // Not using native event, value !== event
  onSubmitReligionHandler(value){
    axios.get(`api/admin/religion/${value}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    });
  }

  onSubmitOccupationHandler(value){
     axios.get(`api/admin/occupation/${value}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    });
  }

  onSubmitIncomeHandler(value){
    console.log('here begin')
    axios.get(`api/admin/incomeLevel/${value}`)
    .then(response => {
      console.log('here end')
      this.setState({currentGraph: response.data});
    });
  }

  onSubmitMaritalHandler(value){
    axios.get(`api/admin/maritalStatus/${value}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    });
  }

  onSubmitEducationHandler(value){
    axios.get(`api/admin/education/${value}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    });
  }

  onSubmitEthnicityHandler(value){
    axios.get(`api/admin/ethnicity/${value}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    });
  }

  onSubmitZipHandler(value){
    axios.get(`api/admin/zipCode/${value}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    });
  }

  onSubmitGenderHandler(value){
    axios.get(`api/admin/gender/${value}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    });
    // store.dispatch(fetchGenderData(this.state.gender))
  }


  componentDidMount() {

  }

  render() {

    const { logout, user } = this.props;

    let educationList = educationTypes.map((education, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onSubmitEducationHandler(education)} >{education}</li>
      );
    });

    let ethnicityList = ethnicityTypes.map((ethnicity, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onSubmitEthnicityHandler(ethnicity)} >{ethnicity}</li>
      );
    });

    let religionList = religionTypes.map((religion, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onSubmitReligionHandler(religion)} >{religion}</li>
      );
    });

    let occupationList = occupationTypes.map((occupation, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onSubmitOccupationHandler(occupation)} >{occupation}</li>
      );
    });

    let genderList = genderTypes.map((gender, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onSubmitGenderHandler(gender)} >{gender}</li>
      );
    });

    let incomeList = incomeTypes.map((income, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onSubmitIncomeHandler(income)} >{income}</li>
      );
    });

    let maritalStatusList = maritalStatusTypes.map((maritalStatus, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onSubmitMaritalHandler(maritalStatus)} >{maritalStatus}</li>
      );
    });



    let personality = this.state.currentGraph.personality
    let count = 1
    let tonecount = 1
    let data= personality.sort(function(a,b){return b.score - a.score}).map(function(obj){return {x:count++,y:obj.score*100}})
    let labels= personality.map(function(obj){return obj.quality+` ${(obj.score*100).toFixed(2)}%`})
    let tone = this.state.currentGraph.tone
    let tonaldata= tone.sort(function(a,b){return b.score - a.score}).map(function(obj){return {x:tonecount++,y:obj.score*100}})
    let tonelabels= tone.map(function(obj){return obj.quality+` ${(obj.score*100).toFixed(2)}%`})
    if(this.props.user.isAdmin === false){
      return (
         <div>
            THIS PAGE IS ONLY FOR ADMINS PLEASE LOGIN THROUGH APP
        </div>
     )
    }
    else if(this.props.user.isAdmin){
    return (
      <div id="wrapper">

        <nav className ="navbar navbar-inverse navbar-fixed-top" role="navigation">

            <div className ="navbar-header">
                <button type="button" className ="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span className ="sr-only">Toggle navigation</span>
                    <span className ="icon-bar"></span>
                    <span className ="icon-bar"></span>
                    <span className ="icon-bar"></span>
                </button>
                <a className ="navbar-brand" href="index.html">Solace | Dashboard</a>
            </div>

            <ul className ="nav navbar-right top-nav">

                <li className ="dropdown">
                    <a href="#" className ="dropdown-toggle" data-toggle="dropdown"><i className ="fa fa-user"></i> {user.firstName }<b className ="caret"></b></a>
                    <ul className ="dropdown-menu">
                        <li>
                            <a href="#"><i className ="fa fa-fw fa-gear"></i> Settings</a>
                        </li>
                        <li className ="divider"></li>
                        <li>
                            <p className="logout" onClick={logout}>Logout</p>
                        </li>

                    </ul>
                </li>
            </ul>

            <div className ="collapse navbar-collapse navbar-ex1-collapse">
                <ul className ="nav navbar-nav side-nav">

                    <li>
                        <a className ="active" href="javascript:;" data-toggle="collapse" data-target="#education"><i className ="fa fa-fw fa-book"></i> Education <i className ="fa fa-fw fa-caret-down"></i></a>
                        <ul id="education" className ="collapse"> { educationList } </ul>
                    </li>

                     <li>
                        <a href="javascript:;" data-toggle="collapse" data-target="#ethnicity"><i className ="fa fa-users"></i> Ethnicity <i className ="fa fa-fw fa-caret-down"></i></a>
                        <ul id="ethnicity" className ="collapse"> { ethnicityList } </ul>
                    </li>

                    <li>
                        <a href="javascript:;" data-toggle="collapse" data-target="#gender"><i className ="fa fa-venus-mars"></i> Gender <i className ="fa fa-fw fa-caret-down"></i></a>
                        <ul id="gender" className ="collapse"> { genderList } </ul>
                    </li>

                    <li>
                        <a href="javascript:;" data-toggle="collapse" data-target="#income"><i className ="fa fa-money"></i> Income <i className ="fa fa-fw fa-caret-down"></i></a>
                        <ul id="income" className ="collapse"> { incomeList } </ul>
                    </li>

                     <li>
                        <a href="javascript:;" data-toggle="collapse" data-target="#maritalStatus"><i className ="fa fa-heartbeat"></i> Marital Status <i className ="fa fa-fw fa-caret-down"></i></a>
                        <ul id="maritalStatus" className ="collapse"> { maritalStatusList } </ul>
                    </li>

                    <li>
                        <a href="javascript:;" data-toggle="collapse" data-target="#occupation"><i className ="fa fa-briefcase"></i> Occupation <i className ="fa fa-fw fa-caret-down"></i></a>
                        <ul id="occupation" className ="collapse"> { occupationList } </ul>
                    </li>

                    <li>
                        <a href="javascript:;" data-toggle="collapse" data-target="#religion"><i className ="fa fa-sign-language"></i> Religion <i className ="fa fa-fw fa-caret-down"></i></a>
                        <ul id="religion" className ="collapse"> { religionList } </ul>
                    </li>

                    <li>
                        <a href="javascript:;" data-toggle="collapse" data-target="#zip"><i className ="fa fa-address-book-o"></i> Zip Code <i className ="fa fa-fw fa-caret-down"></i></a>
                        <div className="row">
                              <div className="col-md-1">
                              </div>
                              <div className="col-md-7">
                                <div className="input-group">
                                  <form id = "zip" className ="collapse" onSubmit={this.onSubmitZipHandler}>
                                    <input className ="form-control" placeholder= "Enter zip code" onChange={(event) => this.setState({zip: event.target.value})}/>

                                  </form>
                                </div>
                              </div>
                        </div>

                    </li>
                </ul>
            </div>

        </nav>

            <div id="page-wrapper">
                <div className ="container-fluid">
                    <div className ="row">
                        <div className ="col-lg-12">
                            <div className={this.state.loadingClass}> Loading...</div>
                           <BarChart data={data} labels={labels} tonaldata={tonaldata} tonelabels={tonelabels}/>
                        </div>
                    </div>
                </div>
            </div>

      </div>
    )
  }
    return (
      <div>
      </div>
    )
  }
}
