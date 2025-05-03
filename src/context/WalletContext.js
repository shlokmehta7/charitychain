import { createContext, useState, useEffect } from "react";
import { connectContract } from "../utils/connectWallet";

export const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("wallet");
    if (saved) setWallet(saved);
  }, []);

  const connect = async () => {
    const { signer } = await connectContract();
    const address = await signer.getAddress();
    setWallet(address);
    localStorage.setItem("wallet", address);
  };

  const disconnect = () => {
    setWallet("");
    localStorage.removeItem("wallet");
  };

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}
