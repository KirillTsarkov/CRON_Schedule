import React, { useState } from 'react';
import '../App.css';

const WeekdaySelector = ({selectedDay, onSelectDay }) => {

    const handleDayChange = (e) => {
        const newSelectedDay = e.target.value;
        onSelectDay(newSelectedDay);
    };

    return (
        <div>
            <label>
                {(selectedDay === '*' || selectedDay === '1' || selectedDay === '2' || selectedDay === '4') && <p className="inline-string">Каждый</p>}
                {(selectedDay === '3' || selectedDay === '5' || selectedDay === '6') && <p className="inline-string">Каждую</p>}
                {selectedDay === '0' && <p className="inline-string">Каждое</p>}
                
                <select className="choose-label" value={selectedDay} onChange={handleDayChange}>
                    <option value="*">День недели</option>
                    <option value="1">Понедельник</option>
                    <option value="2">Вторник</option>
                    <option value="3">Среду</option>
                    <option value="4">Четверг</option>
                    <option value="5">Пятницу</option>
                    <option value="6">Субботу</option>
                    <option value="0">Воскресенье</option>
                </select>
            </label>
        </div>
    );
};

export default WeekdaySelector;