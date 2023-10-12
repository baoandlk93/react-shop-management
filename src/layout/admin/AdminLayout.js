import React from "react";
import CustomSidebar from "../admin/commonds/CustomSidebar";
import Header from "../admin/commonds/Header";
import Content from "../admin/commonds/Content";
import Footer from "../admin/commonds/Footer";

function AdminLayout({children}) {
    return (
        <>
            <div className="grid relative top-0">
                <div className="col-12 top-0 fixed p-0">
                    <Header/>
                </div>
            </div>
            <div className="grid mt-5">
                <div className=" h-full fixed" style={{width: "256px"}}>
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

export default AdminLayout;
