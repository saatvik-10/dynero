import { NextRequest, NextResponse } from "next/server";
import { getAccountBalance } from "@/lib/utils";
import { getSupportedTokensPrice } from "@/lib/constants";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address') as unknown as string

    const supportedTokens = await getSupportedTokensPrice();

    const balances = await Promise.all(supportedTokens.map((tk) => getAccountBalance(tk, address)));

    const tks = supportedTokens.map((tk, idx) => ({
        ...tk,
        balance: balances[idx].toFixed(2),
        usdBalance: (balances[idx] * Number(tk.price)).toFixed(2)
    }))

    return NextResponse.json({
        tks,
        totalBalance: tks.reduce((acc, val) => acc + Number(val.usdBalance), 0).toFixed(2)
    })
} 