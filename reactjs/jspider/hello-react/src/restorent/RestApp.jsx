import React, { Component } from 'react'
import Veg from './Veg'
import NonVeg from './NonVeg'

export class RestApp extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Restorent</h1>
        <Veg />
        <NonVeg />
      </React.Fragment>
    )
  }
}

export default RestApp
