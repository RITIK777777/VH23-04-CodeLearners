import React from 'react'
import Footer from '../../Components/Layout/Footer'
import Sidebar from '../../Components/Layout/Sidebar'
import NavBar from '../../Components/Layout/NavBar'
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";

import axios from "axios";
import toast from "react-hot-toast";
// import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
// import "../styles/HomePage.css";
const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  

  const getAllProducts = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/scholarships/all`);
      
      setProducts(data.products);
    } catch (error) {
      
      console.log(error);
    }
  };

  return (
    <div>
        <NavBar/>
        <Sidebar/>
        <div className="col-md-9 ">
          <h1 className="text-center"></h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
                
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`http://localhost:8080/scholarships/${p.scholarshipId}`)}
                    >
                      More Details
                    </button>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        
        <Footer />

    </div>
  )
                    }

export default Home