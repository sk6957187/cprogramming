import React, { useState } from 'react';
import Highlighter from "react-highlight-words";

const Navbar = (props) => {
    const [searchColText, setSearchColText] = useState("");
    const [text, setText] = useState("Sample text to search");

    const search = (e) => {
        e.preventDefault(); 
        props.setSearchValue(searchColText);
        console.log( searchColText);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className='container-fluid'>
                    <a className="navbar-brand" href="/">{props.title}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="/" >About</a>
                            </li>
                        </ul>
                        <form className="d-grid gap-2 d-md-flex ms-auto" onSubmit={search}>
                            <input 
                                className="form-control me-md-2" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search" 
                                onChange={(e) => setSearchColText(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            {/* Display the Highlighter component for the text */}
            <Highlighter
                highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                searchWords={[searchColText]}
                autoEscape
                textToHighlight={text}
            />
        </>
    );
};

export default Navbar;
