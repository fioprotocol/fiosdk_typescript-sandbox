// Register FIO Handle Action (regaddress)
// Edit this file then type node regaddress.js in Terminal to run

// API endpoint, see https://github.com/fioprotocol/fio.mainnet for complete list
const apiNode = 'https://fiotestnet.blockpane.com/v1/' 
// FIO Chain Testnet private key. Get one from http://monitor.testnet.fioprotocol.io:3000/#createKey
// and then add tokens via faucet: http://monitor.testnet.fioprotocol.io:3000/#faucet
const privateKey = '5HpJPnQmpbnTxaJbTEcMDj51DSbTW6hzQ41h1L4XcxXW83AX9Vw'



const {FIOSDK} = require('@fioprotocol/fiosdk')
var fetch = require('node-fetch')
const fetchJson = async (uri, opts = {}) => {
  return fetch(uri, opts)
}

// Get from http://monitor.testnet.fioprotocol.io:3000/#createKey and then faucet to add tokens: http://monitor.testnet.fioprotocol.io:3000/#faucet
const privateKey = '5HpJPnQmpbnTxaJbTEcMDj51DSbTW6hzQ41h1L4XcxXW83AX9Vw'

// Use regtest domain on Testnet
const fioHandle = 'username123456789999@regtest'

const publicKey = FIOSDK.derivedPublicKey(privateKey).publicKey
const account = FIOSDK.accountHash(publicKey).accountnm

var action = 'regaddress'
var contract = 'fio.address'
var actionData = 
{
  fio_address: fioHandle,
  owner_fio_public_key: '',
  max_fee: 10000000000000,
  tpid: '',
  actor: account
}

const regaddress = async () => {
  user = new FIOSDK(
    privateKey,
    publicKey,
    apiNode,
    fetchJson
  )
  try {
    const result = await user.genericAction('pushTransaction', {
      action: action,
      account: contract,
      data: actionData
    })
    console.log('Result: ', result)
  } catch (err) {
    console.log('Error: ', err)
  }
}

regaddress();
