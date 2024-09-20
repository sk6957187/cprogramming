import React from 'react'

// function Greet(){
//     return <h1>Hello Sumit</h1>
// }
const Greet = (props) => {
    console.log(props)
    return(
        <div>
            <h1>Greet {props.name} a.k.a {props.heroName}</h1>
            {props.children}
        </div>
    ) 
}

export default Greet