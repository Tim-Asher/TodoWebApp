import ItemCard from "./ItemCard";
import { useGetTasksQuery } from "../../slices/todoApiSlice";
import { useContext, useEffect, useState } from "react";
import TodoContext from "../../context/todos";

const Items = () => {
  const { tasks, setTasks, login } = useContext(TodoContext);
  const [localLoading, setLocalLoading] = useState(false);

  let { data, error, isLoading, refetch } = useGetTasksQuery(undefined, {
    skip: !login,
  });

  useEffect(() => {
    if (data) {
      setTasks(data.docs);
      setLocalLoading(false);
    }
  }, [data, setTasks]);

  useEffect(() => {
    if (login) {
      setTasks([]);
      setLocalLoading(true);
      refetch();
    }
  }, [login, refetch]);

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
