import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import { BottomBar } from '@/components/shared/BottomBar'
import TopBar from '@/components/shared/TopBar'


const inter = Inter({subsets: ['latin']})
export const metadata = {
  title: 'Thread',
  description: 'A Next.js 13 Meta Thread Application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>  
          <TopBar/>
          <main className='flex flex-row'>
            <LeftSidebar/>
                <section className='main-container'>
                  <div className='w-full max-w-4xl'>
                    {children}
                  </div>
                </section>
            <RightSidebar/>
          </main>
          <BottomBar/>
        </body>
      </html>
    </ClerkProvider>
  )
}
