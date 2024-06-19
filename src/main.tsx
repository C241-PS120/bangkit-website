import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import AllArticles from "./pages/AllArticles.tsx";
import Auth from "./layouts/Auth.tsx";
import CreateArticle from "./pages/CreateArticle.tsx";
import Login from "./pages/Login.tsx";
import Main from "./layouts/Main.tsx";
import { PrimeReactProvider } from "primereact/api";
import ReactDOM from "react-dom/client";
import ViewArticle from "./pages/ViewArticle.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <PrimeReactProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth Page={Login} />} />
                <Route path="/article">
                    <Route path="" element={<Main Page={AllArticles} />} />
                    <Route
                        path="create"
                        element={<Main Page={CreateArticle} />}
                    />
                    <Route
                        path="view/:articleId"
                        element={<Main Page={ViewArticle} />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    </PrimeReactProvider>
);
