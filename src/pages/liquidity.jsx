import React, { useEffect, useState } from "react";
import { BuyToken, CreateTrustlineForToken, ExhangeTokens, GetTokenBalance, LoadTokenIntoContract, SwapTokens } from "../components/soroban";
import { ClipLoader } from "react-spinners"; // npm install react-spinners
import { toast } from "react-toastify";

export const LiquidityPage = () => {
  const [jxofBalance, setJxofBalance] = useState("0");
  const [jxafBalance, setJxafBalance] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  const JXoFTokenAddress = import.meta.env.VITE_JXoFTokenAddress;
  const JXaFTokenAddress = import.meta.env.VITE_JXaFTokenAddress;
  const publicKey = sessionStorage.getItem("publicKey");
  const contractAddress = import.meta.env.VITE_CONTRACT_ID

  useEffect(() => {
    if (publicKey !== "") {
      getBalances();
    }
  }, [publicKey]);

  const getBalances = async () => {
    console.log("contractAddress", contractAddress)
    setIsLoading(true);
    try {
      const xofBalance = await GetTokenBalance(JXoFTokenAddress, contractAddress);
      setJxofBalance(xofBalance);
      const xafBalance = await GetTokenBalance(JXaFTokenAddress, contractAddress);
      setJxafBalance(xafBalance);
    } catch (error) {
      console.error("Error fetching balances:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const AddLP = async (token) => {
    setIsLoading(true);
    try {
      await LoadTokenIntoContract(token, contractAddress);
      // await getBalances();
      toast.success("LP added successfully")
    } catch (error) {
      console.error("Failed to add LP:", error);
      toast.error("Failed to add LP")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
    //   {/* Loader */}
    //   {isLoading && (
    //     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    //       <ClipLoader color="#3498db" size={75} />
    //     </div>
    //   )}

    //   {/* Balances Section */}
    //   <div className="bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-md mb-8">
    //     <h2 className="text-2xl font-bold text-center mb-4">Your contract Asset Balances </h2>
    //     <div className="flex justify-between items-center text-lg mb-2">
    //       <span className="text-blue-400">JXoF Balance:</span>
    //       <span>{jxofBalance} JXoF</span>
    //     </div>
    //     <div className="flex justify-between items-center text-lg">
    //       <span className="text-blue-400">JXaF Balance:</span>
    //       <span>{jxafBalance} JXaF</span>
    //     </div>
    //   </div>

    //   {/* Swap Form */}
    //   <div className="bg-gray-800 rounded-lg shadow-md p-8 w-full max-w-md">
    //     <h1 className="text-2xl font-bold text-center mb-6">Add Liquidity to the contract</h1>
    //     <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
    //       {publicKey ? (
    //         <>
    //           <button
    //             onClick={() => AddLP("JXoF")}
    //             className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
    //           >
    //             Add JXoF LP
    //           </button>
    //           <button
    //             onClick={() => AddLP("JXaF")}
    //             className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-500"
    //           >
    //             Add JXaF LP
    //           </button>
    //         </>
    //       ) : (
    //         <>
    //           <button
    //             className="bg-gray-400 px-6 py-3 rounded cursor-not-allowed"
    //             disabled
    //           >
    //             Add JXoF LP
    //           </button>
    //           <button
    //             className="bg-gray-400 px-6 py-3 rounded cursor-not-allowed"
    //             disabled
    //           >
    //             Add JXaF LP
    //           </button>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <>
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <p>Liquidity page</p>
    </div>
    </>
  );
};


