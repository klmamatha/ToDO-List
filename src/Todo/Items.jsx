import React from "react";

const Items = ({ item, setItem, setTogle, setInput,setIsInput}) => {
    const deleteHandler = (index) =>{
        console.log(index)
        if(item.length == 1){
            localStorage.removeItem("todo")
        }
        item = item.filter(
            (d,i)=>{
              console.log(d)
                if(index==d.id) return false
                else return true;
            }
        )
        setItem(item)
    }


    const editHandler = (id) => {
      const newEditItem = item.find(
        (elem)=>{
          return id == elem.id
        }
      )
 
      console.log(newEditItem)

      setTogle(false)

      setInput(newEditItem.name)

      setIsInput(id)
    }
  return (

    <div className="mx-auto max-w-[450px] h-auto">
      <ul className="">
        {item.map((d, i) => {
          return (
            <li key={d.id} className="shadow-2xl mt-2 bg-red-500 font-medium  text-white flex justify-between">
              <div className="w-[300px] Twrap  p-2">
                {d.name} 
              </div>
              <div  className="w-[120px] flex gap-2 items-center">
                <button className="bg-blue-800 p-1 ps-2 pe-2 rounded-lg" onClick={()=>editHandler(d.id)}>Edit</button>
                <button className="bg-green-800 p-1 rounded-lg" onClick={()=>deleteHandler(d.id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Items;
