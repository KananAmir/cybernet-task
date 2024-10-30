import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./index.scss";
import { IStage } from "../KanbanBoard";

interface StageProps {
  stageId: number;
  title: string;
  cards: string[];

  setStages: React.Dispatch<React.SetStateAction<IStage[]>>;
}

const Stage: React.FC<StageProps> = ({ stageId, title, cards, setStages }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const addCard = () => {
    if (taskTitle.trim()) {
      setStages((prevStages) =>
        prevStages.map((stage) =>
          stage.id === stageId
            ? { ...stage, cards: [...stage.cards, taskTitle] }
            : stage
        )
      );
      setTaskTitle("");
    }
  };

  const removeCard = (cardIndex: number) => {
    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              cards: stage.cards.filter((_, index) => index !== cardIndex),
            }
          : stage
      )
    );
  };

  return (
    <div id="stage">
      <h2 className="stage-title">{title}</h2>
      <ul className="list">
        {cards.map((card, index) => (
          <li key={index}>
            <span>{card}</span>
            <IoMdClose className="close" onClick={() => removeCard(index)} />
          </li>
        ))}
      </ul>
      <div className="add-card">
        <input
          type="text"
          placeholder="Add new card"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button onClick={addCard}>Add Card</button>
      </div>
    </div>
  );
};

export default Stage;
