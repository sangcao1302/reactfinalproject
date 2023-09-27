import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delProduct, getQuantity, postOrderProduct, quantityDown, quantityUp } from "../../Redux/reducers/productReducer";

export default function Cart() {
  const { arrProductCart ,arrLogin,arrProductid,postOrder,count,totalQuantity} = useSelector((state) => state.productReducer);
  console.log(postOrder)
  console.log(arrLogin)
 console.log(arrProductCart)
 
  const dispatch=useDispatch()
  
  const [order,setOrder]=useState({
    orderDetail: [],
  email: ""})
  const[quantity,setQuantity]=useState([1])
  const[display,setDisplay]=useState("none")
  const handleCountUp=(product)=>
  {
    const action=quantityUp(product)
    dispatch(action)

   }
const handleCountDown=(product)=>{
  const action=quantityDown(product)
  dispatch(action)
  
 
  }
  const handleDeleteProduct=(id)=>{
    const action=delProduct(id)
    dispatch(action)
  
  }
  const handleOrder=()=>{
 
    arrProductCart?.map((item)=>{
      return order.orderDetail.push({
        productId:`${item.id}`,
        quantity:item.quantity
      })
    })
  
    order.email=arrLogin.email
    const action=postOrderProduct(order)
    dispatch(action)
   
  }
  console.log(order)

  let total=0
  const handleClick=()=>{
    handleOrder()
    setDisplay("")
  
    setTimeout(()=>{
      setDisplay("none")
    },2000)
  }
  
  

  
  return (
    <div>
      <div className="container mt-5">
        
        <div className="row align-items-center">
          <div className="col-12 col-sm-8 col-md-8">
              {arrProductCart?.map((item,index)=>{
                return(
                  <div className="row align-items-center mt-5" key={index}>
                    <div className="col-4 col-md-4 col-sm-4">
                        <img src={item.image} style={{maxWidth:"55%"}} alt="" />
                    </div>
                    <div className="col-4 col-md-4 col-sm-4">
                      <span>{item.name}</span>
                     
                      <span className='d-flex mt-3'>
                             <button type="button" className="btn fs-6 text-white p-0" style={{background:" linear-gradient(180deg, #6181F3 0%, #7C97F5 99.48%)",width:"30px",height:"30px",lineHeight:"6px"
}} onClick={()=>handleCountDown(item.id)} >-</button>
                              <p className="mx-2">{item.quantity}</p>

                            <button type="button" className="btn fs-6 text-white text-center p-0 " style={{background:" linear-gradient(180deg, #6181F3 0%, #7C97F5 99.48%)",width:"30px",height:"30px",lineHeight:"6px"
}} onClick={()=>handleCountUp(item.id)}>+</button>
                        </span>
                        <div className="delProd mt-2 ">
                            <span className="cursor-pointer text-dark mt-2 fs-4" onClick={()=>handleDeleteProduct(item.id)}><i className="fa fa-trash-alt" />
</span>
                        </div>
                        
                    </div>
                    <div className="col-4 col-md-4 col-sm-4">
                          <p> {item.price}$</p>                        
                    </div>
                  </div>
                  
                )
              })}
          
          </div>
          
          <div className="col-12 col-sm-4 col-md-4">
            <div className="text-end" style={{display:`${display}`}}>
               <p className="text-end bg-success d-inline p-3 text-white rounded-3"><i className="fa fa-check text-success rounded-5 bg-white fs-6 px-2 py-2 mx-2" style={{fontSize:"10px"}}></i>Thành công</p>
            </div>
  
              <p className="fw-bold fs-2">Tổng tiền</p>
              <p className="mx-1 fw-bold fs-3">{arrProductCart.map((item,index)=>
              {
                total=total+item.price*item.quantity
                if (arrProductCart.length - 1 === index)
                 {
                     return total
                  } 
              })} <span className="">$</span></p>
            <div className="btn w-100 p-0">
              <button type="button" className="btn btn-outline-danger w-100" onClick={handleClick}>Đặt hàng</button>
            </div>
          </div>
        </div>

          
      </div>
    </div>
  );
}
