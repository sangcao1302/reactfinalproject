import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { getLogin, loginDetail, postProfile } from "../../Redux/reducers/productReducer";

export default function Login() {
  const{arrLogin,validLogin,validDetail}=useSelector(state=>state.productReducer)

  console.log(validLogin)
  const [user,setUser]=useState({email:"",password:""})
  const [valid,setValid]=useState({value:"",id:""})

  
  const dispatch=useDispatch()
  const handleSubmit=(e)=>{
    e.preventDefault()
    const action=getLogin(user)
    dispatch(action)
  
  
   
  }


  const handleValue=(e)=>{
    let {value,id}=e.target
    user[id]=value
  }
  const handleValid=(e)=>{
    let{value,id}=e.target
    valid.id=id
    valid.value=value
    const action=loginDetail(valid)
    dispatch(action)
    
  }
  return (
    <div>
   
      <div className="container d-flex justify-content-center p-5 " style={{backgroundImage:"url(assets/image/login.jpeg)",backgroundRepeat:"no-repeat",maxWidth:"100%",backgroundSize:"cover",backgroundPosition:"left center",height:"100vh"}}>
          <div className="row">
              <form className="login col-12 col-sm-12" style={{background:" rgba(189, 195, 199, 0.3)",borderRadius:"5%",maxHeight:"600px", minWidth:"280px"}} onSubmit={(e)=>handleSubmit(e)} >
            <h1 className="text-center mb-3">Login</h1>
              <div className="col-auto">
                <label htmlFor="staticEmail2" className="" style={{color:" rgba(0, 0, 0, 0.6)"}}>Email</label>
                <input type="text" className="form-control border-primary" id="email" placeholder="Email" onChange={(e)=>{handleValue(e)}} onBlur={(e)=>handleValid(e)} />
                <span className="text-danger mx-1 fs-6 mt-5">{validLogin||validDetail.email}</span>
              </div>
              <div className="col-auto mt-2">
                <label htmlFor="inputPassword2" className="" style={{color:" rgba(0, 0, 0, 0.6)"}}>
                  Password
                </label>
                <input
                  type="password"
                  className="form-control border-primary"
                  id="password"
                  placeholder="Password"
                  onChange={(e)=>{handleValue(e)}}
                  onBlur={(e)=>handleValid(e)}
                />
                <span className="text-danger mx-1 fs-6 mt-5">{validLogin||validDetail.password}</span>
              </div>
              <div className="col-auto mt-4 d-flex justify-content-end">
                <NavLink className="mx-4 mt-3" style={{textDecoration:"none" , color:"#152AEBCC"}} to={`/register`}>Register now</NavLink>
                <button type="submit" className="btn rounded-pill text-white text-center" style={{width:"121px",height:"48px",background:"#6200EE",lineHeight:"30px",textDecoration:"none"}}>
                  Login
                </button>
              </div>
              <div className="fb d-flex justify-content-center mt-5">
                <button type="button" className="btn btn-primary fs-5"><i className="fab fa-facebook mx-2 fs-3"></i>Continue with Facebook</button>

              </div>
            </form>
          </div>
      </div>
    </div>
  );
}
