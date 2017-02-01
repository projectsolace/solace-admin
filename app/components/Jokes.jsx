import React, { Component } from 'react';

import axios from 'axios'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLine } from 'victory';

export default class BonesJokes extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {

  }

  render() {

    return (
      <div id ='Admin'>
      <VictoryChart>
      <VictoryLine
  data={[
    {month: "September", profit: 35000, loss: 2000},
    {month: "October", profit: 42000, loss: 8000},
    {month: "November", profit: 55000, loss: 5000}
  ]}
  x="month"
  y="profit"
/>
</VictoryChart>


      </div>
    )
  }
}
