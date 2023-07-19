export const ABI = [
  {
    inputs: [{ internalType: "address", name: "adminPanel", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AlreadyInitialized", type: "error" },
  { inputs: [], name: "ArraySizeDoesNotMatch", type: "error" },
  { inputs: [], name: "CallerNotAdmin", type: "error" },
  { inputs: [], name: "EmptyArray", type: "error" },
  {
    inputs: [{ internalType: "string", name: "message", type: "string" }],
    name: "FatalError",
    type: "error",
  },
  { inputs: [], name: "InsufficientBalance", type: "error" },
  { inputs: [], name: "InvalidTimestamp", type: "error" },
  { inputs: [], name: "NoClaimAvailable", type: "error" },
  { inputs: [], name: "OutOfBounds", type: "error" },
  { inputs: [], name: "StartBeforeNow", type: "error" },
  { inputs: [], name: "StartBeforeTGE", type: "error" },
  { inputs: [], name: "TicksMissing", type: "error" },
  { inputs: [], name: "UserAlreadyActive", type: "error" },
  { inputs: [], name: "UserNotActive", type: "error" },
  { inputs: [], name: "VestingAlreadyActive", type: "error" },
  { inputs: [], name: "VestingDoesNotExist", type: "error" },
  { inputs: [], name: "ZeroAddress", type: "error" },
  { inputs: [], name: "ZeroAmount", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "vestingId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DecreaseLiquidity",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "vestingId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "IncreaseLiquidity",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "vestingCount",
        type: "uint256",
      },
    ],
    name: "InsertVestingList",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "vestingId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "walletList",
        type: "address[]",
      },
    ],
    name: "InsertWalletListToVesting",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "vestingId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "walletList",
        type: "address[]",
      },
    ],
    name: "RemoveWalletListFromVesting",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tgeDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "TGESet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "UpdateTokenAddress",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountForUser",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tgeAmountForUser",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tickCount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tickDuration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "VestingAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "VestingRemoved",
    type: "event",
  },
  {
    inputs: [],
    name: "_panel",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_vestingCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "batchSize", type: "uint256" },
      { internalType: "uint256", name: "offset", type: "uint256" },
    ],
    name: "airdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "wallet", type: "address" },
      {
        internalType: "uint256",
        name: "timestampInSeconds",
        type: "uint256",
      },
    ],
    name: "amountForClaim",
    outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "wallet", type: "address" }],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "decreaseLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "vestingId", type: "uint256" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "validAfter", type: "uint256" },
      { internalType: "uint256", name: "validBefore", type: "uint256" },
      { internalType: "bytes32", name: "nonce", type: "bytes32" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "increaseLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amountForUser",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tgeAmountForUser",
            type: "uint256",
          },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "tickCount", type: "uint256" },
          {
            internalType: "uint256",
            name: "tickDuration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "unallocatedAmount",
            type: "uint256",
          },
          { internalType: "bool", name: "active", type: "bool" },
        ],
        internalType: "struct PlatformVesting.VestingProperties[]",
        name: "vestingList",
        type: "tuple[]",
      },
    ],
    name: "insertVestingList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "vestingIdList",
        type: "uint256[]",
      },
      { internalType: "address[]", name: "walletList", type: "address[]" },
    ],
    name: "insertWalletListToVesting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "vestingId", type: "uint256" }],
    name: "removeVesting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "walletList", type: "address[]" },
    ],
    name: "removeWalletListFromVesting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "timestamp", type: "uint256" }],
    name: "setTgeDate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tgeStartDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalRemainingAllocatedAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "updateTokenAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "wallet", type: "address" }],
    name: "userPropertiesList",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "isActive", type: "bool" },
          {
            internalType: "uint256",
            name: "spentAmount",
            type: "uint256",
          },
          { internalType: "uint256", name: "vestingId", type: "uint256" },
          { internalType: "bool", name: "tgeClaimed", type: "bool" },
        ],
        internalType: "struct PlatformVesting.UserProperties",
        name: "userProperties",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vestingPropertiesList",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amountForUser",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tgeAmountForUser",
            type: "uint256",
          },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "tickCount", type: "uint256" },
          {
            internalType: "uint256",
            name: "tickDuration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "unallocatedAmount",
            type: "uint256",
          },
          { internalType: "bool", name: "active", type: "bool" },
        ],
        internalType: "struct PlatformVesting.VestingProperties[]",
        name: "vestingList",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];