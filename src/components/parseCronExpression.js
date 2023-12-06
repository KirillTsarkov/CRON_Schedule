import React from 'react';

class CronParser {
    static parseExpression(cronExpression) {
        const parts = cronExpression.split(' ');

        if (parts.length !== 5) {
            throw new Error('Некорректное количество частей в выражении cron');
        }

        const areValidParts = parts.every(p => /^\d+|\/|\*$/.test(p));

        if (!areValidParts) {
            throw new Error('Недопустимые символы в выражении cron');}
            

        const minute = parts[0].replace("/", "");
        const hour = parts[1];
        const dayOfMonth = parts[2];
        const month = parts[3];
        const dayOfWeek = parts[4];
        
        if (minute > 59 || minute<0) {
            throw new Error('Некорректное количество минут в выражении cron');
        }
        
        if (hour > 23|| hour<0) {
            throw new Error('Некорректный количество часов в выражении cron');
        }
        
        if (dayOfMonth > 31|| dayOfMonth<1) {
            throw new Error('Некорректный день месяца в выражении cron');
        }
        
        if (month > 12|| month<1) {
            throw new Error('Некорректный месяц в выражении cron');
        }
        
        if (dayOfWeek > 6 || dayOfWeek<0) {
            throw new Error('Некорректный день недели в выражении cron');
        }

        return {
            minute,
            hour,
            dayOfMonth,
            month,
            dayOfWeek,
        };
    }
}
export default CronParser;