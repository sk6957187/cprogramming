import React from "react"

const Hello = () => {
    // return(
    //     <div>
    //         <h1>Hello Sumit</h1>
    //     </div>
    // )

    return React.createElement('Div', null,React.createElement('h1', null, 'Hello Sumit'))
}
export default Hello