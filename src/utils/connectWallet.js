import { ethers } from "ethers";
import { CONTRACT_ABI } from "./contractABI";
import { CONTRACT_ADDRESS } from "./contractAddress";

export async function connectContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  return { provider, signer, contract };
}
