

import { useContext } from 'react';
import ProjectsContext from '../context/ProjectsProvider';


const useProjects = () => {
    const data = useContext(ProjectsContext);
    return data;
}

export default useProjects;