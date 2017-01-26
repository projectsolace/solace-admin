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
    axios.get('/api/watson')
      .then(res => res.data)
      .then(data => {
        this.setState({
          personality: data.personality,
          tone: data.tone
        });
      })
      .catch(err => console.error(err));
  }

  render() {

    return (
      <div>
        <VictoryChart
          // adding the material theme provided with Victory
          theme={VictoryTheme.material}
          domainPadding={20}
        >
          <VictoryAxis
            tickValues={this.state.personality.map(value => value.quality)}
            style={{
              tickLabels: {fontSize: 2, padding: 10}
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x * 100}%`)}
          />
          <VictoryBar
            data={this.state.personality}
            x="score"
            y="quality"
            width={1000}
            horizontal={true}
          />
        </VictoryChart>
      </div>
    )
  }
}
