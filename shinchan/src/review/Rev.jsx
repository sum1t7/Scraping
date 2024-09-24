import React from 'react'
import './rev.css'
import himawari from '../assest/himawari.png'
import shiro from '../assest/shiro.png'
import Hozier from '../assest/pngwing.com.png'

const data = [
    {
        id: 1,
        name: 'Ghost from spirited away',
        image: shiro,
        review:'"Lved the expierence bhhh"' 
    },
    {
        
            id: 2,
            name: 'Hozier',
            image: Hozier,
            review:'"Id tell them put me back in it"' 
        
    },
    {
        id: 3,
        name: 'Himawari',
        image: himawari,
        review:'"gwaaaa guuua"' 
    },
    {
        id: 3,
        name: 'Himawari',
        image: himawari,
        review:'"gwaaaa guuua"' 
    }
  ]

const Rev = () => {
  return (
    <div>
    <section className='review-section' id="review">
        
        <div className="rev-title">what they say!</div>
        
        <div className="wrapper">

        {
            data.map((d) =>(
                
                
                <div key={d.id} className='review'>
                    <div className="box">
                    <div className="circle">
                    <img src={d.image} alt={d.name}/>
                    </div>
                    <p className='p-text'>{d.review} - {d.name}</p>
                    </div>
                </div>
                 
                ))
            }
            </div>
    </section>
    <footer>
        <div className="footer">
            <p className='f'>All ©copyrights reserved..not lol its illegal.. what do you think 
                they give this shit out for free?</p>
            <p className='f'>made with heart emoji</p>
        </div>
    </footer>
    </div>
  )

}

export default Rev