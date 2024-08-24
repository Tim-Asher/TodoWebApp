// Import the axios library for making HTTP requests
import axios from "axios";

// Define the base URL for the API
const baseUrl = `http://localhost:8000/api/`;
// Define the URL for accessing todo-related endpoints
const todoUrl = `http://localhost:8000/api/todos/`;

// Function to fetch all todos from the API
export const getAllServise = async () => {
  try {
    // Make a GET request to the todo URL
    const { data } = await axios.get(todoUrl);
    // Return the data received from the API
    return data;
  } catch (err) {
    // Log any errors that occur during the request
    console.log(err);
  }
};

// Function to add a new item to a specified directory
export const addOneServise = async (directory, item) => {
  // Construct the URL for the POST request based on the directory
  const url = baseUrl + directory + "/";
  try {
    // Make a POST request to the constructed URL with the item data
    const { data } = await axios.post(url, item);
    // Return the data received from the API
    return data;
  } catch (err) {
    // Log any errors that occur during the request
    console.log(err);
  }
};

// Function to delete all todos
export const deleteAllServise = async () => {
  try {
    // Make a DELETE request to the URL for deleting all todos
    const { data } = await axios.delete(todoUrl + "deleteAll");
    // Return the data received from the API
    return data;
  } catch (err) {
    // Log any errors that occur during the request
    console.log(err);
  }
};

// Function to delete a single todo by its ID
export const delteOneServise = async (id) => {
  try {
    // Make a DELETE request to the URL for the specific todo ID
    const data = await axios.delete(todoUrl + id);
    // Return the data received from the API
    return data;
  } catch (err) {
    // Log any errors that occur during the request
    console.log(err);
  }
};

// Function to update a todo by its ID
export const editOneServise = async (id, item) => {
  try {
    // Make a PATCH request to the URL for the specific todo ID with the updated item data
    const { data } = await axios.patch(todoUrl + id, item);
    // Return the data received from the API
    return data;
  } catch (err) {
    // Log any errors that occur during the request
    console.log(err);
  }
};
