import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.scoped.css";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import ActionUsers from "../../stores/actions/users"

const Navigasi = () => {
    const Dispatch = useDispatch()
    const { data } = useSelector((state) => state.users)
    const logout = () => {
        Dispatch(ActionUsers.AuthClear())
    }

    return (
        <header>
        <nav className="bg-light d-md-block d-none navbar shadow-sm fixed-top">
            <div className="container justify-content-between align-items-center">
                <Link to='/home'>
                    <h4 className="text-bold m-0">Items App</h4>
                </Link>

                <div className="col-8 text-end">
                    <small className="text-secondary text-reguler me-2">Halo {data.name_user}, ini stock persediaan barang anda</small>
                    <Link to='/profile/edit'>
                        <button className="btn-login text-reguler">Edit Profile</button>
                    </Link>
                    <Link to='/'>
                        <button className="btn-signup text-reguler" onClick={logout}>Logout</button>
                    </Link>
                </div>
            </div>
        </nav>
    </header>
    )
    

};

export default Navigasi;