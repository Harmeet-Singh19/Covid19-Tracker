import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const casesTypeColors = {
  cases: {
    hex: "	#0000CD",
    rgb: "rgb(0,0,205)",
    
    multiplier: 800,
  },
  recovered: {
    hex: "#9ACD32",
    rgb: "rgb(125, 215, 29)",
   
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
   
    multiplier: 2000,
  },
};


export const sortData = (data,casesType) => {
  let sortedData = [...data];
  let check=casesType;
  sortedData.sort((a, b) => {
    if (a[check] > b[check]) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType = "cases") =>{

  return  data.map((country) => (
    
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
      onmouseover={(e) =>{
        e.target.openPopup();
      }}
      onmouseout={(e) =>{
        e.target.closePopup();
      }}

    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
    }
    