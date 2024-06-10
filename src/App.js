import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const [error, setError] = useState(null); 
  const [cityList, setCityList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const date = new Date();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=54e8e5a2e8e7551f138a4003a5bf5fe0`;

  const searchLoc = async(event) => {
    
    if (event.key === 'Enter') {
      try{
        const response = await axios.get(url);
      
        setData(response.data);
        console.log(response.data);
        setError(null);
      
    }
  
  catch(e){
    setError("Location not found");
    setData({});
  }
  setLocation('');
  }
};

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const addToList=()=>{
    if(data.name){
      setCityList([...cityList,{name:data.name,temp:data.main.temp.toFixed()}]);
      alert("City added to the list");
    }
  }
  const showList=()=>{
  setIsModalOpen(!isModalOpen);
  }
  const deleteCity=(index)=>{
    setCityList(cityList.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-screen flex items-center bg-slate-100 justify-center">
      
    <div className={`m-6 rounded-[20px] flex flex-col items-center w-[1300px]   p-10 ${isDarkMode ? "text-white bg-slate-600 bg-cover bg-center bg-no-repeat" : 'bg-gray-100 text-black border-2 border-black'}`}>
      
      <div className="text-center flex items-center max-[1190px]:flex-col gap-20 p-[1rem]">
      <button onClick={toggleTheme} className={` rounded-full py-[0.7rem] px-[1.5rem] w-[200px] text-[1.2rem] ${isDarkMode ? 'text-white border-white border-2' : 'text-black border-2 border-black'}`}>
           Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
        <input 
          className={`md:w-[600px] rounded-full py-[0.7rem] px-[1.5rem] text-[1.2rem] ${isDarkMode ? 'text-white bg-slate-600 border-white border-2' : 'text-black bg-gray-100 border-2 border-black'}`}
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLoc}
          type="text"
        />
        <button onClick={showList} className={` rounded-full py-[0.7rem] px-[1.5rem] w-[200px] text-[1.2rem] ${isDarkMode ? 'text-white border-white border-2' : 'text-black border-2 border-black'}`}>Show List</button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="flex flex-col items-center justify-center gap-4 max-w-[700px] mb-10  p-[0.1rem] mt-1">
        <div className="w-[100%] flex flex-col items-center">
          <div className="flex items-center justify-center gap-4">
          <div className="ml-36 flex flex-col items-center location">
            <p className="font-[700] text-[30px]">{data.name}</p>
            
            <p>{date.toDateString()}</p>
            <p>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>

          </div>
          <div>
            <button onClick={addToList} className={ `border-2 rounded-full p-4 w-[70px] ml-[50px]  ${isDarkMode ? "text-white bg-slate-600 bg-cover bg-center bg-no-repeat" : 'bg-gray-100 text-black border-2 border-black'}`}>+</button>
          </div>
          </div>
          <div className="temp">
            {data.main ? <h1 className="text-[80px]">{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="relative">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
      </div>
        {data.name !== undefined &&
          <div className={`shadow-xl max-[650px]:flex-col flex items-center gap-20 border-2 p-6 rounded-[20px] ${isDarkMode ? "" : 'border-black'} `}>
            <div className="flex flex-col items-center">
              {data.main ? <h1>{data.main.feels_like}°F</h1> : null}
              <p>Feels Like</p>
            </div>
            <div className=" flex flex-col items-center">
              {data.main ? <h1>{data.main.humidity}%</h1> : null}
              <p>Humidity</p>
            </div>
            <div className="flex flex-col items-center">
              {data.wind ? <h1>{data.wind.speed.toFixed()} MPH</h1> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      
    </div>
    {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-[500px]">
            <h2 className="text-2xl font-bold mb-4">Locations and their temperatures:</h2>
            <ul className="list-disc pl-5">
              {cityList.map((city, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{city.name}:</span> {city.temp}°F
                  <button onClick={()=>deleteCity(index)} className="ml-2 font-[700]" >delete</button>
                </li>
              ))}
            </ul>
            <button onClick={showList} className="mt-4 border-2 rounded-full p-2">Close</button>
          </div>
        </div>
      )}
    </div>
  
  );
}

export default App;
