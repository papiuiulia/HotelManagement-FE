import React, { useState } from 'react';
import Title from '../components/Title';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import RoomModal from '../components/RoomModal';

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [roomTypes, setRoomTypes] = useState([{}]);
    const [selectedRoomTypeID, setSelectedRoomTypeID] = useState("");
    const [breakfast, setBreakfast] = useState('');
    const [pets, setPets] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState("1");
    const [isFormValid, setIsFormValid] = useState(false);

    let validationInformation = !isFormValid ? <p style={{color: "red"}}>Please select a room type</p> : '';

    let people;
    loadRoomTypes();
    loadPeople();

    function loadRoomTypes() {
        axios.get('https://localhost:44336/api/roomtype/').then(response => setRoomTypes(response.data));
    }

    function loadPeople() {
        people = getUnique(rooms, 'capacity').map((item, index) => {
            return <option key={index} value={item}>{item}</option>
        });
    }

    function findRoomTypeByID(roomTypeID) {
        return roomTypes.find(roomType => roomType.ID === roomTypeID) ?? {};
    }

    function handleRoomTypeSelectChange(roomType) {
        setSelectedRoomTypeID(roomType);
        setIsFormValid(roomType !== 'All');
    }

    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                <div className="form-group">
                    <label htmlFor="type">check in</label>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat='dd/MM/yyyy'
                                filterDate={date => date.getDay() !== 6 && date.getDay() !== 0} isClearable
                                placeholderText="Choose a date!" className="datepicker-input"/>
                </div>

                <div className="form-group">
                    <label htmlFor="type">check out</label>
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} dateFormat='dd/MM/yyyy'
                                filterDate={date => date.getDay() !== 6 && date.getDay() !== 0} isClearable
                                placeholderText="Choose a date!" className="datepicker-input"/>
                </div>

                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id="type" className="form-control" onChange={(e) => handleRoomTypeSelectChange(e.target.value)}>
                        <option value={"All"}>All</option>
                        {roomTypes.map(i => {
                            return <option value={i.ID}>{i.Name}</option>;
                        })}
                    </select>
                    {validationInformation}
                </div>

                <div className="form-group">
                    <label htmlFor="numberOfGuests">Guests</label>
                    <select name="numberOfGuests" id="numberOfGuests" value={numberOfGuests} className="form-control"
                            onChange={(e) => setNumberOfGuests(e.target.value)}>
                        {people}
                    </select>
                </div>

                  <div className="form-group">
                      <div className="single-extra">
                          <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast}
                                 onChange={(e) => setBreakfast(e.target.value)} />
                          <label htmlFor="breakfast">breakfast</label>
                      </div>
                      <div className="single-extra">
                          <input type="checkbox" name="pets" id="pets" checked={pets}
                                 onChange={(e) => setPets(e.target.value)} />
                          <label htmlFor="pets">pets</label>
                      </div>
                  </div>

                  <RoomModal checkIn={startDate} checkOut={endDate} price={findRoomTypeByID(selectedRoomTypeID).Price}
                             roomTypeName={findRoomTypeByID(selectedRoomTypeID).Name} numberOfGuests={numberOfGuests}
                             breakfast={breakfast} pets={pets} isFormValid={isFormValid} />
            </form>
        </section>
    )
}
