"use client"

import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon';

export default function Time() {

    const [perthTime, setPerthTime] = useState('');

    useEffect(() => {
        const updatePerthTime = () => {
            const nowInPerth = DateTime.now().setZone('Australia/Perth').toFormat("EEE MMM dd, yyyy HH:mm 'GMT'ZZZ (z)");
            setPerthTime(nowInPerth);
        }

        updatePerthTime(); // initial call to set time immediately

        const intervalId = setInterval(updatePerthTime, 1000); // update time every second

        return () => clearInterval(intervalId); // cleanup on unmount
    }, []);

    return (
        <p className='text-center text-xs font-semibold text-neutral-500'>{perthTime}</p>
    )
}
