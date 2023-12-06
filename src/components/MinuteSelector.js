import React, { useState } from 'react';
import '../App.css';

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
                {selectedMinute !== '*' && <p className="inline-string">{
                    `минут${(selectedMinute === '1' || selectedMinute === '21'|| selectedMinute === '31' || selectedMinute === '41'|| selectedMinute === '51')
                        ? 'у' : (selectedMinute === '2' || selectedMinute === '3'|| selectedMinute === '4' || selectedMinute === '22' || selectedMinute === '23'
                            || selectedMinute === '24' || selectedMinute === '32' || selectedMinute === '33'|| selectedMinute === '34'|| selectedMinute === '42'
                            || selectedMinute === '43'|| selectedMinute === '44'|| selectedMinute === '52'|| selectedMinute === '53'|| selectedMinute === '54')
                        ? 'ы' : ''}`}</p>}
            </label>
        </div>
    );
};

export default MinuteSelector;