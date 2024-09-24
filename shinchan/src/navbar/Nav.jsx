import React from 'react'
import './nav.css'
 


const Nav = () => {

  
  const toggleSidebar = () => {
    const sidebars = document.querySelectorAll('.sidebar, .sidebar1');
    sidebars.forEach(sidebar => {
      sidebar.classList.toggle('active');
  });
  }
   
  

  return (
    <div>

    <nav className="navbar">
        <a href="#home" className='shin mobile'>Shinchan</a>
        <a href="#home" className='links l1 mobile'>home</a>
        <a href="#how" className='links l2 mobile'>about</a>
        <a href="#review" className='links l3 mobile'>some</a>
   </nav>


    <nav>
    <div className="menu navbar mob" onClick={toggleSidebar}>
    <div className="sidebar1"></div>
    <div className="sidebar">
        <a href="#home" className='links' >home</a>
        <a href="#how" className='links' >about</a>
        <a href="#review" className='links' >some</a>
      </div>
    <a href="#home" className='shin'>Shinchan</a>
      <div className="menu-icon"> 
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
      
    </nav>
    
    
    </div>
  )
}

export default Nav