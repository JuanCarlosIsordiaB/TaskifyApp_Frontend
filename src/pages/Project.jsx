import { useParams, Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import { useEffect } from "react";
import ModalFormTask from "../components/ModalFormTask";
import ModalDeleteTask from "../components/ModalDeleteTask";
import { Task } from "../components/Task";
import Alert from "../components/Alert";

export const Project = () => {
  const params = useParams();
  const { getProject, project, loading, handleModalTask } = useProjects();

  useEffect(() => {
    getProject(params.id);
  }, []);

  const { name } = project;

  if (loading) return "Loading...";

  const { msg } = alert;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl ">{name}</h1>

        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <Link
            to={`/projects/edit/${params.id}`}
            className="font-bold uppercase flex gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            Edit
          </Link>
        </div>
      </div>
      <button
        onClick={handleModalTask}
        type="button"
        className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Add Task
      </button>

      <p className="font-bold text-xl mt-10">Tasks of the Project</p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/3 lg:w-1/4">
          {msg && <Alert alert={alert} />}
        </div>
      </div>

      <div className="bg-white shadow mt-10 rounded-lg">
        {project.tasks?.length ? (
          project.tasks?.map((task) => <Task key={task._id} task={task} />)
        ) : (
          <p className="text-center my-5 p-10">
            There is no Tasks in this Project
          </p>
        )}
      </div>

      <ModalFormTask />
      <ModalDeleteTask />
    </>
  );
};
