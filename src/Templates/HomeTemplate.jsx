import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Outlet } from "react-router-dom";

export default function HomeTemplate() {
  return (
    <>
      <Header></Header>
      <div className="content-layout" >

      </div>
      <Outlet>
        
      </Outlet>
      <Footer></Footer>
    </>
  );
}
