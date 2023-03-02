import React from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { toast } from 'react-toastify';
import { NavHashLink } from 'react-router-hash-link';
import {
  NavLink
} from "react-router-dom";
import { getAddress, getOwner } from '../../utils/contractUtils'
import './Navbar.css'

const Navbar = () => {

  const [user, setUser] = React.useState('')
  const [isOwner, setIsOwner] = React.useState(false)

  React.useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    setUser(await getAddress())
    await getAddress() === await getOwner() ? setIsOwner(true) : setIsOwner(false)
  }

  const loginWithMetaMask = async (e) => {
    e.preventDefault()
    const provider = await detectEthereumProvider();
    if (provider) {
      //   setMetaMaskLoader(true)
      let ethereum;
      if (window.ethereum.providers === undefined) {
        ethereum = window.ethereum;
      } else {
        ethereum = window.ethereum.providers.find((provider) => provider.isMetaMask);
      }
      try {
        // let signer = ethereum.getA

        let acc = await ethereum.request({ method: 'eth_requestAccounts' });
        // console.log(acc[0])
        if (acc[0] == null) {
          ethereum.request({ method: 'eth_accounts' })
            .then((accounts) => {
              if (accounts.length === 0) {
                toast.warn('Please connect to MetaMask.', {
                  position: toast.POSITION.TOP_LEFT
                })
                //   console.log('Please connect to MetaMask.');
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
        if (acc[0] != null) {
          var address = acc[0];
          localStorage.setItem('user', JSON.stringify(address))
          // dispatch(USER_LOGIN(address))
          let owner = await getOwner()
          owner === address ? setIsOwner(true) : setIsOwner(false)
          var shortAddress = address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length);
          console.log(shortAddress)
          window.location.reload()
          //   loginProviderRequest(address,shortAddress,setMetaMaskLoader)
        }
      } catch (error) {
        console.log(error);
        // setMetaMaskLoader(false)
      }
    } else {
      toast.error('Please Install MetaMask', {
        position: toast.POSITION.TOP_LEFT
      })
    }
  }

  return (
    <div id="nav">
      <nav className='navbar nav-bg-cust fixed-top navbar-expand-lg bg-dark navbar-dark' >
        <NavHashLink
          to="/"
        ><img alt='logo' className='navbar-logo' src={'./assets/logo.png'} /></NavHashLink>
        <button className="navbar-toggler toggle-btn" type="button" data-toggle="collapse"
          data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
          aria-label="Toggle navigation"><span className="navbar-toggler-icon "></span>
        </button>
        <div id='navbarNav' className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="pr-3">
              <a className='cust-nav-link'
                href="https://www.karmabear.io/"
              >Home</a>
            </li>
            <li className="pr-3">
              <a className='cust-nav-link'
                href="https://www.karmabear.io/#About"
              >About</a>
            </li>
            <li className="pr-3">
              <a className='cust-nav-link'
                href="https://www.karmabear.io/#Creator"
              >Team</a>
            </li>
            <li className="pr-3">
              <a className='cust-nav-link'
                href="https://www.karmabear.io/#Roadmap"
              >Roadmap</a>
            </li>
            <li className="pr-3">
              <a className='cust-nav-link'
                href="https://www.karmabear.io/#FAQ"
              >FAQ</a>
            </li>
            <li className="pr-3">
              <NavLink
                className='cust-nav-link'
                to="/gallery"
              >Gallery</NavLink>
            </li>
            {
              isOwner &&
              <li className="pr-4">
                <NavLink
                  className='cust-nav-link'
                  to="/admin"
                >Admin</NavLink>
              </li>
            }
          </ul>
          <ul className='my-lg-0 navbar-nav ml-auto align-items-center'>
            <div className="nav-social-links">
              <a href="http://www.twitter.com/karmabearnft" className="social-link-block w-inline-block">
                <img loading="lazy" rel="noreferrer"
                  target="_blank" src={'./assets/twitter-icon-nav.png'} alt="" className="social-icon" />
              </a>
              <a href="http://www.instagram.com/karmabearnft" rel="noreferrer"
                target="_blank" className="social-link-block w-inline-block">
                <img width="33" src={'./assets/ig-icon-nav.png'} alt="" className="social-icon" />
              </a>
              {/* <a href="https://discord.com/invite/rFYBKgwgpn" rel="noreferrer"
                target="_blank" className="social-link-block w-inline-block">
                <img width="33" loading="lazy" src={'./assets/discord-icon-nav.png'} alt="" className="social-icon" />
              </a> */}
            </div>
            <div className="nav-cta-button-container">
              {
                user.length > 0 ?
                  <h2 className="cust-nav-link button w-cust-nav-link" >{
                    user.substring(0, 6) + '...' + user.substring(user.length - 4, user.length)
                  }</h2> :
                  <button type="submit" onClick={loginWithMetaMask} href="/mint" className="cust-nav-link button w-cust-nav-link" style={{ maxWidth: '1400px' }}>Connect</button>
              }
            </div>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
