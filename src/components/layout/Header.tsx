'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: '홈', href: '/' },
    { name: '발달체크', href: '/assessment' },
    { name: '학습영상', href: '/videos' },
    { name: '상담예약', href: '/booking' },
    { name: '내정보', href: '/profile' }
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/aipoten.png"
                alt="아이포텐"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-ipoten-gray-dark hover:text-ipoten-blue px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 로그인/회원가입 버튼 */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-ipoten-gray-dark hover:text-ipoten-blue px-3 py-2 text-sm font-medium"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="bg-ipoten-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              회원가입
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-ipoten-gray-dark hover:text-ipoten-blue p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-ipoten-gray-dark hover:text-ipoten-blue block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link
                  href="/login"
                  className="text-ipoten-gray-dark hover:text-ipoten-blue block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="bg-ipoten-blue text-white block px-3 py-2 rounded-lg text-base font-medium hover:bg-blue-600 transition-colors duration-200 mx-3 mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}