import React, { useEffect, useState } from 'react'

import "./Home.css"
import { Products } from './Products';


export const Home = () => {

  return (
    <div className="main">
      <div className="home">
       
        <Products />
      </div>
    </div>
  );
}
