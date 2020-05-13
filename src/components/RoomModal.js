import React from 'react';
import Modal from 'react-modal';
import moment from 'moment/moment.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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
    subtitle.style.color = '#f00';
  }
 
  function closeModal() {
    setIsOpen(false);
  }

  function createReservation() {
    axios.post('https://localhost:44336/api/reservation/', {
      ID: uuidv4(),
      DateCreation: moment(new Date()).format('YYYY-MM-DD'),
      CheckIn: moment(checkIn).format('YYYY-MM-DD'),
      CheckOut: moment(checkOut).format('YYYY-MM-DD'),
      NumberOfAdults: numberOfGuests,
      NumberOfChildren: 2,
      Meal: !!breakfast,
      ReservationTypeID: "1AB4F8C3-3F8D-2ABF-10E7-B24BE5F781AA",
      GuestID: "DAC965EB-893D-94D3-136F-73EC397EF190",
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
              <Link to = '/reservation' className='btn-primary center-button' onClick={createReservation}>
                        Submit
              </Link>
            </form>
          </div>
        </Modal>
      </div>
  );
}
