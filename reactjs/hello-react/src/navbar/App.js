import React, { useState  } from 'react';
import Navbar from './Navbar';
import TextForm from './TextForm';

const App = () => {
  const [searchValue, setSearchValue] = useState("");
    return(
    <>
        <Navbar title="TextUtil" setSearchValue={setSearchValue}/>
        <div className="container my-3">
            <TextForm title= "Text here!" searchValue={searchValue}/>
        </div>
    </>
    )
  
}

export default App;
