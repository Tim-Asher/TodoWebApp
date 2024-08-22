import ItemCard from "./ItemCard";
import { useGetTasksQuery } from "../../slices/todoApiSlice";
import { useContext, useEffect, useState } from "react";
import TodoContext from "../../context/todos";

const Items = () => {
  const { tasks, setTasks } = useContext(TodoContext);
  // const { data, isLoading, error } = useGetTasksQuery();
  const { login } = useContext(TodoContext);
  // const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(data?.docs);

  let { data, isLoading, error, refetch } = useGetTasksQuery(undefined, {
    skip: !login, // Skip the query if the user is not logged in
  });

  useEffect(() => {
    if (login) {
      setLoading(true); // Set loading to true when fetching new data
      refetch()
        .then((response) => {
          setTasks(response.data?.docs || []); // Update tasks with new data
        })
        .finally(() => {
          setLoading(false); // Stop loading after fetching is complete
        });
    } else {
      setTasks([]); // Clear tasks when logging out
    }
  }, [login, refetch, tasks]);

  if (loading || isLoading) {
    return (
      <div
        className="col-12 col-md-5 bg-primary-subtle rounded-3 m-2 "
        id="accordionExample"
      >
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div
      className="accordion col-12 col-md-5 bg-primary-subtle rounded-3 m-2 "
      id="accordionExample"
    >
      <h1 className="pb-3 text-decoration-underline">Tasks:</h1>
      {tasks?.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Items;
