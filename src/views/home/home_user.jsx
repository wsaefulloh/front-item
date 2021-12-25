import React, { Component } from "react";
import Navigasi from "../../components/navbar/navbar_profile";
import axios from "axios";
import "./style/index.scoped.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ActionUsers from "../../stores/actions/users"
import Swal from 'sweetalert2'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prods: [],
      id_item: '',
      name_item: '',
      stock: '',
      image: '',
      token: '',
      user: '',
    };
  }

  handleShow(data) {
    this.setState({ name_item: data.name_item })
    this.setState({ id_item: data.id_item })
    this.setState({ stock: data.stock })
  }

  deleteProduct(id) {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/items/del/${id}`,
      headers: {'token_auth' : this.state.token,}
    }).then((res) => {
      Swal.fire("OK", "Delete Product Success", "success");
      this.Getproduct()
    })
  }

  SubmitHandler = async () => {
    try {
      const stock = parseInt(this.state.stock)
      const body = new FormData();
      body.append('id', this.state.id_item);
      body.append('name_item', this.state.name_item);
      body.append('stock', stock);
      body.append('image', this.state.image);
      const res = await axios.put(`${process.env.REACT_APP_API}/items/update`, body, { 'Content-type': 'multipart/form-data', 'token_auth': this.state.token });
      console.log(this.state)
      Swal.fire("OK", "Update Product Success", "success");
      this.Getproduct()
      console.log(res)
    } catch (error) {
      console.error(error);
      console.log(this.state)
    }
  }
  AddHandler = async () => {
    try {
      const stock = parseInt(this.state.stock)
      const body = new FormData();
      body.append('username', this.state.user);
      body.append('name_item', this.state.name_item);
      body.append('stock', stock);
      body.append('image', this.state.image);
      const res = await axios.post(`${process.env.REACT_APP_API}/items/add`, body, { headers: {'Content-type': 'multipart/form-data', 'token_auth': this.state.token} });
      console.log(this.state)
      Swal.fire("OK", "Add Product Success", "success");
      this.Getproduct()
      console.log(res)
    } catch (error) {
      console.error(error);
      console.log(this.state)
    }
  }

  ChangeName = (e) => {
    this.setState({ name_item: e.target.value })
  }

  ChangeStock = (e) => {
    this.setState({ stock: e.target.value })
  }

  ChangeImage = (e) => {
    const file = e.target.files[0];
    if (file.type === "image/jpg" || file.type === "image/png" || file.type === "image/jpeg")
      this.setState({ image: file })
  }


  componentDidMount() {
    this.Getproduct()
    console.log(this.state)
  }

  Getproduct() {
    this.setState({ token: this.props.users.token })
    this.setState({ user: this.props.users.data.username })
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/items/username/${this.props.users.data.username}`,
      headers: {
        token_auth: this.props.users.data.token,
      },
    })
      .then((res) => {
        this.setState({
          prods: res.data.result,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Navigasi />
        <main>


          <section className="container">
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {this.state.prods.map((val) => {
              return (
                <div className="mt-0">
                    <div className="col py-3">
                      <div className="card shadow-sm h-100">
                        <img className="img-item card-img-top" src={val.image_item} alt="" />
                        <div className="m-0 card-body">
                          <h6 className="m-0 text-bold">{val.name_item}</h6>
                          <div className="d-flex mt-2">
                            <div className="text-bold me-2">Stock : </div>
                            <div className="stock text-bold">{val.stock}</div>
                          </div>
                          <div className="d-flex mt-2 justify-content-center">
                            <button className="btn-bottom-delete text-reguler" onClick={() => this.deleteProduct(val.id_item)} >Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              )
            })}
            </div>
          </section>

          {/* Add barang */}
          <section className="container mt-2 text-center">
            <button className="btn-bottom text-reguler" data-toggle="modal" data-target="#exampleModalLong">tambah item +</button>
          </section>

          {/* MODAL */}
          <div className="modal fade" id="exampleModalLong" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Add Product</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="mt-1">
                    <p className="my-2 text-bold">Name Item</p>
                    <input type="text" className="search-box-up text-reguler p-3"  onChange={this.ChangeName} />
                  </div>
                  <div className="mt-1">
                    <p className="my-2 text-bold">Stock</p>
                    <input type="text" className="search-box-up text-reguler p-3"  onChange={this.ChangeStock} />
                  </div>
                  <div className="mt-1">
                    <p className="my-2 text-bold">Image</p>
                    <input type="file" className="text-reguler" placeholder="Image" onChange={this.ChangeImage} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.AddHandler()}>Tambahkan</button>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    );
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
