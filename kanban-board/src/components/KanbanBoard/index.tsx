import { useEffect, useState } from "react";
import Stage from "../Stage";
import "./index.scss";

export interface IStage {
  id: number;
  title: string;
  cards: string[];
}

const KanbanBoard = () => {
  const [stages, setStages] = useState<IStage[]>([]);
  const [stageTitle, setStageTitle] = useState("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const localData = localStorage.getItem("stages");
    if (localData && localData !== "[]") {
      try {
        setStages(JSON.parse(localData));
      } catch (error) {
        console.error("Məlumatı JSON.parse etmək alınmadı", error);
      }
    }
  }, []);

  useEffect(() => {
    if (stages.length > 0) {
      localStorage.setItem("stages", JSON.stringify(stages));
    }
  }, [stages]);
  const addStage = () => {
    if (stageTitle.trim()) {
      setStages([...stages, { id: Date.now(), title: stageTitle, cards: [] }]);
      setStageTitle("");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredStages = stages.filter((stage) =>
    stage.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div id="kanban-board">
      <div className="container">
        <input
          type="search"
          className="search"
          placeholder="search"
          onChange={handleSearchChange}
        />
      </div>
      <div className="container">
        <div className="kanban-board">
          <div className="add-new-list">
            <input
              type="text"
              placeholder="Add new list"
              value={stageTitle}
              onChange={(e) => setStageTitle(e.target.value)}
            />
            <button onClick={addStage}>Add List</button>
          </div>

          <div className="stages">
            {filteredStages.map((stage) => (
              <Stage
                key={stage.id}
                stageId={stage.id}
                title={stage.title}
                cards={stage.cards}
                setStages={setStages}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
