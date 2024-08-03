import classnames from 'classnames'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import { Component } from 'react'

interface SparklineProps {
  className?: string
  data: number[]
  width: number
  height: number
}

class Sparkline extends Component<SparklineProps> {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  shouldComponentUpdate(nextProps: SparklineProps) {
    // eslint-disable-next-line eqeqeq
    return nextProps.data != this.props.data
  }

  render() {
    var data = this.props.data
    var x = d3.scaleLinear().range([0, this.props.width]).domain([0, data.length])

    var y = d3
      .scaleLinear()
      .range([this.props.height - 4, 0])
      .domain(d3.extent(data, (d) => d) as [number, number])

    var line = d3
      .line<number>()
      .curve(d3.curveBasis)
      .x((d, i) => x(i))
      .y((d) => y(d))

    return (
      <svg
        className={classnames('sparkline', this.props.className)}
        width={this.props.width}
        height={this.props.height}
      >
        <g transform="translate(0, 2)">
          <path d={line(data)!} />
        </g>
      </svg>
    )
  }
}

export default Sparkline
