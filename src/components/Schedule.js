import React, { useState } from 'react';
import MinuteIntervalSchedule from "./MinuteIntervalSchedule";
import WeekdaySelector from "./WeekdaySelector";
import MonthSelector from "./MonthsSelector";
import DaySelector from "./DaySelector";
import HourSelector from "./HourSelector";
import MinuteSelector from "./MinuteSelector";
import CronParser from "./parseCronExpression";

const Schedule = () => {
    const [interval, setInterval] = useState(0);
    const [selectedWeekDay, setSelectedWeekDay] = useState('*');
    const [selectedMonth, setSelectedMonth] = useState('*');
    const [selectedDay, setSelectedDay] = useState('*');
    const [selectedHour, setSelectedHour] = useState('*');
    const [selectedMinute, setSelectedMinute] = useState('0');
    const [manualCronInput, setManualCronInput] = useState('');
    const [cronExpression, setCronExpression] = useState(`${selectedHour === '*' ? interval : selectedMinute} ${selectedHour} ${selectedDay} ${selectedMonth} ${selectedWeekDay}`);

    const handleSelectWeekDay = (newSelectedWeekDay) => {
        setSelectedWeekDay(newSelectedWeekDay);
        const expressionPrefix = selectedHour === '*' ? '/' : '';
        setCronExpression(`${expressionPrefix}${selectedHour === '*' ? interval : selectedMinute} ${selectedHour} ${selectedDay} ${selectedMonth} ${newSelectedWeekDay}`);
    };
    
    const handleSelectMonth = (newSelectedMonth) => {
        setSelectedMonth(newSelectedMonth);
        const prefix = selectedHour === '*' ? '/' : '';
        setCronExpression(`${prefix}${selectedHour === '*' ? interval : selectedMinute} ${selectedHour} ${selectedDay} ${newSelectedMonth} ${selectedWeekDay}`);
    };
    
    const handleSelectDay = (newSelectedDay) => {
        setSelectedDay(newSelectedDay);
        const prefix = selectedHour === '*' ? '/' : '';
        setCronExpression(`${prefix}${selectedHour === '*' ? interval : selectedMinute} ${selectedHour} ${newSelectedDay} ${selectedMonth} ${selectedWeekDay}`);
    };
    
    const handleSelectHour = (newSelectedHour) => {
        setSelectedHour(newSelectedHour);
        const prefix = newSelectedHour === '*' ? '/' : '';
        setCronExpression(`${prefix}${newSelectedHour === '*' ? interval : selectedMinute} ${newSelectedHour} ${selectedDay} ${selectedMonth} ${selectedWeekDay}`);    
    };
    
    const handleSelectMinute = (newSelectedMinute) => {
        setSelectedMinute(newSelectedMinute);
        setCronExpression(`${newSelectedMinute} ${selectedHour} ${selectedDay} ${selectedMonth} ${selectedWeekDay}`);
    };

    const handleIntervalChange = (newInterval) => {
        setInterval(newInterval);
        setCronExpression(`/${newInterval} ${selectedHour} ${selectedDay} ${selectedMonth} ${selectedWeekDay}`);
    };

    const handleManualInputChange = (e) => {
        const input = e.target.value;
        setManualCronInput(input);
    };

    const handleLoad = () => {
        try {
            const parsedCron = CronParser.parseExpression(manualCronInput);
            console.log('Разобранное вручную введенное cron-выражение:', parsedCron);
            setSelectedWeekDay(parsedCron.dayOfWeek);
            setSelectedMonth(parsedCron.month);
            setSelectedDay(parsedCron.dayOfMonth);
            setSelectedHour(parsedCron.hour);
            setInterval(parsedCron.minute);
            setSelectedMinute(parsedCron.minute)
            setCronExpression(`${parsedCron.minute} ${parsedCron.hour} ${parsedCron.dayOfMonth} ${parsedCron.month} ${parsedCron.dayOfWeek}`)
        } catch (error) {
            console.error('Ошибка при распарсивании вручную введенного cron-выражения:', error.message);
        }
    };

    const handleSave = () => {
        setManualCronInput(cronExpression);
    };

    return (
        <div className="mainbody">
            <h1>Редактор расписания</h1>
            <h3>Запускать</h3>
            <MonthSelector selectedMonth={selectedMonth} onSelectedMonth={handleSelectMonth} />
            <DaySelector selectedDay={selectedDay} onSelectedDay={handleSelectDay} />
            <WeekdaySelector selectedDay={selectedWeekDay} onSelectDay={handleSelectWeekDay} />
            <HourSelector selectedHour={selectedHour} onSelectedHour={handleSelectHour} />
            {selectedHour !== '*' 
                ? <MinuteSelector selectedMinute={selectedMinute} onSelectedMinute={handleSelectMinute} /> 
                : <MinuteIntervalSchedule interval={interval} onIntervalChange={handleIntervalChange} />}
            <button className="custom-button" onClick={handleSave}>Save</button>
            <button className="custom-button" onClick={handleLoad}>Load</button>
            <p></p>
            <label>
                Вручную введите cron-выражение:
                <input
                    type="text"
                    value={manualCronInput}
                    onChange={handleManualInputChange}
                />
            </label>
        </div>
    );
};

export default Schedule;