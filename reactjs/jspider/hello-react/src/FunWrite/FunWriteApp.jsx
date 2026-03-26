import React,{useState} from 'react'

function FunWriteApp()  {
    let [count, setCount] = useState(10);
    let [sum, setSum] = useState(0);

    function increment(){
        setCount(++count);
    }
    function sumFun(a,b){
        setSum(sum = a+b);
    }

    return (
      <div className="app">
        <h1>App js</h1>
        <button onClick={()=>{sumFun(10,20)}}>Sum: ₹{sum}</button>
        <button onClick={increment}>Increment: {count} </button>
      </div>
    )
  
}

export default FunWriteApp
