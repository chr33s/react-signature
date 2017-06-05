import React, { Component } from 'react'

class Signature extends Component {
  state = {
    path: '',
    isDown: false
  }

  isTouchEvent = e => {
    return e.type.match(/^touch/)
  }

  getCoords = e => {
    const pos = this.refs.svg.getBoundingClientRect()
    const X = (this.isTouchEvent(e) ? e.targetTouches[0].clientX : e.clientX) - pos.left // - svg.offsetLeft
    const Y = (this.isTouchEvent(e) ? e.targetTouches[0].clientY : e.clientY) - pos.top // - svg.offsetTop
    return X + ',' + Y
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

  clear = () => {
    this.setState({path: ''})
  }

  load = path => {
    this.setState({path})
  }

  get = () => {
    return this.state.path
  }

  render () {
    return (
      <div>
        <svg ref='svg' width='300' height='100' viewBox='0 0 300 100' xmlns='http://www.w3.org/2000/svg'>
          <rect width='300' height='100' fill='#fff'
            onMouseDown={this.down}
            onMouseMove={this.move}
            onMouseUp={this.up}
            onTouchStart={this.down}
            onTouchMove={this.move}
            onTouchEnd={this.up}
            onMouseOut={this.up}
          />
          <line x1='0' y1='80' x2='300' y2='80' stroke='#ccc' strokeWidth='1' strokeDasharray='3' shapeRendering='crispEdges' pointerEvents='none' />
          <path stroke='black' strokeWidth='2' fill='none' pointerEvents='none' d={this.state.path} />
        </svg>
        <input type='hidden' name='signature' required value={this.state.path} />
      </div>
    )
  }
}

export default Signature
