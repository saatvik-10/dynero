'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const session = useSession();

  return (
    <main className="flex flex-col items-center justify-center py-10">
      <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent leading-tight">
            Dynero
          </h1>
          
          <p className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Where{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                DECENTRALIZATION
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></span>
            </span>
            {" "}meets{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-semibold">
                CENTRALIZATION
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-600 to-emerald-600"></span>
            </span>
          </p>
          
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Experience the perfect balance of traditional finance and cutting-edge blockchain technology
          </p>
        </div>

        <div className="pt-8">
          {session?.data?.user ? (
            <Link href='/dashboard'>
              <Button 
                size="lg"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                
              >
                Continue to Dashboard
              <ArrowRight />
              </Button>
            </Link>
          ) : (

            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => {
                signIn('google')
              }}
            >
              Sign In with Google
            </Button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-8">
          {['Secure', 'Fast', 'Decentralized', 'User-Friendly'].map((feature) => (
            <span 
              key={feature}
              className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-medium text-slate-600"
            >
              {feature}
            </span>
          ))}
        </div>
    </main>
  );
}
