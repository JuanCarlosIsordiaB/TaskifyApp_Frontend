import { PreviewProjects } from "../components/PreviewProjects";
import  useProjects  from "../hooks/useProjects"



export const Projects = () => {

  const {projects} = useProjects();

  

  return (
      <>
        <h1 className="text-4xl font-black">Projects</h1>

        <div className="bg-white shadow mt-10 rounded-lg">
          {
            projects.length ?
              
              projects.map(project => (
                <PreviewProjects 
                  project={project}
                  key={project._id}
                />
              ))
              : 
            <p className="text-center text-gray-600 uppercase p-5">There's no Projects</p>
          }
        </div>
      </>
    )
}
