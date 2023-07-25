import {NavLink, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useAuth} from "../../../../context/AuthContext";
import CategoriesDropdown from "./CategoriesDropdown";


export default function TopNavigationBar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const {setUser, user} = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const logOut = () => {
        setUser(false); //secret is deleted in AuthProvider
    }

    return (
        <>
            <nav
                className="navbar navbar-expand-lg"
                style={{
                    paddingTop: "20px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#f8f7f7",
                }}>

                <div className="container-fluid row">

                    <NavLink
                        to="/"
                        className="navbar-brand col-2 col-sm-2 col-md-2 fw-bold"
                    >
                        Horhoria
                    </NavLink>


                    <div className={"col-4 col-sm-4 col-md-5 container"}>

                    <form
                        className="d-flex justify-content-center align-items-center "
                        role="search"
                    >
                        <div className="col-11 col-sm-10">
                            <input
                                className="form-control me-2 "
                                type="search"
                                placeholder="Aradığınız Ürünü Yazınız"
                                aria-label="Search"
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        navigate("/products?title=" + search)
                                    }
                                }}
                            />
                        </div>
                        <div className={"col-1 col-sm-2"}>
                            <NavLink to={"/products?title=" + search} className="btn btn-outline-primary ">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </NavLink>
                        </div>
                    </form>
                    </div>


                    {user ? (
                        <>
                            <NavLink className="navbar-brand col-sm-1" to="/profile"> Profil</NavLink>
                            <NavLink className="navbar-brand col-sm-1" to="/cart"> Sepetim</NavLink>
                            <NavLink className="navbar-brand col-sm-1" to="/" onClick={(e) => {
                                logOut();
                            }}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <div className="col-3 col-sm-3 col-md-2">
                                <CategoriesDropdown></CategoriesDropdown>
                            </div>

                            <div
                                className={"col-1 col-sm-1 navbar-item cursor-pointer"}
                                onClick={() => {
                                    navigate("/auth/login");
                                }}>
                                <div className={"d-flex align-items-center justify-content-between"}>
                                    <div className={"d-none d-md-block"}>Kargo Takip</div>
                                    <i className="fa-solid fa-truck"></i>
                                </div>
                            </div>

                            <div
                                className={"col-1 col-sm-1 navbar-item cursor-pointer "}
                                onClick={() => {
                                    navigate("/auth/login");
                                }}>
                                <div className={"d-flex align-items-center justify-content-between"}>
                                    <div className={"d-none d-md-block"}>Giriş Yap</div>
                                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                </div>
                            </div>
                        </>

                    )}
                </div>
            </nav>
        </>
    );
}
