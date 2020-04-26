import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom'; 
import RoomsContainer from '../components/RoomsContainer';
import BookingContainer from '../components/BookingContainer';

const Booking = () => {
    return (
    <>
    <Hero>
        <Banner title="do your reservation">
            <Link to='/' className="btn-primary">
                return home                
            </Link>           
        </Banner>      
    </Hero>
    <BookingContainer />
    </>
    );
}

export default Booking