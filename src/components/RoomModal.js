import React from 'react';
import Modal from 'react-modal';
import moment from 'moment/moment.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
export default function RoomModal({price}) {

  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [checkIn, setCheckIn] = React.useState(new Date()); // TODO: pass check in from parent component
  const [checkOut, setCheckOut] = React.useState(new Date()); // TODO: pass check in from parent component
  //const [roomType, setRoomType] = React.useState({}); // TODO: pass check in from parent component

  function openModal() {
    console.log(price);
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
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
      >

        <FontAwesomeIcon className="close-icon" onClick={closeModal} icon={faTimes} />
        <h2 ref={_subtitle => (subtitle = _subtitle)}>Your Reservation</h2>
        <div className="room-reservation-title">Room Reservation</div>
        <form>
          <p>Period: {moment(checkIn).format('DD/MM/YYYY')} - {moment(checkOut).format('DD/MM/YYYY')}</p>
          <p>Price: {price}</p>
          <p>Room Type: </p>
          <button></button>
        </form>
      </Modal>
    </div>
    );
}
 
//ReactDOM.render(<RoomModal />, appElement);