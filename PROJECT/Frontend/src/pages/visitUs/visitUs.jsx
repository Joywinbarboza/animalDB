import React, { useState, useEffect } from "react";
import "./visitUs.css";
import axios from "axios";
import ReactCardFlip from "react-card-flip";

function VisitUs() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("email") !== "null" &&
      localStorage.getItem("email") !== ""
  );

  const [visitusHeight, setVisitusHeight] = useState("211vh");

  const [cards, setCards] = useState([
    {
      id: 1,
      adultCount: parseInt(localStorage.getItem("adultCount1")) || 0,
      childCount: parseInt(localStorage.getItem("childCount1")) || 0,
      isFlipped: false,
      zoo: "Pilikula",
      date: "",
    },
    {
      id: 2,
      adultCount: parseInt(localStorage.getItem("adultCount2")) || 0,
      childCount: parseInt(localStorage.getItem("childCount2")) || 0,
      isFlipped: false,
      zoo: "Mysore Zoo",
      date: "",
    },
    {
      id: 3,
      adultCount: parseInt(localStorage.getItem("adultCount3")) || 0,
      childCount: parseInt(localStorage.getItem("childCount3")) || 0,
      isFlipped: false,
      zoo: "Bannerghatta Biological Park",
      date: "",
    },
  ]);

  useEffect(() => {
    cards.forEach((card) => {
      localStorage.setItem(`adultCount${card.id}`, card.adultCount.toString());
      localStorage.setItem(`childCount${card.id}`, card.childCount.toString());
    });
  }, [cards]);

  const handleIncrement = (id, category) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? {
              ...card,
              [`${category}Count`]: card[`${category}Count`] + 1,
            }
          : card
      )
    );
  };

  const handleDecrement = (id, category) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id && card[`${category}Count`] > 0
          ? {
              ...card,
              [`${category}Count`]: card[`${category}Count`] - 1,
            }
          : card
      )
    );
  };

  async function handleBook(e, id) {
    e.preventDefault();

    const email = localStorage.getItem("email");

    const card = cards.find((c) => c.id === id);

    const bookPost = {
      email: email,
      adultCount: card.adultCount,
      childCount: card.childCount,
      zoo: card.zoo,
      date: card.date,
    };

    console.log(card.date);

    const response = await axios
      .post("http://localhost:8081/visit/visitbook", bookPost)
      .then((res) => {
        console.log("done");
      });

    console.log(
      `Booking ${card.adultCount} adult(s) and ${card.childCount} child(s) for Card ${id}`
    );
  }

  const flipCard = (id) => {
    setVisitusHeight("185vh");
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? { ...card, isFlipped: !card.isFlipped }
          : { ...card, isFlipped: false }
      )
    );
  };

  if (isLoggedIn) {
    return (
      <>
        <div className="visitus-main" style={{ height: visitusHeight }}>
          <div className="visitus-holder">
            {/* Card 1 */}
            <ReactCardFlip
              flipDirection="horizontal"
              isFlipped={cards[0].isFlipped}
            >
              <div
                className="back"
                id="pilikulazoo"
                onClick={() => flipCard(cards[0].id)}
              >
                {/* <p>back</p>
                <p>zoo1</p> */}
              </div>
              <div className="bookTable">
                <form action="">
                  <div className="category">
                    <div className="adult">
                      <span>Adult</span>
                      <div className="no-of-tickets">
                        <div
                          className="minus"
                          onClick={() => handleDecrement(cards[0].id, "adult")}
                        >
                          <p>-</p>
                        </div>
                        <div className="count">
                          <p>{cards[0].adultCount}</p>
                        </div>
                        <div
                          className="plus"
                          onClick={() => handleIncrement(cards[0].id, "adult")}
                        >
                          <p>+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="category">
                    <div className="child">
                      <span>Child</span>
                      <div className="no-of-tickets">
                        <div
                          className="minus"
                          onClick={() => handleDecrement(cards[0].id, "child")}
                        >
                          <p>-</p>
                        </div>
                        <div className="count">
                          <p>{cards[0].childCount}</p>
                        </div>
                        <div
                          className="plus"
                          onClick={() => handleIncrement(cards[0].id, "child")}
                        >
                          <p>+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="category">
                    <div className="date">
                      <span>Date</span>
                      <input
                        type="date"
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          const today = new Date();

                          if (selectedDate > today) {
                            setCards((prevCards) =>
                              prevCards.map((card) =>
                                card.id === cards[0].id
                                  ? { ...card, date: e.target.value }
                                  : card
                              )
                            );
                          } else {
                            alert(
                              "INVALID DATE. Please give date for the FUTURE."
                            );
                          }
                        }}
                        value={cards[0].date}
                      />
                    </div>
                  </div>
                </form>
                <button onClick={(e) => handleBook(e, cards[0].id)}>
                  Book Tickets
                </button>
              </div>
            </ReactCardFlip>

            {/* Card 2 */}
            <ReactCardFlip
              flipDirection="horizontal"
              isFlipped={cards[1].isFlipped}
            >
              <div
                className="back"
                id="mysorezoo"
                onClick={() => flipCard(cards[1].id)}
              >
                {/* <p>back</p>
                <p>zoo2</p> */}
              </div>
              <div className="bookTable">
                <form action="">
                  <div className="category">
                    <div className="adult">
                      <span>Adult</span>
                      <div className="no-of-tickets">
                        <div
                          className="minus"
                          onClick={() => handleDecrement(cards[1].id, "adult")}
                        >
                          <p>-</p>
                        </div>
                        <div className="count">
                          <p>{cards[1].adultCount}</p>
                        </div>
                        <div
                          className="plus"
                          onClick={() => handleIncrement(cards[1].id, "adult")}
                        >
                          <p>+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="category">
                    <div className="child">
                      <span>Child</span>
                      <div className="no-of-tickets">
                        <div
                          className="minus"
                          onClick={() => handleDecrement(cards[1].id, "child")}
                        >
                          <p>-</p>
                        </div>
                        <div className="count">
                          <p>{cards[1].childCount}</p>
                        </div>
                        <div
                          className="plus"
                          onClick={() => handleIncrement(cards[1].id, "child")}
                        >
                          <p>+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="category">
                    <div className="date">
                      <span>Date</span>
                      <input
                        type="date"
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          const today = new Date();

                          if (selectedDate > today) {
                            setCards((prevCards) =>
                              prevCards.map((card) =>
                                card.id === cards[1].id
                                  ? { ...card, date: e.target.value }
                                  : card
                              )
                            );
                          } else {
                            alert(
                              "INVALID DATE. Please give date for the FUTURE."
                            );
                          }
                        }}
                        value={cards[1].date}
                      />
                    </div>
                  </div>
                </form>
                <button onClick={(e) => handleBook(e, cards[1].id)}>
                  Book Tickets
                </button>
              </div>
            </ReactCardFlip>

            {/* Card 3 */}
            <ReactCardFlip
              flipDirection="horizontal"
              isFlipped={cards[2].isFlipped}
            >
              <div
                className="back"
                id="bannerghatta"
                onClick={() => flipCard(cards[2].id)}
              >
                {/* <p>back</p>
                <p>zoo3</p> */}
              </div>
              <div className="bookTable">
                <form action="">
                  <div className="category">
                    <div className="adult">
                      <span>Adult</span>
                      <div className="no-of-tickets">
                        <div
                          className="minus"
                          onClick={() => handleDecrement(cards[2].id, "adult")}
                        >
                          <p>-</p>
                        </div>
                        <div className="count">
                          <p>{cards[2].adultCount}</p>
                        </div>
                        <div
                          className="plus"
                          onClick={() => handleIncrement(cards[2].id, "adult")}
                        >
                          <p>+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="category">
                    <div className="child">
                      <span>Child</span>
                      <div className="no-of-tickets">
                        <div
                          className="minus"
                          onClick={() => handleDecrement(cards[2].id, "child")}
                        >
                          <p>-</p>
                        </div>
                        <div className="count">
                          <p>{cards[2].childCount}</p>
                        </div>
                        <div
                          className="plus"
                          onClick={() => handleIncrement(cards[2].id, "child")}
                        >
                          <p>+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="category">
                    <div className="date">
                      <span>Date</span>
                      <input
                        type="date"
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          const today = new Date();

                          if (selectedDate > today) {
                            setCards((prevCards) =>
                              prevCards.map((card) =>
                                card.id === cards[2].id
                                  ? { ...card, date: e.target.value }
                                  : card
                              )
                            );
                          } else {
                            alert(
                              "INVALID DATE. Please give date for the FUTURE."
                            );
                          }
                        }}
                        value={cards[2].date}
                      />
                    </div>
                  </div>
                </form>
                <button onClick={(e) => handleBook(e, cards[2].id)}>
                  Book Tickets
                </button>
              </div>
            </ReactCardFlip>
          </div>
        </div>
      </>
    );
  } else {
    // User is not logged in
    return (
      <div className="visitus-main-return">
        <div className="visitus-holder not-logged-in">
          <p>You need to log in to book tickets.</p>
          {/* Add login button or link here */}
        </div>
      </div>
    );
  }
}

export default VisitUs;
