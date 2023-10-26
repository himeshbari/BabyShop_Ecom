import React from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  console.log(auth)
  return(
    <div>
      <div className="container-fluid dashboard "> 
        <div className="row " >
          <div className="col-lg-2 col-md-7 justify-content-center dash-position">
            <AdminMenu />
          </div>
          <div className="col-lg-10 col-md-6 bg-white shadow-sm my-5 w-50 dash margin" style={{marginLeft:"32%"}}>
          <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">Your Profile</h1>
            <div className="card w-75 py-3 px-5 border-0">
            <br/>
              <h3> Admin Name : <span className="text-color-3 fst-italic">{auth?.user?.name}</span></h3>
              <h3> Admin Email : <span className="text-color-3 fst-italic">{auth?.user?.email}</span></h3>
              <h3> Admin Contact : <span className="text-color-3 fst-italic">{auth?.user?.phone}</span></h3>
              <br/><br/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


