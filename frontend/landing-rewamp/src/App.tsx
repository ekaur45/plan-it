import React from 'react';
import logo from './assets/images/logo.svg';
import './App.css';

function App() {
  return (
    <>
  <header className="header" data-header>
  <div className="container">

    <div className="overlay" data-overlay></div>

    <a href="#" className="logo">
      <img src={logo} alt="Ridex logo"/>
    </a>

    <nav className="navbar" data-navbar>
      <ul className="navbar-list">

        <li>
          <a href="#home" className="navbar-link" data-nav-link>Home</a>
        </li>

        <li>
          <a href="#featured-car" className="navbar-link" data-nav-link>Explore cars</a>
        </li>

        <li>
          <a href="#" className="navbar-link" data-nav-link>About us</a>
        </li>

        <li>
          <a href="#blog" className="navbar-link" data-nav-link>Blog</a>
        </li>

      </ul>
    </nav>

    <div className="header-actions">

      <div className="header-contact">
        <a href="tel:88002345678" className="contact-link">8 800 234 56 78</a>

        <span className="contact-time">Mon - Sat: 9:00 am - 6:00 pm</span>
      </div>

      <a href="#featured-car" className="btn" aria-labelledby="aria-label-txt">
        {/* <ion-icon name="car-outline"></ion-icon> */}

        <span id="aria-label-txt">Explore cars</span>
      </a>

      <a href="#" className="btn user-btn" aria-label="Profile">
        {/* <ion-icon name="person-outline"></ion-icon> */}
      </a>

      <button className="nav-toggle-btn" data-nav-toggle-btn aria-label="Toggle Menu">
        <span className="one"></span>
        <span className="two"></span>
        <span className="three"></span>
      </button>

    </div>

  </div>
</header>





<main>
  <article>



    <section className="section hero" id="home">
      <div className="container">

        <div className="hero-content">
          <h2 className="h1 hero-title">The easy way to takeover a lease</h2>

          <p className="hero-text">
            Live in New York, New Jerset and Connecticut!
          </p>
        </div>

        <div className="hero-banner"></div>

        <form action="" className="hero-form">

          <div className="input-wrapper">
            <label htmlFor="input-1" className="input-label">Car, model, or brand</label>

            <input type="text" name="car-model" id="input-1" className="input-field"
              placeholder="What car are you looking?"/>
          </div>

          <div className="input-wrapper">
            <label htmlFor="input-2" className="input-label">Max. monthly payment</label>

            <input type="text" name="monthly-pay" id="input-2" className="input-field" placeholder="Add an amount in $"/>
          </div>

          <div className="input-wrapper">
            <label htmlFor="input-3" className="input-label">Make Year</label>

            <input type="text" name="year" id="input-3" className="input-field" placeholder="Add a minimal make year"/>
          </div>

          <button type="submit" className="btn">Search</button>

        </form>

      </div>
    </section>







    <section className="section featured-car" id="featured-car">
      <div className="container">

        <div className="title-wrapper">
          <h2 className="h2 section-title">Featured cars</h2>

          <a href="#" className="featured-car-link">
            <span>View more</span>

            {/* <ion-icon name="arrow-forward-outline"></ion-icon> */}
          </a>
        </div>

        <ul className="featured-car-list">

          <li>
            <div className="featured-car-card">

              <figure className="card-banner">
                <img src={require("./assets/images/car-1.jpg")} alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
                  className="w-100"/>
              </figure>

              <div className="card-content">

                <div className="card-title-wrapper">
                  <h3 className="h3 card-title">
                    <a href="#">Toyota RAV4</a>
                  </h3>

                  <data className="year" value="2021">2021</data>
                </div>

                <ul className="card-list">

                  <li className="card-list-item">
                    <em></em>
                    {/* <ion-icon name="people-outline"></ion-icon> */}

                    <span className="card-item-text">4 People</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="flash-outline"></ion-icon> */}

                    <span className="card-item-text">Hybrid</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="speedometer-outline"></ion-icon> */}

                    <span className="card-item-text">6.1km / 1-litre</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="hardware-chip-outline"></ion-icon> */}

                    <span className="card-item-text">Automatic</span>
                  </li>

                </ul>

                <div className="card-price-wrapper">

                  <p className="card-price">
                    <strong>$440</strong> / month
                  </p>

                  <button className="btn fav-btn" aria-label="Add to favourite list">
                    {/* <ion-icon name="heart-outline"></ion-icon> */}
                  </button>

                  <button className="btn">Rent now</button>

                </div>

              </div>

            </div>
          </li>

          <li>
            <div className="featured-car-card">

              <figure className="card-banner">
                <img src={require("./assets/images/car-2.jpg")} alt="BMW 3 Series 2019" loading="lazy" width="440" height="300"
                  className="w-100"/>
              </figure>

              <div className="card-content">

                <div className="card-title-wrapper">
                  <h3 className="h3 card-title">
                    <a href="#">BMW 3 Series</a>
                  </h3>

                  <data className="year" value="2019">2019</data>
                </div>

                <ul className="card-list">

                  <li className="card-list-item">
                    {/* <ion-icon name="people-outline"></ion-icon> */}

                    <span className="card-item-text">4 People</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="flash-outline"></ion-icon> */}

                    <span className="card-item-text">Gasoline</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="speedometer-outline"></ion-icon> */}

                    <span className="card-item-text">8.2km / 1-litre</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="hardware-chip-outline"></ion-icon> */}

                    <span className="card-item-text">Automatic</span>
                  </li>

                </ul>

                <div className="card-price-wrapper">

                  <p className="card-price">
                    <strong>$350</strong> / month
                  </p>

                  <button className="btn fav-btn" aria-label="Add to favourite list">
                    {/* <ion-icon name="heart-outline"></ion-icon> */}
                  </button>

                  <button className="btn">Rent now</button>

                </div>

              </div>

            </div>
          </li>

          <li>
            <div className="featured-car-card">

              <figure className="card-banner">
                <img src={require("./assets/images/car-3.jpg")} alt="Volkswagen T-Cross 2020" loading="lazy" width="440"
                  height="300" className="w-100"/>
              </figure>

              <div className="card-content">

                <div className="card-title-wrapper">
                  <h3 className="h3 card-title">
                    <a href="#">Volkswagen T-Cross</a>
                  </h3>

                  <data className="year" value="2020">2020</data>
                </div>

                <ul className="card-list">

                  <li className="card-list-item">
                    {/* <ion-icon name="people-outline"></ion-icon> */}

                    <span className="card-item-text">4 People</span>
                  </li>

                  <li className="card-list-item">
                    {/*<ion-icon name="flash-outline"></ion-icon>*/}

                    <span className="card-item-text">Gasoline</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="speedometer-outline"></ion-icon> */}

                    <span className="card-item-text">5.3km / 1-litre</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="hardware-chip-outline"></ion-icon> */}

                    <span className="card-item-text">Automatic</span>
                  </li>

                </ul>

                <div className="card-price-wrapper">

                  <p className="card-price">
                    <strong>$400</strong> / month
                  </p>

                  <button className="btn fav-btn" aria-label="Add to favourite list">
                    {/* <ion-icon name="heart-outline"></ion-icon> */}
                  </button>

                  <button className="btn">Rent now</button>

                </div>

              </div>

            </div>
          </li>

          <li>
            <div className="featured-car-card">

              <figure className="card-banner">
                <img src="./assets/images/car-4.jpg" alt="Cadillac Escalade 2020" loading="lazy" width="440"
                  height="300" className="w-100"/>
              </figure>

              <div className="card-content">

                <div className="card-title-wrapper">
                  <h3 className="h3 card-title">
                    <a href="#">Cadillac Escalade</a>
                  </h3>

                  <data className="year" value="2020">2020</data>
                </div>

                <ul className="card-list">

                  <li className="card-list-item">
                    {/* <ion-icon name="people-outline"></ion-icon> */}

                    <span className="card-item-text">4 People</span>
                  </li>

                  <li className="card-list-item">
                    {/*<ion-icon name="flash-outline"></ion-icon>*/}

                    <span className="card-item-text">Gasoline</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="speedometer-outline"></ion-icon> */}

                    <span className="card-item-text">7.7km / 1-litre</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="hardware-chip-outline"></ion-icon> */}

                    <span className="card-item-text">Automatic</span>
                  </li>

                </ul>

                <div className="card-price-wrapper">

                  <p className="card-price">
                    <strong>$620</strong> / month
                  </p>

                  <button className="btn fav-btn" aria-label="Add to favourite list">
                    {/* <ion-icon name="heart-outline"></ion-icon> */}
                  </button>

                  <button className="btn">Rent now</button>

                </div>

              </div>

            </div>
          </li>

          <li>
            <div className="featured-car-card">

              <figure className="card-banner">
                <img src="./assets/images/car-5.jpg" alt="BMW 4 Series GTI 2021" loading="lazy" width="440"
                  height="300" className="w-100"/>
              </figure>

              <div className="card-content">

                <div className="card-title-wrapper">
                  <h3 className="h3 card-title">
                    <a href="#">BMW 4 Series GTI</a>
                  </h3>

                  <data className="year" value="2021">2021</data>
                </div>

                <ul className="card-list">

                  <li className="card-list-item">
                    {/* <ion-icon name="people-outline"></ion-icon> */}

                    <span className="card-item-text">4 People</span>
                  </li>

                  <li className="card-list-item">
                    {/*<ion-icon name="flash-outline"></ion-icon>*/}

                    <span className="card-item-text">Gasoline</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="speedometer-outline"></ion-icon> */}

                    <span className="card-item-text">7.6km / 1-litre</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="hardware-chip-outline"></ion-icon> */}

                    <span className="card-item-text">Automatic</span>
                  </li>

                </ul>

                <div className="card-price-wrapper">

                  <p className="card-price">
                    <strong>$530</strong> / month
                  </p>

                  <button className="btn fav-btn" aria-label="Add to favourite list">
                    {/* <ion-icon name="heart-outline"></ion-icon> */}
                  </button>

                  <button className="btn">Rent now</button>

                </div>

              </div>

            </div>
          </li>

          <li>
            <div className="featured-car-card">

              <figure className="card-banner">
                <img src="./assets/images/car-6.jpg" alt="BMW 4 Series 2019" loading="lazy" width="440" height="300"
                  className="w-100"/>
              </figure>

              <div className="card-content">

                <div className="card-title-wrapper">
                  <h3 className="h3 card-title">
                    <a href="#">BMW 4 Series</a>
                  </h3>

                  <data className="year" value="2019">2019</data>
                </div>

                <ul className="card-list">

                  <li className="card-list-item">
                    {/* <ion-icon name="people-outline"></ion-icon> */}

                    <span className="card-item-text">4 People</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="flash-outline"></ion-icon> */}

                    <span className="card-item-text">Gasoline</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="speedometer-outline"></ion-icon> */}

                    <span className="card-item-text">7.2km / 1-litre</span>
                  </li>

                  <li className="card-list-item">
                    {/* <ion-icon name="hardware-chip-outline"></ion-icon> */}

                    <span className="card-item-text">Automatic</span>
                  </li>

                </ul>

                <div className="card-price-wrapper">

                  <p className="card-price">
                    <strong>$490</strong> / month
                  </p>

                  <button className="btn fav-btn" aria-label="Add to favourite list">
                    {/* <ion-icon name="heart-outline"></ion-icon> */}
                  </button>

                  <button className="btn">Rent now</button>

                </div>

              </div>

            </div>
          </li>

        </ul>

      </div>
    </section>






    <section className="section get-start">
      <div className="container">

        <h2 className="h2 section-title">Get started with 4 simple steps</h2>

        <ul className="get-start-list">

          <li>
            <div className="get-start-card">

              <div className="card-icon icon-1">
                {/* <ion-icon name="person-add-outline"></ion-icon> */}
              </div>

              <h3 className="card-title">Create a profile</h3>

              <p className="card-text">
                If you are going to use a passage of Lorem Ipsum, you need to be sure.
              </p>

              <a href="#" className="card-link">Get started</a>

            </div>
          </li>

          <li>
            <div className="get-start-card">

              <div className="card-icon icon-2">
                {/* <ion-icon name="car-outline"></ion-icon> */}
              </div>

              <h3 className="card-title">Tell us what car you want</h3>

              <p className="card-text">
                Various versions have evolved over the years, sometimes by accident, sometimes on purpose
              </p>

            </div>
          </li>

          <li>
            <div className="get-start-card">

              <div className="card-icon icon-3">
                {/* <ion-icon name="person-outline"></ion-icon> */}
              </div>

              <h3 className="card-title">Match with seller</h3>

              <p className="card-text">
                It to make a type specimen book. It has survived not only five centuries, but also the leap into
                electronic
              </p>

            </div>
          </li>

          <li>
            <div className="get-start-card">

              <div className="card-icon icon-4">
                {/* <ion-icon name="card-outline"></ion-icon> */}
              </div>

              <h3 className="card-title">Make a deal</h3>

              <p className="card-text">
                There are many variations of passages of Lorem available, but the majority have suffered alteration
              </p>

            </div>
          </li>

        </ul>

      </div>
    </section>







    <section className="section blog" id="blog">
      <div className="container">

        <h2 className="h2 section-title">Our Blog</h2>

        <ul className="blog-list has-scrollbar">

          <li>
            <div className="blog-card">

              <figure className="card-banner">

                <a href="#">
                  <img src="./assets/images/blog-1.jpg" alt="Opening of new offices of the company" loading="lazy"
                    className="w-100"/>
                </a>

                <a href="#" className="btn card-badge">Company</a>

              </figure>

              <div className="card-content">

                <h3 className="h3 card-title">
                  <a href="#">Opening of new offices of the company</a>
                </h3>

                <div className="card-meta">

                  <div className="publish-date">
                    {/* <ion-icon name="time-outline"></ion-icon> */}

                    <time dateTime="2022-01-14">January 14, 2022</time>
                  </div>

                  <div className="comments">
                    {/* <ion-icon name="chatbubble-ellipses-outline"></ion-icon> */}

                    <data value="114">114</data>
                  </div>

                </div>

              </div>

            </div>
          </li>

          <li>
            <div className="blog-card">

              <figure className="card-banner">

                <a href="#">
                  <img src="./assets/images/blog-2.jpg" alt="What cars are most vulnerable" loading="lazy"
                    className="w-100"/>
                </a>

                <a href="#" className="btn card-badge">Repair</a>

              </figure>

              <div className="card-content">

                <h3 className="h3 card-title">
                  <a href="#">What cars are most vulnerable</a>
                </h3>

                <div className="card-meta">

                  <div className="publish-date">
                    {/* <ion-icon name="time-outline"></ion-icon> */}

                    <time dateTime="2022-01-14">January 14, 2022</time>
                  </div>

                  <div className="comments">
                    {/* <ion-icon name="chatbubble-ellipses-outline"></ion-icon> */}

                    <data value="114">114</data>
                  </div>

                </div>

              </div>

            </div>
          </li>

          <li>
            <div className="blog-card">

              <figure className="card-banner">

                <a href="#">
                  <img src="./assets/images/blog-3.jpg" alt="Statistics showed which average age" loading="lazy"
                    className="w-100"/>
                </a>

                <a href="#" className="btn card-badge">Cars</a>

              </figure>

              <div className="card-content">

                <h3 className="h3 card-title">
                  <a href="#">Statistics showed which average age</a>
                </h3>

                <div className="card-meta">

                  <div className="publish-date">
                    {/* <ion-icon name="time-outline"></ion-icon> */}

                    <time dateTime="2022-01-14">January 14, 2022</time>
                  </div>

                  <div className="comments">
                    {/* <ion-icon name="chatbubble-ellipses-outline"></ion-icon> */}

                    <data value="114">114</data>
                  </div>

                </div>

              </div>

            </div>
          </li>

          <li>
            <div className="blog-card">

              <figure className="card-banner">

                <a href="#">
                  <img src="./assets/images/blog-4.jpg" alt="What´s required when renting a car?" loading="lazy"
                    className="w-100"/>
                </a>

                <a href="#" className="btn card-badge">Cars</a>

              </figure>

              <div className="card-content">

                <h3 className="h3 card-title">
                  <a href="#">What´s required when renting a car?</a>
                </h3>

                <div className="card-meta">

                  <div className="publish-date">
                    {/* <ion-icon name="time-outline"></ion-icon> */}

                    <time dateTime="2022-01-14">January 14, 2022</time>
                  </div>

                  <div className="comments">
                    {/* <ion-icon name="chatbubble-ellipses-outline"></ion-icon> */}

                    <data value="114">114</data>
                  </div>

                </div>

              </div>

            </div>
          </li>

          <li>
            <div className="blog-card">

              <figure className="card-banner">

                <a href="#">
                  <img src="./assets/images/blog-5.jpg" alt="New rules for handling our cars" loading="lazy"
                    className="w-100"/>
                </a>

                <a href="#" className="btn card-badge">Company</a>

              </figure>

              <div className="card-content">

                <h3 className="h3 card-title">
                  <a href="#">New rules for handling our cars</a>
                </h3>

                <div className="card-meta">

                  <div className="publish-date">
                    {/* <ion-icon name="time-outline"></ion-icon> */}

                    <time dateTime="2022-01-14">January 14, 2022</time>
                  </div>

                  <div className="comments">
                    {/* <ion-icon name="chatbubble-ellipses-outline"></ion-icon> */}

                    <data value="114">114</data>
                  </div>

                </div>

              </div>

            </div>
          </li>

        </ul>

      </div>
    </section>

  </article>
</main>







<footer className="footer">
  <div className="container">

    <div className="footer-top">

      <div className="footer-brand">
        <a href="#" className="logo">
          <img src="./assets/images/logo.svg" alt="Ridex logo"/>
        </a>

        <p className="footer-text">
          Search for cheap rental cars in New York. With a diverse fleet of 19,000 vehicles, Waydex offers its
          consumers an
          attractive and fun selection.
        </p>
      </div>

      <ul className="footer-list">

        <li>
          <p className="footer-list-title">Company</p>
        </li>

        <li>
          <a href="#" className="footer-link">About us</a>
        </li>

        <li>
          <a href="#" className="footer-link">Pricing plans</a>
        </li>

        <li>
          <a href="#" className="footer-link">Our blog</a>
        </li>

        <li>
          <a href="#" className="footer-link">Contacts</a>
        </li>

      </ul>

      <ul className="footer-list">

        <li>
          <p className="footer-list-title">Support</p>
        </li>

        <li>
          <a href="#" className="footer-link">Help center</a>
        </li>

        <li>
          <a href="#" className="footer-link">Ask a question</a>
        </li>

        <li>
          <a href="#" className="footer-link">Privacy policy</a>
        </li>

        <li>
          <a href="#" className="footer-link">Terms & conditions</a>
        </li>

      </ul>

      <ul className="footer-list">

        <li>
          <p className="footer-list-title">Neighborhoods in New York</p>
        </li>

        <li>
          <a href="#" className="footer-link">Manhattan</a>
        </li>

        <li>
          <a href="#" className="footer-link">Central New York City</a>
        </li>

        <li>
          <a href="#" className="footer-link">Upper East Side</a>
        </li>

        <li>
          <a href="#" className="footer-link">Queens</a>
        </li>

        <li>
          <a href="#" className="footer-link">Theater District</a>
        </li>

        <li>
          <a href="#" className="footer-link">Midtown</a>
        </li>

        <li>
          <a href="#" className="footer-link">SoHo</a>
        </li>

        <li>
          <a href="#" className="footer-link">Chelsea</a>
        </li>

      </ul>

    </div>

    <div className="footer-bottom">

      <ul className="social-list">

        <li>
          <a href="#" className="social-link">
            {/* <ion-icon name="logo-facebook"></ion-icon> */}
          </a>
        </li>

        <li>
          <a href="#" className="social-link">
            {/* <ion-icon name="logo-instagram"></ion-icon> */}
          </a>
        </li>

        <li>
          <a href="#" className="social-link">
            {/* <ion-icon name="logo-twitter"></ion-icon> */}
          </a>
        </li>

        <li>
          <a href="#" className="social-link">
            {/* <ion-icon name="logo-linkedin"></ion-icon> */}
          </a>
        </li>

        <li>
          <a href="#" className="social-link">
            {/* <ion-icon name="logo-skype"></ion-icon> */}
          </a>
        </li>

        <li>
          <a href="#" className="social-link">
            {/* <ion-icon name="mail-outline"></ion-icon> */}
          </a>
        </li>

      </ul>

      <p className="copyright">
        &copy; 2022 <a href="#">codewithsadee</a>. All Rights Reserved
      </p>

    </div>

  </div>
</footer>
</>
  );
}

export default App;
