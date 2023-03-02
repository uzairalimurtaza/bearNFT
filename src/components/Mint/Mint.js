import React from 'react'
import { toast } from 'react-toastify';
import Web3 from 'web3';
import KarmaBear from '../../artifacts/KarmaBears.json'
import { contract, getAddress } from '../../utils/contractUtils';
import { getProofPresale, getProofFreeMint } from '../../utils/merkleUtil';
import detectEthereumProvider from '@metamask/detect-provider'
import { motion } from "framer-motion"
import keccak256 from 'keccak256'
import merkle from '../../artifacts/WhiteListUsers.json'
import './Mint.css'

const Mint = () => {

	const [mint, setMint] = React.useState(0)
	const [user, setUser] = React.useState('')

	let web3 = new Web3(Web3.givenProvider || 'https://rinkeby.infura.io/v3/8f7bb415bf7b4dceb66c27ceea3bfb64', 'web3');

	React.useEffect(() => {
		getUser()
	}, [])

	const getUser = async (e) => {
		setUser(await getAddress())
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
					var shortAddress = address.substring(0, 6) + '...' +
						address.substring(address.length - 4, address.length);
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

	// console.log(user)
	const mintNfts = async (e) => {
		e.preventDefault()
		if (await web3.eth.net.getId() !== 1) {
			toast.warn('You Need to be on Ethereum Mainnet')
		}
		else if (mint === 0) {
			toast.warn('Mint Amount is Zero')
		}
		else if (await contract.methods.isFreeMintActive().call()) {
			// console.log('here1')
			if (mint > 1) {
				toast.warn('Mint Amount can Only be 1')
			} else {
				let index = merkle.whitelistAddressesFreeMint.findIndex(item => item == String(user))
				const leafNodes = merkle.whitelistAddressesFreeMint.map(addr => keccak256(addr));
				if (index === -1) {
					toast.error('You Are Not White Listed')
					return
				}
				let proof = getProofFreeMint(leafNodes[index])
				await contract.methods.freeSaleMint(proof).send({ from: String(user) }, (err) => {
					if (err !== undefined) {
						console.log(err, 'err')
					}
				})
			}
		}
		else if (await contract.methods.isPresaleActive().call()) {
			// console.log('here2')
			let index = merkle.whitelistAddressesPresale.findIndex(item => item == String(user))
			const leafNodes = merkle.whitelistAddressesPresale.map(addr => keccak256(addr));
			// console.log(index,'dasda')
			if (index === -1) {
				toast.error('You Are Not White Listed')
				return
			}
			let proof = getProofPresale(leafNodes[index])
			console.log(proof,'lol')
			await contract.methods.preSaleMint(mint, proof).send({
				from: String(user),
				value: web3.utils.toBN(await contract.methods.preSaleCost().call()) * mint
			}, (err) => {
				if (err !== undefined) {
					console.log(err, 'err')
				}
			})
		}
		else if (await contract.methods.isPublicMintActive().call()) {
			// console.log('here3')
			console.log(await contract.methods.publicSaleCost().call(), 'val')
			await contract.methods.publicSaleMint(Number(mint)).send({
				from: String(user),
				value: web3.utils.toBN(await contract.methods.publicSaleCost().call()) * mint
			}, (err) => {
				if (err !== undefined) {
					console.log(err, 'err')
				}
			})
		}
	}

	const increaseMint = () => {
		setMint(mint + 1)
	}

	const decreaseMint = () => {
		if (mint === 0) {
			setMint(0)
		} else {
			setMint(mint - 1)
		}
	}

	const bounceTransition = {
		y: {
			duration: .4,
			repeat: 3,
			repeatType: 'reverse',
			ease: "easeOut"
		}
	};

	return (
		<div id='mint' className='container-fluid mx-0'>
			<div className='mint-div'>
				<img alt='logo' className='logo' src={'./assets/n-logo.png'} />
				<motion.img
					transition={bounceTransition}
					// animate={{
					//     y: ["10%", "0%"],
					// }}
					whileTap={{
						y: ["-40%", "50%"],
					}}
					className='mint-bear'
					src={'./assets/mint-bear.png'} />
				<div className=''>
					{
						String(user).length > 0 ?
							<div className='text-center'>
								<div className='d-flex justify-content-between pt-1'>
									<button type="button" onClick={e => decreaseMint(e)} className="btn operator">-</button>
									<p className='text-white mint-value mb-0'>{mint}</p>
									<button type="button" onClick={e => increaseMint(e)} className="btn operator">+</button>
								</div>
								<button type="button" onClick={e => mintNfts(e)} className="btn mint-btn mt-1">MINT</button>
							</div> :
							<div className='d-flex justify-content-center flex-column'>
								<p className='text-center text-white'>MetaMask is not Connected</p>
								<button type="submit" onClick={loginWithMetaMask} href="/mint" className="cust-nav-link button w-cust-nav-link" style={{ maxWidth: '1400px' }}>Connect</button>
							</div>
					}
				</div>
			</div>
		</div>
	)
}

export default Mint
