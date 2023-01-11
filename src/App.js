import "./App.css";
import { useState } from "react";
import Papa from "papaparse";
import getTorrents from "./getTorrent";
import copyText from "./copyText";
import $ from "jquery";

let domain = 'localhost';
let port = '8080';
let site = 'magnetdl';
let searchAll = true;
const limit = '3';
var magnetArray = [];

function App() {
  $('#complete').hide();
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);
        console.log(results.data);

        // Create array and push movie names to it
        let movieList = [];
        for (let i = 0; i < results.data.length; i++) {
          var query = [results.data[i].Movie, results.data[i].Year].join(' ');
          movieList.push(query);
        }

        //Log the list for debug purposes
        console.log(movieList);

        //Call the API
        magnetArray = getTorrents(movieList, domain, port, site, limit, searchAll);
        console.log(`Magnets ${magnetArray}`);
        console.log('Finished with the call')

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <br />
      <div id="results">
        <div id="current-movie">Searching movie: <span>movie</span></div>
        <br />
        <div id="loading">Processed <span id="movie-now">0</span> / <span id="total-movies">0</span> movies.</div>
        <br />
        <div id="myProgress">
          <div id="myBar"></div>
        </div>
        <div id="percent"><span>0</span>%</div>
      </div>
      <br />
      <div id="complete"></div>
      <br />
      <br />
      <br />
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
