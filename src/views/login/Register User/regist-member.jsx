import React, { useState } from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.scoped.css"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';

const App = () => {
    const [name_users, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [role] = useState('member')
    const history = useHistory();

    const Register = async () => {
        const body = new URLSearchParams();
        body.append("name", name_users);
        body.append('username', username);
        body.append('password', password);
        body.append('email', email);
        body.append('gender', gender);
        body.append('role', role);
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/users/user`,
            data: body,
            headers: { 'Content-type': 'application/x-www-form-urlencoded', }
        }).then((res) => {
            history.push('/');
            Swal.fire("OK", "Register berhasil", "success");
            console.log(res)
        }).catch((err) => {
            Swal.fire("FAILED", "Username sudah terdaftar", "error");
        })
    }

    const inputName = (e) => {
        setName(e.target.value)
    }

    const inputUsername = (e) => {
        setUsername(e.target.value)
    }

    const inputPassword = (e) => {
        setPassword(e.target.value)
    }

    const inputEmail = (e) => {
        setEmail(e.target.value)
    }

    const inputGender = (e) => {
        setGender(e.target.value)
    }

    return (
        <main className="mt-5">
            <section>
                <div className="container">
                    <div className="col-12 col-md-6 col-xl-4 mx-auto">
                        <div className="d-none d-md-block mt-5 text-center">
                            <h6 className="my-0 mx-auto mt-4 text-bold">Registration</h6>
                        </div>

                        <div className="row mt-2 g-3">
                            <div className="col-12 text-center">
                                <input type="text" onChange={inputName} className="col-10 form-input text-reguler" placeholder="Your name" />
                            </div>
                            <div className="col-12 text-center">
                                <input type="text" onChange={inputUsername} className="col-10 form-input text-reguler" placeholder="Your username" />
                            </div>
                            <div className="col-12 text-center">
                                <input type="password" onChange={inputPassword} className="col-10 form-input text-reguler" placeholder="Your password" />
                            </div>
                            <div className="col-12 text-center">
                                <input type="text" onChange={inputEmail} className="col-10 form-input text-reguler" placeholder="Your email" />
                            </div>
                            <div className="col-12 text-center">
                                <input type="text" onChange={inputGender} className="col-10 form-input text-reguler" placeholder="Your gender" />
                            </div>
                            <div className="col-12 text-center mx-auto align-items-center d-flex">
                                <button onClick={Register} className="col-10 text-submit text-reguler mx-auto">Register</button>
                            </div>
                            <div className="col-12 text-center">
                                <p className="col-10 mx-auto text-reguler">Already have an account? <Link className="text-reguler text-forgot" to="/">Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )


}

export default App