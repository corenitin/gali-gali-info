import React from "react";

function Loading() {
  return (
    <div className="flex-1 justify-items-center mt-96">
      <div className="flex items-center">
        <span className="opacity-50 text-xl">Fetching data...</span>
        <div className="ml-2 wave-spinner">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
