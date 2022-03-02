import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { rooms as roomsAtom, loader as loaderAtom } from "../../atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import "./styles.scss";

import { Link } from "react-router-dom";
import { useAuthGuard } from "../../Tools/tools";
import { userProfile } from "../../atoms/atoms";

const HomePage = () => {
  useAuthGuard();
  const user = useRecoilValue(userProfile);
  const [rooms, setRooms] = useRecoilState(roomsAtom);

  const [isLoading, setIsLoading] = useRecoilState(loaderAtom);
  const BASE_URL = process.env.REACT_APP_BACKEND;

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    try {
      let response = await fetch(`${BASE_URL}/rooms`);
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
        {user ? (
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
                    <Card.Text
                      className={`${
                        room.status === "free" ? "cards-text" : "card-text2"
                      }`}
                    >
                      {room.status}
                    </Card.Text>
                    <span>Maximum number of people: {room.maxNumOfPeople}</span>
                  </Card.Body>
                  <Link to={`${room._id}`}>
                    <Button>Book now</Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default HomePage;
