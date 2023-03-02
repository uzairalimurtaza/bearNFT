import React from 'react'
import { ReactComponent as AboutKarma } from '../../assets/about-heading-2.svg'
import { ReactComponent as Bear } from '../../assets/bear.svg'
import './About.css'

const About = () => {
  return (
    <div id='about'>
        <div className='d-flex justify-content-center'>
            <AboutKarma  className=' img-fluid' />
            <Bear className='p-2 bear'/>
        </div>
        <div className='container-fluid row mx-0 justify-content-around mt-4'  >
            <div className='col-md-9 about-text text-white mt-5 '>
                <p>
                    Karma Bear NFT is a collection of 10,000 digital artworks     
                </p>
                <p>
                    The unique properties were created
                    using a combination of digital
                    painting and photo compilation
                    techniques. The Legendary Karma
                    Bears have, one-of-a-kind, digitally
                    painted, custom outfits and feature
                    locations no other Karma Bear has
                    traveled before.
                 </p>
            </div>
            <div className='col-md-4 right-sec-about mt-4'>
                <div className='row mx-0 justify-content-center align-items-center'>
                    <div className='col-md-6 pt-3 d-flex flex-column justify-content-center align-items-center'>
                        <img alt='world' className='pic1' src={'../assets/about-1.png'} />
                        <img alt='world' className='pic2 mt-4' src={'../assets/about-2.png'} />
                    </div>
                    <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
                        <img alt='world' className='pic3' src={'../assets/about-3.png'} />
                        <img alt='world' className='pic4 mt-4' src={'../assets/about-4.png'} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
