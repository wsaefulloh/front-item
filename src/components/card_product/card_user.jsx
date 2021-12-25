import "../card_product/card.scoped.css"
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";

function Cards(props) {
    return (

        <div className="col py-3">
            <div className="card shadow-sm h-100">
                <img className="card-img-top" src={props.image_product} alt="" />
                <div className="m-0 card-body">
                    <h6 className="m-0 text-bold">{props.name_product}</h6>
                    <div class="d-flex mt-2">
                        <div class="text-bold me-2">Stock : </div>
                        <div class="stock text-bold">2</div>
                    </div>
                    <div className="d-flex mt-2">
                        <button className="btn-bottom text-reguler">Update</button>
                        <button className="btn-bottom-delete text-reguler">Delete</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cards