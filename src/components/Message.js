import { now } from 'moment';
import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';

export default function Message(props) {

    const { user, msg } = props;

    return (
        <div class="w-full">
            { user !== msg.username &&
            <div className="flex flex-col items-start justify-center">
                <h2 className="p-2 pb-0 ml-2 font-bold">
                    {msg.username}
                </h2>
                <h2 className="bg-green-200 rounded-lg p-2 mb-2 mr-2 ml-2 w-4/5">
                    {msg.message}
                </h2>
                <h2 className="p-2 pt-0 ml-2 text-sm">
                    <Moment interval={5000} date={msg.timestamp} fromNow/>
                </h2>
            </div>
            }
            { user === msg.username &&
            <div className="flex flex-col items-end justify-center">
                <h2 className="p-2 pb-0 mr-2 font-bold">
                    {msg.username}
                </h2>
                <h2 className="bg-green-200 rounded-lg p-2 mb-2 mr-2 ml-2 w-4/5 break-words">
                    {msg.message}
                </h2>
                <h2 className="p-2 pt-0 mr-2 text-sm">
                    <Moment interval={5000} date={msg.timestamp} fromNow/>
                </h2>
            </div>
            }
        </div>
    )
}