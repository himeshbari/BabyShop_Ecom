import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import "../../styles/Pagination.css"

const Products = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setproductsPerPage] = useState(10)

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:2020/product/get-products`);
      setProducts(data.data);
      console.log(data.data)
    } catch (error) {
      console.log(error);
      alert("Someething Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // search filter
  const filteredProducts = products.filter(p =>
    p.price.toString().includes(query)
    ||
    p.name.toLowerCase().includes(query.toLowerCase())
    ||
    p.description.toLowerCase().includes(query.toLowerCase())
  )

  console.log(filteredProducts)


  //delete a product
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:2020/product/delete-product/${id}`
      );
      alert("Product Deleted Successfully");
      getAllProducts();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // pagination
  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex)

  let pages = [];

  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pages.push(i)
  }


  return (
    <>
      <div className="row dashboard h-100">
        <div className="col-lg-2 col-md-7 justify-content-center dash-position">
          <AdminMenu />
        </div>
        <div className="col-lg-10 col-md-6 bg-white shadow-sm my-5 dash w-75 margin" style={{ marginLeft: "21%" }}>
          <h1 className="text-center mt-5 fst-italic text-white bgcolor-2 py-4">All Products List</h1>
          {/* Search  */}

          <div className='customSearchBar mb-0 m-4 d-flex justify-content-center'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              style={{ height: "40px", width: "400px", outline: "none", margin: "20px 0px" }}
              type='search'
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder=' Search Product With Name/Description'
              spellCheck={false}
            />
          </div>
          <div className="d-flex flex-wrap justify-content-center px-5 py-3">
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th className="text-center">Sr. No</th>
                  <th>Name</th>
                  <th className="hide">Category</th>
                  <th className="text-center">Price</th>
                  <th className="hide text-center">Quantity</th>
                  <th className="hide">Description</th>
                  <th className="text-center">Image</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {!currentProducts?.length
                  ?
                  <h4 className="mt-5">Products Not Found !</h4>
                  :
                  currentProducts?.map((p, i) => {
                    return (
                      <>
                        <tr>
                          <td className="text-center">{++i}</td>
                          <td>{p.name}</td>
                          <td className="hide">{p?.category?.name}</td>
                          <td className="text-center">{p.price}</td>
                          <td className="hide text-center">{p.quantity}</td>
                          <td className="hide" style={{ width: "30%" }}>{p.description}</td>
                          <td className="text-center"><img src={`http://localhost:2020/uploads/${p.photo}`} style={{ height: "60px", width: "60px" }} /></td>
                          <td>
                            <div className="text-center" style={{ fontSize: "25px" }}>
                              <Link to={`/update-product/${p._id}`}><FaEdit /></Link>

                              <MdDelete className=" text-danger" onClick={() => handleDelete(p._id)} />
                            </div>
                          </td>
                        </tr>
                      </>
                    )
                  })}
              </tbody>
            </table>
            <div className='pagination w-100'>
              {pages.map((page, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(page)}
                    className={page == currentPage ? "active" : ""}>
                    {page}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;


