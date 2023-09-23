import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import HomeTemplate from "./Templates/HomeTemplate";
import { Provider } from "react-redux";
import { store } from "./Redux/configStore";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Deatail/Detail";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Search from "./Pages/Search/Search";
import Profile from "./Pages/Profile/Profile";
export const history = createBrowserHistory({window});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <Provider store={store}>
  //   <BrowserRouter>
  //       <Routes>
  //           <Route path='' element={<HomeTemplate />}>

  //           </Route>
  //       </Routes>
  //   </BrowserRouter>
  // </Provider>
  <Provider store={store}>
  
    <HistoryRouter history={history}>
      
      <Routes>
        {/* <Route path="" element={<Login></Login>} >
        </Route> */}
        <Route path="" element={<HomeTemplate></HomeTemplate>}>
        <Route index element={<Navigate to="/home"></Navigate>}></Route>

          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/detail">
              <Route path=":id" element={<Detail></Detail>}></Route>
          </Route>
          <Route path="/cart" element={<Cart></Cart>} ></Route>
          <Route path="/register" element={<Register></Register>} ></Route>
          <Route path="/search">
              <Route path=":product" element={<Search></Search>}></Route>
          </Route>
          <Route path="/profile" element={<Profile></Profile>} ></Route>
          <Route path="/login" element={<Login></Login>} ></Route>
          
        </Route>
      </Routes>
  
    
  </HistoryRouter>

    
   
    
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
