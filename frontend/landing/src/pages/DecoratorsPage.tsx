import { Fragment } from "react";

export default function DecoratorsPage(){
    return (<Fragment>
<section className="single_slider" style={{ height: "78px" }}>

</section>
<section>
    <div className="filter container pt-20">
        <form className="d-flex mb-3 w-100" style={{ "gap": "15px" }}>
            <input type="text" placeholder="Search by name" className="form-control" name="name" />
            <button className="btn btn-outline-primary">Search</button>
        </form>
    </div>
</section>
<section className="container">
    <h3>Coming soon...</h3>
    </section>



    </Fragment>);
}