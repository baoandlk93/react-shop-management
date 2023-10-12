import React from "react";
import CustomSidebar from "./commonds/CustomSidebar";
import Header from "./commonds/Header";
import Content from "./commonds/Content";
import Footer from "./commonds/Footer";

function GuestLayout({children}) {
    return (
        <>
            <div className="grid relative top-0">
                <div className="col-12 top-0 fixed p-0">
                    <Header/>
                </div>
            </div>
            <div className="grid mt-5">
                <div className=" h-full fixed bg-white" style={{width: "256px"}}>
                    <CustomSidebar/>
                </div>
                <div className="col-2 p-0"></div>
                <div className="col-10 p-1">
                    <Content>
                        {children}
                    </Content>
                </div>
            </div>
            <div className={"grid"}>
                <div className="col-2 p-0">
                </div>
                <div className="col-10 p-1">
                    <Footer/>
                </div>
            </div>
        </>
    );
}

export default GuestLayout;
