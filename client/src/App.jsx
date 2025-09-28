import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IoIosArrowDroprightCircle } from "react-icons/io";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [depth, setDepth] = useState();
  const [magnitude, setMagnitude] = useState();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [aftershock, setAftershock] = useState("");
  const [aftershockMagnitude, setAftershockMagnitude] = useState("");

  // Handle Estimate Aftershock
  async function onClickedAftershock() {
    try {
       let formattedDate = "";
    if (date) {
      const [year, month, day] = date.split("-");
      formattedDate = `${parseInt(month)}/${parseInt(day)}/${year}`;
    }

      const response = await fetch(
        "http://127.0.0.1:5001/prediction_of_aftershock",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            depth: parseFloat(depth),
            magnitude: parseFloat(magnitude),
            time: time,
            date: formattedDate,
          }),
        }
      );
      const data = await response.json();
      setAftershock(`${data.aftershock_prediction.Aftershock}`);
      setAftershockMagnitude(
        `${data.aftershock_prediction.Predicted_Magnitude}`
      );
    } catch (error) {
      console.error("Error predicting aftershock:", error);
    }
  }

  return (
    <div className="flex text-black w-[900px] rounded-2xl border-2 shadow-yellow-800 shadow-xl">
      <div className=" flex flex-col w-[400px] bg-yellow-500 rounded-l-2xl text-center justify-center items-center text-white text-3xl font-bold pt-10 px-5 pb-10 gap-3"> 
        <div>Earthquake Aftershock Detection</div>
        <div className="text-5xl"><IoIosArrowDroprightCircle /></div>
      </div>
      <div className="pb-7">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-5 justify-center items-center pt-10 ">
          <div className="flex flex-col gap-5">
          <div className="flex gap-10 pl-17">
            <h2 className="text-xl font-semibold">Latitude</h2>
            <input
              className="border-2 border-gray-300 p-2 rounded-md text-center italic"
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          <div className="flex gap-10 pl-13">
            <h2 className="text-xl font-semibold">Longitude</h2>
            <input
              className="border-2 border-gray-300 p-2 rounded-md text-center italic"
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          <div className="flex gap-10 pl-[90px]">
            <h2 className="text-xl font-semibold">Depth</h2>
            <input
              className="border-2 border-gray-300 p-2 rounded-md text-center italic"
              type="text"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
            />
          </div>

          <div className="flex gap-10 pl-12">
            <h2 className="text-xl font-semibold">Magnitude</h2>
            <input
              className="border-2 border-gray-300 p-2 rounded-md text-center italic"
              type="text"
              value={magnitude}
              onChange={(e) => setMagnitude(e.target.value)}
            />
          </div>

          <div className="flex gap-10 pl-[104px]">
            <h2 className="text-xl font-semibold">Time</h2>
            <input
              className="w-[206px] border-2 border-gray-300 p-2 rounded-md text-center italic"
              type="time"
              step="1"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="flex gap-10 pl-[107px]">
            <h2 className="text-xl font-semibold">Date</h2>
            <input
              className="w-[206px] border-2 border-gray-300 p-2 rounded-md text-center italic"
              type="date"
              value={date}
              onChange={(e) =>{console.log("date",date); setDate(e.target.value)}}
            />
          </div>
          </div>

          <div className="pt-5 pl-8">
            <button
              className="submit text-white "
              type="button"
              onClick={onClickedAftershock}
            >
              Estimate Aftershock
            </button>
          </div>

          <div className="text-black flex gap-10 ml-7 mt-5">
            <div>
              <div className="text-base font-semibold">Aftershock Prediction</div>
              <div className="border-2 h-10 w-[200px] mt-3 border-gray-400 rounded-sm pt-1">{aftershock=="true"?"YES":"NO"}</div>
            </div>
            <div>
              <div className="text-base font-semibold">Predicted Magnitude</div>
              <div className="border-2 h-10 w-[200px] mt-3 border-gray-400 rounded-sm pt-1"> {aftershockMagnitude=="null"?"NONE":Number(aftershockMagnitude).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </form>
      </div>
      
    </div>
  );
}

export default App;
