import axios from "axios";
import { useEffect, useState } from "react";
import { TokenInterface } from "@/lib/token";


interface TokenBalanceInterface extends TokenInterface {
    balance: string,
    useBalance: string
}

export function useTokens(address: string) {
    const [tokenBalance, setTokenBalance] = useState<{
        totalBalance: string,
        tokens: TokenBalanceInterface[]
    } | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        try {
            axios.get(`/api/tokens?address=${address}`)
                .then(res =>
                    setTokenBalance(res.data)
                )
        } catch (err) {
            console.error("failed to fetch tokens", err);
        }
    }, [])

    return { loading, tokenBalance }
}