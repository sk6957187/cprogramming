import React, {useState} from 'react'

export default function TextForm(props) {

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText)
    }
    const handleLowClick = () =>{
        let newText = text.toLowerCase();
        setText(newText);
    }
    const handleClearClick = () => {
        let newText = '';
        setText(newText)
    }

    const handleOnChange = (event) =>{
        setText(event.target.value)

    }
    const [text, setText] = useState('');
    return (
    <>
        <div>
            <h2 >{props.title}</h2>
            <div className="mb-3">
                <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
            </div>
            <button className='btn btn-primary' onClick={handleUpClick}>Convert to Uppercase</button>
            <button className='btn btn-primary mx-1' onClick={handleLowClick}>Convert to LowerCase</button>
            <button className='btn btn-primary mx-1' onClick={handleClearClick}>Clear</button>
        </div>
        <div className="container my-3">
            <h2>Your text summary</h2>
            <p>{text.split(" ").length - 1} Words and {(text.length) - (text.split(" ").length) + 1} characters.</p>
            <h2>Preview</h2>
            <p>{text}</p>
        </div>
    </>
    )
  }



//export default TextForm
