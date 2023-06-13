import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postProfile } from '../../Redux/reducers/productReducer'

export default function Profile() {
    const{token,arrLogin,quantity,count,arrProductCart}=useSelector(state=>state.productReducer)
    console.log(count)
    console.log(token)
    console.log(arrLogin.accessToken)
    console.log(quantity)
    const dispatch=useDispatch()
    const getToken=()=>{
        const action=postProfile(arrLogin.accessToken)
        dispatch(action)
      }
      useEffect(()=>{
        getToken()
      },[])
  return (
    
    <div>
         <div className='container p-0' style={{minHeight:"60.7vh"}}>
                <form className='row mt-5'>
                    <div className='col-12 col-sm-6 col-md-6'>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" defaultValue={token.email } />
                            <span className="text-danger mx-1 fs-6 mt-5">{}</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password"  />
                            <span className="text-danger mx-1 fs-6 mt-5">{}</span>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" defaultValue={token.name} />
                            <span className="text-danger mx-1 fs-6 mt-5">{}</span>
                        </div>
                    </div>
                     
                    <div className='col-12 col-sm-6 col-md-6'>
                       
                        <div className="mb-3">
                            <label htmlFor="number" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="phone" placeholder='(Ex:+84782350855)' defaultValue={token.phone} />
                            <span className="text-danger mx-1 fs-6 mt-5">{}</span>
                        </div>
                        <div>
                            <p>Gender</p>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input  border-primary" type="radio" name="inlineRadioOptions" id="male" value="true" defaultValue={token.gender}  />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input  border-primary" type="radio" name="inlineRadioOptions" id="female" value="false" defaultValue={token.gender}  />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                            
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 mb-2 rounded-pill"  style={{background: "#6200EE",border:"none"}} >Update</button>

                    </div>
                    </form>  
        </div>
        <div className='container'>
        <h1>OrderHistory</h1>
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              
            </tr>
          </thead>
          {
            arrProductCart.map((item,index)=>{
              return <tbody key={index}>
                  <tr>
                    <td className="w-25"><img src={item.image} className="w-25" alt="" /></td>
                    <td className="mt-5 fs-5">{item.name}</td>
                    <td className="mt-5 fs-5">{item.price}$</td>
                    <td>
                    <div className='d-flex '>
 

                            <p className='fs-5 mx-2'>{count}</p>

                        </div>
                    </td>
                    <td className="fs-5">{count*item.price}$</td>
                   
                  </tr>
          </tbody>
            })
          }
         
        </table>
        </div>
    </div>
  )
}
