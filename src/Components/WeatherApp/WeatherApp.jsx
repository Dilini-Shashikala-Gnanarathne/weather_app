import React, { useState } from 'react'
import "./WeatherApp.css";
import image1 from "../Assets/1.png";
import image2 from "../Assets/2.png";
import image3 from "../Assets/3.png";
import image4 from "../Assets/5.PNG";
import image5 from "../Assets/4.PNG";



function WeatherApp() {
let api_key="39565bc0ac0b581ca412907d4c6f412e";
const[wicon,setwicon]=useState(image5);


const search= async()=>{

    const element= document.getElementsByClassName("cityInput")
    if (element[0].value==="") {
        return 0;
    }
    
let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
let response= await fetch(url);
let data= await response.json();
const humidity=document.getElementsByClassName("humidity-percent");
const wind=document.getElementsByClassName("wind-percent");
const temprature= document.getElementsByClassName("weather-temp");
const location= document.getElementsByClassName("weather-location");


humidity[0].innerHTML=data.main.humidity+" %";
wind[0].innerHTML=data.wind.speed+" km/h";
temprature[0].innerHTML=data.main.temp+"°c";
location[0].innerHTML=data.name;


if(data.weather[0].icon==="04d"||data.weather[0].icon==="04n"){
    setwicon(image5);
}


}


  return (
    <div className="container">
        <div className="top-bar">
            <input type='text' className='cityInput' placeholder='Enter City'/>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={image3} alt=""/>
            </div>
            <div className="weather-image">
                <img src={image1} alt=''/>
            </div>
            <div className="weather-temp">
               12°
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
                            Humidity
                        </div>
                    </div>
                </div>
                <div className="element">
                    <img src={image1}/>
                    <div className="data">
                        <div className="wind-percent">
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


