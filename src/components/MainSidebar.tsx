import { Link, useLocation } from "react-router-dom"

function MainSidebar(){
    const location = useLocation()

    return (
        <div className="main-sidebar sidebar-style-3">
            <aside id="sidebar-wrapper">
                <div className="sidebar-brand">
                    <Link to={"/article"}>COPTAS</Link>
                </div>
                <div className="sidebar-brand sidebar-brand-sm">
                    <Link to={"/article"} style={{fontSize: ".6rem"}}>COPTAS</Link>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-header">Article</li>
                    <li className={location.pathname == "/article" ? "active" : ""}>
                        <Link className="nav-link" to={"/article"}>Article</Link>
                    </li>
                    <li className={location.pathname == "/article/create" ? "active" : ""}>
                        <Link className="nav-link" to={"/article/create"}>Article Create</Link>
                    </li>
                </ul>
            </aside>
        </div>

    )
}

export default MainSidebar