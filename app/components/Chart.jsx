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
     { /* loadingClass and chartContainer variable to toggle packman animation */ }
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
      chartHeading:"Select sidebar to view data",
      chartSubHeading: "",
      loadingClass:"hidden",
      chartContainer: "none"
    };

    // this.onSubmitReligionHandler = this.onSubmitReligionHandler.bind(this)
    this.onSubmitZipHandler = this.onSubmitZipHandler.bind(this);
    this.onDemographicHandler = this.onDemographicHandler.bind(this);
    this.convertDemographicStr = this.convertDemographicStr.bind(this);

  }

  // Saved this code for future reference. How api call looks like
  // onSubmitReligionHandler(value){
  //   this.setState({loadingClass: "la-pacman", chartContainer: "hidden", chartHeading: "Religion", chartSubHeading: `${value}`})
  //   axios.get(`api/admin/religion/${value}`)
  //   .then(response => {
  //     this.setState({loadingClass: "none", currentGraph: response.data});
  //   });
  // }

  onSubmitZipHandler(event){
    event.preventDefault();
    this.setState({loadingClass: "la-pacman", chartContainer: "hidden", chartHeading: "Zip Code", chartSubHeading: this.state.zip});
    axios.get(`api/admin/zipCode/${this.state.zip}`)
    .then(response => {
      this.setState({loadingClass: "none", chartContainer: "none", currentGraph: response.data});
    });
  }

  onDemographicHandler(demographic, demoCategory){
    let demographicStr = this.convertDemographicStr(demographic);
    this.setState({loadingClass: "la-pacman", chartContainer: "hidden", chartHeading: `${demographicStr}`, chartSubHeading: demoCategory});
    axios.get(`api/admin/${demographic}/${demoCategory}`)
    .then(response => {
      this.setState({loadingClass: "none", chartContainer: "none", currentGraph: response.data});
    });
  }

  convertDemographicStr(demoStr) {
    if(demoStr === "incomelevel"){
      return "Income Level";
    } else if (demoStr === "maritalStatus") {
      return "Marital Status";
    } else {
      return  demoStr.charAt(0).toUpperCase() + demoStr.slice(1);
    }
  }

  componentDidMount() {

  }

  render() {

    const { logout, user } = this.props;

    const incomeList = incomeTypes.map((incomeCategory, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onDemographicHandler("incomelevel", incomeCategory)} > {incomeCategory} </li>
      );
    });

    const educationList = educationTypes.map((educationCategory, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onDemographicHandler("education", educationCategory)} >{educationCategory}</li>
      );
    });

    const ethnicityList = ethnicityTypes.map((ethnicityCategory, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onDemographicHandler("ethnicity", ethnicityCategory)} >{ethnicityCategory}</li>
      );
    });

    const religionList = religionTypes.map((religionCategory, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onDemographicHandler("religion", religionCategory )} >{religionCategory}</li>
      );
    });

    const occupationList = occupationTypes.map((occupationCategory, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onDemographicHandler("occupation", occupationCategory)} >{occupationCategory}</li>
      );
    });

    const genderList = genderTypes.map((genderCategory, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onDemographicHandler("gender", genderCategory)} >{genderCategory}</li>
      );
    });


    const maritalStatusList = maritalStatusTypes.map((maritalStatusCategory, i ) => {
      return (
         <li className  = "chartOption"  key={i} onClick={(event) => this.onDemographicHandler("maritalStatus", maritalStatusCategory)} >{maritalStatusCategory}</li>
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
                        <a href="javascript:;" data-toggle="collapse" data-target="#education"><i className ="fa fa-fw fa-book"></i> Education <i className ="fa fa-fw fa-caret-down"></i></a>
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

            <div id="page-wrapper" >
                <div className ="container-fluid">
                    <div className ="row">
                        <div className ="col-lg-12">
                          {/* Pacman loading screen */}
                          <div className='loaderContainer'>
                            {/* These empty divs are for packman animation */}
                              <div className={this.state.loadingClass}>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                              </div>
                          </div>

                        </div>
                        <div className={this.state.chartContainer}>
                          <div id="chartHeading">{this.state.chartHeading}: {this.state.chartSubHeading }</div>
                         <BarChart  data={data} labels={labels} tonaldata={tonaldata} tonelabels={tonelabels}/>
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
