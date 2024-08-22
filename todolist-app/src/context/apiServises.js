import axios from "axios";
const baseUrl = `http://localhost:8000/api/`;
const todoUrl = `http://localhost:8000/api/todos/`;
// const userUrl = `http://localhost:8000/api/users/`;

export const getAllServise = async () => {
  try {
    const { data } = await axios.get(todoUrl);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addOneServise = async (directory, item) => {
  const url = baseUrl + directory + "/";
  try {
    const { data } = await axios.post(url, item);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllServise = async () => {
  try {
    const { data } = await axios.delete(todoUrl + "deleteAll");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const delteOneServise = async (id) => {
  try {
    const data = await axios.delete(todoUrl + id);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const editOneServise = async (id, item) => {
  try {
    const { data } = await axios.patch(todoUrl + id, item);
    return data;
  } catch (err) {
    console.log(err);
  }
};
