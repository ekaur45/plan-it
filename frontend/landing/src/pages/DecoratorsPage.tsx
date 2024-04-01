import { Fragment, useEffect, useState } from "react";
import { getRequest } from "../utils/api.util"
import CONFIG from "../utils/config.util";
export default function DecoratorsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const getInitData = async () => {
        const result = await getRequest<any[]>("home/decorations");
        if (result.status == 200) {
            setEvents(result.data);
        }
    }
    const handleOnImageError = (e: any) => {
        e.target.src = "/assets/images/no-image.png";
    }
    useEffect(() => {
        getInitData();
    }, []);
    return (<article>
        <section className="section hero" id="home">
            <div className="container">
                <div className="hero-content">
                    <h2 className="h1 hero-title">The easy way to takeover a lease</h2>
                    <p className="hero-text">
                        Live in Pakistan!
                    </p>
                </div>
                <div className="hero-banner-decoration"></div>
                <form action="" className="hero-form">
                    <div className="input-wrapper">
                        <label htmlFor="input-1" className="input-label">Type</label>
                        <input type="text" name="car-model" id="input-1" className="input-field"
                            placeholder="What are you looking for?" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="input-2" className="input-label">Payment (min)</label>
                        <input type="text" name="monthly-pay" id="input-2" className="input-field" placeholder="Add an amount in PKR" />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="input-3" className="input-label">Payment (max)</label>
                        <input type="text" name="year" id="input-3" className="input-field" placeholder="Add an amount in PKR" />
                    </div>
                    <button type="submit" className="btn">Search</button>
                </form>
            </div>
        </section>
        <section className="section featured-car" id="featured-car">
            <div className="container">
                <div className="title-wrapper">
                    <h2 className="h2 section-title">Featured Decorators</h2>
                </div>
                <ul className="featured-car-list">
                    {events && events.length > 0 && events.map((e, i) => <Fragment key={e._id}>
                        <li>
                            <div className="featured-car-card">
                                <figure className="card-banner">
                                    <img onError={handleOnImageError} src={CONFIG.BaseUrl + e.files[0]} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                                        className="w-100" />
                                </figure>
                                <div className="card-content">

                                    <div className="card-title-wrapper">
                                        <h3 className="h3 card-title">
                                            {e.name}
                                        </h3>
                                    </div>

                                    <ul className="card-list">


                                    </ul>
                                    <p className="card-list-item multiline-overflow-ellipsis" style={{ display: "-webkit-box" }}>
                                        {e.description}
                                    </p>
                                    <div className="card-price-wrapper">
                                        <p className="card-price">
                                            <strong>{e.price}</strong> PKR / month
                                        </p>
                                        <button className="btn btn-outline-primary" onClick={e => alert("Hi")}>Rent now</button>
                                    </div>
                                </div>

                                {/* {e.name}
                        {e.description}
                        {e.user?.firstName}
                        {e.user?.lastName}
                        {e.user?.lastName} */}
                            </div>
                        </li>
                    </Fragment>)}
                </ul>
            </div>
        </section>
    </article>);
}