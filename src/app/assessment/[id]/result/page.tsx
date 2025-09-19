'use client'

import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Calendar, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'
import { mockAssessments, mockChildren, categoryNames, categoryColors } from '@/lib/mockData'

export default function AssessmentResultPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const assessmentId = params.id as string
  const childId = searchParams.get('child')
  const score = parseInt(searchParams.get('score') || '0')
  const delayCount = parseInt(searchParams.get('delays') || '0')

  const assessment = mockAssessments.find(a => a.id === assessmentId)
  const child = mockChildren.find(c => c.id === childId)

  if (!assessment || !child) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">결과를 불러올 수 없습니다.</p>
          <Link href="/assessment" className="text-ipoten-blue hover:underline mt-2 inline-block">
            평가 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: '우수', color: 'text-ipoten-green', bg: 'bg-green-50' }
    if (score >= 60) return { level: '양호', color: 'text-ipoten-blue', bg: 'bg-blue-50' }
    if (score >= 40) return { level: '보통', color: 'text-ipoten-orange', bg: 'bg-orange-50' }
    return { level: '관찰 필요', color: 'text-ipoten-red', bg: 'bg-red-50' }
  }

  const getRecommendations = (score: number, category: string, delayCount: number) => {
    const recommendations = []

    if (delayCount > 0) {
      recommendations.push('발달지연 신호가 관찰되었습니다. 전문 상담을 받아보시기를 권장합니다.')
    }

    if (score < 60) {
      recommendations.push(`${categoryNames[category as keyof typeof categoryNames]} 영역의 발달을 위한 추가적인 관심과 활동이 필요합니다.`)
    }

    if (category === 'gross_motor') {
      recommendations.push('신체 활동량을 늘리고, 공놀이나 뛰어놀기 등의 활동을 꾸준히 해보세요.')
    } else if (category === 'fine_motor') {
      recommendations.push('블록 쌓기, 그리기, 만들기 등의 소근육 활동을 늘려보세요.')
    } else if (category === 'language') {
      recommendations.push('책 읽어주기, 대화하기, 노래 부르기 등을 통해 언어 자극을 늘려보세요.')
    } else if (category === 'cognitive') {
      recommendations.push('퍼즐, 분류하기, 색깔/모양 놀이 등의 인지 활동을 해보세요.')
    } else if (category === 'social_emotional') {
      recommendations.push('다른 아이들과의 놀이 기회를 늘리고, 감정 표현을 도와주세요.')
    } else if (category === 'daily_living') {
      recommendations.push('스스로 하기를 격려하고, 일상생활 기술을 단계적으로 가르쳐주세요.')
    }

    if (score >= 80) {
      recommendations.push('현재 발달 수준이 우수합니다. 지속적인 관심과 격려를 통해 유지해주세요.')
    }

    return recommendations
  }

  const scoreLevel = getScoreLevel(score)
  const recommendations = getRecommendations(score, assessment.category, delayCount)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <Link
            href="/assessment"
            className="inline-flex items-center text-ipoten-blue hover:text-blue-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            평가 목록으로 돌아가기
          </Link>

          <h1 className="text-3xl font-bold text-ipoten-gray-dark mb-2">
            평가 결과
          </h1>
          <p className="text-lg text-gray-600">
            {child.name} ({child.gender === 'male' ? '남' : '여'}) - {categoryNames[assessment.category]}
          </p>
        </div>

        {/* 결과 요약 카드 */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${scoreLevel.bg} mb-4`}>
              <span className={`text-3xl font-bold ${scoreLevel.color}`}>
                {score}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ipoten-gray-dark mb-2">
              {scoreLevel.level}
            </h2>
            <p className="text-gray-600">
              {categoryNames[assessment.category]} 영역 평가 점수
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 점수 */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-ipoten-blue mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">종합 점수</p>
              <p className="text-2xl font-bold text-ipoten-gray-dark">{score}점</p>
            </div>

            {/* 발달지연 신호 */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              {delayCount > 0 ? (
                <>
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">발달지연 신호</p>
                  <p className="text-2xl font-bold text-amber-600">{delayCount}개</p>
                </>
              ) : (
                <>
                  <CheckCircle className="w-8 h-8 text-ipoten-green mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">발달지연 신호</p>
                  <p className="text-2xl font-bold text-ipoten-green">없음</p>
                </>
              )}
            </div>

            {/* 평가일 */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-8 h-8 text-ipoten-blue mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">평가일</p>
              <p className="text-lg font-bold text-ipoten-gray-dark">
                {new Date().toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>
        </div>

        {/* 발달지연 경고 (있는 경우) */}
        {delayCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-2">
                  발달지연 신호 감지
                </h3>
                <p className="text-amber-700 mb-4">
                  {delayCount}개의 발달지연 신호가 관찰되었습니다.
                  이는 전문적인 상담이 필요할 수 있음을 의미합니다.
                </p>
                <Link
                  href="/booking"
                  className="inline-flex items-center bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200"
                >
                  전문 상담 예약하기
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 맞춤 권장사항 */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-ipoten-gray-dark mb-6">
            맞춤 권장사항
          </h3>
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-ipoten-green mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 관련 학습영상 */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-ipoten-gray-dark mb-6">
            추천 학습영상
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="aspect-video bg-gradient-to-br from-ipoten-blue to-blue-400 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-white font-medium">학습영상</span>
              </div>
              <h4 className="font-medium text-ipoten-gray-dark mb-1">
                {categoryNames[assessment.category]} 발달 놀이
              </h4>
              <p className="text-sm text-gray-600">
                집에서 할 수 있는 {categoryNames[assessment.category]} 발달 활동을 소개합니다.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="aspect-video bg-gradient-to-br from-ipoten-green to-green-400 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-white font-medium">학습영상</span>
              </div>
              <h4 className="font-medium text-ipoten-gray-dark mb-1">
                부모가 알아야 할 발달 가이드
              </h4>
              <p className="text-sm text-gray-600">
                27-29개월 아이의 발달 특성과 지원 방법을 알려드립니다.
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/videos"
              className="inline-flex items-center text-ipoten-blue hover:text-blue-600 font-medium"
            >
              더 많은 학습영상 보기 →
            </Link>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-ipoten-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center">
            <Download className="w-5 h-5 mr-2" />
            결과 PDF 다운로드
          </button>

          <Link
            href="/booking"
            className="flex-1 bg-ipoten-orange text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-500 transition-colors duration-200 flex items-center justify-center"
          >
            전문 상담 예약하기
          </Link>

          <Link
            href="/assessment"
            className="flex-1 border border-gray-300 text-ipoten-gray-dark py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
          >
            다른 영역 평가하기
          </Link>
        </div>
      </div>
    </div>
  )
}