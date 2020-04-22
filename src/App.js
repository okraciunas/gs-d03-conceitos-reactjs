import React, { useState, useEffect } from "react";
import {
  getRepositories,
  createNewRepository,
  deleteRepositoryById,
} from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories().then(({ data: repositories }) =>
      setRepositories(repositories)
    );
  }, []);

  async function handleAddRepository() {
    const randomTitle = Date.now();

    const { data: repository } = await createNewRepository({
      title: randomTitle,
      url: `http://www.github.com/okraciunas/${randomTitle}`,
      techs: ["NodeJs", "ReactJS", "JavaScript"],
    });

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await deleteRepositoryById(id);

    if (response.status !== 204) {
      throw new Error("Something wrong is not right!");
    }

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
