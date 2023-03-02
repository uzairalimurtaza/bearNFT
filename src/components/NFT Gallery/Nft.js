import React from 'react'
import { contract } from '../../utils/contractUtils'
import './Nft.css'

const Nft = ({ index }) => {
  console.log(index)
  return (
    <div className="card card-border mt-4 ml-4 p-0" style={{ width: '12rem', margin: '50px' }}>
      <img src='https://gateway.pinata.cloud/ipfs/QmXEWJVoDFp9x5siGihWjkRE4TA7AXSgyqB7ykqQhvEGMc' className="card-img-top" alt="..." />
      <div className="card-body card-bg  d-flex flex-column align-items-center">
        <h5 className="card-title text-center text-white">Karma Bear Collection {index}</h5>
      </div>
    </div>
  )
}

export default Nft