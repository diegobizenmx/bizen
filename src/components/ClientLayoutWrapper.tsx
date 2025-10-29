"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NavigationLoading from './NavigationLoading';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {children}
      <NavigationLoading isLoading={isNavigating} />
    </>
  );
}


