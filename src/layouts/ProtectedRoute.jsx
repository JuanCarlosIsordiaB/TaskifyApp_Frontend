import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";


export const ProtectedRoute = () => {


  const {auth,loading} = useAuth();

  if(loading) return 'Loading';
  return (
    <>
      {
        auth._id ? (
          <div >
            <Header/>

            <div className="md:flex md:min-h-screen">
              <Sidebar />
              <main className="p-10 flex-1">
                <Outlet/>
              </main>
            </div>
          </div>
        )  : <Navigate to='/' />
      }
    </>
  )
}
