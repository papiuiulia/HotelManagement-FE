import React, { useState } from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from '../components/Title';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Link} from 'react-router-dom'; 
import axios from 'axios';

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}


export default function RoomFilter({rooms}) {

    const context = useContext(RoomContext);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const {
        handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets
    } = context;
    let types = getUnique(rooms, 'type');
    types = ['all', ...types];
    types = types.map((item, index) => {
        return (
            <option value={item} ky={index}>{item}</option>
        );
    });
    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    });

    function handleSubmit() {
        axios.get('http://localhost:44336/api/room')
        .then(response => {
            console.log(response)
            this.setState({posts: response.data})
        })
        .catch(error => {
            console.log(error)
        });
    }
    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* choose check in day */}
                <div className="form-group">
                    <label htmlFor="type">check in</label>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat='dd/MM/yyyy'
                                filterDate={date => date.getDay() != 6 && date.getDay() != 0} isClearable
                                placeholderText="Choose a date!" className="datepicker-input"/>
                </div>
                 {/* end check in day */}

                  {/* choose check out day */}
                <div className="form-group">
                    <label htmlFor="type">check out</label>
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} dateFormat='dd/MM/yyyy'
                                filterDate={date => date.getDay() != 6 && date.getDay() != 0} isClearable
                                placeholderText="Choose a date!" className="datepicker-input"/>
                </div>
                 {/* end check out day */}

                  {/* start select day */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                        {types}
                    </select>
                </div>
                 {/* end select day */}

                  {/* start quests */}     
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {people}
                    </select>
                </div>
                 {/* end quests */}


                  {/* extras */}
                  <div className="form-group">
                      <div className="single-extra">
                          <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange} />
                          <label htmlFor="breakfast">breakfast</label>
                      </div>
                      <div className="single-extra">
                          <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange} />
                          <label htmlFor="pets">pets</label>
                      </div>
                  </div>

                  {/*end of extras */}

                  {/* start submit button*/}
                  {/* <Link to='/booking' className="btn-primary">
                        submit                
                  </Link>   */}
                  <button type="button" className="btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>

                  {/* end submit button*/}
            </form>
        </section>
    )
}
