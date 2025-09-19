// 타입 정의
export type UserRole = 'parent' | 'counselor' | 'admin'
export type ChildGender = 'male' | 'female'
export type AssessmentCategory = 'gross_motor' | 'fine_motor' | 'cognitive' | 'language' | 'social_emotional' | 'daily_living'
export type QuestionType = 'q1' | 'q2' | 'q3'
export type AnswerType = 'yes' | 'no' | 'partial'
export type SessionStatus = 'open' | 'booked' | 'completed' | 'cancelled'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
  phone?: string
  address?: string
  bio?: string
  certification?: string
  createdAt: string
  updatedAt: string
}

export interface Child {
  id: string
  parentId: string
  name: string
  birthDate: string
  gender: ChildGender
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Assessment {
  id: string
  title: string
  description?: string
  ageRange: string
  category: AssessmentCategory
  isDelayIndicator: boolean
  createdAt: string
  updatedAt: string
}

export interface Question {
  id: string
  assessmentId: string
  content: string
  questionType: QuestionType
  orderIndex: number
  isDelayIndicator: boolean
  createdAt: string
}

export interface AssessmentResult {
  id: string
  childId: string
  assessmentId: string
  completedAt: string
  totalScore: number
  delayIndicatorsCount: number
  notes?: string
  createdAt: string
}

export interface QuestionAnswer {
  id: string
  assessmentResultId: string
  questionId: string
  answer: AnswerType
  notes?: string
  createdAt: string
}

export interface Report {
  id: string
  assessmentResultId: string
  title: string
  content: string
  recommendations?: string
  delayWarning: boolean
  generatedAt: string
  createdAt: string
}

export interface Video {
  id: string
  title: string
  description?: string
  url: string
  category?: AssessmentCategory
  ageRange?: string
  thumbnailUrl?: string
  duration?: number
  viewCount: number
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export interface CounselorSession {
  id: string
  counselorId: string
  sessionDate: string
  startTime: string
  endTime: string
  price: number
  maxParticipants: number
  description?: string
  status: SessionStatus
  createdAt: string
  updatedAt: string
  counselor?: User
}

export interface Booking {
  id: string
  sessionId: string
  parentId: string
  childId: string
  status: BookingStatus
  specialRequests?: string
  createdAt: string
  updatedAt: string
  session?: CounselorSession
  parent?: User
  child?: Child
}

export interface Payment {
  id: string
  bookingId: string
  amount: number
  status: PaymentStatus
  paymentMethod?: string
  transactionId?: string
  paymentDate?: string
  createdAt: string
  updatedAt: string
}