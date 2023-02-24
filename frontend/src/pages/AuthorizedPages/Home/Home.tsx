import React from "react";
import Card from "../../../components/Card/Card";
import Modal from "../../../components/Modal/Modal";
import Navbar from "../../../components/Navbar/Navbar";
import LoggedUserLayout from "../../../layouts/LoggedUserLayout";
import "./Home.css";

const persons = [
  {
    id: 1,
    title: "Ivan Greve",
    imageUrl: "https://ivangreve.com/profile.jpg",
    description: "Desarrollador de Software",
  },
  {
    id: 2,
    title: "Alvaro Rodriguez",
    imageUrl: "https://ivangreve.com/profile.jpg",
    description: "Desarrollador de Software",
  },
  {
    id: 3,
    title: "Jorge Perez",
    imageUrl: "https://ivangreve.com/profile.jpg",
    description: "Desarrollador de Software",
  },
  {
    id: 4,
    title: "Ivan Greve",
    imageUrl: "https://ivangreve.com/profile.jpg",
    description: "Desarrollador de Software",
  },
  {
    id: 5,
    title: "Alvaro Rodriguez",
    imageUrl: "https://ivangreve.com/profile.jpg",
    description: "Desarrollador de Software",
  },
  {
    id: 6,
    title: "Jorge Perez",
    imageUrl: "https://ivangreve.com/profile.jpg",
    description: "Desarrollador de Software",
  },
];
function Home() {
  return (
    <LoggedUserLayout>
      <div className="cardsContainer">
        {persons.map((p) => (
          <div className="m-3">
            <Card
              key={p.id}
              title={p.title}
              imageUrl={p.imageUrl}
              description={p.description}
            ></Card>
          </div>
        ))}
      </div>
      <Modal></Modal>
    </LoggedUserLayout>
  );
}

export default Home;
