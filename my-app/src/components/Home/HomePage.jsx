import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { rooms as roomsAtom, loader as loaderAtom } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import "./styles.scss";

const HomePage = () => {
  const [rooms, setRooms] = useRecoilState(roomsAtom);
  console.log("here is rooms", rooms);
  const [isLoading, setIsLoading] = useRecoilState(loaderAtom);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      let response = await fetch("http://localhost:3011/rooms");
      if (response.ok) {
        let data = await response.json();
        setRooms(data.rooms);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Container id="home-container">
        {isLoading && <Spinner animation="border" variant="info" />}

        <Row className="home-row">
          {rooms.map((room) => (
            <Col xs={12} md={6} lg={4} className="mt-2">
              <Card className="cards-row">
                <Card.Img
                  variant="top"
                  className="image img-fluid"
                  src={room.imageUrl}
                />
                <Card.Body>
                  <Card.Title className="cards-title">
                    {room.roomName}
                  </Card.Title>
                  <Card.Text className="cards-text">{room.status}</Card.Text>
                  <span>{room.maxNumOfPeople}</span>
                </Card.Body>
                <Button>Book now</Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>{<Col></Col>}</Row>
      </Container>
    </div>
  );
};

export default HomePage;
