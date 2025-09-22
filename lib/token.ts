export interface TokenInterface {
    name: string,
    mint: string,
    native: boolean,
    price: string,
    image: string,
    decimals: number
}

export const SUPPORTED_TOKENS: TokenInterface[] = [{
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: true,
    price: '240',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIsJL3zRgUrkD3yE3lD7LK0wZWSiRyY1GVg&s',
    decimals: 9
}, {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    price: '1',
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Tether_USDT.png",
    decimals: 6
}, {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    price: '1',
    image: "https://upload.wikimedia.org/wikipedia/commons/4/49/USDC_Logo.png",
    decimals: 6
}]