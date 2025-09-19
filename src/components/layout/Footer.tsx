'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ipoten-gray-light border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 로고 및 회사 정보 */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-ipoten-blue rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">아</span>
                </div>
                <span className="text-xl font-bold text-ipoten-blue">아이포텐</span>
              </div>
              <p className="text-ipoten-gray-dark text-sm mb-4 max-w-md">
                아이포텐은 27-29개월 유아의 발달을 체계적으로 평가하고 맞춤형 상담을 제공하는
                전문 플랫폼입니다. 우리 아이의 건강한 성장을 함께 응원합니다.
              </p>
              <div className="text-sm text-ipoten-gray-dark">
                <p>㈜아이포텐</p>
                <p>대표이사: 김대표</p>
                <p>사업자등록번호: 123-45-67890</p>
                <p>통신판매업신고번호: 제2024-서울강남-1234호</p>
              </div>
            </div>

            {/* 서비스 링크 */}
            <div>
              <h3 className="text-ipoten-gray-dark font-semibold mb-4">서비스</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/assessment" className="text-sm text-gray-600 hover:text-ipoten-blue">
                    발달체크
                  </Link>
                </li>
                <li>
                  <Link href="/videos" className="text-sm text-gray-600 hover:text-ipoten-blue">
                    학습영상
                  </Link>
                </li>
                <li>
                  <Link href="/booking" className="text-sm text-gray-600 hover:text-ipoten-blue">
                    상담예약
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="text-sm text-gray-600 hover:text-ipoten-blue">
                    발달보고서
                  </Link>
                </li>
              </ul>
            </div>

            {/* 고객지원 */}
            <div>
              <h3 className="text-ipoten-gray-dark font-semibold mb-4">고객지원</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-sm text-gray-600 hover:text-ipoten-blue">
                    자주묻는질문
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-ipoten-blue">
                    문의하기
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 hover:text-ipoten-blue">
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-600 hover:text-ipoten-blue">
                    이용약관
                  </Link>
                </li>
              </ul>
              <div className="mt-6">
                <p className="text-sm text-ipoten-gray-dark font-medium">고객센터</p>
                <p className="text-lg font-bold text-ipoten-blue">1588-1234</p>
                <p className="text-xs text-gray-600">평일 09:00 ~ 18:00 (주말, 공휴일 휴무)</p>
              </div>
            </div>
          </div>

          {/* 하단 카피라이트 */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                © 2024 아이포텐(iPoten). All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-ipoten-blue">
                  개인정보처리방침
                </Link>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-ipoten-blue">
                  이용약관
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}