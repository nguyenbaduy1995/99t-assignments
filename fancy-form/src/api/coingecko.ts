import type { Token } from "../types";

const COINGECKO_API = "https://api.coingecko.com/api/v3";
const ICON_BASE_URL =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";

const CURRENCY_TO_COINGECKO_ID: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
  USDC: "usd-coin",
  BNB: "binancecoin",
  XRP: "ripple",
  ADA: "cardano",
  DOGE: "dogecoin",
  SOL: "solana",
  DOT: "polkadot",
  MATIC: "matic-network",
  SHIB: "shiba-inu",
  AVAX: "avalanche-2",
  LINK: "chainlink",
  UNI: "uniswap",
  ATOM: "cosmos",
  LTC: "litecoin",
  FTM: "fantom",
  NEAR: "near",
  ALGO: "algorand",
  APE: "apecoin",
  SAND: "the-sandbox",
  MANA: "decentraland",
  AAVE: "aave",
  MKR: "maker",
  CRV: "curve-dao-token",
  SUSHI: "sushi",
  COMP: "compound-governance-token",
  SNX: "havven",
  YFI: "yearn-finance",
  BAT: "basic-attention-token",
  ZRX: "0x",
  ENJ: "enjincoin",
  CHZ: "chiliz",
  GALA: "gala",
  AXS: "axie-infinity",
  THETA: "theta-token",
  VET: "vechain",
  FIL: "filecoin",
  EOS: "eos",
  TRX: "tron",
  XLM: "stellar",
  XMR: "monero",
  DASH: "dash",
  ZEC: "zcash",
  NEO: "neo",
  WAVES: "waves",
  QTUM: "qtum",
  OMG: "omisego",
  ICX: "icon",
  ZIL: "zilliqa",
  ONT: "ontology",
  NANO: "nano",
  DGB: "digibyte",
  DCR: "decred",
  SC: "siacoin",
  LSK: "lisk",
  STEEM: "steem",
  ARK: "ark",
  IOST: "iostoken",
  KNC: "kyber-network-crystal",
  REN: "republic-protocol",
  STORJ: "storj",
  ANT: "aragon",
  ANKR: "ankr",
  BAND: "band-protocol",
  CELO: "celo",
  ONE: "harmony",
  HOT: "holotoken",
  KAVA: "kava",
  RSR: "reserve-rights-token",
  RLC: "iexec-rlc",
  NKN: "nkn",
  OCEAN: "ocean-protocol",
  ROSE: "oasis-network",
  SKL: "skale",
  SXP: "swipe",
  CELR: "celer-network",
  CTSI: "cartesi",
  DENT: "dent",
  HBAR: "hedera-hashgraph",
  IOTX: "iotex",
  JST: "just",
  LRC: "loopring",
  LUNA: "terra-luna-2",
  LUNC: "terra-luna",
  PAXG: "pax-gold",
  PERP: "perpetual-protocol",
  RAY: "raydium",
  RUNE: "thorchain",
  SRM: "serum",
  STX: "blockstack",
  SUI: "sui",
  TON: "the-open-network",
  TWT: "trust-wallet-token",
  WIN: "wink",
  WOO: "woo-network",
  XTZ: "tezos",
  YGG: "yield-guild-games",
  ZEN: "horizen",
  BLUR: "blur",
  ARB: "arbitrum",
  OP: "optimism",
  APT: "aptos",
  IMX: "immutable-x",
  GMX: "gmx",
  LDO: "lido-dao",
  RPL: "rocket-pool",
  FXS: "frax-share",
  PEPE: "pepe",
  FLOKI: "floki",
  CFX: "conflux-token",
  EGLD: "multiversx-egld",
  INJ: "injective-protocol",
  FET: "fetch-ai",
  AGIX: "singularitynet",
  RNDR: "render-token",
  GRT: "the-graph",
  MASK: "mask-network",
  GMT: "stepn",
  FLOW: "flow",
  MINA: "mina-protocol",
  KSM: "kusama",
  CKB: "nervos-network",
  XDC: "xdce-crowd-sale",
  KLAY: "klay-token",
  WLD: "worldcoin-wld",
  SEI: "sei-network",
  TIA: "celestia",
  JUP: "jupiter-exchange-solana",
  PYTH: "pyth-network",
  JTO: "jito-governance-token",
  W: "wormhole",
  ENA: "ethena",
  PENDLE: "pendle",
  STRK: "starknet",
  BOME: "book-of-meme",
  BONK: "bonk",
  WIF: "dogwifcoin",
  ORDI: "ordinals",
  SATS: "1000sats",
  USD: "usd",
  BUSD: "binance-usd",
  DAI: "dai",
  TUSD: "true-usd",
  USDP: "paxos-standard",
  FRAX: "frax",
  GUSD: "gemini-dollar",
  LUSD: "liquity-usd",
  EURT: "tether-eurt",
  EURS: "stasis-eurs",
  SWTH: "switcheo",
  STEVMOS: "stride-staked-evmos",
  EVMOS: "evmos",
  IBCX: "ibc-index",
  IRIS: "iris-network",
  ampLUNA: "eris-amplified-luna",
  RATOM: "stafi-ratom",
  STRD: "stride",
  GMD: "gmd-protocol",
  STOSMO: "stride-staked-osmo",
  bNEO: "burgerneo",
  OSMO: "osmosis",
  STATOM: "stride-staked-atom",
  OKB: "okb",
  OKT: "oec-token",
  NGM: "e-money",
  WBTC: "wrapped-bitcoin",
  stOSMO: "stride-staked-osmo",
  stLUNA: "stride-staked-luna",
  stATOM: "stride-staked-atom",
  rATOM: "stafi-ratom",
  axlUSDC: "axlusdc",
};

// const COINGECKO_ID_TO_CURRENCY = Object.fromEntries(
//   Object.entries(CURRENCY_TO_COINGECKO_ID).map(([k, v]) => [v, k])
// );

export async function fetchTokenPrices(): Promise<Token[]> {
  const ids = Object.values(CURRENCY_TO_COINGECKO_ID).filter(
    (id) => id !== "usd",
  );
  const uniqueIds = [...new Set(ids)];

  const response = await fetch(
    `${COINGECKO_API}/simple/price?ids=${uniqueIds.join(",")}&vs_currencies=usd&include_last_updated_at=true`,
  );

  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.status}`);
  }

  const data: Record<string, { usd: number; last_updated_at: number }> =
    await response.json();

  const tokens: Token[] = [];
  const seen = new Set<string>();

  for (const [currency, coingeckoId] of Object.entries(
    CURRENCY_TO_COINGECKO_ID,
  )) {
    if (seen.has(currency)) continue;
    seen.add(currency);

    if (currency === "USD") {
      tokens.push({
        currency: "USD",
        price: 1,
        icon: `${ICON_BASE_URL}/USD.svg`,
        date: new Date().toISOString(),
      });
      continue;
    }

    const priceData = data[coingeckoId];
    if (priceData) {
      tokens.push({
        currency,
        price: priceData.usd,
        icon: `${ICON_BASE_URL}/${currency}.svg`,
        date: new Date(priceData.last_updated_at * 1000).toISOString(),
      });
    }
  }

  return tokens.sort((a, b) => a.currency.localeCompare(b.currency));
}
