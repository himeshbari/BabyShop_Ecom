import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";


const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:2020/product/orders");
      setOrders(data.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <>
      <div className="row dashboard h-100">
        <div className="row">
          <div className="col-lg-2 col-md-7 justify-content-center dash-position">
            <UserMenu />
          </div>
          <div className="col-lg-10 col-md-6 bg-white shadow-sm my-5 pb-4 dash margin bg-white" style={{width:"60%", marginLeft:"28%"}}>
            <h1 className="text-center my-5 fst-italic text-white bgcolor-2 py-4">All Orders</h1>
            {orders?.reverse().map((o, i) => {
              return (
                <div className="border shadow m-4 py-3 border-0">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row m-4 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`http://localhost:2020/uploads/${p.photo}`}
                            className=""
                            alt={p.name}
                            width="100%"
                            height={"150px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrders;
