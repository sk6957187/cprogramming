import React, { useState, useEffect } from 'react';
import Highlighter from "react-highlight-words";

export default function TextForm(props) {
    const [text, setText] = useState('');
    
    useEffect(() => {
        const newSearchValue = props.searchValue; 
        console.log("Search value updated from Navbar (local variable): ", newSearchValue); 
        setText(newSearchValue); 
    }, [props.searchValue]);

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
    };

    const handleLowClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
    };

    const handleClearClick = () => {
        setText('');
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };
    
    return (
        <>
            <div>
                <h2>{props.title}</h2>
                
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        value={text}
                        onChange={handleOnChange}
                        id="myBox"
                        rows="8"
                    ></textarea>
                </div>

                {/* Highlighter below the textarea */}
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[props.searchValue]} // Highlight searchValue from Navbar
                    autoEscape
                    textToHighlight={text ? text : ""}
                />

                <button className='btn btn-primary mt-2' onClick={handleUpClick}>Convert to Uppercase</button>
                <button className='btn btn-primary mx-1 mt-2' onClick={handleLowClick}>Convert to Lowercase</button>
                <button className='btn btn-primary mx-1 mt-2' onClick={handleClearClick}>Clear</button>
            </div>
            <div className="container my-3">
                <h2>Your text summary</h2>
                <p>{text.split(" ").filter(Boolean).length} Words and {text.length} characters.</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : 'Nothing to preview!'}</p>
            </div>
        </>
    );
}
