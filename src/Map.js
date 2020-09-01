import React ,{} from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./map.css";
import {showDataOnMap} from './util'

import Leaflet from 'leaflet'




function Map({ countries,casesType,darkMode,  center, zoom,...props }) {
  const corner1 = Leaflet.latLng(-90, -200)
const corner2 = Leaflet.latLng(90, 200)
const bounds = Leaflet.latLngBounds(corner1, corner2)

  return (
    <div className="map">
      <LeafletMap  center={center} zoom={zoom} minZoom={2.5}  animate="true"
      maxBoundsViscosity={1.0}
      maxBounds={bounds}
      duration={0.8} 
      style={{ width: '100%'}}>
        <TileLayer
         
          url={darkMode?"https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png":"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          attribution={darkMode?`'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'`:`&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors"`  }
        />
        {showDataOnMap(countries,casesType)}
        
      </LeafletMap>
    </div>
  );
}

export default Map;
