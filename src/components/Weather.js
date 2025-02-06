import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import humiImg from "../img/humidity.png";
import windImg from "../img/wind.png";

function Weather() {
    const [showData, setShowData] = useState(false);
    const [city, setCity] = useState("");
    const [icon, setIcon] = useState("");
    const [temp, setTemp] = useState("");
    const [status, setStatus] = useState("");
    const [humi, setHumi] = useState("");
    const [pressure, setPressure] = useState("");
    const [wind, setWind] = useState("");
    const [error, setError] = useState("");

    const [input, setInput] = useState("");

    const Getweather = () => {
        if (!input.trim()) {
            setError("Please enter a city name");
            setShowData(false);
            return;
        }

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=f7669b767655164e8f83bd3bcb47073d`)
            .then((item) => {
                console.log(item.data);
                setError("");
                setShowData(true);

                setCity(item.data.name);
                setStatus(item.data.weather[0].main);
                setHumi(item.data.main.humidity);
                setPressure(item.data.main.pressure);

                const iconCode = item.data.weather[0].icon;
                setIcon(`https://openweathermap.org/img/wn/${iconCode}@2x.png`);

                setTemp((item.data.main.temp - 273.15).toFixed(2));

                setWind((item.data.wind.speed * 3.6).toFixed(2));
            })
            .catch((error) => {
                setError("City not found");
                setShowData(false);
            });
    };

    const handleInput = (e) => {
        setInput(e.target.value);
        setError("");
    };

    return (
        <>
            <section>
                <div className="container">
                    <div className="wrapper">
                        <div className="form">
                            <input value={input} onChange={handleInput} placeholder="Enter The City Name" />
                            <button onClick={Getweather}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>

                        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

                        {showData && (
                            <div className="data">
                              
                                <img src={icon} alt="Weather icon" />
                                <h1>{temp}°C</h1>
                                <p>{status}</p>
                                {/* <h2><i class="fa-solid fa-location-dot"></i>{city}</h2> */}

                                <div className='details'>

                                    <div className='d1'>
                                    {/* <img src={humiImg} style={{width:"40px"}}></img>  */}
                                    <i class="fa-solid fa-droplet"></i>
                                    <p>{humi}%</p>
                                    </div>
                                    <div className='d2'>
                                    
                                       {/* <img src={windImg} style={{width:"40px"}}></img> */}
                                       <i class="fa-solid fa-wind"></i>
                                       <p>{wind} km/h</p>
                                    </div>
                                    

                                </div>

                                

                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Weather;
