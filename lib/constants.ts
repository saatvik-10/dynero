import { Connection } from "@solana/web3.js"
import axios from "axios";
import { SUPPORTED_TOKENS } from "./token";

let TOKEN_LAST_UPDATED: number | null = null;

let prices: {
    [key: string]: {
        price: string;
    }
} = {};

const TOKEN_PRICE_REFRESH_INTERVAL = 120 * 1000;

export const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/EspGgEsKtp6xdG1-P32lj9raEFUlgXNc"
)

export async function getSupportedTokensPrice() {
    if (!TOKEN_LAST_UPDATED || new Date().getTime() - TOKEN_LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL) {
        try {
            const tokenIds = SUPPORTED_TOKENS.map(tid => tid.mint).join(',')
            const res = await axios.get(`https://lite-api.jup.ag/price/v2?ids=${tokenIds}`);
            prices = res.data.data;
            TOKEN_LAST_UPDATED = new Date().getTime();
        } catch (err: any) {
            console.log(err)
        }
    }
    return SUPPORTED_TOKENS.map(stk => ({
        ...stk,
        price: prices[stk.mint]?.price || "0"
    }))
}