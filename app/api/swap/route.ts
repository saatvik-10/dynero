import { db } from "@/app/db";
import { authOptions } from "@/lib/auth";
import { getPrivateKey } from "@/lib/utils";
import { Connection, VersionedTransaction } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=5935eb6e-9c4e-4031-b4b6-f1290106d2d6")

    const data: {
        quoteResponse: any
    } = await req.json()

    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({
            message: "You are not logged in!"
        }, { status: 401 })
    }

    const solanaWallet = await db.solanaWallet.findFirst({
        where: {
            userId: session.user.uid
        }
    });

    if (!solanaWallet) {
        return NextResponse.json({
            message: "Unable to find the associated solana wallet"
        }, { status: 500 })
    }

    const { swapTransaction } = await (
        await fetch('https://quote-api.jup.ag/v6/swap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                quoteResponse: data.quoteResponse,
                userPublicKey: solanaWallet.pubkey,
                wrapAndUnwrapSol: true,
            })
        })
    ).json();

    const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
    var transaction = VersionedTransaction.deserialize(swapTransactionBuf);
    console.log(transaction);

    const privateKey = getPrivateKey(solanaWallet.privateKey)

    transaction.sign([privateKey]);

    const latestBlockHash = await connection.getLatestBlockhash();

    const rawTransaction = transaction.serialize()

    const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2
    });

    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid
    });

    return NextResponse.json({
        txid
    })
}