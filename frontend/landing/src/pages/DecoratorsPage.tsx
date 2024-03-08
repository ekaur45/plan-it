import { Fragment } from "react";

export default function DecoratorsPage(){
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
                    
                </ul>
            </div>
        </section>
    </article>);
}