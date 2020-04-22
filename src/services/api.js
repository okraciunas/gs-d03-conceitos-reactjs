import axios from "axios";

const RESOURCE_REPOSITORIES = "repositories";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const getRepositories = () => {
  return api.get(RESOURCE_REPOSITORIES);
};

export const createNewRepository = ({ title, url, techs }) => {
  return api.post(RESOURCE_REPOSITORIES, { title, url, techs });
};

export const deleteRepositoryById = (id) => {
  return api.delete(`${RESOURCE_REPOSITORIES}/${id}`);
};

export default api;
