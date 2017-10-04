import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Signature extends Component {
  constructor (props) {
    super(props)

    this.state = {
      path: props.value || '',
      isDown: false
    }
  }
  
  isTouchEvent = e => {
    return e.type.match(/^touch/)
  }

  getCoords = e => {
    const pos = this.refs.svg.getBoundingClientRect()
    const X = (this.isTouchEvent(e) ? e.targetTouches[0].clientX : e.clientX) - pos.left // - svg.offsetLeft
    const Y = (this.isTouchEvent(e) ? e.targetTouches[0].clientY : e.clientY) - pos.top // - svg.offsetTop
    return `${X},${Y}`
  }

  down = e => {
    this.setState({
      path: `${this.state.path}M${this.getCoords(e)} `,
      isDown: true
    })

    if (this.isTouchEvent(e)) e.preventDefault()
  }

  move = e => {
    if (this.state.isDown) {
      this.setState({path: `${this.state.path}L${this.getCoords(e)} `})
    }

    if (this.isTouchEvent(e)) e.preventDefault()
  }

  up = e => {
    this.setState({isDown: false})

    if (this.isTouchEvent(e)) e.preventDefault()
  }

  clear = e => {
    if (e) e.preventDefault()

    this.setState({path: ''})
  }

  render () {
    const { path } = this.state
    const { value, ...props } = this.props

    return (
      <div className='signature'>
        <svg
          ref='svg'
          width='100%'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            rx='5'
            ry='5'
            fill='#fff'
            width='100%'
            height='100%'
            onMouseDown={this.down}
            onMouseMove={this.move}
            onMouseUp={this.up}
            onTouchStart={this.down}
            onTouchMove={this.move}
            onTouchEnd={this.up}
            onMouseOut={this.up}
          />
          <line
            x1='2.5%'
            y1='90%'
            x2='97.5%'
            y2='90%'
            stroke='#ccc'
            strokeWidth='1'
            strokeDasharray='3'
            shapeRendering='crispEdges'
            pointerEvents='none'
          />
          <path
            stroke='#111'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='5'
            fill='none'
            pointerEvents='none'
            d={path}
          />
        </svg>
        <a
          href='#clear'
          className='clear'
          onClick={this.clear}
        >
          Clear
        </a>
        <input
          {...props}
          value={path}
          type='hidden'
          pattern={`[ML,0-9 ]${props.required ? '+' : '*'}`}
        />
      </div>
    )
  }
}

Signature.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired
}

export default Signature
