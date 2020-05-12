import React from 'react';
import Modal from 'react-modal';
import moment from 'moment/moment.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const customStyles = {
  content : {
    border                : '0',
    padding               : '0',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
export default function RoomModal({checkIn, checkOut, price, roomTypeName, numberOfGuests, breakfast, pets,
  isFormValid}) {

  var subtitle;
  let breakfastInformation = breakfast === 'on' ? <p>Breakfast: <FontAwesomeIcon className="modal-icons" icon={faCheck}/></p> : '';
  let petsInformation = pets === 'on' ? <p>Pets: <FontAwesomeIcon className="modal-icons" icon={faCheck}/></p> : '';
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    if (isFormValid) {
      setIsOpen(true);
    }
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  function closeModal() {
    setIsOpen(false);
  }

  function createReservation() {
    axios.post('https://localhost:44336/api/reservation/', {
      DateCreation: "20-01-2020",
      CheckIn: "20-01-2020",
      CheckOut: "20-01-2020",
      NumberOfAdults: 2,
      NumberOfChildren: 3,
      Meal: true,
      ReservationTypeID: "0856B808-C2E4-B5F3-7AF6-035E096B238A",
      GuestID: "F22F1530-A563-30E9-F475-32E75369D4A0",
      RoomID: "92253C67-3FE9-B5A3-1815-06370B145B62"
    });
  }

  return (
      <div>
        <button type="button" className="btn-primary" onClick={openModal}>Show Reservation</button>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Modal"
            ariaHideApp={false}
            style={customStyles}
        >

          <div className="modal">
            <FontAwesomeIcon className="close-icon" onClick={closeModal} icon={faTimes}/>
            <h2 className="modal-title" ref={_subtitle => (subtitle = _subtitle)}>Your Reservation</h2>
            <div className="section"></div>
            <div className="modal-subtitle">Room Reservation</div>
            <form>
              <p className="modal-element">Period: {moment(checkIn).format('DD/MM/YYYY')} - {moment(checkOut).format('DD/MM/YYYY')}</p>
              <p className="modal-element">Price: {price}</p>
              <p className="modal-element">Room Type: {roomTypeName}</p>
              <p className="modal-element">Guests: {numberOfGuests}</p>
              <p className="modal-element">{breakfastInformation}</p>
              <p className="modal-element">{petsInformation}</p>
              {/* <button className="btn-primary center-button">Submit</button> */}
              <Link to = '/reservation' className='btn-primary center-button' onClick={createReservation}>
                        Submit
              </Link>
            </form>
          </div>
        </Modal>
      </div>
  );
}
