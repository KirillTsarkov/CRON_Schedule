import React, { useState } from 'react';
import '../App.css';

const MonthSelector = ({selectedMonth, onSelectedMonth}) => {

    const handleMonthChange = (e) => {
        const newSelectedMonth = e.target.value;
        onSelectedMonth(newSelectedMonth)
    };

    return (
        <div>
            <label>
                Каждый
                <select className="choose-label" value={selectedMonth} onChange={handleMonthChange}>
                    <option value="*">Месяц</option>
                    <option value="1">Январь</option>
                    <option value="2">Февраль</option>
                    <option value="3">Март</option>
                    <option value="4">Апрель</option>
                    <option value="5">Май</option>
                    <option value="6">Июнь</option>
                    <option value="7">Июль</option>
                    <option value="8">Август</option>
                    <option value="9">Сентябрь</option>
                    <option value="10">Октябрь</option>
                    <option value="11">Ноябрь</option>
                    <option value="12">Декабрь</option>
                </select>
            </label>
        </div>
    );
};

export default MonthSelector;