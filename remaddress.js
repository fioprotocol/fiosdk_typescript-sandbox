// Remove Mapped Public Address Action
var action = 'remaddress'
var contract = 'fio.address'

const {FIOSDK} = require('@fioprotocol/fiosdk')
var fetch = require('node-fetch')
const fetchJson = async (uri, opts = {}) => {
  return fetch(uri, opts)
}

// EDIT this section then type node remaddress.js in Terminal to run
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
  public_addresses: [
    {
      chain_code: 'ETH',
      token_code: 'ETH',
      public_address: '0xab5801a7d398351b8be11c439e05c5b3259aec9b'
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
