import React, { useState } from 'react';

const MinuteIntervalSchedule = ({ interval, onIntervalChange }) => {
    const handleIntervalChange = (e) => {
        const newInterval = e.target.value;

        const CheckedInterval = Math.min(59, Math.max(0, newInterval));
        onIntervalChange(CheckedInterval);
    };

    return (
        <div>
            <label>
                Каждые:
                <input
                    className="choose-label"
                    type="number"
                    value={interval}
                    onChange={handleIntervalChange}
                />
                <p className="inline-string">минут</p>
            </label>
        </div>
    );
};

export default MinuteIntervalSchedule;