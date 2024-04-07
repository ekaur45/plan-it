export default function Footer(){
    return (
        <footer id="footer" className="footer_area">
        <div className="footer_shape_1">
            <img src="assets/images/shape-1.png" alt="shape"/>
        </div> 
        
        <div className="container">
            <div className="footer_widget pt-80 pb-80 text-center">
                <div className="footer_logo">
                    <a href="#"><img src="assets/images/plan.png" alt="logo" width={300} height={125}/></a>
                </div>
                <div className="footer_title">
                    <h3 className="title">Ahmed <span>&</span> Sara</h3>
                </div>
                <ul className="footer_menu">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Couple</a></li>
                    <li><a href="#">Story</a></li>
                    <li><a href="#">Gallery</a></li>
                    <li><a href="#">Event</a></li>
                    <li><a href="#">RSVP</a></li>
                </ul>
            </div> 
            <div className="footer_copyright text-center">
                <p>Designed and Developed as <a href="#" style={{"color": "#D59A57"}} rel="nofollow">Final Year Project</a></p>
            </div>
        </div> 
    </footer>
    )
}