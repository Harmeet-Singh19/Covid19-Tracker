import React from 'react';
import { 
    Card,
    CardContent,
    Typography
}  from '@material-ui/core';
import './InfoBox.css';

function InfoBox({title,cases,isRed,isGreen,isBlue,active,total, ...props}) {
    return (
        <Card 
        onClick={props.onClick}
        className={`infoBox ${active && 'infoBox--selected'} 
        ${isRed && 'infoBox--red'}
        ${isGreen && 'infoBox--green'}`}>
            <CardContent>
                {/* Title */}
                <Typography className="infoBox__title"color="textPrimary">{title}</Typography>

                {/* No of cases */}
                <h2 className={`infoBox__cases ${isGreen && "infoBox__cases--green"} ${isBlue &&"infoBox__cases--blue"}`}>{cases}</h2>

                {/* 1.2M total */}
                <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
;