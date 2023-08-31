import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Outlet } from "react-router-dom";

export default function HomeTemplate() {
  return (
    <>
      <Header></Header>
      <div className="content-layout" style={{ minHeight: "80vh" }}>
      
        <Outlet>
        
        </Outlet>
      </div>
      
      <Footer></Footer>
    </>
  );
}
