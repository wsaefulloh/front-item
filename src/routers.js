import { BrowserRouter, Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import HomeUser from "./views/home/home_user"
import Login from "./views/login/Login User/login"
import Register from "./views/login/Register User/regist-member"
import ProfilePage from "./views/profile/profile"

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/profile/edit" component={ProfilePage}></Route>
                <Route exact path="/home" component={HomeUser}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/" component={Login}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App