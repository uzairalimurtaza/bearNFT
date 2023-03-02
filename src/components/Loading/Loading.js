import React from 'react'
import './Loading.css'

const Loading = () => {
  React.useEffect(()=>{
    setTimeout(() => pageClick(), 500)
  },[])

  const pageClick= ()=> {
    var page = document.getElementById('loading');
    page.classList.add("loading-hover")
  }


  return (
    <div id='loading' >
        <img alt='logo' className='loader-img' src={'./assets/loading-logo.png'} />
    </div>
  )
}

export default Loading
