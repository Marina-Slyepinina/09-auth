"use client"

import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const PublicLayout = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
    const router = useRouter();
    const clearIsAuthenticated = useAuthStore(
        (state) => state.clearIsAuthenticated
    );
    
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        clearIsAuthenticated();
        router.refresh()
        setIsLoading(false)
    }, [router, clearIsAuthenticated])

    return <>
        {isLoading ? <div>Loading...</div> : children}    
    </>
}

export default PublicLayout;
