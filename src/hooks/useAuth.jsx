import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
    const data = useContext(AuthContext);
    return data;
}

export default useAuth;