import React, { Component } from 'react'
//import { Component } from 'react'



function FunctionClick() {
    function clickHandler() {
        console.log('Click the button')
    }
   
   
        return (
            <div>
                <button onClick={clickHandler}>Click</button>
            </div>
        )
    
}

export default FunctionClick
