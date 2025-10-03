import {
  ethers,
  BrowserProvider,
  Contract,
  formatEther,
  parseEther,
  isAddress,
  getAddress,
  Interface,
} from "ethers";

// Example ABI for Freelance Escrow Contract (Stylus-compatible)
export const ESCROW_CONTRACT_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "job_id", type: "uint256" }],
    name: "autoRelease",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "freelancer", type: "address" },
      { internalType: "uint64", name: "duration", type: "uint64" },
    ],
    name: "deposit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "job_id", type: "uint256" }],
    name: "emergencyRefund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveJobs",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "job_id", type: "uint256" }],
    name: "getJob",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint64", name: "", type: "uint64" },
      { internalType: "bool", name: "", type: "bool" },
      { internalType: "bool", name: "", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalJobs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isPaused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "job_id", type: "uint256" }],
    name: "refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "job_id", type: "uint256" }],
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "state", type: "bool" }],
    name: "setPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "new_admin", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

// Contract addresses
export const CONTRACT_ADDRESSES = {
  ESCROW_CONTRACT: "0x0ffaf51ae181a3d20715c4f59d71e3faf6d7a522", // Arbitrum Sepolia
  ESCROW_CONTRACT_MAINNET: "0x0987654321098765432109876543210987654321", // Placeholder
};

// Network configs
export const NETWORK_CONFIG = {
  arbitrumSepolia: {
    chainId: 421614n,
    name: "Arbitrum Sepolia",
    rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc",
    blockExplorer: "https://sepolia.arbiscan.io",
  },
  arbitrumOne: {
    chainId: 42161n,
    name: "Arbitrum One",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    blockExplorer: "https://arbiscan.io",
  },
};

// Smart Contract Service Class
export class EscrowContractService {
  private provider: BrowserProvider | null = null;
  private contract: Contract | null = null;
  private signer: import("ethers").Signer | null = null;

  constructor() {
    // No sync init—handled explicitly
  }

  async initializeProvider() {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        this.provider = new BrowserProvider(window.ethereum);
        await this.provider.send("eth_requestAccounts", []);
        this.signer = await this.provider.getSigner();

        this.contract = new Contract(
          CONTRACT_ADDRESSES.ESCROW_CONTRACT,
          ESCROW_CONTRACT_ABI,
          this.signer
        );

        console.log("[v0] Smart contract initialized successfully");
      } catch (error) {
        console.error("[v0] Failed to initialize provider:", error);
        throw error;
      }
    } else {
      throw new Error("No Ethereum provider found (e.g., MetaMask)");
    }
  }

  // Error translator
  private translateError(error: any): string {
    if (!error) return "An unexpected error occurred. Check your connection.";

    switch (error.code) {
      case "CALL_EXCEPTION":
        if (!error.reason && !error.data) {
          return "The contract rejected the request without details. This often happens if: the contract isn't initialized yet (try 'Initialize Contract' first), it's paused, or the addresses/duration are invalid. Check the Actions tab.";
        }
        if (error.reason?.includes("insufficient funds")) {
          return "Not enough ETH in your wallet for the deposit + gas fees. Add more via a faucet.";
        }
        if (error.reason?.includes("paused")) {
          return "The contract is currently paused. An admin needs to unpause it.";
        }
        if (error.reason?.includes("not initialized")) {
          return "The contract hasn't been set up yet. Call 'Initialize Contract' in the Actions tab.";
        }
        return `Contract error: ${
          error.reason ||
          "Check if inputs are valid (e.g., different addresses, future deadline)."
        }`;

      case "INSUFFICIENT_FUNDS":
        return "Not enough ETH for gas or deposit. Fund your wallet on Arbitrum Sepolia (faucet: https://faucet.sepolia.arbitrum.io).";

      case "NETWORK_ERROR":
        return "Network issue—switch to Arbitrum Sepolia and try again.";

      case "USER_REJECTED_REQUEST":
        return "You canceled the transaction in your wallet. No changes made.";

      case "ACTION_REJECTED":
        return "Wallet rejected the action. Check permissions and retry.";

      default:
        if (error.message?.includes("revert")) {
          return "The smart contract reverted the action. Double-check your inputs (e.g., freelancer address different from yours, amount > 0, deadline in future).";
        }
        return `Blockchain error: ${
          error.shortMessage || error.message
        }. If stuck, check console for details.`;
    }
  }

  async deposit(freelancerAddress: string, duration: number, amount: string) {
    if (!this.contract || !this.signer) {
      throw new Error("Contract not initialized—call initializeProvider first");
    }

    const normalizedFreelancer = getAddress(freelancerAddress);
    if (!isAddress(normalizedFreelancer)) {
      throw new Error("Invalid freelancer address format");
    }

    if (duration <= 0) {
      throw new Error("Duration must be greater than 0");
    }

    if (!amount || parseFloat(amount) <= 0) {
      throw new Error("Amount must be greater than 0");
    }

    try {
      const amountWei = parseEther(amount);

      console.log("[v0] Creating deposit...", {
        freelancer: normalizedFreelancer,
        duration,
        amount: amountWei.toString(),
      });

      // Pre-estimate gas
      const gasEstimate = await this.contract.deposit.estimateGas(
        normalizedFreelancer,
        BigInt(duration),
        { value: amountWei }
      );
      console.log("[v0] Gas estimate OK:", gasEstimate.toString());

      const tx = await this.contract.deposit(
        normalizedFreelancer,
        BigInt(duration),
        {
          value: amountWei,
          gasLimit: (gasEstimate * 120n) / 100n,
        }
      );

      const receipt = await tx.wait();
      console.log("[v0] Deposit tx:", receipt.hash);

      // Parse jobId
      const iface = new Interface(ESCROW_CONTRACT_ABI);
      const log = receipt.logs[0];
      let jobId = "0";
      if (log) {
        try {
          const parsed = iface.parseLog(log);
          if (parsed.name === "EscrowCreated") {
            jobId = parsed.args[0]?.toString() || "0";
          }
        } catch {
          const topic1 = log.topics[1];
          if (topic1) jobId = BigInt(topic1).toString();
        }
      }

      return {
        jobId,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
      };
    } catch (error: any) {
      const userMessage = this.translateError(error);
      console.error("[v0] Deposit failed (technical):", error);
      console.log("[v0] User-friendly:", userMessage);
      const friendlyError = new Error(userMessage);
      friendlyError.cause = error;
      throw friendlyError;
    }
  }

  async release(jobId: string) {
    if (!this.contract) throw new Error("Contract not initialized");
    try {
      const tx = await this.contract.release(BigInt(jobId));
      const receipt = await tx.wait();
      console.log("[v0] Release tx:", receipt.hash);
      return receipt;
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  async autoRelease(jobId: string) {
    if (!this.contract) throw new Error("Contract not initialized");
    try {
      const tx = await this.contract.autoRelease(BigInt(jobId));
      const receipt = await tx.wait();
      console.log("[v0] AutoRelease tx:", receipt.hash);
      return receipt;
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  async refund(jobId: string) {
    if (!this.contract) throw new Error("Contract not initialized");
    try {
      const tx = await this.contract.refund(BigInt(jobId));
      const receipt = await tx.wait();
      console.log("[v0] Refund tx:", receipt.hash);
      return receipt;
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  async emergencyRefund(jobId: string) {
    if (!this.contract) throw new Error("Contract not initialized");
    try {
      const tx = await this.contract.emergencyRefund(BigInt(jobId));
      const receipt = await tx.wait();
      console.log("[v0] EmergencyRefund tx:", receipt.hash);
      return receipt;
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  async getJob(jobId: string) {
    if (!this.contract) throw new Error("Contract not initialized");
    try {
      const jobData = await this.contract.getJob(BigInt(jobId));
      return {
        jobId: jobData[0].toString(),
        client: jobData[1],
        freelancer: jobData[2],
        amount: formatEther(jobData[3]),
        duration: jobData[4].toString(),
        isCompleted: jobData[5],
        isRefunded: jobData[6],
      };
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  async getActiveJobs() {
    if (!this.contract) throw new Error("Contract not initialized");
    try {
      const activeJobIds = await this.contract.getActiveJobs();
      return activeJobIds.map((id: bigint) => id.toString());
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  async getTotalJobs() {
    if (!this.contract) throw new Error("Contract not initialized");
    try {
      const total = await this.contract.getTotalJobs();
      return total.toString();
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  async isPaused() {
    if (!this.contract) throw new Error("Contract not initialized");
    try {
      return await this.contract.isPaused();
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  async setPaused(state: boolean) {
    if (!this.contract) throw new Error("Contract not initialized");
    try {
      const tx = await this.contract.setPaused(state);
      const receipt = await tx.wait();
      console.log("[v0] SetPaused tx:", receipt.hash);
      return receipt;
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  async transferOwnership(newAdmin: string) {
    if (!this.contract) throw new Error("Contract not initialized");
    try {
      const normalized = getAddress(newAdmin);
      const tx = await this.contract.transferOwnership(normalized);
      const receipt = await tx.wait();
      console.log("[v0] TransferOwnership tx:", receipt.hash);
      return receipt;
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  async initialize() {
    if (!this.contract) throw new Error("Contract not initialized");
    try {
      const tx = await this.contract.initialize();
      const receipt = await tx.wait();
      console.log("[v0] Initialize tx:", receipt.hash);
      return receipt;
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  async getMultipleJobs(jobIds: string[]) {
    const jobs = [];
    for (const jobId of jobIds) {
      try {
        const job = await this.getJob(jobId);
        jobs.push(job);
      } catch (error) {
        console.error(`[v0] Failed to get job ${jobId}:`, error);
      }
    }
    return jobs;
  }

  async getUserJobs(userAddress: string) {
    try {
      const totalJobs = await this.getTotalJobs();
      const normalizedUser = getAddress(userAddress);
      const allJobs = [];

      for (let i = 1; i <= parseInt(totalJobs); i++) {
        try {
          const job = await this.getJob(i.toString());
          if (
            getAddress(job.client) === normalizedUser ||
            getAddress(job.freelancer) === normalizedUser
          ) {
            allJobs.push({ ...job, jobId: i.toString() });
          }
        } catch {
          continue;
        }
      }
      return allJobs;
    } catch (error: any) {
      throw new Error(this.translateError(error));
    }
  }

  setupEventListeners() {
    if (!this.contract) return;

    this.contract.on(
      "EscrowCreated",
      (escrowId, client, freelancer, amount, event) => {
        console.log("[v0] New escrow:", {
          escrowId: escrowId.toString(),
          client,
          freelancer,
          amount: formatEther(amount),
          tx: event.hash,
        });
      }
    );

    this.contract.on("FundsReleased", (escrowId, freelancer, amount, event) => {
      console.log("[v0] Funds released:", {
        escrowId: escrowId.toString(),
        freelancer,
        amount: formatEther(amount),
        tx: event.hash,
      });
    });
  }

  async getCurrentNetwork() {
    if (!this.provider) return null;
    const network = await this.provider.getNetwork();
    return {
      name: network.name,
      chainId: network.chainId.toString(),
    };
  }

  async switchToArbitrum() {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xa4b1" }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xa4b1",
                chainName: "Arbitrum One",
                nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                rpcUrls: ["https://arb1.arbitrum.io/rpc"],
                blockExplorerUrls: ["https://arbiscan.io"],
              },
            ],
          });
        } catch (addError) {
          console.error("[v0] Failed to add Arbitrum:", addError);
        }
      } else {
        throw switchError;
      }
    }
  }
}

export const escrowService = new EscrowContractService();

export const web3Utils = {
  formatAddress: (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`,
  formatEth: (amount: string) => `${parseFloat(amount).toFixed(4)} ETH`,
  getTransactionUrl: (
    txHash: string,
    network: "mainnet" | "sepolia" = "mainnet"
  ) => {
    const base =
      network === "mainnet"
        ? "https://arbiscan.io/tx/"
        : "https://sepolia.arbiscan.io/tx/";
    return `${base}${txHash}`;
  },
  isValidAddress: (address: string) => isAddress(address),
};
