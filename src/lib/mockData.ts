import {
  User,
  Child,
  Assessment,
  Question,
  AssessmentResult,
  Video,
  CounselorSession,
  AssessmentCategory
} from './types'

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'parent1@example.com',
    role: 'parent',
    name: '김미영',
    phone: '010-1234-5678',
    address: '서울시 강남구',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'counselor1@example.com',
    role: 'counselor',
    name: '박상담',
    phone: '010-9876-5432',
    bio: '유아 발달 전문 상담사입니다. 10년 이상의 경험을 보유하고 있습니다.',
    certification: '유아교육학 석사, 발달심리상담사 1급',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

// Mock Children
export const mockChildren: Child[] = [
  {
    id: '1',
    parentId: '1',
    name: '김도윤',
    birthDate: '2022-03-15',
    gender: 'male',
    notes: '활발하고 호기심이 많은 아이입니다.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    parentId: '1',
    name: '김서연',
    birthDate: '2022-06-20',
    gender: 'female',
    notes: '조용하고 신중한 성격입니다.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

// Mock Assessments
export const mockAssessments: Assessment[] = [
  {
    id: '1',
    title: '대근육 운동 발달',
    description: '27-29개월 아동의 대근육 운동 발달을 평가합니다.',
    ageRange: '27-29개월',
    category: 'gross_motor',
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: '소근육 운동 발달',
    description: '27-29개월 아동의 소근육 운동 발달을 평가합니다.',
    ageRange: '27-29개월',
    category: 'fine_motor',
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: '인지 발달',
    description: '27-29개월 아동의 인지 발달을 평가합니다.',
    ageRange: '27-29개월',
    category: 'cognitive',
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    title: '언어 발달',
    description: '27-29개월 아동의 언어 발달을 평가합니다.',
    ageRange: '27-29개월',
    category: 'language',
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    title: '사회성/정서 발달',
    description: '27-29개월 아동의 사회성/정서 발달을 평가합니다.',
    ageRange: '27-29개월',
    category: 'social_emotional',
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    title: '일상생활 기능',
    description: '27-29개월 아동의 일상생활 기능을 평가합니다.',
    ageRange: '27-29개월',
    category: 'daily_living',
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

// Mock Questions (대근육 운동 8문항)
export const mockQuestions: Question[] = [
  // 대근육 운동 A-1
  {
    id: '1',
    assessmentId: '1',
    content: '제자리에서 양발을 모아 동시에 깡충 뛴다.',
    questionType: 'q1',
    orderIndex: 1,
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    assessmentId: '1',
    content: '보호자가 한 손을 잡아줄 때 양발을 모아 뛸 수 있나요?',
    questionType: 'q2',
    orderIndex: 1,
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    assessmentId: '1',
    content: '양발 점프는 어렵다면, 한 발씩 교대로 뛰기 또는 바닥 표시선을 가볍게 넘기기가 되나요?',
    questionType: 'q3',
    orderIndex: 1,
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z'
  },
  // 대근육 운동 A-2
  {
    id: '4',
    assessmentId: '1',
    content: '계단의 가장 낮은 층에서 양발을 모아 바닥으로 뛰어내린다.',
    questionType: 'q1',
    orderIndex: 2,
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    assessmentId: '1',
    content: '잡아줄 때 낮은 층(또는 낮은 턱)에서 양발로 뛰어 내릴 수 있나요?',
    questionType: 'q2',
    orderIndex: 2,
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    assessmentId: '1',
    content: '뛰어내리지는 못하지만, 한 발씩 바닥으로 안정적으로 내려올 수 있나요?',
    questionType: 'q3',
    orderIndex: 2,
    isDelayIndicator: false,
    createdAt: '2024-01-01T00:00:00Z'
  },
  // 언어 발달 중 발달지연 신호 문항
  {
    id: '25',
    assessmentId: '4',
    content: '서로 다른 세 단어를 연결해 문장을 말한다.',
    questionType: 'q1',
    orderIndex: 1,
    isDelayIndicator: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  // 사회성/정서 발달 중 발달지연 신호 문항
  {
    id: '34',
    assessmentId: '5',
    content: '이름을 불러도 대부분 쳐다보지 않는다.',
    questionType: 'q1',
    orderIndex: 6,
    isDelayIndicator: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
]

// Mock Videos
export const mockVideos: Video[] = [
  {
    id: '1',
    title: '27개월 대근육 운동 놀이',
    description: '집에서 할 수 있는 대근육 운동 발달 놀이를 소개합니다.',
    url: 'https://example.com/video1',
    category: 'gross_motor',
    ageRange: '27-29개월',
    thumbnailUrl: '/images/video1-thumb.jpg',
    duration: 300,
    viewCount: 1250,
    isFeatured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: '소근육 발달을 위한 만들기 놀이',
    description: '아이의 소근육 발달에 도움이 되는 만들기 활동입니다.',
    url: 'https://example.com/video2',
    category: 'fine_motor',
    ageRange: '27-29개월',
    thumbnailUrl: '/images/video2-thumb.jpg',
    duration: 420,
    viewCount: 890,
    isFeatured: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: '언어 발달을 위한 대화 놀이',
    description: '아이와 함께하는 언어 발달 촉진 대화법을 알려드립니다.',
    url: 'https://example.com/video3',
    category: 'language',
    ageRange: '27-29개월',
    thumbnailUrl: '/images/video3-thumb.jpg',
    duration: 180,
    viewCount: 2100,
    isFeatured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]

// Mock Counselor Sessions
export const mockSessions: CounselorSession[] = [
  {
    id: '1',
    counselorId: '2',
    sessionDate: '2024-09-25',
    startTime: '10:00',
    endTime: '11:00',
    price: 80000,
    maxParticipants: 1,
    description: '개별 발달 상담 세션입니다.',
    status: 'open',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    counselor: mockUsers[1]
  },
  {
    id: '2',
    counselorId: '2',
    sessionDate: '2024-09-26',
    startTime: '14:00',
    endTime: '15:30',
    price: 120000,
    maxParticipants: 2,
    description: '부모-자녀 상호작용 상담입니다.',
    status: 'open',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    counselor: mockUsers[1]
  }
]

// Mock Assessment Results
export const mockAssessmentResults: AssessmentResult[] = [
  {
    id: '1',
    childId: '1',
    assessmentId: '1',
    completedAt: '2024-09-15T10:30:00Z',
    totalScore: 85,
    delayIndicatorsCount: 0,
    notes: '대근육 운동 발달이 양호합니다.',
    createdAt: '2024-09-15T10:30:00Z'
  },
  {
    id: '2',
    childId: '1',
    assessmentId: '4',
    completedAt: '2024-09-16T11:00:00Z',
    totalScore: 70,
    delayIndicatorsCount: 1,
    notes: '언어 발달에서 약간의 지연이 관찰됩니다.',
    createdAt: '2024-09-16T11:00:00Z'
  }
]

// 카테고리별 이름 매핑
export const categoryNames: Record<AssessmentCategory, string> = {
  gross_motor: '대근육 운동',
  fine_motor: '소근육 운동',
  cognitive: '인지',
  language: '언어',
  social_emotional: '사회성/정서',
  daily_living: '일상생활 기능'
}

// 카테고리별 색상
export const categoryColors: Record<AssessmentCategory, string> = {
  gross_motor: 'bg-ipoten-blue',
  fine_motor: 'bg-ipoten-green',
  cognitive: 'bg-ipoten-orange',
  language: 'bg-ipoten-red',
  social_emotional: 'bg-ipoten-yellow',
  daily_living: 'bg-ipoten-gray-light'
}