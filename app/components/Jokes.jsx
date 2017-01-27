import React, { Component } from 'react';
import axios from 'axios'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

export default class BonesJokes extends Component {
  constructor(props){
    super(props);
    this.state = {
      personality: [],
      tone: []
    }
  }

  componentDidMount() {
    // axios.get('/api/watson')
    //   .then(res => res.data)
    //   .then(data => {
    //     this.setState({
    //       personality: data.personality,
    //       tone: data.tone
    //     });
    //   })
    //   .catch(err => console.error(err));
  }

  render() {

    return (
      <div>
      </div>
    )
  }
}
