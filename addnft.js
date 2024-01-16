// Map NFT Action
var action = 'addnft'
var contract = 'fio.address'

const {FIOSDK} = require('@fioprotocol/fiosdk')
var fetch = require('node-fetch')
const fetchJson = async (uri, opts = {}) => {
  return fetch(uri, opts)
}

// EDIT this section then type node addnft.js in Terminal to run
// API endpoint, see https://github.com/fioprotocol/fio.mainnet for complete list
const apiNode = 'https://test.fio.eosusa.io/v1/' 
// FIO Chain Testnet private key. Get one from http://monitor.testnet.fioprotocol.io:3000/#createKey
// and then add tokens via faucet: http://monitor.testnet.fioprotocol.io:3000/#faucet
const privateKey = '5K9du1JcEVNyBZKU6Uc9bSihgUzmMvGUxPDRwyxVmo9Xuh2NNW3'
const publicKey = FIOSDK.derivedPublicKey(privateKey).publicKey
const account = FIOSDK.accountHash(publicKey).accountnm
// Action parameters
var actionData = 
{
  fio_address: 'user10006@regtest',
  nfts: [
    {
      chain_code: 'ETH',
      contract_address: '0x63c0691d05f441f42915ca6ca0a6f60d8ce148cd',
      token_id: '100010001',
      url: 'ipfs://ipfs/QmZ15eQX8FPjfrtdX3QYbrhZxJpbLpvDpsgb2p3VEH8Bqq',
      hash: 'f83b5702557b1ee76d966c6bf92ae0d038cd176aaf36f86a18e2ab59e6aefa4b',
      metadata: ''
    }    
    ],
  max_fee: 10000000000000,
  tpid: '',
  actor: account
}

// Push transaction
const main = async () => {
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
    console.log('Fields: ', err.json.fields)
  }
}

main();
