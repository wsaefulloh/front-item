import React, { Component } from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.scoped.css"
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ActionUsers from "../../../stores/actions/users"
import Swal from 'sweetalert2'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null,
        }
    }

    getData = (token) => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/users/profile`,
            headers: {
                token_auth: token,
            },
        })
            .then((res) => {
                this.props.UserSet(res.data.result[0])
                this.props.history.push("/home") // pindah halam
            })
            .catch((error) => {
                console.log(error)
            })
    }

    SubmitHandler = async () => {
        try {
            const body = new URLSearchParams();
            body.set('username', this.state.username);
            body.set('password', this.state.password);
            const res = await axios.post(`${process.env.REACT_APP_API}/login`, body, { 'Content-type': 'application/x-www-form-urlencoded', });
            const {token} = res.data.result[0]
            console.log(token)
            this.props.AuthSet(token)
            this.getData(token)
        } catch (error) {
            console.error(error);
            Swal.fire("FAILED", "Gagal Login", "error");
        }
    }

    ChangeUsername = (e) => {
        this.setState({ username: e.target.value })
    }

    ChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    render() {
        return (
            <main className="mt-5">
                <section>
                    <div className="container">
                        <div className="col-12 col-md-6 col-xl-4 mx-auto">
                            <div className="d-none d-md-block mt-5 text-center">
                                <h6 className="my-0 mx-auto mt-4 text-bold">Please login with your account</h6>
                            </div>
                            
                            <div className="row mt-2 g-3">
                                <div className="col-12 text-center">
                                    <input onChange={this.ChangeUsername} className="col-10 form-input text-reguler" type="text" placeholder="Username"/>
                                </div>
                                <div className="col-12 text-center">
                                    <input onChange={this.ChangePassword} className="col-10 form-input text-reguler" type="password" placeholder="Password" />
                                </div>
                                <div className="col-12 text-center mx-auto align-items-center d-flex">
                                    <button onClick={this.SubmitHandler} className="col-10 text-submit text-reguler mx-auto">Login</button>
                                </div>
                                <div className="col-12 text-center">
                                    <p className="col-10 mx-auto text-reguler">Don't have an account? <Link className="text-reguler text-forgot" to="/register">Register</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        AuthSet: bindActionCreators(ActionUsers.AuthSet, dispatch),
        UserSet: bindActionCreators(ActionUsers.UserSet, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)