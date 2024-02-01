import React from 'react'
import "./WeatherApp.css";
import image1 from "../Assets/1.png";
import image2 from "../Assets/2.png";

import image3 from "../Assets/3.png";

function WeatherApp() {
let api_key="39565bc0ac0b581ca412907d4c6f412e";

const search= async()=>{

    const element= document.getElementsByClassName("cityInput")
    if (element[0].value==="") {
        return 0;
    }
    
let url=`https://api.openweathermap.org/data/2.5/weather?lat={element[0].value}&unit=Metric&appid=39565bc0ac0b581ca412907d4c6f412e`
let response= await fetch(url);
let data= await response.json()'
'
}


  return (
    <div className="container">
        <div className="top-bar">
            <input type='text' className='cityInput' placeholder='Enter City'/>
            <div className="search-icon" onClick={()=>{search}}>
                <img src={image3} alt=""/>
            </div>
            <div className="weather-image">
                <img src={image1} alt=''/>
            </div>
            <div className="weather-temp">
                24 c 
            </div>
            <div className="weather-location">
                London
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={image2}/>
                    <div className="data">
                        <div className="humidity-percent">
                            64%
                        </div>
                        <div className="text">
                            Humiditty
                        </div>
                    </div>
                </div>
                <div className="element">
                    <img src={image2}/>
                    <div className="data">
                        <div className="humidity-percent">
                            18 km/h
                        </div>
                        <div className="text">
                            Wind Speed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp


