import { ethers } from "ethers";
import { connectContract } from "./connectWallet";

// ✅ Fetch all campaigns from blockchain
export async function getAllCampaigns() {
  const { contract } = await connectContract();
  const count = await contract.campaignCount();
  const campaigns = [];

  for (let i = 1; i <= count; i++) {
    const data = await contract.getCampaignDetails(i);
    campaigns.push({
      id: data.id.toString(),
      creator: data.creator,
      description: data.description,
      goalAmount: ethers.utils.formatEther(data.goalAmount),
      totalDonated: ethers.utils.formatEther(data.totalDonated),
      goalReached: data.goalReached,
      fundsWithdrawn: data.fundsWithdrawn
    });
  }

  return campaigns;
}

// ✅ Fetch total donations by a user
export async function getUserTotalDonations(address) {
  const { contract } = await connectContract();
  const value = await contract.getTotalDonationsByUser(address);
  return ethers.utils.formatEther(value); // converts from wei to BNB
}

export async function createCampaign(description, goalInEth) {
  const { contract } = await connectContract();
  const goal = ethers.utils.parseEther(goalInEth); // BNB → wei
  const tx = await contract.createCampaign(description, goal);
  await tx.wait();
}

export async function getCampaignDetails(campaignId) {
  const { contract } = await connectContract();
  const data = await contract.getCampaignDetails(campaignId);

  return {
    id: data.id.toString(),
    creator: data.creator,
    description: data.description,
    goalAmount: ethers.utils.formatEther(data.goalAmount),
    totalDonated: ethers.utils.formatEther(data.totalDonated),
    goalReached: data.goalReached,
    fundsWithdrawn: data.fundsWithdrawn
  };
}

export async function donateToCampaign(campaignId, amountInEth) {
  const { contract } = await connectContract();
  const amount = ethers.utils.parseEther(amountInEth);
  const tx = await contract.donateToCampaign(campaignId, { value: amount });
  await tx.wait();
}

export async function withdrawFunds(campaignId) {
  const { contract } = await connectContract();
  const tx = await contract.withdrawFunds(campaignId);
  await tx.wait();
}