// Record FIO Data Action
var action = 'recordobt'
var contract = 'fio.reqobt'

const {FIOSDK} = require('@fioprotocol/fiosdk')
var fetch = require('node-fetch')
const fetchJson = async (uri, opts = {}) => {
  return fetch(uri, opts)
}

// EDIT this section then type node recordobt.js in Terminal to run
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
  payerFioAddress: 'user10006@regtest',
  payeeFioAddress: 'vitalik@safu',
  payeeTokenPublicAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  amount: 1,
  chainCode: 'ETH',
  tokenCode: 'USDT',
  status: 'sent_to_blockchain',
  obtId: '0x5b48f0c340e70e63c011ca41495ff423b9a4fe6975c58df0f066d80fe4d2dcca',
  memo: 'Invoice 1',
  maxFee: 10000000000000,
  payeeFioPublicKey: 'FIO7AVsNbLMeZgwjmWFApABUTme41evUBBffjdQGXRzt3Ddq6ZBMx',
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
    const result = await user.genericAction('recordObtData', actionData)
    console.log('Result: ', result)
  } catch (err) {
    console.log('Error: ', err)
    console.log('Fields: ', err.json.fields)
  }
}

main();
