'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react'
import { mockAssessments, mockQuestions, categoryNames, categoryColors } from '@/lib/mockData'
import { Assessment, Question, QuestionType, AnswerType } from '@/lib/types'

interface QuestionGroup {
  orderIndex: number
  q1: Question
  q2?: Question
  q3?: Question
}

export default function AssessmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const assessmentId = params.id as string
  const childId = searchParams.get('child')

  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [questionGroups, setQuestionGroups] = useState<QuestionGroup[]>([])
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, AnswerType>>({})
  const [currentQuestionType, setCurrentQuestionType] = useState<QuestionType>('q1')

  useEffect(() => {
    // 평가 정보 로드
    const foundAssessment = mockAssessments.find(a => a.id === assessmentId)
    if (foundAssessment) {
      setAssessment(foundAssessment)

      // 해당 평가의 질문들을 그룹별로 정리
      const questions = mockQuestions.filter(q => q.assessmentId === assessmentId)
      const groups: QuestionGroup[] = []

      // orderIndex별로 질문들을 그룹화
      const groupedByOrder = questions.reduce((acc, question) => {
        if (!acc[question.orderIndex]) {
          acc[question.orderIndex] = {} as Record<QuestionType, Question>
        }
        acc[question.orderIndex][question.questionType] = question
        return acc
      }, {} as Record<number, Record<QuestionType, Question>>)

      // QuestionGroup 배열로 변환
      Object.keys(groupedByOrder).forEach(orderStr => {
        const order = parseInt(orderStr)
        const questionSet = groupedByOrder[order]
        if (questionSet.q1) {
          groups.push({
            orderIndex: order,
            q1: questionSet.q1,
            q2: questionSet.q2,
            q3: questionSet.q3
          })
        }
      })

      // orderIndex로 정렬
      groups.sort((a, b) => a.orderIndex - b.orderIndex)
      setQuestionGroups(groups)
    }
  }, [assessmentId])

  if (!assessment || questionGroups.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ipoten-blue mx-auto mb-4"></div>
          <p className="text-gray-600">평가를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  const currentGroup = questionGroups[currentGroupIndex]
  const currentQuestion = currentGroup[currentQuestionType]
  const progress = ((currentGroupIndex + 1) / questionGroups.length) * 100

  const handleAnswer = (answer: AnswerType) => {
    if (!currentQuestion) return

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }))

    // Q1에서 'yes'라면 다음 문항 그룹으로
    if (currentQuestionType === 'q1' && answer === 'yes') {
      nextGroup()
    }
    // Q1에서 'no' 또는 'partial'이라면 Q2로
    else if (currentQuestionType === 'q1' && (answer === 'no' || answer === 'partial')) {
      if (currentGroup.q2) {
        setCurrentQuestionType('q2')
      } else {
        nextGroup()
      }
    }
    // Q2에서 'yes'라면 다음 문항 그룹으로
    else if (currentQuestionType === 'q2' && answer === 'yes') {
      nextGroup()
    }
    // Q2에서 'no' 또는 'partial'이라면 Q3로
    else if (currentQuestionType === 'q2' && (answer === 'no' || answer === 'partial')) {
      if (currentGroup.q3) {
        setCurrentQuestionType('q3')
      } else {
        nextGroup()
      }
    }
    // Q3에서는 답변 후 다음 그룹으로
    else if (currentQuestionType === 'q3') {
      nextGroup()
    }
  }

  const nextGroup = () => {
    if (currentGroupIndex < questionGroups.length - 1) {
      setCurrentGroupIndex(prev => prev + 1)
      setCurrentQuestionType('q1')
    } else {
      // 평가 완료
      completeAssessment()
    }
  }

  const completeAssessment = () => {
    // 결과 계산 및 저장
    const totalQuestions = Object.keys(answers).length
    const yesAnswers = Object.values(answers).filter(answer => answer === 'yes').length
    const score = Math.round((yesAnswers / totalQuestions) * 100)

    // 발달지연 신호 체크
    const delaySignals = questionGroups.reduce((count, group) => {
      const q1Answer = answers[group.q1.id]
      if (group.q1.isDelayIndicator && q1Answer === 'no') {
        return count + 1
      }
      return count
    }, 0)

    // 결과 페이지로 이동
    router.push(`/assessment/${assessmentId}/result?child=${childId}&score=${score}&delays=${delaySignals}`)
  }

  const goToPrevious = () => {
    if (currentQuestionType === 'q2') {
      setCurrentQuestionType('q1')
    } else if (currentQuestionType === 'q3') {
      setCurrentQuestionType('q2')
    } else if (currentGroupIndex > 0) {
      setCurrentGroupIndex(prev => prev - 1)
      setCurrentQuestionType('q1')
    }
  }

  const getQuestionTypeLabel = (type: QuestionType) => {
    switch (type) {
      case 'q1': return '기본 평가'
      case 'q2': return '조건 변경'
      case 'q3': return '대체 반응'
    }
  }

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

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-ipoten-gray-dark">
              {categoryNames[assessment.category]}
            </h1>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[assessment.category]} text-white`}>
              {assessment.ageRange}
            </div>
          </div>

          {/* 진행률 */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>진행률</span>
              <span>{currentGroupIndex + 1} / {questionGroups.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-ipoten-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 질문 카드 */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-ipoten-blue">
                문항 {currentGroup.orderIndex} - {getQuestionTypeLabel(currentQuestionType)}
              </span>
              {currentQuestion?.isDelayIndicator && (
                <div className="flex items-center text-amber-600">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  <span className="text-sm">발달지연 신호</span>
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold text-ipoten-gray-dark mb-6">
              {currentQuestion?.content}
            </h2>
          </div>

          {/* 답변 버튼 */}
          <div className="space-y-4">
            <button
              onClick={() => handleAnswer('yes')}
              className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-ipoten-green hover:bg-green-50 transition-colors duration-200"
            >
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 text-ipoten-green mr-3" />
                <span className="font-medium text-ipoten-gray-dark">네, 할 수 있어요</span>
              </div>
            </button>

            <button
              onClick={() => handleAnswer('partial')}
              className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-ipoten-orange hover:bg-orange-50 transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="w-5 h-5 bg-ipoten-orange rounded-full mr-3"></div>
                <span className="font-medium text-ipoten-gray-dark">부분적으로 할 수 있어요</span>
              </div>
            </button>

            <button
              onClick={() => handleAnswer('no')}
              className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-ipoten-red hover:bg-red-50 transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="w-5 h-5 bg-ipoten-red rounded-full mr-3"></div>
                <span className="font-medium text-ipoten-gray-dark">아직 어려워요</span>
              </div>
            </button>
          </div>
        </div>

        {/* 네비게이션 */}
        <div className="flex justify-between">
          <button
            onClick={goToPrevious}
            disabled={currentGroupIndex === 0 && currentQuestionType === 'q1'}
            className="flex items-center px-4 py-2 text-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전
          </button>

          <div className="text-sm text-gray-500 self-center">
            {currentQuestionType === 'q1' && (
              <span>기본 문항입니다. 할 수 있다면 &apos;네&apos;를, 어렵다면 다른 선택지를 선택해주세요.</span>
            )}
            {currentQuestionType === 'q2' && (
              <span>조건을 변경한 문항입니다.</span>
            )}
            {currentQuestionType === 'q3' && (
              <span>더 쉬운 대체 과제입니다.</span>
            )}
          </div>

          <div className="w-16"></div> {/* 균형을 위한 빈 공간 */}
        </div>
      </div>
    </div>
  )
}