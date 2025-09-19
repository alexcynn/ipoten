'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Baby, Clock, CheckCircle2 } from 'lucide-react'
import { mockAssessments, categoryNames, categoryColors } from '@/lib/mockData'

export default function AssessmentPage() {
  const [selectedChild, setSelectedChild] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-ipoten-blue hover:text-blue-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-ipoten-gray-dark mb-2">
            발달 체크리스트
          </h1>
          <p className="text-lg text-gray-600">
            27-29개월 아동의 발달 상태를 6개 영역으로 나누어 체계적으로 평가합니다.
          </p>
        </div>

        {/* 아이 선택 섹션 */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-ipoten-gray-dark mb-4 flex items-center">
            <Baby className="w-5 h-5 mr-2 text-ipoten-blue" />
            평가할 아이 선택
          </h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="child1"
                type="radio"
                name="child"
                value="1"
                checked={selectedChild === '1'}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-4 h-4 text-ipoten-blue"
              />
              <label htmlFor="child1" className="ml-3 text-ipoten-gray-dark">
                <span className="font-medium">김도윤</span>
                <span className="text-gray-500 ml-2">(남, 2022.03.15 생)</span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="child2"
                type="radio"
                name="child"
                value="2"
                checked={selectedChild === '2'}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="w-4 h-4 text-ipoten-blue"
              />
              <label htmlFor="child2" className="ml-3 text-ipoten-gray-dark">
                <span className="font-medium">김서연</span>
                <span className="text-gray-500 ml-2">(여, 2022.06.20 생)</span>
              </label>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-ipoten-blue mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-ipoten-blue">예상 소요시간</p>
                <p className="text-sm text-gray-600">약 15-20분 (각 영역당 2-3분)</p>
              </div>
            </div>
          </div>
        </div>

        {/* 평가 영역 */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-ipoten-gray-dark">평가 영역</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockAssessments.map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${categoryColors[assessment.category]}`}>
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-gray-500">{assessment.ageRange}</span>
                </div>

                <h3 className="text-lg font-semibold text-ipoten-gray-dark mb-2">
                  {categoryNames[assessment.category]}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {assessment.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">8개 문항</span>
                  <Link
                    href={selectedChild ? `/assessment/${assessment.id}?child=${selectedChild}` : '#'}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedChild
                        ? 'bg-ipoten-blue text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={(e) => {
                      if (!selectedChild) {
                        e.preventDefault()
                        alert('먼저 평가할 아이를 선택해주세요.')
                      }
                    }}
                  >
                    시작하기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">평가 전 안내사항</h3>
          <ul className="space-y-2 text-yellow-700">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              각 문항은 Q1(기본), Q2(조건 변경), Q3(대체 반응) 3단계로 구성되어 있습니다.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              아이가 Q1을 수행할 수 있다면 다음 문항으로 넘어가세요.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Q1이 어렵다면 Q2, Q3 순서로 진행해주세요.
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              평가 결과는 전문 상담사의 의견이 아닌 참고 자료로만 활용해주세요.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}