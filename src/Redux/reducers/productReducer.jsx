import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import { USER_LOGIN, getStorageJSON, http, saveStorageJSON } from '../../Util/Config';
import {history} from '../../index';
const totalAmountCheck = () => {
  if (isNaN(Number(localStorage.getItem('totalAmount')))) {
      return 0
  }
  return Number(localStorage.getItem('totalAmount'))
}
const totalQuantityCheck = () => {
  if (isNaN(Number(localStorage.getItem('totalQuantity')))) {
      return 0
  }
  return Number(localStorage.getItem('totalQuantity'))
}
const productCartCheck = () => {
  if (JSON.parse(localStorage.getItem('arrProductCart')) === null) {
      return []
  }
  return JSON.parse(localStorage.getItem('arrProductCart'))
}
const initialState = {
    arrProduct:[],
    arrProductid:"",
    
    count:1,
    arrLogin:getStorageJSON(USER_LOGIN),
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
  
    productList: [],
    totalQuantity: totalQuantityCheck(),
    totalAmount: totalAmountCheck(),
    arrProductCart:productCartCheck(),
    productDetail: [],
    page: 1
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
    // let clickIdProduct=action.payload
    // let proDuctCartId=state.arrProductCart.find(item=>item.id===clickIdProduct.id)
    // if(proDuctCartId){
    //   state.count+=1
    // }
    // else{
    //   state.arrProductCart.push({
    //     id: clickIdProduct.id,
    //     name: clickIdProduct.name,
    //     image: clickIdProduct.image,
    //     price: clickIdProduct.price,
    //     quantity: 1,
    //     totalPrice: clickIdProduct.price,
    //   })
    // }
    const newItem = action.payload;
    // Check if product already exists or not
    const existingItem = state.arrProductCart?.find(
        (item) => item.id === newItem.id
    );
    state.totalQuantity++;
    // not: add new item to cart
    if (!existingItem) {
        state.arrProductCart?.push({
            id: newItem.id,
            name: newItem.name,
            image: newItem.image,
            price: newItem.price,
            quantity: 1,
            totalPrice: newItem.price,
            email:state.arrLogin.email
        });
    } else {
        // Already have: => increasing quantity, at the same time recalculate the total price = existing money + new amount
        existingItem.quantity++;
        existingItem.totalPrice =
            Number(existingItem.totalPrice) + Number(newItem.price);
    }

    //  Calculate the total amount of the products in the cart
    state.totalAmount = state.arrProductCart?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
    )
    localStorage.setItem("arrProductCart", JSON.stringify(state.arrProductCart));

  },
  getProductQuantity:(state,action)=>{
    state.count=action.payload
  },
  delProduct:(state,action)=>{
    let click=action.payload
    let proDuctCartId=state.arrProductCart.findIndex(item=>item.id===click)
    state.arrProductCart.splice(proDuctCartId,1)
    localStorage.removeItem("arrProductCart", JSON.stringify(state.arrProductCart));

  },

  quantityUp:(state,action)=>{
    const existingIndex = state.arrProductCart.findIndex(
      (item) => item.id === action.payload
    );

    if (existingIndex >= 0) {
      state.arrProductCart[existingIndex] = {
        ...state.arrProductCart[existingIndex],
        quantity: state.arrProductCart[existingIndex].quantity + 1,
      };
     
    } else {
      let tempProductItem = { ...action.payload, quantity: 1 };
      state.arrProductCart.push(tempProductItem);
     
    }
    localStorage.setItem("arrProductCart", JSON.stringify(state.arrProductCart));
  },
  quantityDown:(state,action)=>{
    const itemIndex = state.arrProductCart.findIndex(
      (item) => item.id === action.payload
    );

    if (state.arrProductCart[itemIndex].quantity > 1) {
      state.arrProductCart[itemIndex].quantity -= 1;

      
    } else if (state.arrProductCart[itemIndex].quantity === 1) {
      const nextCartItems = state.arrProductCart.filter(
        (item) => item.id !== action.payload.id
      );

      state.arrProductCart = nextCartItems;

      
    }

    localStorage.setItem("arrProductCart", JSON.stringify(state.arrProductCart));
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

export const {getProductsAction, getProductsActionId,getProductCart,getProductQuantity,delProduct,login,loginValid,loginDetail,register,registerSucess,registerValid,registerFocus,validRegister,getProductSearch,orderProduct,registerDatas,getProfileData,arrLogin,getQuantity,quantityUp,quantityDown} = productReducer.actions

export default productReducer.reducer

export const getDataProductApi=()=>{
    return async(dispatch)=>{
       const res=await http.get(`/api/Product`)
       const action=getProductsAction(res.data.content)
       dispatch(action)
    }
}
export const getDataProductApiId=(id)=>{
  return async(dispatch)=>{
     const res=await http.get(`api/Product/getbyid?id=${id}`)
     const action=getProductsActionId(res.data.content)
     dispatch(action)
  }
}
export const getProductSearchApi=(name)=>{
  return async(dispatch)=>{
     const res=await http.get(`api/Product/getProductByCategory?categoryId=${name}`)
     const action=getProductSearch(res.data.content)
     dispatch(action)
  }
}

export const getLogin=(userLogin)=>{
  return async(dispatch)=>{
    try{
      const res=await http.post(`/api/Users/signin`,userLogin)
      const action=login(res.data.content)
      dispatch(action)
      saveStorageJSON(USER_LOGIN,res.data.content);
   
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
      const res=await http.post(`/api/Users/signup`,registerData)
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
    
      const res=await http.post(`/api/Users/order`,order)
      const action=orderProduct(res.data)
      dispatch(action) 
  }
}

export const postProfile=()=>{
  return async(dispatch)=>{
    
     
      
      const res=await http.post(`/api/Users/getProfile`)
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