import React from 'react';
import RoomsBookingFilter from './RoomsBookingFilter';
import { withRoomConsumer } from '../context';
import Loading from './Loading';

function BookingContainer({context}) {
    const { loading, rooms } = context;
    if (loading) {
        return <Loading />;
    }
    return ( 
        <div>
            <RoomsBookingFilter rooms = {rooms} />
        </div>
    );

}

export default withRoomConsumer(BookingContainer);
