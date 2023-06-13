import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delProduct, getQuantity, postOrderProduct } from "../../Redux/reducers/productReducer";

export default function Cart() {
  const { arrProductCart, count ,arrLogin,arrProductid,postOrder} = useSelector((state) => state.productReducer);
  console.log(postOrder)
  console.log(arrLogin)
  const dispatch=useDispatch()
  const [order,setOrder]=useState({
    orderDetail: [
    {
      productId: "",
      quantity: 0
    }
  ],
  email: ""})
  const [quantity,setQuantity]=useState(count===""?1:count)
  const handleCountUp=()=>{
    setQuantity(quantity+1)
    
   }
const handleCountDown=()=>{
    setQuantity(quantity-1)
    if(quantity<0){
        quantity=0
    }
  }
  const handleDeleteProduct=()=>{
    const action=delProduct(arrProductCart)
    dispatch(action)
  }
  const handleOrder=()=>{
    order.orderDetail.map((item)=>{
      item.productId=arrProductid.id
      item.quantity=count
    })
    order.email=arrLogin.email
    const action=postOrderProduct(order)
    dispatch(action)
    console.log(order)
    console.log(arrLogin)
  }
  // const getQuantityProd=()=>{
  //   const action=getQuantity(order)
  //   dispatch(action)
  // }
  useEffect(()=>{
    handleOrder()
    // getQuantityProd()
  },[])
  return (
    <div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {
            arrProductCart?.map((item,index)=>{
              return <tbody key={index}>
                  <tr>
                    <td className="w-25"><img src={item.image} className="w-25" alt="" /></td>
                    <td className="mt-5 fs-5">{item.name}</td>
                    <td className="mt-5 fs-5">{item.price}$</td>
                    <td>
                    <div className='d-flex '>
                             <button type="button" className="btn fs-6 text-white p-0" style={{background:" linear-gradient(180deg, #6181F3 0%, #7C97F5 99.48%)",width:"30px",height:"30px",lineHeight:"6px"
}} onClick={handleCountDown} >-</button>

                            <p className='fs-5 mx-2'>{quantity===""?1:quantity}</p>
                            <button type="button" className="btn fs-6 text-white text-center p-0 " style={{background:" linear-gradient(180deg, #6181F3 0%, #7C97F5 99.48%)",width:"30px",height:"30px",lineHeight:"6px"
}} onClick={handleCountUp}>+</button>
                        </div>
                    </td>
                    <td className="fs-5">{quantity*item.price}$</td>
                    <td>
                      <button type="button" className="btn btn-dark" onClick={handleDeleteProduct}>Delete</button>
                    </td>
                  </tr>
          </tbody>
            })
          }
         
        </table>
          <div className="order d-flex justify-content-end">
              <button type="button" className="btn btn-danger mx-5" onClick={handleOrder}>Submit Order</button>
          </div>
      </div>
    </div>
  );
}
