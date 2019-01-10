import PropTypes from 'prop-types';
import React from 'react';
import * as dataProcessing from './dataProcessing';
//import dataToPoints from './dataProcessing/dataToPoints';


export default class SparklinesReferenceLine extends React.Component {

    static propTypes = {
        type: PropTypes.oneOf(['max', 'min', 'mean', 'avg', 'median', 'custom']),
        value: PropTypes.number,
        style: PropTypes.object
    };

    static defaultProps = {
        type: 'mean',
        style: { stroke: 'red', strokeOpacity: .75, strokeDasharray: '2, 2' }
    };

    refValueToPoint(data, height, margin, refValue) {
        const max = Math.max.apply(Math, data);
        const min = Math.min.apply(Math, data);

        const vfactor = (height - margin * 2) / ((max - min) || 2);

        return (max - refValue) * vfactor + margin;

    }
    render() {

        const { data, points, margin, type, style, value, height } = this.props;

        const ypoints = points.map(p => p.y);
        const y = type === 'custom' ? this.refValueToPoint(data, height, margin, value) : dataProcessing[type](ypoints);

        return (
            <line
                x1={points[0].x} y1={y}
                x2={points[points.length - 1].x} y2={y}
                style={style} />
        )
    }
}
