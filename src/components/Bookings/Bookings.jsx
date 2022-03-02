import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { parseISO, format } from "date-fns";
import { rooms as roomsAtom } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
import { useAuthGuard } from "../../Tools/tools";

const Bookings = () => {
  useAuthGuard();
  const rooms = useRecoilValue(roomsAtom);
  const [reservations, setReservations] = useState([]);
  console.log("here is the booked reservation", reservations);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      let response = await fetch("http://localhost:3011/bookings");

      if (response.ok) {
        let data = await response.json();
        setReservations(data.bookings);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <>
      <h2 className="mt-4">BOOKED ROOMS</h2>
      {isLoading && <Spinner animation="border" variant="info" />}
      {isError ? (
        <Alert variant="danger">Something went wrong :(</Alert>
      ) : (
        <ListGroup className="mb-5">
          {reservations.map((res) => (
            <ListGroup.Item key={res._id}>
              {res.name} for {res.numOfPeople} on{" "}
              {/*  {format(parseISO(res.dateTime), "EEEE, MMM. do - HH:mm")} */}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default Bookings;
