import React, { useState } from 'react';
import '../App.css';

const DaySelector = ({selectedDay, onSelectedDay}) => {

    const handleDayChange = (e) => {
        const newSelectedDay = e.target.value;
        onSelectedDay(newSelectedDay);
    };

    return (
        <div>
            <label>
                Каждое
                <select className="choose-label" value={selectedDay} onChange={handleDayChange}>
                    <option value="*">Число месяца</option>
                    {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
            {selectedDay !== '*' && <p className="inline-string">число месяца</p>}
            </label>
        </div>
    );
};

export default DaySelector;