import React from 'react'
import Nft from './Nft'
import './Gallery.css'
import Spinner from 'react-bootstrap/Spinner'
import { getUnRevealedURI, getRevealed, getTotalMinted } from '../../utils/contractUtils'

const Gallery = () => {
  const [totalMinted, setTotalMinted] = React.useState(5)

  React.useEffect(() => {
    setData()
  }, [totalMinted])

  const setData = async () => {
    setTotalMinted(await getTotalMinted())
  }

  return (
    <div id='gallery' className='container-fluid mx-0'>
      <h1 className="display-6 text-center text-white py-3">NFT GALLERY</h1>
      <div className='row mx-0 justify-content-center' >
        {
          totalMinted > 0 ?
            Array.from(Array(totalMinted), (e, i) => {
              return <Nft index={i} />
            }) :
            <Spinner className="spinner-border-lg my-2" animation="border" role="status" />
        }
      </div>
    </div>
  )
}

export default Gallery