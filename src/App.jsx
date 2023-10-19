import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [range, setrange] = useState(5)
  const [numbox, setnumbox]=useState(false)
  const [charbox,setcharbox]=useState(false)
  const [pass,setpass]=useState("Hello Here is Your password")
  const passwordGenerator=useCallback(()=>{
    let totstr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let num="01234566789"
    let char="!@#$%^&()_+?><}{}"
    let password=""
    if(numbox){
      totstr=totstr+num
    }
    if(charbox){
      totstr=totstr+char
    }
    for(let i=1;i<=range;i++)
    {
      password=password+totstr[Math.floor(Math.random()*totstr.length)]
    }
    setpass(password)

  },[numbox,charbox,pass,range]);
   const pass_ref=useRef(null)
  const copy_Pass=()=> window.navigator.clipboard.writeText(password)
    useEffect(()=>{
      passwordGenerator()
    },[numbox,charbox,range])

  return (
    <>
      
      <h1>Password Generator </h1>
      <div id='main'>
        <input type="text"
        id='password_holder'
        value={pass} 
        readOnly
        placeholder='Password here'
        ref={pass_ref}
        />
        <button  id='copy'
        onClick={copy_Pass}>
          Copy The Password 
        </button>
      </div>
      <div className="lower">
        <div className="length">
            <input type="range"  id='ranging' min={5} max={20} value={range}
                onChange={(e)=>{
                  setrange(e.target.value)
                  }}
            />
            <label id='label_for_range' htmlFor="ranging">Length:{range}</label>
        </div>
        <div id="checkbox">
          <input type="checkbox" 
          defaultChecked={numbox}
          id='num'
          onChange={(e)=>{
            setnumbox((prev)=>!prev)
          }}
          />
          <label htmlFor="num">Add Number?</label>
          <input type="checkbox" 
          defaultChecked={charbox}
          id='char'
          onChange={(e)=>{
            setcharbox((prev)=>!prev)
          }}
          />
          <label htmlFor="char">Add Character?</label>
        </div>
      </div>
    </>
  )
}

export default App
