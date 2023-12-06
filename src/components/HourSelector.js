import React, { useState } from 'react';
import '../App.css';

const HourSelector = ({selectedHour, onSelectedHour}) => {

    const handleHourChange = (e) => {
        const newSelectedHour = e.target.value;
        onSelectedHour(newSelectedHour);
    };

    return (
        <div>
            <label>
                <p className="inline-string">{selectedHour === '*' ? 'Каждый' : 'В'}</p>
                <select className="choose-label" value={selectedHour} onChange={handleHourChange}>
                    <option value="*">Час</option>
                    {Array.from({ length: 24 }, (_, index) => index).map((hour) => (
                        <option key={hour} value={hour}>{hour}</option>
                    ))}
                </select>
                {selectedHour !== '*' && <p className="inline-string">{
                    `час${(selectedHour === '1' || selectedHour === '21') 
                    ? '' : (selectedHour === '2' || selectedHour === '3'|| selectedHour === '4' || selectedHour === '22' || selectedHour === '23') 
                    ? 'а' : 'ов'}`}</p>} 
            </label>
        </div>
    );
};

export default HourSelector;