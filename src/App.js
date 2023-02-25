import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useState } from "react";
import "./App.css";
function App() {
  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')

  const sendTxn = async () => {
    if (!address) {
      alert('Enter Address')
      return
    }

    if (!amount) {
      alert('Enter Amount')
      return
    }

    const txn = {
      messages: [
        {
          address: address,
          amount: amount
        }
      ]
    }

    try {
      const result = await tonConnectUI.sendTransaction(txn, {
        modals: ['before', 'success', 'error'],
        notifications: ['before', 'success', 'error']
      });

      /*       // you can use signed boc to find the transaction 
            const someTxData = await myAppExplorerService.getTransaction(result.boc);
            alert('Transaction was sent successfully', someTxData);
       */
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="App">
      <header className="App-header">

        <TonConnectButton />
        <div>
          {wallet && (
            <div>
              <span>Connected wallet: {wallet.name}</span><br />
              <span>Device: {wallet.device.appName}</span><br />
              <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Receiver Address' /> <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' /> <button onClick={sendTxn}>Send Txn</button>
            </div>
          )}
        </div>

      </header>
    </div>
  );
}

export default App;
