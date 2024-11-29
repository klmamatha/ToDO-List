import React, { useState } from "react";

const Input = ({ setItem, item,togle,input,setInput,isInput,setTogle,setIsInput}) => {
 

  const addTodo = () => {

    if(!input){
      alert("please fill all the fields")
    }
    else if(input && !togle){
        setItem(
          item.map(
            (d,i)=>{
              if(d.id==isInput){
                return { ...d,name:input}
              }
              return d
            }
          )
        )

        setInput('')
        setTogle(true)
        setIsInput(null)
    }
    else{
      const inputData = {name:input,id:new Date().getTime().toString()}
      setItem([...item, inputData]);
      setInput('')
    }
  };

  return (
    <div className="">
      <div className="mx-auto w-[350px] flex">
        <input
          type="text"
          className="p-2 w-[300px] mt-4"
          placeholder="Write Something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {
          togle==true?<button
          className="bg-blue-600 ps-5 pe-5 mt-3 pt-2 pb-2 ms-4 rounded-lg text-white font-bold"
          onClick={addTodo}
        >
          Add
        </button>:<button
          className="bg-red-600 ps-5 pe-5 mt-3 pt-2 pb-2 ms-4 rounded-lg text-white font-bold"
          onClick={addTodo}
        >
          Save
        </button>
        }
      </div>
    </div>
  );
};

export default Input;
