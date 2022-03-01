import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRecoilState } from "recoil";
import {
  reservationAtom,
  userProfile,
  rooms as roomsAtom,
} from "../../atoms/atoms";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import "./styles.scss";
import { useAuthGuard } from "../../Tools/tools";

const BookingForm = () => {
  useAuthGuard();
  const [reservation, setReservation] = useRecoilState(reservationAtom);
  const { id } = useParams();
  console.log("here is id: ", id);
  const rooms = useRecoilValue(roomsAtom);
  const [room, setRoom] = useState("");
  console.log("here is room", room);

  useEffect(() => {
    let roomToShow = rooms.find((room) => room._id.toString() === id);
    setRoom(roomToShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (fieldName, value) => {
    setReservation({
      ...reservation,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(reservation);
    try {
      let response = await fetch("http://localhost:3011/bookings", {
        method: "POST",
        body: JSON.stringify(reservation),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        alert("OK!");
        setReservation({
          user: userProfile._id,
          roomName: id,
          numberOfPeople: 1,
          startDate: "",
          endDate: "",
        });
      } else {
        alert("ERROR");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Book your Room NOW!</h2>
          <span className="room-title">{room.roomName}</span>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>How many people?</Form.Label>
              <Form.Control
                as="select"
                value={reservation.numberOfPeople}
                onChange={(e) => {
                  handleInput("numberOfPeople", e.target.value);
                }}
                required
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Start Date?</Form.Label>
              <Form.Control
                type="datetime-local"
                value={reservation.startDate}
                onChange={(e) => {
                  handleInput("startDate", e.target.value);
                }}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date?</Form.Label>
              <Form.Control
                type="datetime-local"
                value={reservation.endDate}
                onChange={(e) => {
                  handleInput("endDate", e.target.value);
                }}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
