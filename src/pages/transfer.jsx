import React, { useEffect, useState } from "react";
import { BuyToken, CreateTrustlineForToken, ExhangeTokens, GetTokenBalance, SendSameTokenToUser, SwapTokens } from "../components/soroban";
import { ClipLoader } from "react-spinners"; // npm install react-spinners
import { toast } from "react-toastify";

export const TransferPage = () => {
  const [fromToken, setFromToken] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [jxofBalance, setJxofBalance] = useState("0");
  const [jxafBalance, setJxafBalance] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const JXoFTokenAddress = import.meta.env.VITE_JXoFTokenAddress;
  const JXaFTokenAddress = import.meta.env.VITE_JXaFTokenAddress;
  const publicKey = sessionStorage.getItem("publicKey");

  useEffect(() => {
    if (publicKey !== "") {
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
      console.error("Error fetching balances:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrasfer = async () => {
    setIsLoading(true);
    try {
      await SendSameTokenToUser(fromToken, toAddress, publicKey, amount);
      await getBalances();
      toast.success("Transferred succesfully")
      setAmount("")
      setFromToken("")
      setToAddress("")
    } catch (error) {
      console.error("Error swapping tokens:", error);
      toast.error("failed to transfer")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ClipLoader color="#3498db" size={75} />
        </div>
      )}

      {/* Balances Section */}
      <div className="bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-md mb-8">
        <h2 className="text-2xl font-bold text-center mb-4">Your Balances</h2>
        <div className="flex justify-between items-center text-lg mb-2">
          <span className="text-blue-400">JXoF Balance:</span>
          <span>{jxofBalance} JXoF</span>
        </div>
        <div className="flex justify-between items-center text-lg">
          <span className="text-blue-400">JXaF Balance:</span>
          <span>{jxafBalance} JXaF</span>
        </div>
      </div>

      {/* Swap Form */}
      <div className="bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Transfer Tokens</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTrasfer();
          }}
        >
          {/* From Token */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Token</label>
            <select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Token
              </option>
              <option value="JXoF">JXoF</option>
              <option value="JXaf">JXaf</option>
            </select>
          </div>

          {/* To Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Receiver's address</label>
            <input
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="Enter receiver's wallet address"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring focus:ring-blue-500"
              min="0"
            />
          </div>

          {/* Swap Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
