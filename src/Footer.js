import React from 'react'
import './Footer.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Footer(darkMode) {
    return (
        
           <footer className="footer" style={{backGroundColor:darkMode? "#1f2933":"#616e7c"}}>
               <div className="row">
                   <div className="col">
                       <h4>Designed By HS&copy;</h4>
                       <ul className="list-unstyledd">
                           <li>Harmeet Singh</li>
                           <li>Second Year CS Bachelor(NSUT)</li>
                       </ul>
                   </div>
                   <div className="col soh ">
                       <h4>Contact Me:-</h4>
                      
                       <ul className="list-unstyledd">
                           <li><a href="tel:+918700919008">+91-8700919008 </a> &#9742;</li>
                           <li><a href="mailto: harmeetsinghh2001@gmail.com">harmeetsinghh2001@gmail.com </a> &#128231;</li>
                           <li>Social Media: <div class="social-footer-icons">
    <ul class="menu simple">
      <li><a href="https://www.facebook.com/profile.php?id=100009872145666"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
      <li><a href="https://www.instagram.com/_harmeett_/"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
      <li><a href="https://www.linkedin.com/in/harmeet-singh-a96880192/"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
      <li><a href="https://twitter.com/Harmeet13585451"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
    </ul>
  </div></li>
                           </ul>
                   </div>
                   <div className="col">
                       <h4>For more information, visit the following sites:</h4>
                       <ul className="list-unstyledd">
                           <li><a href="https://www.mohfw.gov.in/">India</a></li>
                           <li><a href="https://www.who.int/health-topics/coronavirus">World Health Organisation</a></li>
                           <li><a href="https://www.mohfw.gov.in/pdf/coronvavirushelplinenumber.pdf">Covid-19 Helpline Numbers(India)</a></li>
                       </ul>
                       </div>
               </div>
           </footer>
    )
}

export default Footer
