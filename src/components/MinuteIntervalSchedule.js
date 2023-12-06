import React, { useState } from 'react';

const MinuteIntervalSchedule = ({ interval, onIntervalChange }) => {
    const handleIntervalChange = (e) => {
        const newInterval = e.target.value;
        onIntervalChange(newInterval);

        if (newInterval >= 60) {
            onIntervalChange(59);
        } else if (newInterval<0) {
            onIntervalChange(0);
        }

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