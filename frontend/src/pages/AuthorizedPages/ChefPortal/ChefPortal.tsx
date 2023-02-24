import React from "react";
import Card from "../../../components/Card/Card";
import Modal from "../../../components/Modal/Modal";
import { LoggedUserLayout } from "../../../layouts";
import { MEALS_MOCK } from "../../data/meals";
import StarIcon from "@mui/icons-material/Star";

import "./ChefPortal.css";

export default function ChefPortal() {
  return (
    <LoggedUserLayout>
      <span>
        <StarIcon htmlColor="#ffbc0b" fontSize="large"></StarIcon>
      </span>
      <div className="cardsContainer">
        {MEALS_MOCK.map((meal) => (
          <div className="m-3">
            <Card key={meal.id} meal={meal}></Card>
          </div>
        ))}
      </div>

      <Modal></Modal>
    </LoggedUserLayout>
  );
}
