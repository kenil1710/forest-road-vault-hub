// Verified from forestroadvault.com/transparency and /docs.
// Snapshot: Ethereum mainnet, block 26,047,245 (Sept 24, 2026).
// Every figure here is copied verbatim — do not round at the source.

export const SNAPSHOT = {
  network: "Ethereum mainnet",
  block: 26_047_245,
  date: "Sept 24, 2026",
} as const;

export const LINKS = {
  site: "https://forestroadvault.com",
  transparency: "https://forestroadvault.com/transparency",
  app: "https://forestroadvault.com/app",
  docs: "https://forestroadvault.com/docs",
  risk: "https://forestroadvault.com/risk",
  discord: "https://discord.com/invite/swXQWqrAgf",
  x: "https://x.com/forestroadvault",
  github: "https://github.com/Forest-Road-Company/forest-road-vault",
} as const;

export const etherscan = (address: string) => `https://etherscan.io/address/${address}`;

export const USDFR_ADDRESS = "0xcC07e7c4E5E35AFFD47b351E420A22C667D7f83d";

// The transparency page shows supply and backing only as "3.1mm" for this
// snapshot. Backing is derived as idle reserve + deployed principal; supply is
// ≤ backing by invariant, so the calculator uses the derived figure for it too.
export const SUPPLY = {
  published: "3.1mm",
  usdfrSupply: 3_131_364,
  backingValue: 128_842.89 + 3_002_521.21, // 3,131,364.10
} as const;

export const RESERVES = {
  address: "0x8317…dD48",
  fullAddress: "0x8317736611B542DDb4A820fE344b621A904BdD48",
  idleReserve: 128_842.89,
  deployedPrincipal: 3_002_521.21,
} as const;

export const VAULT = {
  address: "0xAF55…E234",
  fullAddress: "0xAF559d1D59B33ca4b950AB2091372Af8a773E234",
  stakedAssets: 810_544.35,
  sharesOutstanding: 807_100.01,
  exchangeRate: 1.004225,
  perfFeeNavRate: 1.004267,
  highWaterMark: 1.003847,
  lastFeeCheckpoint: "2026-09-24T05:45:23.000Z",
  decimals: 24,
} as const;

export const BOOK = {
  address: "0xe562…4F7d",
  fullAddress: "0xe5621a5c6760dbCd76AC94012769a2d604844F7d",
  facilities: 7,
  exposure: 3_002_521.21,
  performingYield: 16.74,
  allOutstandingYield: 16.74,
  performingPrincipal: 3_002_521.21,
  grossIncomeRunRate: 502_921.45,
  nonPerformingPrincipal: 0,
} as const;

export const CREDIT = {
  address: "0xD08F…7263",
  netDefaultRate: 0,
  netWrittenOff: 0,
  cumulativeFunded: 3_000_020,
  bySector: [
    { name: "Media & entertainment", rate: null },
    { name: "Renewable energy", rate: 0 },
    { name: "Digital assets", rate: 0 },
  ],
} as const;

export const REVENUE = {
  address: "0xED7F…b063",
  total: 60_191.6076,
  origination: 60_000.3999,
  interest: 0,
  performance: 191.2076,
  management: 0,
} as const;

export const FEES = [
  { name: "Origination fee", rate: 2, cap: null, basis: "All classes, charged to borrowers" },
  { name: "Interest fee", rate: 10, cap: null, basis: "Of gross interest, via the waterfall" },
  { name: "Performance fee", rate: 10, cap: 20, basis: "Above a global high-water mark" },
  { name: "Management fee", rate: 0, cap: 2, basis: "365-day basis" },
] as const;

export const BACKSTOP = {
  address: "0x5608…8a72",
  liveCallable: 0,
  fundedCoverage: 0,
} as const;

export const QUEUE = {
  address: "0xa3a9…d1f8",
  epoch: 1,
  status: "ended · head eligible in 17d 18h",
  queuedShares: 69.5433,
  settlementLiquidity: 2_151.67,
  cooldownDays: 21,
} as const;

export const CURATOR = {
  firstLoss: 500_001,
  pctOfLoans: 16.65,
} as const;

// Illustrative fee math. The real performance fee is taken above the HWM via
// share dilution, not as a flat haircut — this is a simplification.
export const YIELD = {
  gross: BOOK.performingYield,
  interestFee: 0.1,
  performanceFee: 0.1,
  managementFee: 0,
} as const;

export const afterInterestFee = YIELD.gross * (1 - YIELD.interestFee); // 15.066
export const afterPerformanceFee = afterInterestFee * (1 - YIELD.performanceFee); // 13.5594
export const estimatedNet = afterPerformanceFee * (1 - YIELD.managementFee);

export const TESTS = [
  { value: "3,108", label: "Non-fork release checks", detail: "3,105 passing tests + 3 endpoint checks" },
  { value: "208", label: "Heavy invariant tests", detail: "512 runs, depth 256" },
  { value: "8", label: "Halmos symbolic properties", detail: "Formal, not sampled" },
  { value: "1,074/1,074", label: "Function reachability", detail: "Deployed-scope functions" },
  { value: "99.40%", label: "Line coverage", detail: "94.95% branch coverage" },
  { value: "537", label: "Mainnet-fork tests", detail: "0 failures, 0 skips" },
  { value: "60", label: "Addresses verified", detail: "On Etherscan" },
  { value: "18", label: "Proxies verified", detail: "With verified implementations" },
] as const;

export const INVARIANTS = [
  { name: "Backing", rule: "USDfr.totalSupply() ≤ backing value.", proof: "Halmos symbolic proofs" },
  { name: "Waterfall", rule: "Protocol fee + senior leg == gross interest. No double-counting.", proof: "Invariant suite" },
  { name: "Loss cascade", rule: "Curator → sGROVE → sUSDfr. Strict and non-invertible.", proof: "9-path Halmos proof" },
  { name: "NFT gate", rule: "A loan NFT mints only when every attestation kind is satisfied and on-chain conditions hold.", proof: "Invariant suite" },
  { name: "Queue FIFO", rule: "Never distributes more than is available. No double-claim.", proof: "Invariant suite" },
  { name: "Concentration", rule: "Per-vertical, per-state and per-borrower limits enforced atomically at origination.", proof: "Invariant suite" },
  { name: "Exchange rate", rule: "The sUSDfr rate never decreases from yield accrual alone. Losses arrive only via the cascade.", proof: "Invariant suite" },
  { name: "Access control", rule: "No privileged action is reachable by an unauthorized role.", proof: "100% branch coverage" },
  { name: "Reserve", rule: "Idle USDC + deployed == backing. Donations can't inflate it; a shortfall can't be hidden.", proof: "Permissionless reconciliation" },
] as const;

export const ROLES = [
  { role: "DEFAULT_ADMIN_ROLE + UPGRADER_ROLE", holder: "Governance timelock only", note: "No EOA on mainnet" },
  { role: "GUARDIAN_ROLE", holder: "Operations Safe", note: "Can pause user paths — never the loss cascade" },
  { role: "CREDIT_ROLE", holder: "Internal modules only", note: "WaterfallEngine, DefaultManager, ClaimBridge — never an EOA" },
  { role: "ATTESTER_ROLE", holder: "m-of-n signer keys", note: "≥2 signers for high-value facts" },
  { role: "ORIGINATOR_ROLE / SERVICER_ROLE", holder: "Ops (Forest Road)", note: "Originates and services facilities" },
] as const;

export const REVIEWS = [
  { date: "Sept 13", title: "Corrovera dual-chain ensemble", detail: "125 source files; scope limitations noted." },
  { date: "Sept 17", title: "Corrovera diff review", detail: "Plus follow-up probes." },
  { date: "Sept 18", title: "Internal Solana & curator correctness review", detail: "Internal team." },
  { date: "Sept 20", title: "Corrovera curator-vault review", detail: "Plus remediation verification." },
  { date: "Sept 20", title: "Internal review of exact Ethereum V2 deployment", detail: "Run on forked mainnet." },
] as const;

export const RESIDUALS = [
  "No top-tier audit yet (no Trail of Bits, OpenZeppelin or CertiK engagement).",
  "Module-wide Guardian pause proven on a fork only — no live Safe drill yet.",
  "Queue canary (9.99 sUSDfr) not yet settled — eligible Oct 12, 2026 after the 21-day cooldown.",
  "sGROVE backstop is unfunded ($0 live callable reserve).",
  "Limited operating history — live on mainnet since September 2026.",
  "Keeper infrastructure runs on shared hosting.",
] as const;
