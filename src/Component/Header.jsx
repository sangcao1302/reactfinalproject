import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Header() {
  const {arrProductCart}=useSelector(state=>state.productReducer)
  const[search,setSearch]=useState("")
  const handleSearch=(e)=>{
    let {value}=e.target
    setSearch(value)
  }
  return (
    <div>
      <div className="container-fluid bg-dark p-0">
        <div className="container p-0">
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark d-flex">
            <NavLink className="navbar-brand w-50" to="/reactfinalproject/home">
              <img src="./assets/image/logo.png" alt="" />
            </NavLink>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            />
            <div
              className="collapse navbar-collapse w-50"
              id="collapsibleNavId"
              style={{ marginLeft: "14%" }}
            >
              <form className="d-flex my-2 my-lg-0">
                <input
                  className="form-control me-sm-2"
                  type="text"
                  placeholder="Search"
                  onChange={(e)=>handleSearch(e)}
                />
                <NavLink
                  className="btn btn-outline-light my-2 my-sm-0"
                  type="submit"
                  to={`/reactfinalproject/search/${search}`}
                >
                  Search
                </NavLink>
              </form>
              <ul className="navbar-nav  mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    to={`/reactfinalproject/cart`}
                    aria-current="page"
                  >
                    <i class="fa fa-shopping-cart text-white"><span className="mx-1" style={{fontSize:"12px"}}>( {arrProductCart.length} )</span></i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    to={`/reactfinalproject/login`}
                    aria-current="page"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to={`/reactfinalproject/register`}>
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/reactfinalproject/profile`}>
                    Profile
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="container p-0 mt-2">
        <ul className="nav-link d-flex" style={{listStyleType:"none"}}>
          <li className="nav-item">
            <NavLink className="nav-link active" to="/reactfinalproject/home" aria-current="page">
             Home
            </NavLink>
          </li>
          <li className="nav-item mx-4">
            <NavLink className="nav-link active" href="#" aria-current="page">
              Men
            </NavLink>
          </li>
          <li className="nav-item mx-4">
            <NavLink className="nav-link" href="#">
              Women
            </NavLink>
          </li>
          <li className="nav-item mx-4">
            <NavLink className="nav-link" href="#">
              Kid
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink className="nav-link" href="#">
              Sport
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
