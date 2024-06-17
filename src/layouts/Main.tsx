import { ComponentType, useEffect } from "react";

import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
import MainSidebar from "../components/MainSidebar";
import { Navigate } from "react-router-dom";
import useAuth from '../store/Auth';

type MainProp = {
    Page: ComponentType
}

function Main({Page} : MainProp){
    const auth = useAuth()

    const validData = useAuth((state) => state.data)
    const clearValidate = useAuth((state) => state.clearValidate)

    
    useEffect(()=>{
        if (new Date(validData.expire) <= new Date()){
            clearValidate()
        }
    }, [])
    
    if (!auth.data.validate) {
        return <Navigate replace to={"/"} />;
    }
    
    return (
        <div id="app">
        <div className="main-wrapper">
            <MainHeader />

            <MainSidebar />

            <Page/>

            <MainFooter/>
        </div>
    </div>
    )
}

export default Main