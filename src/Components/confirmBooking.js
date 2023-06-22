import React from 'react';
import { useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import '../grid.css'
import Countdown from 'react-countdown';
import RecordRide from './recordBooking';

const assignDriver = {
    "Premier": {
        // "location1": {
        //     "driverName": "John Doe",
        //     "vehicleNo": "NH01JK2345",
        //     "tripId": "ID45678923",
        //     "ETA": "1 min"
        // },
        "location2": {
            "driverName": "Johnny Doe",
            "vehicleNo": "NH01JK2348",
            "tripId": "ID45678973",
            "ETA": "1 min"
        },
        "location3": {
            "driverName": "Robert Doe",
            "vehicleNo": "NH01JK2305",
            "tripId": "ID48678923",
            "ETA": "1 min"
        },
        "location4": {
            "driverName": "William Doe",
            "vehicleNo": "NH01JK2347",
            "tripId": "ID45676923",
            "ETA": "1 min"
        }
    },

    "Basic": {
        "location1": {
            "driverName": "Ken Doe",
            "vehicleNo": "NH01GK2345",
            "tripId": "ID45678923",
            "ETA": "1 min"
        },
        "location2": {
            "driverName": "Kenny Doe",
            "vehicleNo": "NH01GK2348",
            "tripId": "ID45678973",
            "ETA": "1 min"
        },
        "location3": {
            "driverName": "Clark Doe",
            "vehicleNo": "NH01GK2305",
            "tripId": "ID48678923",
            "ETA": "1 min"
        },
        "location4": {
            "driverName": "Peter Doe",
            "vehicleNo": "NH01GK2347",
            "tripId": "ID45676923",
            "ETA": "1 min"
        }
    }
}

export const DisableButton = (props) =>
    document.getElementById(props.id).disabled = true;

const ConfirmBooking = (props) => {
    const location = useLocation();
    const history = useHistory();
    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.state); // result: 'some_value'
    }, [location]);

    function RideAvailability(props) {
        if (!(props.pickup in assignDriver[props.category]))
            return <h2>No available drivers under {location.state.category} Category for pickup Location '{location.state.pick}'</h2>
        else
            return (
                <>
                    <h1>Booking Details</h1>
                    <div className="ride_container">
                        <div className="ride_container_inner">
                            <div>
                                <h5>Category</h5>
                                <h6>{location.state.category}</h6>
                            </div>
                            <div>
                                <h5>TripId</h5>
                                <h6>{assignDriver[location.state.category][location.state.pick]['tripId']}</h6>
                            </div>
                            <div>
                                <h5>DriverName</h5>
                                <h6>{assignDriver[location.state.category][location.state.pick]['driverName']}</h6>
                            </div>
                            <div>
                                <h5>VehicleNo</h5>
                                <h6>{assignDriver[location.state.category][location.state.pick]['vehicleNo']}</h6>
                            </div>
                            <div>
                                <h5>Pickup ETA</h5>
                                <h6>{assignDriver[location.state.category][location.state.pick]['ETA']}</h6>
                            </div>
                        </div>
                    </div>

                    <br />
                    <button id="cancelButton" type="submit" onClick={() => history.push({
                        pathname: '/rideOptions/cancelBooking'
                    }
                    )} > Cancel Ride </button>
                </>
            )

    }

    let parms = {
        pickup: location.state.pick,
        drop: location.state.drop,
        epoch: Date.now(),
        tripId: assignDriver[location.state.category][location.state.pick]['tripId'],
        category: location.state.category
    };

    const Completionist = () => <span>Sorry! cancellation window over</span>;

    const RemoveElement = (props) => {
        try {
            const element = document.getElementById(props.id);
            element.remove();
        } catch (err) {
            document.getElementById(props.id).innerHTML = err.message;
        }

    }

    function TripEnd() {
        return (
            <div>
                <h5>End the trip once trip is completed</h5>
                <button type="submit" onClick={() => history.push({
                    pathname: '/rideOptions/rateBooking',
                    state: {
                        tripId: assignDriver[location.state.category][location.state.pick]['tripId']
                    }
                }
                )} >End Ride</button>
            </div>

        )
    }

    return (
        <div>
            <RideAvailability {...parms} />
            <div>
                <br />
                <br />
                <p id="cancel_window">Cancel within Pickup ETA</p>
                <Countdown date={Date.now() + 10000}>
                    <div>
                        <Completionist />
                        <RemoveElement id="cancel_window" />
                        <DisableButton id="cancelButton" />
                        <RecordRide {...parms} />
                        <TripEnd />
                    </div>
                </Countdown>
            </div>
        </div>

    );
};

export default ConfirmBooking;