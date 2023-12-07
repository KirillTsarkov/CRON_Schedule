import React, { useState } from 'react';
import MinuteIntervalSchedule from "./MinuteIntervalSchedule";
import WeekdaySelector from "./WeekdaySelector";
import MonthSelector from "./MonthsSelector";
import DaySelector from "./DaySelector";
import HourSelector from "./HourSelector";
import MinuteSelector from "./MinuteSelector";
import CronParser from "./parseCronExpression";

const Schedule = () => {
    const [schedule, setSchedule] = useState({
        interval: 0,
        selectedWeekDay: '*',
        selectedMonth: '*',
        selectedDay: '*',
        selectedHour: '*',
        selectedMinute: '0',
        manualCronInput: '',
        cronExpression: "0 * * * *"
    });

    const { interval, selectedWeekDay, selectedMonth, selectedDay, selectedHour, selectedMinute, manualCronInput} = schedule;

    const updateSchedule = (updatedFields) => {
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            ...updatedFields,
        }));
    };

    const handleSelectWeekDay = (newSelectedWeekDay) => {
        updateSchedule({
            selectedWeekDay: newSelectedWeekDay,
        });

        const expressionPrefix = selectedHour === '*' ? '/' : '';
        updateSchedule({
            cronExpression: `${expressionPrefix}${selectedHour === '*' ? interval : selectedMinute} ${selectedHour} ${selectedDay} ${selectedMonth} ${newSelectedWeekDay}`,
        });
    };

    const handleSelectMonth = (newSelectedMonth) => {
        updateSchedule({
            selectedMonth: newSelectedMonth,
        });

        const prefix = selectedHour === '*' ? '/' : '';
        updateSchedule({
            cronExpression: `${prefix}${selectedHour === '*' ? interval : selectedMinute} ${selectedHour} ${selectedDay} ${newSelectedMonth} ${selectedWeekDay}`,
        });
    };

    const handleSelectDay = (newSelectedDay) => {
        updateSchedule({
            selectedDay: newSelectedDay,
        });

        const prefix = selectedHour === '*' ? '/' : '';
        updateSchedule({
            cronExpression: `${prefix}${selectedHour === '*' ? interval : selectedMinute} ${selectedHour} ${newSelectedDay} ${selectedMonth} ${selectedWeekDay}`,
        });
    };

    const handleSelectHour = (newSelectedHour) => {
        updateSchedule({
            selectedHour: newSelectedHour,
        });

        const prefix = newSelectedHour === '*' ? '/' : '';
        updateSchedule({
            cronExpression: `${prefix}${newSelectedHour === '*' ? interval : selectedMinute} ${newSelectedHour} ${selectedDay} ${selectedMonth} ${selectedWeekDay}`,
        });
    };

    const handleSelectMinute = (newSelectedMinute) => {
        updateSchedule({
            selectedMinute: newSelectedMinute,
        });

        updateSchedule({
            cronExpression: `${newSelectedMinute} ${selectedHour} ${selectedDay} ${selectedMonth} ${selectedWeekDay}`,
        });
    };

    const handleIntervalChange = (newInterval) => {
        updateSchedule({
            interval: newInterval,
        });

        updateSchedule({
            cronExpression: `/${newInterval} ${selectedHour} ${selectedDay} ${selectedMonth} ${selectedWeekDay}`,
        });
    };

    const handleManualInputChange = (e) => {
        const input = e.target.value;
        updateSchedule({
            manualCronInput: input,
        });
    };

    const handleLoad = () => {
        try {
            const parsedCron = CronParser(manualCronInput);
            updateSchedule({
                selectedWeekDay: parsedCron.dayOfWeek,
                selectedMonth: parsedCron.month,
                selectedDay: parsedCron.dayOfMonth,
                selectedHour: parsedCron.hour,
                interval: parsedCron.minute,
                selectedMinute: parsedCron.minute,
                cronExpression: `${parsedCron.minute} ${parsedCron.hour} ${parsedCron.dayOfMonth} ${parsedCron.month} ${parsedCron.dayOfWeek}`,
            });
            console.log('Разобранное вручную введенное cron-выражение:', parsedCron);
        } catch (error) {
            console.error('Ошибка при распарсивании вручную введенного cron-выражения:', error.message);
        }
    };

    const handleSave = () => {
        updateSchedule({
            manualCronInput: schedule.cronExpression,
        });
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