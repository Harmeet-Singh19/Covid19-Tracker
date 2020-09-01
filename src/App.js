import React, { useState, useEffect } from "react";

import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  
  Paper
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import {  prettyPrintStat  } from "./util";
import Map from './Map';
import "leaflet/dist/leaflet.css";
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import Footer from './Footer'


function App() {
 
  //State= HOW TO WRITE VARIABLE IN REACT
  const [countries,setCountries]= useState([]);
  const[country,setCountry]=useState('worldwide')
  const [ countryInfo, setCountryInfo]= useState([]);
  //^^ this is a variable to keep track which country is selected right now
  const [mapCenter, setMapCenter]=
  useState({lat:34.80746, lng:-40.4796});
  const [mapZoom,setMapZoom]= useState(2);
  const [mapCountries,setMapCountries]= useState([]);
  const [casesType, setCasesType]=useState("cases");

  const [darkMode, setDarkMode] = React.useState(getInitialMode());
  React.useEffect(() => {
    localStorage.setItem("light", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const isReturningUser = "light" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem("light"));
    const userPrefersDark = getPrefColorScheme();
    // if mode was saved --> dark / light
    if (isReturningUser) {
      return savedMode;
      // if preferred color scheme is dark --> dark
    } else if (userPrefersDark) {
      return true;
      // otherwise --> light
    } else {
      return false;
    } 
    // return savedMode || false;
  }

  function getPrefColorScheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  const theme= createMuiTheme({
    palette:{
      type: darkMode ? "dark" : "light"
      ,
    },
  });
 
  // bring countries name and data from 
  //https://disease.sh/v3/covid-19/countries

  //USEEFFECT: runs a piece of code based on a given condition,
  //like normal if else pe ye command , in REACT

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=> response.json())
    .then((data)=>{

      setCountryInfo(data);
      
    });
  },[]);

  useEffect(()=>{
    //async funciton chalana hai, bcz server ko request deni, toh wait krna
    //padega so, async to make site faster.

    const getCountriesData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries") 
      .then((response)=>response.json())
      .then((data)=>{
        setMapCountries(data);
        
        console.log(data);
        const countries= data.map((country)=>(
          //returning this object
         
          {
            name:country.country,//full name
            value:country.countryInfo.iso2, //UK,USA,FR aese
            flag: country.countryInfo.flag//flag
          }));
          
          setCountries(countries);
      });
     };

     getCountriesData();
  }, []);
 
  const onCountryChange = async(event)=>{
    const countryCode= event.target.value;
    const url= countryCode==='worldwide'
    ? 'https://disease.sh/v3/covid-19/all'
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await fetch(url)
    .then((response)=> response.json())
    .then((data)=>{
      setCountry(countryCode);
      setCountryInfo(data);

      setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
      setMapZoom(4);

    });
  };
  //https://disease.sh/v3/covid-19/all
  //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  //befaltu mei async use kiya yahan
  
  return (
    <ThemeProvider   theme={theme} >
      <nav className={darkMode? "dark-mode":"light-mode"}>
      <div className="toggle-containerr">
          <span style={{ color: darkMode ? "#1f2933" : "yellow" }}>☀︎</span>
          <span className="togglee">
            <input
              checked={darkMode}
              onChange={() => {setDarkMode(prevMode => !prevMode) }}
              id="checkbox"
              className="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox" />
          </span>
          <span style={{ color: darkMode ? "#E8E6E1" : "#616e7c" }}>☾</span>
        </div>
        </nav>
      <Paper  className= "app__paper" style={{height:"100%", backgroundColor:darkMode? "#121212" : "gainsboro"}}>
      <div className="app">
      <div className="app__left">
      <div className="app__header">
    <h1> COVID 19 TRACKER</h1>
   
      <FormControl className="app__dropdown">
        <Select
        className="app__select"
        variant="outlined"
        value={country}
        style={{backgroundColor:darkMode? "#334E68": "white", color:darkMode? "#D3CEC4":"black"}}
        
        onChange={onCountryChange}
        >
          <MenuItem style={{}} value="worldwide"> Worldwide</MenuItem>
          {
            countries.map((country)=>(
            <MenuItem value={country.value}><div  className="menu__flag" style={{ backgroundImage: `url(${country.flag})`, }}></div><div style={{Color:darkMode? "#334E68": "white", backgroundcolor:darkMode? "#D3CEC4":"black"}}>{country.name}</div></MenuItem>
              ))
          }


          {/* Loop throuhgh all the countires 
          <MenuItem value="worldwide"> Worldwide</MenuItem>
          <MenuItem value="worldwide"> Option 2</MenuItem>
          <MenuItem value="worldwide"> Option 3</MenuItem>
          <MenuItem value="worldwide"> Option 4</MenuItem>*/}
        </Select>
      </FormControl>
    </div>
      <div className="app__stats">

       <InfoBox 
       isBlue
       active={casesType==="cases"}
       onClick={e=>
       {setCasesType('cases');
       
       }}
        title ="Coronavirus Cases"  cases= {prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
       
       <InfoBox 
       isGreen
       active={casesType==="recovered"}
       onClick={e=>setCasesType('recovered')}
        title ="Recovered" cases= {prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
       
       <InfoBox
        isRed
        onClick={e=>setCasesType('deaths')}
        active={casesType==="deaths"}
        title ="Deaths" cases= {prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}  />
       
      </div>

      <Map darkMode={darkMode} countries={mapCountries} casesType={casesType}  center={mapCenter} zoom={mapZoom}/>

      </div>

      <Card className="app__right">
        <CardContent style={{backgroundColor: darkMode ? "#334E68":"white" }} darkMode={darkMode}>
          <h3>Live {casesType} By Country</h3>
          <Table casesType ={casesType} darkMode={darkMode}  />
         <h3 className="app__graphTitle">Worldwide New {casesType}</h3>
         <LineGraph className="app__graph"  casesType={casesType} darkMode={darkMode}  />
        </CardContent>

      </Card>
    </div>
      </Paper>
      <Footer className="app__footer" darkMode={darkMode}/>
    </ThemeProvider>
    
  );
}

export default App;

