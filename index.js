import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native'
import Svg, { Line, Rect, Path } from 'react-native-svg'

export default class Signature extends Component {
  constructor (props) {
    super(props)

    this.state = {
      path: props.value || '',
      isDown: false
    }
  }

  componentWillReceiveProps (props) {
    if (props.value) {
      this.setState({
        path: props.value
      })
    }
  }

  getCoords (e) {
    const { locationX, locationY } = e.nativeEvent
    const X = parseInt(locationX)
    const Y = parseInt(locationY)
    return `${X},${Y}`
  }

  set (state) {
    this.setState(state)

    if (state.path === undefined) return

    this.props.onValueChange(state.path)
  }

  down (e) {
    this.set({
      path: `${this.state.path}M${this.getCoords(e)} `,
      isDown: true
    })
  }

  move (e) {
    if (this.state.isDown) {
      this.set({
        path: `${this.state.path}L${this.getCoords(e)} `
      })
    }
  }

  up (e) {
    this.set({
      isDown: false
    })
  }

  clear (e) {
    this.set({
      path: ''
    })
  }

  render () {
    const { path } = this.state

    return (
      <View style={styles.signature}>
        <TouchableHighlight
          style={styles.button}
          underlayColor='transparent'
          onPress={this.clear.bind(this)}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableHighlight>
        <Svg
          ref='svg'
          width='100%'
          height='100'
          xmlns='http://www.w3.org/2000/svg'
        >
          <Rect
            rx='5'
            ry='5'
            fill='#fff'
            width='100%'
            height='100%'
            onPressIn={this.down.bind(this)}
            onResponderMove={this.move.bind(this)}
            onPressOut={this.up.bind(this)}
          />
          <Line
            x1='2.5%'
            y1='90%'
            x2='97.5%'
            y2='90%'
            stroke='#ccc'
            strokeWidth='1'
            strokeDasharray='3'
          />
          <Path
            d={path}
            fill='none'
            stroke='#111'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='5'
          />
        </Svg>
        <TextInput
          caretHidden
          value={path}
          editable={false}
          style={{ height: 0 }}
          underlineColorAndroid='transparent'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  signature: {
    position: 'relative'
  },
  button: {
    width: 40,
    position: 'absolute',
    right: 2,
    top: 7,
    zIndex: 2
  },
  buttonText: {
    color: '#7b7b7b',
    fontSize: 12
  }
})
