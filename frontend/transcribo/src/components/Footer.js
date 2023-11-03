import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="copy">© All rights reserved </div>
                <div className="bottom-links">
                    <div className="links">
                        <span>More Info</span>
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                    </div>
                    <div className="links">
                        <span>  </span>
                        <a href="#"><i className="fab fa-facebook" /></a>
                        <a href="#"><i className="fab fa-twitter" /></a>
                        <a href="#"><i className="fab fa-instagram" /></a>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer
