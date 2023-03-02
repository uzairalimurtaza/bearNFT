import React from 'react'
import {
  getAddress,
  contract
} from '../../utils/contractUtils'
import Spinner from 'react-bootstrap/Spinner'
import { toast } from 'react-toastify';
import Web3 from 'web3';
import './Admin.css'

const Admin = () => {

  const [mint, setMint] = React.useState(0)
  const [user, setUser] = React.useState('')
  const [isPaused, setIsPaused] = React.useState('')
  const [isRevealed, setIsRevealed] = React.useState('')
  const [presaleActiveValue, setPresaleActiveValue] = React.useState('')
  const [publicsaleActiveValue, setPublicsaleActiveValue] = React.useState('')
  const [freesaleActiveValue, setfreeSaleActiveValue] = React.useState('')

  const [publicsaleActive, setPublicsaleActive] = React.useState('true')
  const [freesaleActive, setFreesaleActive] = React.useState('true')
  const [presaleActive, setPresaleActive] = React.useState('true')

  const [publicSaleCost, setPublicSaleCost] = React.useState('')
  const [preSaleCost, setPreSaleCost] = React.useState('')
  const [preSaleValue, setPreSaleValue] = React.useState('')
  const [publicSaleValue, setPublicSaleValue] = React.useState('')
  const [pauseValue, setPauseValue] = React.useState("true")
  const [revealValue, setRevealValue] = React.useState("true")
  const [baseURI, setBaseURI] = React.useState('')
  const [baseURIValue, setBaseURIValue] = React.useState('')
  const [unRevealedURI, setUnRevealedURI] = React.useState('')
  const [unRevealedURIValue, setUnRevealedURIValue] = React.useState('')
  const [giveAwayAddress, setGiveAwayAddress] = React.useState('')
  const [totalMinted, setTotalMinted] = React.useState('')
  const [newRootHashPresale, setNewRootHashPresale] = React.useState('')
  const [newRootHashFreeMint, setNewRootHashFreeMint] = React.useState('')
  const [currentRootHashPresale, setCurrentRootHashPresale] = React.useState('')
  const [currentRootHashFreeMint, setCurrentRootHashFreeMint] = React.useState('')
  const [newMaxMintPerWallet, setNewMaxMintPerWallet] = React.useState('')
  const [currentMaxMintPerWallet, setCurrentMaxMintPerWallet] = React.useState('')
  const [owner, setOwner] = React.useState('')

  const web3Instance = new Web3(Web3.givenProvider, 'web3');

  React.useEffect(() => {
    getUser()
    setData()
  }, [])

  const getUser = async (e) => {
    setUser(await getAddress())
  }

  const adminMintNfts = async (e) => {
    e.preventDefault()
    await contract.methods.adminMint(mint).send({ from: String(user) }, (err) => {
      if (err !== undefined) {
        console.log(err, 'err')
      }
    })
  }

  const increaseMint = () => {
    setMint(mint + 1)
  }

  const withdraw = async (e) => {
    e.preventDefault()
    await contract.methods.withdraw().send({ from: String(user) })
  }

  const decreaseMint = () => {
    if (mint === 0) {
      setMint(0)
    } else {
      setMint(mint - 1)
    }
  }

  const setData = async () => {
    setIsPaused(await contract.methods.isPaused().call())
    setIsRevealed(await contract.methods.isRevealed().call())
    setPublicSaleCost(web3Instance.utils.fromWei(await contract.methods.publicSaleCost().call(), 'ether'))
    setPreSaleCost(web3Instance.utils.fromWei(await contract.methods.preSaleCost().call(), 'ether'))
    setUnRevealedURI(await contract.methods.notRevealedUri().call())
    setBaseURIValue(await contract.methods.baseURI().call())
    setTotalMinted(await contract.methods.totalMinted().call())
    setCurrentRootHashPresale(await contract.methods.merkleTreeRootPresale().call()=="0x0000000000000000000000000000000000000000000000000000000000000000" ? "" :     await contract.methods.merkleTreeRootPresale().call())
    setCurrentRootHashFreeMint(await contract.methods.merkleTreeRootFreeMint().call()=="0x0000000000000000000000000000000000000000000000000000000000000000" ? "" :     await contract.methods.merkleTreeRootFreeMint().call())
    setCurrentMaxMintPerWallet(await contract.methods.maxMintPerWallet().call())
    setPresaleActiveValue(await contract.methods.isPresaleActive().call())
    setPublicsaleActiveValue(await contract.methods.isPublicMintActive().call())
    setfreeSaleActiveValue(await contract.methods.isFreeMintActive().call())
    console.log(await contract.methods.owner().call(),'owner')
    setOwner(await contract.methods.owner().call())
  }

  const pauseContract = async (e) => {
    e.preventDefault()
    const val = pauseValue === "true" ? true : false
    await contract.methods.setPaused(Boolean(val)).send({ from: String(user) }, (err) => {
      if (err !== undefined) {
        console.log(err, 'err')
      }
    })
  }

  const setRevealUriContract = async (e) => {
    e.preventDefault()
    const val = revealValue === "true" ? true : false
    await contract.methods.setRevealed(Boolean(val)).send({ from: String(user) }, (err) => {
      if (err !== undefined) {
        console.log(err, 'err')
      }
    })
  }

  const setFreeMintActive = async (e) => {
    e.preventDefault()
    const val = freesaleActive === "true" ? true : false
    await contract.methods.setFreeSaleMint(Boolean(val)).send({ from: String(user) }, (err) => {
      if (err !== undefined) {
        console.log(err, 'err')
      }
    })
  }

  const setPublicMintActive = async (e) => {
    e.preventDefault()
    const val = publicsaleActive === "true" ? true : false
    await contract.methods.setPublicSaleMint(Boolean(val)).send({ from: String(user) }, (err) => {
      if (err !== undefined) {
        console.log(err, 'err')
      }
    })
  }

  const setPreSaleMintActive = async (e) => {
    e.preventDefault()
    console.log(presaleActive, 'preesale')
    const val = presaleActive === "true" ? true : false
    await contract.methods.setPresaleMint(Boolean(val)).send({ from: String(user) }, (err) => {
      if (err !== undefined) {
        console.log(err, 'err')
      }
    })
  }

  const setPreSaleCostAdmin = async (e) => {
    e.preventDefault()
    if (preSaleValue.length === 0) {
      toast.warn("Please Enter Presale Value")
    }
    else {
      let value = web3Instance.utils.toWei(preSaleValue, 'ether')
      await contract.methods.setPresaleCost(value).send({ from: String(user) }, (err) => {
        if (err !== undefined) {
          console.log(err, 'err')
        }
      })
    }
  }

  const setPublicSaleCostAdmin = async (e) => {
    e.preventDefault()
    if (publicSaleValue.length === 0) {
      toast.warn("Please Enter Presale Value")
    }
    else {
      let value = web3Instance.utils.toWei(publicSaleValue, 'ether')
      await contract.methods.setPublicSaleCost(value).send({ from: String(user) }, (err) => {
        if (err !== undefined) {
          console.log(err, 'err')
        }
      })
    }
  }

  const setBaseUriContract = async (e) => {
    e.preventDefault()
    if (baseURI.length === 0) {
      toast.warn("Please Enter Base URI")
    }
    else {
      await contract.methods.setBaseURI(baseURI).send({ from: String(user) }, (err) => {
        if (err !== undefined) {
          console.log(err, 'err')
        }
      })
    }
  }

  const updateMaxMintWallet = async (e) => {
    e.preventDefault()
    if (newMaxMintPerWallet.length === 0) {
      toast.warn("Please Enter Base URI")
    }
    else {
      await contract.methods.setMaxMintPerWallet(Number(newMaxMintPerWallet)).send({ from: String(user) }, (err) => {
        if (err !== undefined) {
          console.log(err, 'err')
        }
      })
    }
  }

  const updateUnRevealedURIContract = async (e) => {
    e.preventDefault()
    if (unRevealedURIValue.length === 0) {
      toast.warn("Please Enter UnRevealed URI")
    }
    else {
      await contract.methods.setNotRevealedURI(unRevealedURIValue).send({ from: String(user), value: '' }, (err) => {
        if (err !== undefined) {
          console.log(err, 'err')
        }
      })
    }
  }

  const giveAway = async (e) => {
    e.preventDefault()
    if (giveAwayAddress.length === 0) {
      toast.warn("Please Enter Give Away Address")
    }
    else {
      await contract.methods.giveAway(giveAwayAddress).send({ from: String(user) }, (err) => {
        if (err !== undefined) {
          console.log(err, 'err')
        }
      })
    }
  }

  const setMerkleTreeRootPresale = async (e) => {
    e.preventDefault()
    if (newRootHashPresale.length === 0) {
      toast.warn("Please Enter Merkle Tree Root")
    }
    else {
      await contract.methods.setMerkleTreeRootPresale(newRootHashPresale).send({ from: String(user) }, (err) => {
        if (err !== undefined) {
          console.log(err, 'err')
        }
      })
    }
  }

  const setMerkleTreeRootFreeMint = async (e) => {
    e.preventDefault()
    if (newRootHashFreeMint.length === 0) {
      toast.warn("Please Enter Merkle Tree Root")
    }
    else {
      await contract.methods.setMerkleTreeRootFreeMint(newRootHashFreeMint).send({ from: String(user) }, (err) => {
        if (err !== undefined) {
          console.log(err, 'err')
        }
      })
    }
  }

  if (user.length === 0 || owner != user) {
    return (
      <div id='admin-x' className='container-fluid d-flex align-items-center justify-content-center admin-false' >
      </div>
    )
  }

  return (
    <div id='admin' className='container-fluid admin-true'  >
      <div className='row justify-content-center mt-4 pt-3'>
        {/* admin mint */}
        <div className='container-fluid mx-0 pb-5'>
          <h1 className="admin-mint-heading display-6 text-center text-white pt-1">MINT BY ADMIN</h1>
          <div className='d-flex justify-content-center'>
            <div className='d-flex flex-column admin-mint-opt align-items-center'>
              <div>
                {/* <p className='text-white text-center mb-0 admin-mint-info'>mint by only paying gas fees</p> */}
                <div className='d-flex justify-content-between pt-4'>
                  <button type="button" onClick={e => decreaseMint(e)} className="btn operator">-</button>
                  <p className='text-white admin-mint-value mb-0'>{mint}</p>
                  <button type="button" onClick={e => increaseMint(e)} className="btn operator">+</button>
                </div>
                <button type="button" onClick={adminMintNfts} className="btn admin-mint-btn mt-1">MINT</button>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-7' >
          <div className="input-group mb-3 px-4">
            <ContractInput
              value={newRootHashPresale}
              placeholder='Enter Merkle Tree Root Pre Sale'
              setValue={setNewRootHashPresale}
              onClick={setMerkleTreeRootPresale}
              text='Set Presale Root'
            />
          </div>
          <div className="input-group mb-3 px-4">
            <ContractInput
              value={newRootHashFreeMint}
              placeholder='Enter Merkle Tree Root Free Mint'
              setValue={setNewRootHashFreeMint}
              onClick={setMerkleTreeRootFreeMint}
              text='Set Free Mint Root'
            />
          </div>
          <div className="input-group mb-3 px-4">
            <ContractInput
              value={baseURI}
              setValue={setBaseURI}
              placeholder='Base URI'
              onClick={setBaseUriContract}
              text='Update Base URI'
            />
          </div>
          <div className="input-group mb-3 px-4">
            <ContractInput
              value={preSaleValue}
              placeholder='Pre Sale Value in Eth'
              setValue={setPreSaleValue}
              onClick={setPreSaleCostAdmin}
              text='Set Pre Sale Price'
            />
          </div>
          <div className="input-group mb-3 px-4">
            <ContractInput
              value={publicSaleValue}
              setValue={setPublicSaleValue}
              placeholder='Public Sale Value in Eth'
              onClick={setPublicSaleCostAdmin}
              text='Set Public Sale Price'
            />
          </div>
          <div className="input-group mb-3 px-4">
            <ContractInput
              value={unRevealedURIValue}
              placeholder='UnRevealed URI'
              setValue={setUnRevealedURIValue}
              onClick={updateUnRevealedURIContract}
              text='Set Unrevealed URI'
            />
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <div className="input-group mb-3 px-4">
                <select className="form-select select-bg mr-2" id="inputGroupSelect03"
                  aria-label="Example select with button addon" value={pauseValue} onChange={e => setPauseValue(e.target.value)} >
                  <option value={'true'} >true</option>
                  <option value={"false"} >false</option>
                </select>
                <button className="btn btns" type="button"
                  id="button-addon2" onClick={pauseContract} >Set Paused</button>
              </div>
              <div className="input-group mb-3 px-4">
                <select className="form-select select-bg mr-2" value={revealValue} onChange={e => setRevealValue(e.target.value)}
                  id="inputGroupSelect03" aria-label="Example select with button addon">
                  <option value={"true"} >true</option>
                  <option value={"false"} >false</option>
                </select>
                <button className="btn btns" type="button"
                  id="button-addon2" onClick={setRevealUriContract}>Set Revealed</button>
              </div>
              <div className="input-group mb-3 px-4">
                <select className="form-select select-bg mr-2" id="inputGroupSelect03"
                  aria-label="Example select with button addon" value={freesaleActive} onChange={e => setFreesaleActive(e.target.value)} >
                  <option value={"true"} >true</option>
                  <option value={"false"} >false</option>
                </select>
                <button className="btn btns" type="button"
                  id="button-addon2" onClick={setFreeMintActive} >Set Free Mint Active</button>
              </div>
              <div className="input-group mb-3 px-4">
                <select className="form-select select-bg mr-2" value={presaleActive} onChange={e => setPresaleActive(e.target.value)}
                  id="inputGroupSelect03" aria-label="Example select with button addon">
                  <option value={"true"} >true</option>
                  <option value={"false"} >false</option>
                </select>
                <button className="btn btns" type="button"
                  id="button-addon2" onClick={setPreSaleMintActive}>Set Presale Active</button>
              </div>
            </div>
            <div className='col-md-6'>
              <div className="input-group mb-3 px-4">
                <ContractInput
                  value={newMaxMintPerWallet}
                  placeholder='Max Mint Per Wallet'
                  setValue={setNewMaxMintPerWallet}
                  onClick={updateMaxMintWallet}
                  text='Set Max Mint Per Wallet'
                />
              </div>
              <div className="input-group mb-3 px-4">
                <ContractInput
                  value={giveAwayAddress}
                  placeholder='Enter Giveaway Address'
                  setValue={setGiveAwayAddress}
                  onClick={giveAway}
                  text='Give Away Nft'
                />
              </div>
              <div className="input-group mb-3 px-4">
                <div className="input-group mb-3">
                  <select className="form-select select-bg mr-2" value={publicsaleActive} onChange={e => setPublicsaleActive(e.target.value)}
                    id="inputGroupSelect03" aria-label="Example select with button addon">
                    <option value={"true"} >true</option>
                    <option value={"false"} >false</option>
                  </select>
                  <button className="btn btns" type="button"
                    id="button-addon2" onClick={setPublicMintActive}>Set Public Sale Active</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-5 right-sec row'>
          <div className='row' >
            <div className="input-group mb-1 text-white left-content">
              <ContractValue title='Merkle Tree Root Presale :' value={String(currentRootHashPresale)} />
            </div>
            <div className="input-group mb-1 text-white left-content">
              <ContractValue title='Merkle Tree Root Free Mint :' value={String(currentRootHashFreeMint)} />
            </div>
            <div className="input-group mb-1 text-white left-content">
              <ContractValue title='Base Uri :' value={String(baseURIValue)} />
            </div>
            <div className="input-group mb-1 text-white left-content">
              <ContractValue title='UnRevealed URI :' value={String(unRevealedURI)} />
            </div>
          </div>
          <div className='row' >
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <div className="input-group mb-1 text-white left-content">
                <ContractValue title='Revealed :' value={String(isRevealed)} />
              </div>
              <div className="input-group mb-1 text-white left-content">
                <ContractValue title='Paused :' value={String(isPaused)} />
              </div>
              <div className="input-group mb-1 text-white left-content">
                <ContractValue title='Public Sale Cost' value={String(publicSaleCost)} />
              </div>
              <div className="input-group mb-1 text-white left-content">
                <ContractValue title='Pre Sale Cost' value={String(preSaleCost)} />
              </div>
              <div className="input-group mb-1 text-white left-content">
                <p className="static-data data-heading left-content"
                  id="button-addon2">Total Minted : <span className='total-minted-value'>{totalMinted}</span>
                </p>
              </div>

            </div>
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <div className="input-group mb-1 text-white right-content">
                <ContractValue title='Max Mint Wallet :' value={String(currentMaxMintPerWallet)} />
              </div>
              <div className="input-group mb-1 text-white right-content">
                <ContractValue title='Free Mint Active :' value={String(freesaleActiveValue)} />
              </div>
              <div className="input-group mb-1 text-white right-content">
                <ContractValue title='Public Mint Active :' value={String(publicsaleActiveValue)} />
              </div>
              <div className="input-group mb-1 text-white right-content">
                <ContractValue title='Presale Mint Active :' value={String(presaleActiveValue)} />
              </div>
            </div>
          </div>
          <div className='btn-grp' >
            <div className="input-group mb-4">
              <button onClick={withdraw} className="btn withdraw-btn" type="button"
                id="button-addon2">Withdraw</button>
            </div>
            <div className="input-group mb-4">
              <button className="btn reload-btn" onClick={e => {
                e.preventDefault()
                window.location.reload()
              }} type="button"
                id="button-addon2">Reload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContractValue = ({ title, value }) => {
  return (
    <>
      {
        value == undefined || value == null ?
          <>
            <p className="mr-2 static-data data-heading"
              id="button-addon2 ">{title}</p>
            <p className='break static-data' >Undefined</p>
          </> :
          value.length == 0 ?
            <>
              <p className="mr-2 static-data data-heading"
                id="button-addon2 ">{title}</p>
              <p className='break static-data' >Empty</p>
            </>
            :
            value.length > 0 ?
              <>
                <p className="mr-2 static-data data-heading"
                  id="button-addon2 ">{title}</p>
                <p className='break static-data' >{String(value)}</p>
              </> :
              <Spinner className="spinner-border-sm my-2" animation="border" role="status" />
      }
    </>
  )
}

const ContractInput = ({ value, setValue, text, onClick, placeholder }) => {
  return (
    <>
      <input value={value} onChange={e => { setValue(e.target.value) }} type="text" className="form-control input-bg mr-2" placeholder={placeholder}
        aria-label="Pre Sale Price" aria-describedby="button-addon2" />
      <button onClick={onClick} className="btn btns" type="button"
        id="button-addon2">{text}</button>
    </>
  )
}

export default Admin
