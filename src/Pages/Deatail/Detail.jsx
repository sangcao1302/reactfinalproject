import React, { useEffect, useMemo, useState,memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataProductApiId, getProductCart, getProductQuantity } from '../../Redux/reducers/productReducer'
import { NavLink, useParams } from 'react-router-dom'

export default function Detail() {
    const  [count,setCount]=useState(1)
    const quantity=count
    const{arrProductid}=useSelector(state=>state.productReducer)
    console.log(arrProductid)
    const params=useParams()
    const dispatch=useDispatch()
    const getProductById=()=>{
        const action=getDataProductApiId(params.id)
        dispatch(action)
    }
    const handleCountUp=()=>{
        setCount(count+1)
        const action= getProductQuantity(quantity+1)
        dispatch(action)
       }
    const handleCountDown=()=>{
        setCount(count-1)
        if(count<0){
            count=0
        }
        const action= getProductQuantity(quantity+1)
        dispatch(action)
       }
    useEffect(()=>{
        getProductById()
        setCount(1)
    },[params.id])
    const handleAddToCart=()=>{
        const action=getProductCart(arrProductid)      
        dispatch(action)       
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-sm-6 col-md-6'>
                    <div className='img-detail w-100'>
                        <img src={arrProductid.image} alt=""  style={{maxWidth:"100%"}}/>
                    </div>
                </div>
                <div className='col-12 col-sm-6 col-md-6'>
                    <div className='info-detail'>
                        <h3>{arrProductid.name}</h3>
                        <p>{arrProductid.description}</p>
                        <p className='fs-2 fw-semiblod' style={{color:"#1ED90E"}}>Available size</p>
                        <div className='d-flex flex-wrap'>
                            {arrProductid.size?.map((item,index)=>{
                                return <p key={index} className='text-center mx-2 fw-bold' style={{width:"50px",height:"50px",background:"#CCCCCC",padding:"12px"}}>{item}</p>
                            
                            })}
                        </div>
                       
                        
                        <p className='fs-3 text-danger fw-semibold'> {arrProductid.price}$</p>
                        <div className='d-flex'>
                             <button type="button" className="btn fs-4 text-white" style={{background:" linear-gradient(180deg, #6181F3 0%, #7C97F5 99.48%)",width:"50px",height:"50px",padding:"0"
}} onClick={handleCountDown} >-</button>

                            <p className='mt-1 fs-3 mx-2'>{count}</p>
                            <button type="button" className="btn fs-4 text-white" style={{background:" linear-gradient(180deg, #6181F3 0%, #7C97F5 99.48%)",width:"50px",height:"50px",padding:"0"
}} onClick={handleCountUp}>+</button>
                        </div>
                        <button className='text-white fs-5' style={{background: "linear-gradient(270deg, rgba(62, 32, 248, 0.9) 5.14%, #D017EE 89.71%)",border:"none",width:"175px",height:"64px"
}} onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='container mb-5'>
            <div className='row'>
                {arrProductid.relatedProducts?.map((item)=>{
                    return <div className='col-12 col-sm-4 cold-md-4' key={item.id}>
                            <div className='image-product w-100'>
                                <img src={item.image} alt="" style={{maxWidth:"100%"}}/>
                                <p className='fs-3'>{item.name}</p>
                                <p>{item.description}</p>
                            </div>
                            <div className='foot-prodcut'>
                                <div className='row g-0'>
                                    <div className='col-12 col-sm-6 col-md-6 text-center'>
                                         <NavLink className="nav-link active" to={`/reactfinalproject/detail/${item.id}`} aria-current="page" style={{background: "rgba(157, 225, 103, 1)",lineHeight:"50px"}}>Buy now</NavLink>
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
  )
}

