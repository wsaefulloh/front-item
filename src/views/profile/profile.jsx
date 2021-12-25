import React, { Component } from 'react'
import Navigasi from '../../components/navbar/navbar_profile'
import axios from "axios"
import "./style/profile.scoped.css"
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ActionUsers from "../../stores/actions/users"
import Swal from 'sweetalert2'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            old_password: '',
            password: '',
            username: '',
            email: '',
            gender: '',
            token: '',
        }
    }

    SubmitHandler = async () => {

        const token = this.state.token
        const body = new URLSearchParams();
        body.append('name', this.state.name);
        body.append('old_password', this.state.old_password);
        body.append('new_password', this.state.password);
        body.append('username', this.state.username);
        body.append('email', this.state.email);
        body.append('gender', this.state.gender);
        // const res = await axios.put(`${process.env.REACT_APP_API}/users/update`, body,{'token_auth': `${token}`,'Content-type':'multipart/form-data',});
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API}/users/${this.state.username}`,
            data: body,
            headers: {
                token_auth: token,
                'Content-type': 'application/x-www-form-urlencoded'
            },
        })
            .then((res) => {
                this.props.UnSetUser()
                this.props.history.push("/")
                Swal.fire("OK", "Update Profile Success, silakan login kembali", "success");
            })
            .catch((error) => {
                console.error(error.message);
                Swal.fire("Failed", "Update Profile Failed", "error");
            })

    }

    ChangeName = (e) => {
        this.setState({ name: e.target.value })
    }

    ChangeOldPass = (e) => {
        this.setState({ old_password: e.target.value })
    }

    ChangePass = (e) => {
        this.setState({ password: e.target.value })
    }

    ChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    ChangeGender = (e) => {
        this.setState({ gender: e.target.value })
    }

    componentDidMount() {
        this.setState({
            name: this.props.users.data.name_user
        });
        this.setState({
            username: this.props.users.data.username
        });
        this.setState({
            email: this.props.users.data.email
        });
        this.setState({
            gender: this.props.users.data.gender
        });
        this.setState({
            token: this.props.users.token
        });
    }

    render() {

        return (
            <div>
                <Navigasi />
                <div className="profile-page">
                    <div className="container">
                        {/* profile */}
                        <div className="col-12 bg-white shadow-sm py-4">
                            <div className="text-center">
                                <h3 className="text-bold m-0 mt-3">Edit Profile</h3>
                            </div>
                        </div>
                        {/* inventory */}
                        <div className="col-12 bg-white shadow-sm py-4 mt-3">
                            <div className="px-4 d-flex align-content-center align-items-center">
                                <h6 className="col-3 text-bold m-0">Nama Lengkap</h6>
                                <div className="m-0 col-9">
                                    <input type="text" className="product-box-p text-reguler p-3" placeholder={this.state.name} onChange={this.ChangeName} />
                                </div>
                            </div>
                            <div className="mt-3 px-4 d-flex align-content-center align-items-center">
                                <h6 className="col-3 text-bold m-0">Email</h6>
                                <div className="m-0 col-9">
                                    <input type="text" className="product-box-p text-reguler p-3" placeholder={this.state.email} onChange={this.ChangeEmail} />
                                </div>
                            </div>
                            <div className="mt-3 px-4 d-flex align-content-center align-items-center">
                                <h6 className="col-3 text-bold m-0">Username</h6>
                                <div className="m-0 col-9">
                                    <input type="text" className="product-box-p text-reguler p-3" placeholder={this.state.username} readOnly />
                                </div>
                            </div>
                            <div className="mt-3 px-4 d-flex align-content-center align-items-center">
                                <h6 className="col-3 text-bold m-0">Gender</h6>
                                <div className="m-0 col-9">
                                    <input type="text" className="product-box-p text-reguler p-3" placeholder={this.state.gender} onChange={this.ChangeGender} />
                                </div>
                            </div>
                            <div className="mt-3 px-4 d-flex align-content-center align-items-center">
                                <h6 className="col-3 text-bold m-0">Password Lama</h6>
                                <div className="m-0 col-9">
                                    <input type="text" className="product-box-p text-reguler p-3" onChange={this.ChangeOldPass} />
                                </div>
                            </div>
                            <div className="mt-3 px-4 d-flex align-content-center align-items-center">
                                <h6 className="col-3 text-bold m-0">Password Baru</h6>
                                <div className="m-0 col-9">
                                    <input type="text" className="product-box-p text-reguler p-3" onChange={this.ChangePass} />
                                </div>
                            </div>
                        </div>
                        {/* inventory */}
                        <div className="col-12 bg-white shadow-sm py-4 mt-3">
                            <div className="px-4">
                                <button className="btn-signup-p mx-auto text-reguler" onClick={this.SubmitHandler} >Update Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        UserSet: bindActionCreators(ActionUsers.UserSet, dispatch),
        UnSetUser: bindActionCreators(ActionUsers.AuthClear, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)