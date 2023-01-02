import React, {useState} from 'react';

function SelectYear(props) {
    const year = new Date().getFullYear();
    const searchParams = new URLSearchParams(document.location.search)
    const min = 2021;
    let years = [];
    for(let i=2021 ; i<=year+1; i++){
        years.push(i)
    }

    let v= searchParams.get('year') ? searchParams.get('year') : year;
    return (
        <select value={v}  onChange={(e) => props.handleSelectChange(e)}>
            {years.map(function (i) {
            return <option key={i} value={i} >{i}</option>
        })}
        </select>
    );
}

export default SelectYear;
