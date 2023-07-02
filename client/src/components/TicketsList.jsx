import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TicketsList() {
  const [sourceStation, setSourceStation] = useState("");
  const [sourceStations, setSourceStations] = useState([]);
  const [destinationStation, setDestinationStation] = useState("");
  const [destinationStations, setDestinationStations] = useState([]);
  const [mobileNumber, setMobileNumber] = useState();
  const [fixedSourceStation, setFixedSourceStation] = useState(null);
  const [fetchedTicketPrice, setFetchedTicketPrice] = useState(0);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/fixed-source`)
      .then((response) => {
        console.log(response.data.name);
        if (response.data.name) {
          // Fixed source station is available in the database
          setFixedSourceStation(response.data.name);
          setSourceStation(response.data.name);
        }
      })
      .catch((e) => {
        toast.error("Please Fixed the station..!");
      });

    axios
      .get("http://​localhost:4000/api/stations")
      .then((response) => {
        console.log(response.data);
        setSourceStations(response.data.map((station) => station.name));
        setDestinationStations(response.data.map((station) => station.name));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDestinationChange(e) {
    const selectedDestination = e.target.value;
    // Make API request to fetch ticket price based on the selected destination
    axios
      .get(
        `http://localhost:4000/api/Stationprice?destination=${selectedDestination}`
      )
      .then((response) => {
        const ticketPrice = response.data.price;
        setDestinationStation(selectedDestination);
        setFetchedTicketPrice(ticketPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  function handleSourceStationChange(e) {
    const selectedSourceStation = e.target.value;
    setSourceStation(selectedSourceStation);

    // Update destination stations based on the selected source station
    let updatedDestinationStations = sourceStations.filter(
      (station) => station !== selectedSourceStation
    );
    // If the previously selected source station is not in the current destination stations, add it
    if (
      !updatedDestinationStations.includes(destinationStation) &&
      destinationStation !== ""
    ) {
      updatedDestinationStations.push(destinationStation);
    }

    setDestinationStations(updatedDestinationStations);
  }

  function fixSourceStation() {
    if (sourceStation) {
      // Save the fixed source station in the database
      axios
        .post("http://localhost:4000/api/fixed-source", { sourceStation })
        .then((response) => {
          console.log(response.data);
          setFixedSourceStation(sourceStation);
          // Update destination stations based on the selected source station
          let updatedDestinationStations = sourceStations.filter(
            (station) => station !== sourceStation
          );
          // If the previously selected source station is not in the current destination stations, add it
          if (
            !updatedDestinationStations.includes(destinationStation) &&
            destinationStation !== ""
          ) {
            updatedDestinationStations.push(destinationStation);
          }

          setDestinationStations(updatedDestinationStations);
          toast.success("Station Fixed Sucessfully..!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    const ticket = {
      mobileNumber: mobileNumber,
      ticketPrice: fetchedTicketPrice * ticketQuantity,
      sourceStation: sourceStation,
      destinationStation: destinationStation,
      ticketQuantity: ticketQuantity,
    };

    axios
      .post("http://localhost:4000/tickets/add", ticket)
      .then((res) => {console.log(res.data)
        toast.success("Ticket Added Sucessfully...!!");
      })
      .catch((e) => {
        console.log(e);
      });
    // window.location = '/payment';

    console.log(ticket);
  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div>
        {fixedSourceStation ? (
          <p className="text-xl font-mono mb-5 font-bold block w-[30%] ml-auto">Fixed Source Station: {fixedSourceStation}</p>
        ) : (
          <button
            onClick={fixSourceStation}
            disabled={!sourceStation}
            className="block w-[20%] rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-auto"
          >
            Fix Source Station
          </button>
        )}
      </div>
       <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
    <div class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" Htmlstyle="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
  </div>
  <div class="mx-auto max-w-2xl text-center">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Welcome , To our Project </h2>
    <p class="my-2 text-lg leading-8 text-gray-700"> Automated Ticketing System for Railway and Metro Stations</p>
  </div>
      <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 w-[50%] m-auto">
      <form onSubmit={onSubmit} className="space-y-4 ">

        <div className="form-group my-5 pb-6 md:pb-0 flex flex-col">
          <label className="block text-sm font-semibold leading-6 text-gray-900">Source station: </label>
          <select
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
            value={sourceStation}
            onChange={handleSourceStationChange}
          >
            <option value="" disabled>
              Select source station
            </option>
            {sourceStations.map((station) => {
              return (
                <option key={station} value={station}>
                  {station}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group my-5 pb-6 md:pb-0 flex flex-col">
          <label className = "block text-sm font-semibold leading-6 text-gray-900">Destination station: </label>
          <select
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
            value={destinationStation}
            onChange={handleDestinationChange}
          >
            <option value="">Select Destination station</option>
            {destinationStations.map((station) => {
              return (
                <option key={station} value={station}>
                  {station}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group my-5 pb-6 md:pb-0 flex flex-col">
          <label className = "block text-sm font-semibold leading-6 text-gray-900">Ticket quantity: </label>
          <input
            type="number"
            required
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            min="1"
            max="10"
            value={ticketQuantity}
            onChange={(e) => setTicketQuantity(e.target.value)}
          />
        </div>

        <div className="form-group my-5 pb-6 md:pb-0 flex flex-col">
          <label className = "block text-sm font-semibold leading-6 text-gray-900">Ticket price: </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={fetchedTicketPrice * ticketQuantity}
            readOnly
          />
        </div>

        <div className="form-group my-5 pb-6 md:pb-0 flex flex-col">
          <label className = "block text-sm font-semibold leading-6 text-gray-900">Mobile number:</label>
          <input
            type="text"
            required
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>

        <div className="form-group my-5 pb-6 md:pb-0 flex flex-col">
          <input
            type="submit"
            value="Book ticket"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          />
        </div>
      </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TicketsList;
