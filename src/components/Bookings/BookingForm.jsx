import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRecoilState } from "recoil";
import { rooms as roomsAtom } from "../../atoms/atoms";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import "./styles.scss";
import { useAuthGuard } from "../../Tools/tools";
import { userAtom } from "../../atoms/atoms";
import { userAtomSelector } from "../../atoms/atoms";
import { useNavigate } from "react-router";

const BookingForm = () => {
  useAuthGuard();

  const BASE_URL = process.env.REACT_APP_BACKEND;
  const { id } = useParams();

  const [userId, setUserId] = useRecoilState(userAtom);

  const rooms = useRecoilValue(roomsAtom);
  const userDataId = useRecoilValue(userAtomSelector);
  console.log("userDataId", userDataId);

  const [reservationData, setReservationData] = useState({
    user: userDataId,
    roomName: id,
    numOfPeople: 1,
    startDate: "",
    endDate: "",
  });

  console.log("reservationData", reservationData);
  const [room, setRoom] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    let roomToShow = rooms.find((room) => room._id.toString() === id);
    setRoom(roomToShow);
    getUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (fieldName, value) => {
    setReservationData({
      ...reservationData,
      [fieldName]: value,
    });
  };

  const getUser = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      let response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log("user data====", data);
        setUserId(data._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        body: JSON.stringify(reservationData),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        alert("OK!");
        setReservationData({
          user: userDataId,
          roomName: id,
          numOfPeople: 1,
          startDate: "",
          endDate: "",
        });
        navigate("/");
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
          <Card className="mt-5">
            <div className="booking-detail">
              <h2 className="book-title">Book your Room NOW!</h2>

              <span className="room-title">{room.roomName}</span>
              <div className="booking-image">
                <img
                  src={room.imageUrl}
                  alt=""
                  className="img-fluid w-100 h-100"
                />
              </div>
            </div>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>How many people?</Form.Label>
                  <Form.Control
                    as="select"
                    value={reservationData.numOfPeople}
                    onChange={(e) => {
                      handleInput("numOfPeople", e.target.value);
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
                    value={reservationData.startDate}
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
                    value={reservationData.endDate}
                    onChange={(e) => {
                      handleInput("endDate", e.target.value);
                    }}
                    required
                  />
                </Form.Group>
                <Button className="booking-button" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingForm;
