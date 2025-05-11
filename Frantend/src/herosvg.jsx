import React from 'react';
import "./App.css";

const Herosvg = () => {
  return (
    <rs-arrow className="text-yellow-gold z-50 tp-leftarrow tparrows newnavclass_1">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        x="0px" 
        y="0px" 
        width="25.109px" 
        height="34.906px" 
        viewBox="0 0 25.109 34.906" 
        enableBackground="new 0 0 25.109 34.906" 
        xmlSpace="preserve"
      >
        <polyline 
          fill="none" 
          stroke="currentColor" 
          strokeMiterlimit="10" 
          points="24.67,34.59 11.653,17.464 24.67,0.338"
        />
        <polyline 
          fill="none" 
          className="eltdf-popout" 
          stroke="currentColor" 
          strokeMiterlimit="10" 
          points="13.688,34.59 0.671,17.464 13.688,0.338"
        />
      </svg>
    </rs-arrow>
  );
};

export default Herosvg;
