import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import "../styles/Homepage.css";
import Footer from "../components/Layouts/Footer";
//add/remove to cart
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./Redux/product/productActions";
import { GridLoader } from 'react-spinners';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(new Array(products.length).fill(false));
  //search
  const [query, setQuery] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setproductsPerPage] = useState(9)

  // redux
  const cart = useSelector((state) => state.productState.cart);
  const dispatch = useDispatch();

  const handleAddToCart = (p, i) => {
    dispatch(addToCart(p));
    const newClickedArray = [...clicked];
    newClickedArray[i] = true;
    setClicked(newClickedArray);
    alert("Product Successfully Added In Cart!")
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:2020/product/get-products`
      );
      setLoading(false);
      setProducts(data.data);
      console.log(data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:2020/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategory();
  }, []);

  // search filter
  const filteredProducts = products.filter(
    (p) =>
      p.price.toString().includes(query) ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  console.log(filteredProducts);





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
      <div style={{ backgroundColor: "#ECF2FF", paddingBottom: "100px" }}>
        {/* banner image */}
        <Carousel className="banners z-1">
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              style={{ height: "70vh" }}
              src="/images/banner.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h1>Welcome to About Baby Shop !</h1>
              <p>|| STYLE YOUR LITTLE ONES ||</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100"
              style={{ height: "70vh" }}
              src="/images/banner2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h1>Baby Essentials !</h1>
              <p>T-shirts | Patnts | Inner-Wear | Shoes</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{ height: "70vh" }}
              src="/images/banner3.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h1>Flat 50% Off is hear !</h1>
              <p>Summer OFFER | By one get one FREE</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/* banner image */}
        {loading &&
          <div className='loader-container d-flex justify-content-center'>
            <GridLoader loading={loading} color="#42c569" />
          </div>
        }
        <div className="container-fluid row mt-3 mx-auto align-items-center justify-content-center home-page">



          <div className="col-md-10">
            <h1 className="text-center text-success mt-5">ALL PRODUCTS</h1>

            {/* Search  */}

            <div className="customSearchBar mb-0 m-4 d-flex justify-content-center">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                style={{
                  height: "40px",
                  width: "400px",
                  outline: "none",
                  marginBottom: "30px",
                }}
                type="search"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                placeholder=" Search Product With Name/Description"
                spellCheck={false}
              />
            </div>


            {/* All Products */}

            <div className="d-flex flex-wrap justify-content-center">
              {!currentProducts?.length ? (
                <h4 className="mt-5">
                  Products Not Found !
                </h4>

              ) : (

                currentProducts?.map((p, i) => {
                  const { id } = p;
                  return (
                    <div className="card m-2 rounded-0" key={p._id}>
                      <img
                        src={`http://localhost:2020/uploads/${p.photo}`}
                        className="card-img-top rounded-0"
                        alt={p.name}
                      />
                      <div className="card-body" style={{ backgroundColor: "#E3DFFD" }}>
                        <div className="card-name-price">
                          <h5 className="card-title">{p.name}</h5>
                          <h5 className="card-title card-price">
                            <h5 className="card-title card-price bg-warning text-black py-1 px-4">
                              {`₹ ${p.price}`}
                            </h5>
                          </h5>
                        </div>
                        <p className="card-text text-truncate text-success my-2">
                          {p.description}
                        </p>
                        <div>
                          <p><strong>Color:</strong></p>
                          <label>
                            <input type="checkbox" value="Red" /> Red
                          </label>
                          <label>
                            <input type="checkbox" value="Blue" /> Blue
                          </label>
                          <label>
                            <input type="checkbox" value="Green" /> Green
                          </label>
                        </div>

                        <div>
                          <p><strong>Size:</strong></p>
                          <label>
                            <input type="checkbox" value="Small" /> Small
                          </label>
                          <label>
                            <input type="checkbox" value="Medium" /> Medium
                          </label>
                          <label>
                            <input type="checkbox" value="Large" /> Large
                          </label>
                        </div>

                        <div className="card-name-price my-4">
                          <button
                            className="btn bgcolor-2 ms-1 me-1 "
                            onClick={() =>
                              navigate(`/product/get-product/${p._id}`)
                            }
                          >
                            More Details
                          </button>

                          <Button
                            className="w-100"
                            variant="success"
                            onClick={() => handleAddToCart(p, i)}
                            disabled={clicked[i]}
                          >
                            {clicked[i] ? 'Cart added!' : 'Add To Cart'}
                          </Button>

                          {/* )} */}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

            </div>
          </div>
        </div>
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
      <Footer />
    </>

  );
};

export default Home;
