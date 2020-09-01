import React,{useState, useEffect} from 'react'
import './Table.css'
import numeral from 'numeral'

const sortData = (data,casesType) => {
    let sortedData = [...data];
    
    sortedData.sort((a, b) => {
      if (a[casesType] > b[casesType]) {
        return -1;
      } else {
        return 1;
      }
    });
    return sortedData;
  };

function Table({ casesType,darkMode }) {
    const [tableData, setTableData]= useState([]);

    useEffect(() => {
        const getCountriesData = async() => {
            await fetch("https://disease.sh/v3/covid-19/countries") 
            .then((response)=>response.json())
            .then((data)=>{
              
                const sortedData=sortData(data,casesType);
                setTableData(sortedData);
                
            });
           };
      
           getCountriesData();
       
    }, [casesType]);

    return (
        
        <div className={darkMode? "table":"table"} >
            {tableData.map((country)=>(
            <tr>

                <td ><div className="menu__flag2" style={{ backgroundImage: `url(${country.countryInfo.flag})`}}></div>{country.country}</td>
                <td><strong>{numeral(country[casesType]).format("0,0")}</strong></td>
            </tr>

            ))}
        </div>
    )
}

export default Table
