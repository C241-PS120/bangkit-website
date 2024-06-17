import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";
import { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../store/Auth";

type AuthProp = {
    Page: ComponentType;
};

function Auth({ Page }: AuthProp) {
    const auth = useAuth();

    if (auth.data.validate) {
        return <Navigate replace to={"/article"} />;
    }

    return (
        <div id="app">
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                            <AuthHeader />
                            <Page />
                            <AuthFooter />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Auth;
