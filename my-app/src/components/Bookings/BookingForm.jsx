import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BookingForm = () => {
  const [reservation, setReservation] = useState({
    numberOfPeople: 1,
    startDate: "",
    endDate: "",
  });

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
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/reservation",
        {
          method: "POST",
          body: JSON.stringify(reservation),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("OK!");
        setReservation({
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
    <>
      <h2>Book your table NOW!</h2>
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
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Start Date?</Form.Label>
          <Form.Control
            type="datetime-local"
            value={reservation.dateTime}
            onChange={(e) => {
              handleInput("dateTime", e.target.value);
            }}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Date?</Form.Label>
          <Form.Control
            type="datetime-local"
            value={reservation.dateTime}
            onChange={(e) => {
              handleInput("dateTime", e.target.value);
            }}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default BookingForm;
