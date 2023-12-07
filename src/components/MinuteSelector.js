import React, { useState } from 'react';
import '../App.css';

const getPluralEnding = (number) => {
    if (number % 10 === 1 && number % 100 !== 11) {
        return 'у';
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
        return 'ы';
    } else {
        return '';
    }
};

const MinuteSelector = ({selectedMinute, onSelectedMinute}) => {

    const handleMinuteChange = (e) => {
        const newSelectedMinute = e.target.value;
        onSelectedMinute(newSelectedMinute);
    };

    return (
        <div>
            <label>
                <p className="inline-string">В</p>
                <select className="choose-label" value={selectedMinute} onChange={handleMinuteChange}>
                    <option value="0">00</option>
                    {Array.from({ length: 59 }, (_, index) => index+1).map((minute) => (
                        <option key={minute} value={minute}>{minute}</option>
                    ))}
                </select>
                {selectedMinute !== '*' && <p className="inline-string">минут{getPluralEnding(selectedMinute)}</p>}
            </label>
        </div>
    );
};

export default MinuteSelector;