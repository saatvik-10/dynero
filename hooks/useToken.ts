import axios from "axios";
import { useEffect, useState } from "react";
import { TokenInterface } from "@/lib/token";

export interface TokenBalanceInterface extends TokenInterface {
    balance: string,
    usdBalance: string
}

export function useTokens(address: string) {
    const [tokenBalance, setTokenBalance] = useState<{
        totalBalance: string,
        tks: TokenBalanceInterface[]
    } | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        try {
            setLoading(true);
            axios.get(`/api/tokens?address=${address}`)
                .then(res =>
                    setTokenBalance(res.data)
                )
        } catch (err) {
            console.error("failed to fetch tokens", err);
        } finally {
            setLoading(false)
        }
    }, [])

    return { loading, tokenBalance }
}