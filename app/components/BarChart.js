import React, { Component } from 'react';

import axios from 'axios'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

export default class BonesJokes extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {

  }

  render() {
    if(this.props.data.length) {
      return (
        <div id='barchart'>
          <VictoryChart>
              <VictoryBar
               horizontal
               domain={{x:[0,100]}}
               labels={this.props.labels.slice(35,47)}
               height={500}
               padding={75}
               style={{
                labels: {
                 fontSize: 5
                },
                data: {
                 width: 12,
                 fill: (data) => data.x%2==0 ? "blue" : "tomato"
                }
                }}
               data={this.props.data.slice(35,47)}
              />
            </VictoryChart>
            <VictoryChart>
              <VictoryBar
               horizontal
               domain={{x:[0,100]}}
               labels={this.props.labels.slice(24,35)}
               height={1000}
               padding={75}
               style={{
                labels: {
                 fontSize: 5
                },
                data: {
                 width: 8,
                 fill: (data) => data.x%2==0 ? "blue" : "tomato"
                }
                }}
               data={this.props.data.slice(24,35)}
              />
            </VictoryChart>
            <VictoryChart>
                <VictoryBar
                 horizontal
                 domain={{x:[0,100]}}
                 labels={this.props.labels.slice(12,24)}
                 height={1000}
                 padding={75}
                 style={{
                  labels: {
                    fontSize:5
                  },
                  data: {
                    width: 8,
                    fill: (data) => data.x%2==0 ?"blue" : "tomato"
                  }
                 }}
                 data={this.props.data.slice(12,24)}
                />
            </VictoryChart>
            <VictoryChart>
              <VictoryBar
               horizontal
               domain={{x:[0,100]}}
               labels={this.props.labels.slice(0,12)}
               height={1000}
               padding={75}
               style={{
                labels: {
                 fontSize:5
                },
                data: {
                 width: 8,
                 fill: (data) => data.x%2==0 ? "blue" : "tomato"
                }
               }}
               data={this.props.data.slice(0,12)}
              />
            </VictoryChart>
            <VictoryChart>
              <VictoryBar
               horizontal
               domain={{x:[0,100]}}
               labels={this.props.tonelabels}
               height={1000}
               padding={10}
               style={{
                labels: {
                 fontSize: 5
                },
                data: {
                 width: 8,
                 fill: (data) => data.x%2==0 ? "blue" : "tomato"
                }
               }}
               data={this.props.tonaldata}
              />
            </VictoryChart>
      </div>
    )

}
else{
  return (
    <div>
    NO GRAPH YET
    </div>
    )
}
  }
}

