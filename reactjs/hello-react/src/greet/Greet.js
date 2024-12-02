import React from 'react'

// function Greet(){
//     return <h1>Hello Sumit</h1>
// }
const Greet = ({name, heroName}) => {
    //const {name, heroName} = props
    //const {state1, state2} = this.state
    return(
        <div>
            <h1>Greet {name} a.k.a {heroName}</h1>
        </div>
    ) 
}

export default Greet