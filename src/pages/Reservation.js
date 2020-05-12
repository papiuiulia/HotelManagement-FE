import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';


export default function Error() {
    return <Hero>
        <Banner title="thank you for your reservation" subtitle="your reservation is done">
            <Link to='/' className='btn-primary'>
                back to the home page
            </Link>
        </Banner>
    </Hero>;
}