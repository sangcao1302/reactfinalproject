import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { httpShoe } from '../../Util/Config';
import {history} from '../../index';
const initialState = {
    arrProduct:[],
    arrProductid:"",
    arrProductCart:[],
    count:1,
    arrLogin:"",
   validLogin:"",
   validDetail:{
    email:"",
    password:""
   },
    userRegister:"",
    dataSignUp:"",
    validRegister:{
      email:" ",
      password:" ",
      passwordConfirm:" ",
      name:" ",
      phone:" ",
    },
    prodSearch:[],
    postOrder:"",
    getProfile:"",
    token:"",
    quantity:""
}

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProductsAction:(state,action)=>{
        state.arrProduct=action.payload
    },
    getProductsActionId:(state,action)=>{
      state.arrProductid=action.payload
  },
  getProductSearch:(state,action)=>{
    state.prodSearch=action.payload
  },
  getProductCart:(state,action)=>{
    let clickIdProduct=action.payload
    let proDuctCartId=state.arrProductCart.find(item=>item.id===clickIdProduct.id)
    if(proDuctCartId){
      state.count+=1
    }
    else{
      state.arrProductCart.push(clickIdProduct)
    }
  },
  getProductQuantity:(state,action)=>{
    state.count=action.payload
  },
  delProduct:(state,action)=>{
    let clickIdProduct=action.payload
    let proDuctCartId=state.arrProductCart.findIndex(item=>item.id===clickIdProduct.id)
    if(proDuctCartId){
      state.arrProductCart.splice(proDuctCartId,1)
    }
  },
  login:(state,action)=>{
    state.arrLogin=action.payload
  },
  loginValid:(state,action)=>{
    state.validLogin=action.payload
  },
  loginDetail:(state,action)=>{
    let{id,value}=action.payload
    if(value==="")
      {
        state.validDetail[id]="Vui lòng không để trống"
      }
  },
  register:(state,action)=>{
    state.userRegister=action.payload
  },
  registerDatas:(state,action)=>{
    state.dataSignUp=action.payload
  },
 registerValid:(state,action)=>{
    let{id,value}=action.payload
    const regexEmail= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/;
    const regexName =
    /^[a-z A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
    const regexPhone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    
    if(value==="")
      {
        state.validRegister[id]="Vui lòng không để trống"
      }
    if(id==="email" && !regexEmail.test(value) ){
        state.validRegister[id]="Email không đúng định dạng"    
    }
    // if(id==="passwordConfirm" && !regexPass.test(value) ){
    //   state.validRegister[id]="Mật khẩu dài tối thiểu 6 kí tự chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"  
    //  }
     if(id==="password" && !regexPass.test(value) ){
      state.validRegister[id]="Mật khẩu dài tối thiểu 6 kí tự chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"  
     }
     if(id==="password"){
      var checkPass=value
      console.log(value)
     }
    //  if(id==="passwordConfirm"){
    //   var checkPassCon=value
    //   console.log(value)
    //  }
    //  if(id==="passwordConfirm" ){
    //   if(value!==checkPass){
    //     state.validRegister[id]="khong khop"
    //   }
    //  }
    if (id==="name" && !regexName.test(value)){
      state.validRegister[id]="Vui lòng nhập tên bằng chữ" 
    }
    if(id==="phone" && !regexPhone.test(value)){
      state.validRegister[id]="Vui lòng nhập số" 
    }
   
  },
  registerFocus:(state,action)=>{
    let{id,value}=action.payload
    state.validRegister[id]=""
  },
    orderProduct:(state,action)=>{
      state.postOrder=action.payload
    },
    getProfileData:(state,actions)=>{
      state.token=actions.payload
    },
    // getQuantity:(state,action)=>{
    //   state.quantity=action.payload
    // }

  }
 
});

export const {getProductsAction, getProductsActionId,getProductCart,getProductQuantity,delProduct,login,loginValid,loginDetail,register,registerSucess,registerValid,registerFocus,validRegister,getProductSearch,orderProduct,registerDatas,getProfileData,arrLogin,getQuantity} = productReducer.actions

export default productReducer.reducer

export const getDataProductApi=()=>{
    return async(dispatch)=>{
       const res=await httpShoe.get(`/api/Product`)
       const action=getProductsAction(res.data.content)
       dispatch(action)
    }
}
export const getDataProductApiId=(id)=>{
  return async(dispatch)=>{
     const res=await httpShoe.get(`api/Product/getbyid?id=${id}`)
     const action=getProductsActionId(res.data.content)
     dispatch(action)
  }
}
export const getProductSearchApi=(name)=>{
  return async(dispatch)=>{
     const res=await httpShoe.get(`api/Product/getProductByCategory?categoryId=${name}`)
     const action=getProductSearch(res.data.content)
     dispatch(action)
  }
}

export const getLogin=(userLogin)=>{
  return async(dispatch)=>{
    try{
      const res=await httpShoe.post(`/api/Users/signin`,userLogin)
      const action=login(res.data.content)
      dispatch(action)
   
      history.push('/reactfinalproject/home');
    }catch(err){
    
      const action=loginValid(err.response?.data.message)
      dispatch(action)
    }
    
  }
}
export const postRegister=(registerData)=>{
  return async(dispatch)=>{
    try{
      const res=await httpShoe.post(`/api/Users/signup`,registerData)
      const action=registerDatas(res.data)
      dispatch(action)   
     
      if(res.data.message==="Dữ liệu nhập vào không đúng!") {
        history.push('/reactfinalproject/register');
      }else{

        history.push('/reactfinalproject/profile');
      }
    }catch(err){
    
      const action=register(err.response?.data.message)
      dispatch(action)
    }
  }
}

export const postOrderProduct=(order)=>{
  return async(dispatch)=>{
    
      const res=await httpShoe.post(`/api/Users/order`,order)
      const action=orderProduct(res.data)
      dispatch(action) 
  }
}

export const postProfile=(data)=>{
  return async(dispatch)=>{
    
     
      
      const res=await httpShoe.post(`/api/Users/getProfile`,{},{ headers :{
        "Authorization":`Bearer ${data}`
      }
   
       
      })
      const action=getProfileData(res.data.content)
      dispatch(action) 
 
    }
    
}
// export const postProfileApi=()=>{
//   return async(dispatch)=>{
    
//       // const res=await httpShoe.post(`/api/Users/getProfile`,data)
//       const action=getProfileData(token)
//       dispatch(action) 
//   }
// }