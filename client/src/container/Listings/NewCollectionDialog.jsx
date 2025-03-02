import React, { useState } from "react";
import { IoCloseCircle, IoCloseCircleOutline } from "react-icons/io5";

function NewCollectionDialog({ setDialogOpen }) {
  const [ closeDark, setCloseDark ] = useState(<IoCloseCircleOutline size={32}/>);

  return (
    <div className="h-[calc(100vh-3.8rem)] w-[calc(100vw-12.65rem)] absolute bg-dark/30 dark:bg-light/10 flex justify-center items-center">
      <div className="relative w-96 h-52 bg-white dark:bg-dark rounded-3xl px-12 py-8 flex flex-col justify-evenly items-center">
        <button 
          onMouseEnter={() => setCloseDark(<IoCloseCircle size={32} />)}
          onMouseLeave={() => setCloseDark(<IoCloseCircleOutline size={32} />)}
          onClick={() => setDialogOpen(false)}
          className="absolute top-2 right-2 cursor-pointer">
            {closeDark}
        </button>
        <input
          type="text"
          placeholder="Enter collection name"
          className="input w-full"
        />
        <button className="btn w-fit">Create</button>
      </div>
    </div>
  );
}

export default NewCollectionDialog;
