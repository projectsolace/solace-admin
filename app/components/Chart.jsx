import React, { Component } from 'react';

import axios from 'axios'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import {fetchReligionData, fetchOccupationData, fetchIncomeData, fetchEthnicityData, fetchEducationData, fetchMaritalData, fetchZipCodeData, fetchGenderData} from '../reducers/admin'
import store from '../store'
import BarChart from './BarChart'

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
      currentGraph:{personality:[], tone:[]}

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



  onSubmitReligionHandler(event){
    event.preventDefault()
    axios.get(`api/admin/religion/${this.state.religion}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    })
    // store.dispatch(fetchReligionData(this.state.religion))
  }
   onSubmitOccupationHandler(event){
    event.preventDefault()
     axios.get(`api/admin/occupation/${this.state.occupation}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    })
    // store.dispatch(fetchOccupationData(this.state.occupation))
  }
   onSubmitIncomeHandler(event){
    event.preventDefault()
    axios.get(`api/admin/incomeLevel/${this.state.income}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    })

   //store.dispatch(fetchIncomeData(this.state.income))
  }
   onSubmitMaritalHandler(event){
    event.preventDefault()
    axios.get(`api/admin/maritalStatus/${this.state.marital}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    })
    // store.dispatch(fetchMaritalData(this.state.marital))
  }
   onSubmitEducationHandler(event){
    event.preventDefault()
    axios.get(`api/admin/education/${this.state.education}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    })
   //store.dispatch(fetchEducationData(this.state.education))
  }
   onSubmitEthnicityHandler(event){
    event.preventDefault()
    axios.get(`api/admin/ethnicity/${this.state.ethnicity}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    })
   // store.dispatch(fetchEthnicityData(this.state.ethnicity))
  }
   onSubmitZipHandler(event){
    event.preventDefault()
    axios.get(`api/admin/zipCode/${this.state.zip}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    })
    // store.dispatch(fetchZipCodeData(this.state.zip))
  }
   onSubmitGenderHandler(event){
    event.preventDefault()
    axios.get(`api/admin/gender/${this.state.gender}`)
    .then(response => {
      this.setState({currentGraph: response.data});
    })
    // store.dispatch(fetchGenderData(this.state.gender))
  }


  componentDidMount() {

  }

  render() {
    const { logout } = this.props;

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


        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">


                  ADMIN PANEL
                <button className="logout" onClick={logout}>Logout</button>
                <br/>
                <span> Religion </span>
                 <form onSubmit={this.onSubmitReligionHandler}>
                <select onChange={(event) => this.setState({religion: event.target.value})}>
                  <option value="Protestant">Select</option>
                  <option value="Protestant">Protestant</option>
                  <option value="Catholic">Catholic</option>
                  <option value="Mormon">Mormon</option>
                  <option value="Judaism">Judaism</option>
                  <option value="Islam">Islam</option>
                  <option value="Buddhism">Buddhism</option>
                  <option value="Hinduism">Hinduism</option>
                  <option value="Other">Other</option>
                  <option value="Unaffiliated">Unaffiliated</option>
                </select>
                <input type='submit'/>
                </form>
                  <br/>
                  <span> Occupation </span>
                 <form onSubmit={this.onSubmitOccupationHandler}>
                <select onChange={(event) => this.setState({occupation: event.target.value})}>
                  <option value="Sales">Select</option>
                  <option value="Sales">Sales</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Custodial">Custodial</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Teaching">Teaching</option>
                  <option value="Law-Enforcement">Law Enforcement</option>
                  <option value="Law">Law</option>
                  <option value="Finance">Finance</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Administration">Administration</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
                <input type='submit'/>
                </form>
                  <br/>
                 <span> Income Level </span>
                  <form onSubmit={this.onSubmitIncomeHandler}>
                <select onChange={(event) => this.setState({income: event.target.value})}>
                  <option value="Under-$15,000">Select</option>
                  <option value="Under-$15,000">Under $15,000</option>
                  <option value="$15,000-to-$24,999">$15,000 to $24,999</option>
                  <option value="$25,000-to-$34,999">$25,000 to $34,999</option>
                  <option value="$35,000-to-$49,999">$35,000 to $49,999</option>
                  <option value="$50,000-to-$74,999">$50,000 to $74,999</option>
                  <option value="$75,000-to-$99,999">$75,000 to $99,999</option>
                  <option value="$100,000-to-$149,999">$100,000 to $149,999</option>
                  <option value="$150,000-to-$199,999">$150,000 to $199,999</option>
                  <option value="$200,000-and-over">$200,000 and over</option>
                </select>
                <input type='submit'/>
                </form>
                  <br/>
                   <span> Education </span>
                  <form onSubmit={this.onSubmitEducationHandler}>
                <select onChange={(event) => this.setState({education: event.target.value})}>
                  <option value="High-School">Select</option>
                  <option value="High-School">High School</option>
                  <option value="Some-College">Some College</option>
                  <option value="Associate-Degree">Associate Degree</option>
                  <option value="Bachelor-Degree">Bachelor Degree</option>
                  <option value="Advanced-Degree">Advanced-Degree</option>
                </select>
                <input type='submit'/>
                </form>
                  <br/>
                 <span> Marital </span>
                  <form onSubmit={this.onSubmitMaritalHandler}>
                <select onChange={(event) => this.setState({marital: event.target.value})}>
                  <option value="Single">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                </select>
                <input type='submit'/>
                </form>
                  <br/>
                  <span> Zip </span>
                  <form onSubmit={this.onSubmitZipHandler}>
                  <input onChange={(event) => this.setState({zip: event.target.value})}/>
                  <input type='submit'/>
                  </form>
                  <br/>
                  <span> Gender </span>
                  <form onSubmit={this.onSubmitGenderHandler}>
                <select onChange={(event) => this.setState({gender: event.target.value})}>
                  <option value="female">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                <input type='submit'/>
                </form>
                  <br/>
                 <span> Ethnicity </span>
                  <form onSubmit={this.onSubmitEthnicityHandler}>
                <select onChange={(event) => this.setState({ethnicity: event.target.value})}>
                  <option value="White">Select</option>
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                  <option value="Hispanic">Hispanic</option>
                  <option value="Asian">Asian</option>
                  <option value="American-Indian/Alaska-Native">American Indian/Alaska Native</option>
                  <option value="Hawaiian/Other-Pacific-Islander">Hawaiian/Other Pacific Islander</option>
                  <option value="Other">Other</option>
                </select>
                <input type='submit'/>
                </form>
                  <br/>
            </li>
          </ul>
      </div>

<div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
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
    PLEASE LOGIN AS AN ADMIN
    </div>

    )
  }
}
