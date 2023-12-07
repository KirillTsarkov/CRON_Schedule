import React, { useState } from 'react';
import '../App.css';

const getPluralEnding = (number) => {
    if (number % 10 === 1 && number % 100 !== 11) {
        return '';
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
        return 'а';
    } else {
        return 'ов';
    }
};

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
                {selectedHour !== '*' && <p className="inline-string">час{getPluralEnding(selectedHour)}</p>} 
            </label>
        </div>
    );
};

export default HourSelector;