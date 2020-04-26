import React, { Component } from 'react';
import Title from './Title';
import {FaCocktail, FaBed, FaShuttleVan, FaBeer } from 'react-icons/fa';

export default class Services extends Component {
    state = {
        services:[
            {
                icon: <FaCocktail />,
                title: "wellness & SPA",
                info: 'Hotel Wellness & Spa invites you into an edenic space, away from time, away from stress and daily worries. Stylish, elegant, intimate creates a sanctuary of well-being!'
            },
            {
                icon: <FaBed />,
                title: "Accommodation",
                info: 'Located in the heart of the city, near the London business environment London Hotel ****, offers its guests accommodation in 128 rooms!'
            },
            {
                icon: <FaShuttleVan />,
                title: "Transport",
                info: 'Our hotel provides transportation from / to the airport!'
            },
            {
                icon: <FaBeer />,
                title: "restaurant",
                info: 'We expect you in a modern and attractive decor to leave your senses delighted by the most delicious specialties of traditional and international cuisine!'
            }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center">
                    {this.state.services.map((item, index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>
            </section>
        )
    }
}
