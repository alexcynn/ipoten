import Link from 'next/link'
import { Play, CheckCircle, Users, Star } from 'lucide-react'
import { mockVideos, mockAssessmentResults, categoryNames } from '@/lib/mockData'

export default function Home() {
  // 최신 평가 결과 (최대 3개)
  const recentResults = mockAssessmentResults.slice(0, 3)
  // 추천 영상 (featured 영상들)
  const featuredVideos = mockVideos.filter(video => video.isFeatured).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-br from-ipoten-blue to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              우리 아이의 <span className="text-ipoten-yellow">건강한 발달</span>을<br />
              함께 확인해보세요
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              27-29개월 유아 발달 체크부터 전문 상담까지
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/assessment"
                className="bg-ipoten-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-500 transition-colors duration-200 shadow-lg"
              >
                지금 발달체크 시작하기
              </Link>
              <Link
                href="/videos"
                className="bg-white text-ipoten-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                학습영상 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 소개 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ipoten-gray-dark mb-4">
              아이포텐의 특별한 서비스
            </h2>
            <p className="text-lg text-gray-600">
              전문적이고 체계적인 발달 체크로 우리 아이의 성장을 지원합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 발달체크 */}
            <div className="text-center p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-ipoten-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-ipoten-gray-dark mb-4">체계적인 발달체크</h3>
              <p className="text-gray-600 mb-6">
                6개 영역 42개 문항으로 구성된 전문적인 발달 평가로
                아이의 현재 발달 상태를 정확히 파악할 수 있습니다.
              </p>
              <Link
                href="/assessment"
                className="text-ipoten-blue font-medium hover:underline"
              >
                발달체크 시작하기 →
              </Link>
            </div>

            {/* 학습영상 */}
            <div className="text-center p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-ipoten-green rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-ipoten-gray-dark mb-4">맞춤형 학습영상</h3>
              <p className="text-gray-600 mb-6">
                아이의 발달 수준에 맞는 놀이 활동과 교육 콘텐츠를
                영상으로 제공하여 집에서도 쉽게 따라할 수 있습니다.
              </p>
              <Link
                href="/videos"
                className="text-ipoten-green font-medium hover:underline"
              >
                학습영상 보기 →
              </Link>
            </div>

            {/* 전문상담 */}
            <div className="text-center p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-ipoten-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-ipoten-gray-dark mb-4">전문 상담</h3>
              <p className="text-gray-600 mb-6">
                자격을 갖춘 전문 상담사와의 1:1 상담을 통해
                아이의 발달에 대한 구체적인 조언을 받을 수 있습니다.
              </p>
              <Link
                href="/booking"
                className="text-ipoten-orange font-medium hover:underline"
              >
                상담예약 하기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 추천 영상 섹션 */}
      <section className="py-20 bg-ipoten-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-ipoten-gray-dark">추천 학습영상</h2>
            <Link
              href="/videos"
              className="text-ipoten-blue font-medium hover:underline"
            >
              전체보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-ipoten-blue to-blue-400 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Star className="w-5 h-5 text-ipoten-yellow fill-current" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-ipoten-gray-dark mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>조회수 {video.viewCount.toLocaleString()}회</span>
                    <span>{Math.floor(video.duration! / 60)}분</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-ipoten-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 시작하세요!
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            우리 아이의 건강한 발달을 위한 첫걸음을 함께 내딛어보세요
          </p>
          <Link
            href="/assessment"
            className="bg-ipoten-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-500 transition-colors duration-200 shadow-lg inline-block"
          >
            무료 발달체크 시작하기
          </Link>
        </div>
      </section>
    </div>
  )
}
