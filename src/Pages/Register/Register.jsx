import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postRegister, registerFocus, registerValid } from '../../Redux/reducers/productReducer'
import {history} from '../../index';
export default function Register() {
    const{userRegister,validRegister, dataSignUp}=useSelector(state=>state.productReducer)
    const [dataRegister,setDataRegister]=useState({email:"",password:"",name:"",gender:"",phone:""})
    const [valid,setValid]=useState({value:"",id:""})
    let[button,setButton]=useState(false)
    console.log(dataRegister)
    console.log(userRegister)
   console.log(dataSignUp)
    const dispatch=useDispatch()
    const handleSubmit=(e)=>{
        e.preventDefault()
        const action=postRegister(dataRegister)
        dispatch(action)  
        
    }
    const handleRegister=(e)=>{
        let{id,value}=e.target
        if(id==="female"){
            id="gender"
            dataRegister[id]=false
        }
        if(id==="male"){
            id="gender"
            dataRegister[id]=true
        }
        dataRegister[id]=value   
        
    }
    const handleValid=(e)=>{
        let{value,id}=e.target
        valid.id=id
        valid.value=value
        const action=registerValid(valid)
        dispatch(action)  
        
      }
      const handleFocus=(e)=>{
        let{value,id}=e.target
        valid.id=id
        valid.value=value
        const action=registerFocus(valid)
        dispatch(action)    
       
      }
        //  const handleButton=()=>{
        //    if(validRegister["emai"]!=="" && validRegister["password"]!=="" && validRegister["passwordConfirm"]!=="" && validRegister["phone"]!=="" && validRegister["name"]!=="" ){
        //         history.push("/register")
        //    }
        //    else if(validRegister["emai"]==="" && validRegister["password"]==="" && validRegister["passwordConfirm"]==="" && validRegister["phone"]==="" && validRegister["name"]===""){
        //     history.push("/home")
        //    }
        //  }
        //   handleButton()
  return (
    <div>
        <div className='container p-0' style={{minHeight:"60.7vh"}}>
                <form className='row mt-5' onSubmit={(e)=>handleSubmit(e)}>
                    <div className='col-12 col-sm-6 col-md-6'>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email"  onChange={(e)=>handleRegister(e)} onBlur={(e)=>handleValid(e)} onFocus={(e)=>handleFocus(e)} />
                            <span className="text-danger mx-1 fs-6 mt-5">{userRegister||validRegister.email}</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" onChange={(e)=>handleRegister(e)} onBlur={(e)=>handleValid(e)} onFocus={(e)=>handleFocus(e)} />
                            <span className="text-danger mx-1 fs-6 mt-5">{validRegister.password}</span>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordConfirm" className="form-label">Password Confirm</label>
                            <input type="password" className="form-control" id="passwordConfirm" onBlur={(e)=>handleValid(e)} onFocus={(e)=>handleFocus(e)} />
                            <span className="text-danger mx-1 fs-6 mt-5">{validRegister.passwordConfirm}</span>
                        </div>
                    </div>
                     
                    <div className='col-12 col-sm-6 col-md-6'>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" onChange={(e)=>handleRegister(e)} onBlur={(e)=>handleValid(e)} onFocus={(e)=>handleFocus(e)} />
                            <span className="text-danger mx-1 fs-6 mt-5">{validRegister.name}</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="number" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="phone" placeholder='(Ex:+84782350855)' onChange={(e)=>handleRegister(e)} onBlur={(e)=>handleValid(e)} onFocus={(e)=>handleFocus(e)} />
                            <span className="text-danger mx-1 fs-6 mt-5">{validRegister.phone}</span>
                        </div>
                        <div>
                            <p>Gender</p>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input  border-primary" type="radio" name="inlineRadioOptions" id="male" defaultValue="true" onChange={(e)=>handleRegister(e)}/>
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input  border-primary" type="radio" name="inlineRadioOptions" id="female" defaultValue="false" onChange={(e)=>handleRegister(e)} />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                            
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 mb-2 rounded-pill"  style={{background: "#6200EE",border:"none"}} >Submit</button>

                    </div>
                    </form>  
        </div>
    </div>
  )
}
