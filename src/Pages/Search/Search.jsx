import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getProductSearchApi } from '../../Redux/reducers/productReducer'

export default function Search() {
    const {prodSearch}=useSelector(state=>state.productReducer)
    console.log(prodSearch)
    const params=useParams()
    const dispatch=useDispatch()
    const getApiSearch=()=>{
      const action=getProductSearchApi(params.product)
      dispatch(action)
    }
    useEffect(()=>{
      getApiSearch()
    },[params.product])
  return (
    <div>
             <div className='container mt-5'>
            <div className='row'>
                <div className='col-12 col-sm-12 col-md-12
                
                
                 w-50 text-white px-4 py-2' style={{background: "linear-gradient(180deg, #F21299 0%, #1B02B5 100%)"}}>
                    <h1>{params.product}</h1>
                </div>
            </div>
            <div className='product mb-5'>
                    <div className='row'>
                    {prodSearch?.map((item)=>{
                return <div className='col-12 col-sm-4 cold-md-4' key={item.id}>
                            <div className='image-product '>
                                <img src={item.image} alt="" className='w-100'/>
                                <p className='fs-3'>{item.name}</p>
                                <p>{item.description}</p>
                            </div>
                            <div className='foot-prodcut'>
                                <div className='row g-0'>
                                    <div className='col-12 col-sm-6 col-md-6 text-center'>
                                         <NavLink className="nav-link active" to={`/detail/${item.id}`} aria-current="page" style={{background: "rgba(157, 225, 103, 1)",lineHeight:"50px"}}  >Buy now</NavLink>
                                    </div>
                                    <div className='col-12 col-sm-6 col-md-6 text-center'>
                                        <div className='price' style={{background: "rgba(222, 221, 220, 1)",lineHeight:"50px"}}>{item.price}$</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                 
            })}
                    </div>
       
            </div>
        </div>
    </div>
  )
}
