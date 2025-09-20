'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'

const Dashboard = () => {
  const session = useSession();
  const route = useRouter();

  if (session?.status === 'loading') {
    return (
      <div className='pt-10 flex justify-center'>
        <div className="md:max-w-xl max-w-md rounded-md shadow-md w-full">
          <div className="p-10">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full"/>
              <Skeleton className="h-6 w-48"/>
            </div>
            <Separator className='my-3'/>
          </div>
        </div>
      </div>
    )
  }

  if(!session?.data?.user) {
    route.push('/')
    toast.error("Please sign in to continue!")
  }

  return (
    <div className='pt-10 flex justify-center'>
      <div className="md:max-w-xl max-w-md rounded-md shadow-md w-full">
        <div className="p-10">
          <div className="flex items-center gap-3">
            <img src={session.data?.user?.image || ""} alt="" className='rounded-full size-10'/>
            <span className='md:text-xl'>Yello again, {session.data?.user?.name}!</span>
          </div>
          <Separator className='my-3'/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
