-- iPoten 발달 체크 플랫폼 데이터베이스 스키마

-- 사용자 역할 enum
CREATE TYPE user_role AS ENUM ('parent', 'counselor', 'admin');

-- 아동 성별 enum
CREATE TYPE child_gender AS ENUM ('male', 'female');

-- 평가 카테고리 enum
CREATE TYPE assessment_category AS ENUM (
  'gross_motor',      -- 대근육 운동
  'fine_motor',       -- 소근육 운동
  'cognitive',        -- 인지
  'language',         -- 언어
  'social_emotional', -- 사회성/정서
  'daily_living'      -- 일상생활 기능
);

-- 질문 타입 enum
CREATE TYPE question_type AS ENUM ('q1', 'q2', 'q3');

-- 응답 타입 enum
CREATE TYPE answer_type AS ENUM ('yes', 'no', 'partial');

-- 세션 상태 enum
CREATE TYPE session_status AS ENUM ('open', 'booked', 'completed', 'cancelled');

-- 예약 상태 enum
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- 결제 상태 enum
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- 1. 프로필 테이블 (Supabase Auth 확장)
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  name VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  role user_role NOT NULL DEFAULT 'parent',
  bio TEXT, -- 상담사용
  certification TEXT, -- 상담사용
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 아동 테이블
CREATE TABLE children (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  gender child_gender NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 평가 테이블
CREATE TABLE assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  age_range VARCHAR(50) NOT NULL, -- 예: "27-29개월"
  category assessment_category NOT NULL,
  is_delay_indicator BOOLEAN DEFAULT FALSE, -- 발달지연 신호 여부
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 질문 테이블
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  question_type question_type NOT NULL,
  order_index INTEGER NOT NULL,
  is_delay_indicator BOOLEAN DEFAULT FALSE, -- 발달지연 신호 여부
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 평가 결과 테이블
CREATE TABLE assessment_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_score INTEGER,
  delay_indicators_count INTEGER DEFAULT 0, -- 발달지연 신호 개수
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 질문 응답 테이블
CREATE TABLE question_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_result_id UUID REFERENCES assessment_results(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  answer answer_type NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 보고서 테이블
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_result_id UUID REFERENCES assessment_results(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  recommendations TEXT,
  delay_warning BOOLEAN DEFAULT FALSE,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. 동영상 콘텐츠 테이블
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  category assessment_category,
  age_range VARCHAR(50),
  thumbnail_url TEXT,
  duration INTEGER, -- 초 단위
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. 동영상 시청 기록 테이블
CREATE TABLE video_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  child_id UUID REFERENCES children(id) ON DELETE SET NULL,
  watched_duration INTEGER DEFAULT 0, -- 시청한 시간(초)
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. 상담 세션 테이블
CREATE TABLE counselor_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  counselor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  price INTEGER NOT NULL, -- 원 단위
  max_participants INTEGER DEFAULT 1,
  description TEXT,
  status session_status DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. 예약 테이블
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES counselor_sessions(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  child_id UUID REFERENCES children(id) ON DELETE CASCADE,
  status booking_status DEFAULT 'pending',
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. 결제 테이블
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- 원 단위
  status payment_status DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  payment_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 13. 상담 노트 테이블
CREATE TABLE counseling_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  counselor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  recommendations TEXT,
  follow_up_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_children_parent_id ON children(parent_id);
CREATE INDEX idx_children_birth_date ON children(birth_date);
CREATE INDEX idx_questions_assessment_id ON questions(assessment_id);
CREATE INDEX idx_questions_type_order ON questions(question_type, order_index);
CREATE INDEX idx_assessment_results_child_id ON assessment_results(child_id);
CREATE INDEX idx_assessment_results_completed_at ON assessment_results(completed_at);
CREATE INDEX idx_question_answers_result_id ON question_answers(assessment_result_id);
CREATE INDEX idx_video_views_user_id ON video_views(user_id);
CREATE INDEX idx_video_views_video_id ON video_views(video_id);
CREATE INDEX idx_sessions_counselor_id ON counselor_sessions(counselor_id);
CREATE INDEX idx_sessions_date_status ON counselor_sessions(session_date, status);
CREATE INDEX idx_bookings_parent_id ON bookings(parent_id);
CREATE INDEX idx_bookings_session_id ON bookings(session_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(status);

-- RLS (Row Level Security) 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE counseling_notes ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성

-- 프로필 정책
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 아동 정책
CREATE POLICY "Parents can manage their children" ON children FOR ALL USING (
  parent_id IN (SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'parent')
);

-- 평가 결과 정책
CREATE POLICY "Parents can view their children's results" ON assessment_results FOR SELECT USING (
  child_id IN (
    SELECT c.id FROM children c
    JOIN profiles p ON p.id = c.parent_id
    WHERE p.user_id = auth.uid()
  )
);

-- 예약 정책
CREATE POLICY "Parents can manage their bookings" ON bookings FOR ALL USING (
  parent_id IN (SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'parent')
);

-- 상담사 세션 정책
CREATE POLICY "Counselors can manage their sessions" ON counselor_sessions FOR ALL USING (
  counselor_id IN (SELECT id FROM profiles WHERE user_id = auth.uid() AND role = 'counselor')
);

-- 트리거 함수: updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 적용
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON children FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON counselor_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();