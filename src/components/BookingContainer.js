import React from 'react';
import RoomsBookingFilter from './RoomsBookingFilter';
import { withRoomConsumer } from '../context';
import Loading from './Loading';

function BookingContainer({context}) {
    const { loading, rooms, roomTypes } = context;
    if (loading) {
        return <Loading />;
    }
    return ( 
        <div>
            <RoomsBookingFilter rooms = {rooms} roomTypes={roomTypes} />
        </div>
    );

}

export default withRoomConsumer(BookingContainer);
