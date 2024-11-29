import React, { useEffect, useState } from 'react'
import Input from './Input'
import Items from './Items'

const Main = () => {

    const [item,setItem] = useState([]);
    const [togle,setTogle]=useState(true);
    const [input, setInput] = useState("");
    const [isInput, setIsInput]=useState(null)
    
// set in localStorage

useEffect(
    ()=>{
        if(item.length != 0){
            localStorage.setItem("todo",JSON.stringify(item));
        }
    },[item]
)

// get data from localStorage

useEffect(
    ()=>{
        const lsData = localStorage.getItem("todo")
        if(lsData != null){
            setItem(JSON.parse(localStorage.getItem("todo")))
        }
    },[]
)

  return (
    <div>
        <div>
            <Input setItem={setItem} item={item} togle={togle} input={input} setInput={setInput} isInput={isInput} setTogle={setTogle} setIsInput={setIsInput}/>
        </div>
        <div>
            <Items   item={item} setItem={setItem} setTogle={setTogle} setInput={setInput} setIsInput={setIsInput}/>
        </div>
    </div>
  )
}

export default Main