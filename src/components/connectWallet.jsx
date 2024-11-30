import {
    FreighterModule,
    StellarWalletsKit,
    WalletNetwork,
    ALBEDO_ID,
    AlbedoModule
  } from '@creit.tech/stellar-wallets-kit';
import { useState } from 'react';

export const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: ALBEDO_ID,
  modules: [
      new AlbedoModule(),
      new FreighterModule(),
  ]
});

  export const ConnectWallet = ({setPublicKey}) => {
    const [connectedWallet, setConnectedWallet] = useState(sessionStorage.getItem("publicKey"))
    const connect = async () => {
        await kit.openModal({
            onWalletSelected: async (option) => {
              kit.setWallet(option.id);
              const { address } = await kit.getAddress();
              setPublicKey(address)
              setConnectedWallet(address)
              sessionStorage.setItem("kit", kit)
              window.location.reload()
            }
          });
    }

    const onDisConnect = async () => {
      setConnectedWallet("")
      sessionStorage.setItem("publicKey", "")
      window.location.reload()
    }

    return(
        <>
            {connectedWallet === "" || connectedWallet === undefined || connectedWallet === null ? (<>
              <button onClick={() => connect()} className="bg-blue-600 px-4 py-2 rounded hover:bg-green-500">
                Connect Wallet
              </button>
            </>) : (<>
              <button onClick={() => onDisConnect()} className="bg-green-600 px-4 py-2 rounded hover:bg-blue-500">
                Connected ({connectedWallet?.slice(0,3)}...{connectedWallet?.slice(connectedWallet.length-3)})
              </button>
            </>)}
        </>
    )
  }
  
  

