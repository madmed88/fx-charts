import React from 'react';
import {
  VictoryChart, VictoryArea, VictoryTheme, createContainer, Domain,
} from 'victory';
import PropTypes from 'prop-types';
import './Chart.css';

const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');

class VictoryLineArea extends VictoryArea {
  static getDomain = Domain.getDomainZero;
}

function Chart(props) {
  const { data } = props;
  return (
    <div className="Chart">
      <svg style={{ width: 0, height: 0 }}>
        <defs>
          <linearGradient id="fill-id" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#0f9d58" stopOpacity="1" />
            <stop offset="100%" stopColor="#dbf0e5" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
      <VictoryChart
        data={data}
        scale={{ x: 'time' }}
        domainPadding={{ y: 20 }}
        theme={VictoryTheme.material}
        height={330}
        width={610}
        containerComponent={(
          <VictoryZoomVoronoiContainer
            labels={d => `${d.x.toDateString()}: ${d.y}`}
            zoomDimension="x"
          />
)}
      >
        <VictoryLineArea
          interpolation="linear"
          style={{ data: { fill: 'url(#fill-id)', stroke: '#0f9d58' } }}
          data={data}
        />
      </VictoryChart>
    </div>
  );
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequried,
    y: PropTypes.number.isRequired,
  })).isRequired,
};


export default Chart;
