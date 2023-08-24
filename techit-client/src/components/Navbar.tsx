import { FunctionComponent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
    userInfo: any;
    setUserInfo: Function
}

const Navbar: FunctionComponent<NavbarProps> = ({ userInfo, setUserInfo }) => {
    /* let [isLoggedIn, setIsLoggedIn] = useState<boolean>(sessionStorage.getItem("isLoggedIn") == "true" ? true : false) */
    let navigate = useNavigate()
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/home">Techit</NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {userInfo.email && <> <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav">
                            <NavLink className="nav-link" aria-current="page" to="/products">Products</NavLink>
                            <NavLink className="nav-link" to="/cart">Cart</NavLink>
                            <NavLink className="nav-link" to="/profile">Profile</NavLink>
                        </div>
                    </div>
                        <form className="d-flex justify-content-end" role="search">
                            <button className="btn btn-outline-primary" onClick={() => {
                                sessionStorage.removeItem("userInfo")
                                setUserInfo({ email: false, isAdmin: false })
                                navigate("/")
                            }}>Logout</button>
                        </form>
                    </>}

                </div>

            </nav>
        </>
    )
}

export default Navbar;