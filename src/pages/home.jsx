import React, { useEffect, useState } from "react";
import { BuyToken, CreateTrustlineForToken, GetTokenBalance } from "../components/soroban";
import { ClipLoader } from "react-spinners"; 
import { toast } from "react-toastify";

export const HomePage = () => {
  const JXoFTokenAddress = import.meta.env.VITE_JXoFTokenAddress;
  const JXaFTokenAddress = import.meta.env.VITE_JXaFTokenAddress;
  const publicKey = sessionStorage.getItem("publicKey");

  const [jxofBalance, setJxofBalance] = useState(0);
  const [jxafBalance, setJxafBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (publicKey) {
      getBalances();
    }
  }, [publicKey]);

  const getBalances = async () => {
    setIsLoading(true);
    try {
      const xofBalance = await GetTokenBalance(JXoFTokenAddress, publicKey);
      setJxofBalance(xofBalance);
      const xafBalance = await GetTokenBalance(JXaFTokenAddress, publicKey);
      setJxafBalance(xafBalance);
    } catch (error) {
      console.error("Failed to fetch balances:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buyJXoF = async () => {
    setIsLoading(true);
    try {
      await BuyToken("JXoF", publicKey);
      await getBalances();
      toast.success("JXoF has been sent to your wallet")
    } catch (error) {
      console.error("Failed to buy JXoF:", error);
      toast.error("Failed to get tokens")
    } finally {
      setIsLoading(false);
    }
  };

  const buyJXaF = async () => {
    setIsLoading(true);
    try {
      await BuyToken("JXaF", publicKey);
      await getBalances();
      toast.success("JXaF has been sent to your wallet")
    } catch (error) {
      console.error("Failed to buy JXaF:", error);
      toast.error("Failed to get tokens")
    } finally {
      setIsLoading(false);
    }
  };

  const createTrusline = async (token) => {
    await CreateTrustlineForToken(token, publicKey)
    await getBalances()
  }

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ClipLoader color="#3498db" size={75} />
        </div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-500">
          Welcome to MyDEX
        </h1>
        <p className="text-lg md:text-xl mb-4">
          The most secure and efficient decentralized exchange.
        </p>
        <p className="text-lg md:text-lg mb-8 px-2 text-orange-500 font-bold">
          Since this is on testnet, you can request 1000 JXoF / JXaF tokens to
          use. Connect your wallet and click the buttons below.
        </p>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {publicKey ? (
            <>
              <button
                onClick={() => buyJXoF()}
                className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
              >
                Buy JXoF
              </button>
              <button
                onClick={() => buyJXaF()}
                className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
              >
                Buy JXaF
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-gray-400 px-6 py-3 rounded cursor-not-allowed"
                disabled
              >
                Buy JXoF
              </button>
              <button
                className="bg-gray-400 px-6 py-3 rounded cursor-not-allowed"
                disabled
              >
                Buy JXaF
              </button>
            </>
          )}
        </div>
      </div>

      {/* Balance Section */}
      {publicKey && (
        <div className="py-12 bg-gray-700">
          <div className="max-w-4xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="bg-gray-900 p-6 rounded shadow-lg">
              <h2 className="text-3xl font-bold text-blue-400">JXoF Balance</h2>
              {jxofBalance !== undefined ? (<>
                <p className="text-white mt-4 text-2xl">{jxofBalance} JXoF</p>
              </>) : (<>
                <button
                  onClick={() => createTrusline("JXoF")}
                  className="bg-green-600 px-6 py-3 rounded hover:bg-blue-500"
                >
                  Create trutline for JXoF
                </button>
              </>)}
            </div>
            <div className="bg-gray-900 p-6 rounded shadow-lg">
              <h2 className="text-3xl font-bold text-blue-400">JXaF Balance</h2>
              {jxafBalance !== undefined ? (<>
                <p className="text-white mt-4 text-2xl">{jxafBalance} JXaF</p>
              </>) : (<>
                <button
                  onClick={() => createTrusline("JXaF")}
                  className="bg-green-600 px-6 py-3 rounded hover:bg-blue-500"
                >
                  Create trutline for JXaF
                </button>
              </>)}
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      <div className="py-16 bg-gray-700">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-900 p-6 rounded shadow-lg hover:scale-105 transform transition">
            <h2 className="text-3xl font-bold text-blue-400">24h Volume</h2>
            <p className="text-white mt-4 text-2xl">$12M</p>
          </div>
          <div className="bg-gray-900 p-6 rounded shadow-lg hover:scale-105 transform transition">
            <h2 className="text-3xl font-bold text-blue-400">Total Liquidity</h2>
            <p className="text-white mt-4 text-2xl">$45M</p>
          </div>
          <div className="bg-gray-900 p-6 rounded shadow-lg hover:scale-105 transform transition">
            <h2 className="text-3xl font-bold text-blue-400">Active Users</h2>
            <p className="text-white mt-4 text-2xl">1500+</p>
          </div>
        </div>
      </div>
    </div>
  );
};
