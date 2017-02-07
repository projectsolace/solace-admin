import React, { Component } from 'react';

import axios from 'axios'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory';

export default class BonesJokes extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {

  }

  render() {
    if(this.props.data.length) {
      return (
      <div>
        <div id='barchart' >
           <h3 className="victoryTitle">Personality Insights I</h3>
            <VictoryChart className="victoryChart" theme={VictoryTheme.material}>

                <VictoryAxis
                   tickValues={[0,20,40,60,80,100]}
                   style={{
                     axis: {stroke: "white"},
                     axisLabel: {
                       padding: 35,
                       fill: 'white'
                     },
                     ticks: {stroke: "white"},
                     tickLabels: {fill: 'white'}
                   }
                  }
                 />
                 <VictoryBar
                   horizontal
                   domain={{x: [0, 100], y: [35, 48]}}
                   labels={this.props.labels.slice(35, 47)}
                   height={500}
                   padding={75}
                   style={{
                     labels: {
                       fontSize: 8,
                       fill: 'white'
                     },
                     data: {
                       width: 12,
                        fill: (data) => {return [ '#7D26CD','#0000EE','#6495ED','#68228B','#E6E6FA','#104E8B','#B0C4DE','#0000FF','#5D478B','#1E90FF','#F0F8FF','#AB82FF','#836FFF','#9932CC','#F8F8FF','#BCD2EE','#6E7B8B','#191970','#6A5ACD','#0000CD','#9A32CD','#B23AEE','#7A67EE','#6C7B8B','#9370DB','#7B68EE','#473C8B','#000080','#D15FEE','#9F79EE','#BA55D3','#4B0082','#778899','#4682B4','#483D8B','#3A5FCD','#7A378B','#8A2BE2','#4169E1','#63B8FF','#8470FF','#800080','#A2B5CD','#27408B','#9400D3','#1874CD','#551A8B' ][data.x-1] }
                     }
                    }}
                   data={this.props.data.slice(35, 47)}
                 />
            </VictoryChart>
        </div>
        <div id='barchart' >
           <h3 className="victoryTitle">Personality Insights II</h3>
            <VictoryChart theme={VictoryTheme.material}>

                <VictoryAxis
                   tickValues={[0,20,40,60,80,100]}
                   style={{
                     axis: {stroke: "white"},
                     axisLabel: {
                       padding: 35,
                       fill: 'white'
                     },
                     ticks: {stroke: "white"},
                     tickLabels: {fill: 'white'}
                   }
                  }
                 />
                 <VictoryBar
                   horizontal
                   domain={{x: [0, 100], y: [24, 36]}}
                   labels={this.props.labels.slice(24, 35)}
                   height={1000}
                   padding={75}
                   style={{
                     labels: {
                      fontSize: 8,
                      fill: 'white'
                     },
                     data: {
                      width: 8,
                      fill: (data) => {return [ '#7D26CD','#0000EE','#6495ED','#68228B','#E6E6FA','#104E8B','#B0C4DE','#0000FF','#5D478B','#1E90FF','#F0F8FF','#AB82FF','#836FFF','#9932CC','#F8F8FF','#BCD2EE','#6E7B8B','#191970','#6A5ACD','#0000CD','#9A32CD','#B23AEE','#7A67EE','#6C7B8B','#9370DB','#7B68EE','#473C8B','#000080','#D15FEE','#9F79EE','#BA55D3','#4B0082','#778899','#4682B4','#483D8B','#3A5FCD','#7A378B','#8A2BE2','#4169E1','#63B8FF','#8470FF','#800080','#A2B5CD','#27408B','#9400D3','#1874CD','#551A8B' ][data.x-1] }
                     }
                    }}
                   data={this.props.data.slice(24, 35)}
                 />
            </VictoryChart>
        </div>
        <div id='barchart' >
            <h3 className="victoryTitle">Personality Insights III</h3>
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryAxis
                   tickValues={[0,20,40,60,80,100]}
                   style={{
                     axis: {stroke: "white"},
                     axisLabel: {
                       padding: 35,
                       fill: 'white'
                     },
                     ticks: {stroke: "white"},
                     tickLabels: {fill: 'white'}
                   }
                  }
                 />
                 <VictoryBar
                   horizontal
                   domain={{x: [0, 100], y: [12, 26]}}
                   labels={this.props.labels.slice(12, 24)}
                   height={1000}
                   padding={75}
                   style={{
                     labels: {
                       fontSize: 8,
                       fill: 'white'
                     },
                     data: {
                       width: 8,
                        fill: (data) => {return [ '#7D26CD','#0000EE','#6495ED','#68228B','#E6E6FA','#104E8B','#B0C4DE','#0000FF','#5D478B','#1E90FF','#F0F8FF','#AB82FF','#836FFF','#9932CC','#F8F8FF','#BCD2EE','#6E7B8B','#191970','#6A5ACD','#0000CD','#9A32CD','#B23AEE','#7A67EE','#6C7B8B','#9370DB','#7B68EE','#473C8B','#000080','#D15FEE','#9F79EE','#BA55D3','#4B0082','#778899','#4682B4','#483D8B','#3A5FCD','#7A378B','#8A2BE2','#4169E1','#63B8FF','#8470FF','#800080','#A2B5CD','#27408B','#9400D3','#1874CD','#551A8B' ][data.x-1] }
                     }
                   }}
                   data={this.props.data.slice(12, 24)}
                 />
              </VictoryChart>
        </div>
        <div id='barchart' >
              <h3 className="victoryTitle">Personality Insights IV</h3>
              <VictoryChart theme={VictoryTheme.material}>
                 <VictoryAxis
                   tickValues={[0,20,40,60,80,100]}
                   style={{
                     axis: {stroke: "white"},
                     axisLabel: {
                       padding: 35,
                       fill: 'white'
                     },
                     ticks: {stroke: "white"},
                     tickLabels: {fill: 'white'}
                   }
                  }
                 />
                 <VictoryBar
                   horizontal
                   domain={{x: [0, 120], y: [0, 14]}}
                   labels={this.props.labels.slice(0, 12)}
                   height={1000}
                   padding={75}
                   style={{
                     labels: {
                       fontSize: 8,
                       fill: 'white'
                     },
                     data: {
                       width: 8,
                        fill: (data) => {return [ '#7D26CD','#0000EE','#6495ED','#68228B','#E6E6FA','#104E8B','#B0C4DE','#0000FF','#5D478B','#1E90FF','#F0F8FF','#AB82FF','#836FFF','#9932CC','#F8F8FF','#BCD2EE','#6E7B8B','#191970','#6A5ACD','#0000CD','#9A32CD','#B23AEE','#7A67EE','#6C7B8B','#9370DB','#7B68EE','#473C8B','#000080','#D15FEE','#9F79EE','#BA55D3','#4B0082','#778899','#4682B4','#483D8B','#3A5FCD','#7A378B','#8A2BE2','#4169E1','#63B8FF','#8470FF','#800080','#A2B5CD','#27408B','#9400D3','#1874CD','#551A8B' ][data.x-1] }
                     }
                   }}
                   data={this.props.data.slice(0, 12)}
                 />
              </VictoryChart>
        </div>
        <div id='barchart' >
              <h3 className="victoryTitle">Personality Insights V</h3>
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryAxis
                   tickValues={[0,20,40,60,80,100]}
                   style={{
                     axis: {stroke: "white"},
                     axisLabel: {
                       padding: 35,
                       fill: 'white'
                     },
                     ticks: {stroke: "white"},
                     tickLabels: {fill: 'white'}
                   }
                  }
                 />
                 <VictoryBar
                   horizontal
                   domain={{x: [0, 120], y: [0, 14]}}
                   labels={this.props.tonelabels}
                   height={1000}
                   padding={10}
                   style={{
                     labels: {
                       fontSize: 8,
                       fill: 'white'
                     },
                     data: {
                       width: 8,
                        fill: (data) => {return [ '#7D26CD','#0000EE','#6495ED','#68228B','#E6E6FA','#104E8B','#B0C4DE','#0000FF','#5D478B','#1E90FF','#F0F8FF','#AB82FF','#836FFF','#9932CC','#F8F8FF','#BCD2EE','#6E7B8B','#191970','#6A5ACD','#0000CD','#9A32CD','#B23AEE','#7A67EE','#6C7B8B','#9370DB','#7B68EE','#473C8B','#000080','#D15FEE','#9F79EE','#BA55D3','#4B0082','#778899','#4682B4','#483D8B','#3A5FCD','#7A378B','#8A2BE2','#4169E1','#63B8FF','#8470FF','#800080','#A2B5CD','#27408B','#9400D3','#1874CD','#551A8B' ][data.x-1] }
                     }
                   }}
                   data={this.props.tonaldata}
                 />
              </VictoryChart>
        </div>
      </div>

    )

}
else{
  return (
    <div>

    </div>
    )
}
  }
}

