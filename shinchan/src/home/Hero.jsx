import React from 'react'
import './hero.css'
import shin1 from '../assest/pngegg.png'
import shiro from '../assest/shiro.png'
import gaster from '../assest/Calcifer-PNG-Pic.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    
    navigate("/");
  }, [navigate]);
 
  return (
    <div>

    <section id= "home"> 
    <div className="shin-container mobile-hero">
    <div className="text1 ">
    <div className="title shin-title red">reconnect with the nostalgia!</div>
   <Link to= "/shinchan" >
    <button className="btn red" >watch</button>
   </Link>
    </div>
    <img src={shin1} alt="" className='img1' />
   </div>
    </section>

    <div className="spacer layer"></div>

    <section >
    <div className="shiro-container one mobile-hero-one">
    <div className="text">
    <div className="title shiro-title yellow">dive back into old shinchan</div>
    <div className="medium-text yellow">enjoy shinchan just like the old brodacasts back in the good old days</div>
    </div>
    <img src={shiro} alt="" className='img2' />
    </div>
    </section>

    <div className="spacer layer2"></div>

    <section>
    <div className="gaster-container mobile-hero">
    <div className="text3">
    <div className="title gaster-title red">this whole website is overkill.</div>
    <div className="medium-text red">obviously made to overcomplicate the simple task to watch a video but I need to demonstrate my skills</div>
    </div>
    <img src={gaster} alt="" className='img3' />
    </div>
    </section>

    <div className="spacer layer3"></div>
    
    <section id="how">
    <div className="how-container one mobile-hero-one">
      <div className="text2">
        <div className="small-text yellow w1">template</div>
        <div className="title how-title yellow w2 ">how it works</div>
        <div className="medium-text yellow w3">obviously made to overcomplicate the simple task to watch a video but I need to demonstrate my skills obviously made to overcomplicate the simple task to watch a video but I need to demonstrate my skills obviously made to overcomplicate the simple task to watch a video but I need to demonstrate my skills obviously made to overcomplicate the simple task to watch a video but I need to demonstrate my skills obviously made to overcomplicate the simple task to watch a video but I need to demonstrate my skills obviously made to overcomplicate the simple task to watch a video but I need to demonstrate my skills obviously made to overcomplicate the simple task to watch a video but I need to demonstrate my skills </div>
      </div>
    </div>
    </section>

    <div className="spacer layer4"></div>
    
    </div>
  )
}

export default Home