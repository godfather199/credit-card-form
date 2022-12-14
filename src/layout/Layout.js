import { useState } from "react";
import "./layout.css";
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'

function Layout() {
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [focus, setFocus] = useState('')
  const [search, setSearch] = useState('')
  const [result, setResult] = useState('')
  const [showResult, setShowResult] = useState(false)

  const handleSubmit = (e) => {
    // e.preventDefault()
    const info = {
        number, name, expiry, cvc
    }
    localStorage.setItem('cardInfo', JSON.stringify(info))
    alert('Your Details have been stored to the local storage')
  }

  const handleSearch = () => {
    if (search === "") {
      alert("This field must be filled");
    } else {
      const item = JSON.parse(localStorage.getItem("cardInfo"));
      setResult(item)
      setShowResult(true)
    }
  };

  const handleClear = () => {
    setShowResult(false)
    setSearch('')
  }

  return (
    <div className="layout">
      <h1 className="layoutTitle">Layout</h1>
      <div className="layoutInstructions">
        <p style = {{color: 'red', fontSize: '18px', fontWeight: '800'}}>***Instructions for filling out the form</p>
        <p style = {{color: 'blue'}}>1 - The card on the left side will display information(in real time) filled in the form in right side.</p>
        <p style = {{color: 'blue'}}>2 - The <b style = {{color: 'black'}}>SAVE</b> button in the right side form will save the information in the local storage.</p>
        <p style = {{color: 'blue'}}>3 - Fill out your <b style = {{color: 'black'}}>NAME</b> in the <b style = {{color: 'black'}}>SEARCH</b> input bar  and click <b style = {{color: 'black'}}>SEARCH</b> button. it will retrive your information from the local storage. </p>
        <p style = {{color: 'blue'}}>4 - Clicking the <b style = {{color: 'black'}}>CLEAR</b> button will clear the information.</p>
      </div>
      <div className="layoutWrapper">
        <div className="layoutImage">
          <div className="layoutImageWrapper">
            {/* <img src="" className="layoutImg" /> */}
            <Cards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focus}
            />
            <div className="layoutBtn">
              <button className="layoutUploadBtn">UPLOAD</button>
              <button className="layoutUploadBtn">DISCARD</button>
            </div>
          </div>
        </div>
        <div className="layoutDetails">
          <form onSubmit={handleSubmit} className="layoutDetailsForm">
            <div className="formGroup">
              <label>Number</label>
              <input
                name="number"
                type="tel"
                placeholder="Card Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
                className="formInput"
                required
                max={16}
              />
            </div>
            <div className="formGroup">
              <label>Name</label>
              <input
                type="text"
                className="formInput"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
                required
              />
            </div>
            <div className="formGroup">
              <label>Expiry</label>
              <input
                type="text"
                className="formInput"
                name="expiry"
                placeholder="MM/YY Expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
                required
                max={4}
              />
            </div>
            <div className="formGroup">
              <label>Set Cvv</label>
              <input
                type="tel"
                className="formInput"
                name="cvc"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
                required
              />
            </div>
            {/* <div className="formGroup">
              <label>Product/Service</label>
              <input type="text" className="formInput" />
            </div> */}
            <div className="formGroupBtn">
              <button className="formSaveBtn" type="submit">
                SAVE
              </button>
              <button className="formSaveBtn" onClick={handleClear}>
                CLEAR
              </button>
            </div>
          </form>
          <div className="layoutSearchWrapper">
            <input
              type="text"
              className="layoutSearch"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
            <button className="layoutSearchBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
          {showResult && (
            <div className="layoutSearchResult">
              <span>Number: {result.number}</span>
              <span>Name: {result.name}</span>
              <span>Expiry: {result.expiry}</span>
              <span>CVC: {result.cvc}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Layout;
