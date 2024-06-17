import useAuth from '../store/Auth';

function MainHeader(){
    const clearValidate = useAuth((state) => state.clearValidate)

    function handleLogout(){
        try{
            clearValidate()
        } catch (err){
            console.log(err)
        }
    }

    return (<>
            <div className="navbar-bg"></div>
            <nav className="navbar navbar-expand-lg main-navbar">
                <div className="mr-auto"></div>
                <ul className="navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#"
                            data-toggle="dropdown"
                            className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                            <img alt="image"
                                src="/img/avatar/avatar-1.png"
                                className="rounded-circle mr-1" />
                            <div className="d-sm-none d-lg-inline-block">Hi, Admin</div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a href="#"
                                className="dropdown-item has-icon text-danger"
                                onClick={(e)=> {e.preventDefault(); handleLogout() }}>
                                <i className="fas fa-sign-out-alt"></i>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default MainHeader