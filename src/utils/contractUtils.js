import Web3 from 'web3';
import KarmaBear from '../artifacts/KarmaBears.json'

export const web3Instance = new Web3(Web3.givenProvider,'web3');

export const getAddress = async () => {
    let acc = await web3Instance.eth.getAccounts();
    if(acc[0] !== undefined ) {
        return acc[0]
    }
    else if(acc[0] === undefined) {
        return ''
    }
}

export const contract = new web3Instance.eth.Contract(KarmaBear.abi,
    '0xa127343d70A14f64A72Cbd286c901454a422B1A2')  
    

export const getPaused = async () =>  { 
    return await contract.methods.isPaused().call()
}

export const getRevealed = async () =>  { 
    return await contract.methods.isRevealed().call()
}

export const getOwner = async () => {
    return await contract.methods.owner().call()
}

export const getMerkleTreeRootPresale = async () => {
    return await contract.methods.merkleTreeRootPresale().call()
}

export const getMerkleTreeRoot = async () => {
    return await contract.methods.merkleTreeRootPresale().call()
}

export const getPublicSaleCost = async () =>  { 
    return web3Instance.utils.fromWei(await contract.methods.publicSaleCost().call(), 'ether') 
}

export const getPreSaleCost = async () =>  { 
    return web3Instance.utils.fromWei(await contract.methods.preSaleCost().call(), 'ether') 
}

export const getMaxMintPerWallet = async () =>  { 
    // console.log(contract.methods.maxMintPerWallet().call(),'casdasdasd')
    return contract.methods.maxMintPerWallet().call() 
}

export const getTotalMinted = async () =>  { 
    console.log(await contract.methods.totalMinted().call())
    return Number(await contract.methods.totalMinted().call())
}

export const setPauseContract = async (value,address) =>  { 
    return await contract.methods.setPaused(Boolean(value)).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const setMerkleRoot = async (value,address) =>  { 
    return await contract.methods.setMerkleTreeRoot(value).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const setRevealContract = async (value,address) =>  { 
    return await contract.methods.setRevealed(value).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const setMaxMintPerWallet = async (value,address) =>  { 
    return await contract.methods.setMaxMintPerWallet(Number(value)).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const setPreSaleCostContract = async (value,address) =>  { 
    return await contract.methods.setPresaleCost(value).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}
export const setPublicSaleCostContract = async (value,address) =>  { 
    return await contract.methods.setPublicSaleCost(value).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const setBaseUri = async (uri,address) =>  { 
    return await contract.methods.setBaseURI(uri).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const setIsPresaleActive = async (value,address) =>  { 
    return await contract.methods.setPresaleMint(Boolean(value)).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const setIsFreeMintActive= async (value,address) =>  { 
    console.log(Boolean(value),'is freee')
    await contract.methods.setFreeSaleMint(Boolean(value)).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const setIsPublicMintActive = async (value,address) =>  { 
    return await contract.methods.setPublicSaleMint(Boolean(value)).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const getBaseUri = async () =>  { 
    return await contract.methods.baseURI().call()
}

export const withdrawBalance = async (address) =>  { 
    return await contract.methods.withdraw().send({from: String(address)})
}

export const mintByAdmin = async (quantity,address) =>  { 
    return await contract.methods.adminMint(quantity).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const freeMint = async (quantity,address) =>  { 
    return await contract.methods.freeSaleMint(quantity).send({from: String(address)},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const setUnRevealedURIAdmin = async (uri,address) =>  { 
    return await contract.methods.setNotRevealedURI(uri).send({from: String(address),value:''},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}

export const getUnRevealedURI = async () =>  { 
    return await contract.methods.notRevealedUri().call()
}

export const getIsPresaleActive = async () =>  { 
    return await contract.methods.isPresaleActive().call()
}

export const getIsFreeMintActive = async () =>  {
    console.log(await contract.methods.isFreeMintActive().call(),'freee mint') 
    return await contract.methods.isFreeMintActive().call()
}

export const getIsPublicMintActive = async () =>  { 
    return await contract.methods.isPublicMintActive().call()
}

export const giveAwayNFT = async (giveAwayAddress,adminAddress) =>  {
    console.log(giveAwayAddress,adminAddress) 
    return await contract.methods.giveAway(giveAwayAddress).send({from:adminAddress},(err)=>{
        if(err !== undefined){
            console.log(err,'err')
        }
    })
}


