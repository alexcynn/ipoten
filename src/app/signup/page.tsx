'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react'
import { createSupabaseBrowser } from '@/lib/supabase-browser'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    role: 'parent' as 'parent' | 'counselor'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createSupabaseBrowser()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      setLoading(false)
      return
    }

    // 비밀번호 길이 체크
    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.')
      setLoading(false)
      return
    }

    try {
      // Supabase 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            role: formData.role,
          }
        }
      })

      if (authError) {
        setError(authError.message)
      } else if (authData.user) {
        // 프로필 데이터 생성
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              user_id: authData.user.id,
              name: formData.name,
              phone: formData.phone,
              role: formData.role,
            }
          ])

        if (profileError) {
          console.error('Profile creation error:', profileError)
        }

        // 회원가입 성공 - 이메일 확인 안내
        alert('회원가입이 완료되었습니다. 이메일을 확인해주세요.')
        router.push('/login')
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ipoten-gray-light to-white flex flex-col">
      {/* 헤더 */}
      <div className="p-4">
        <Link href="/" className="inline-flex items-center text-ipoten-gray-dark hover:text-ipoten-blue">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>홈으로</span>
        </Link>
      </div>

      {/* 회원가입 폼 */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Image
              src="/aipoten.png"
              alt="아이포텐"
              width={150}
              height={50}
              className="mx-auto h-12 w-auto mb-8"
              priority
            />
            <h2 className="text-3xl font-bold text-ipoten-gray-dark">회원가입</h2>
            <p className="mt-2 text-sm text-gray-600">
              아이포텐의 새로운 회원이 되어주세요
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* 회원 유형 선택 */}
              <div>
                <label className="block text-sm font-medium text-ipoten-gray-dark mb-2">
                  회원 유형
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'parent' }))}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.role === 'parent'
                        ? 'border-ipoten-blue bg-blue-50 text-ipoten-blue'
                        : 'border-gray-300 bg-white text-gray-700'
                    }`}
                  >
                    <span className="font-medium">학부모</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'counselor' }))}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.role === 'counselor'
                        ? 'border-ipoten-blue bg-blue-50 text-ipoten-blue'
                        : 'border-gray-300 bg-white text-gray-700'
                    }`}
                  >
                    <span className="font-medium">상담사</span>
                  </button>
                </div>
              </div>

              {/* 이름 입력 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ipoten-gray-dark mb-2">
                  이름
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-ipoten-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-ipoten-blue focus:border-transparent"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* 이메일 입력 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ipoten-gray-dark mb-2">
                  이메일
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-ipoten-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-ipoten-blue focus:border-transparent"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* 전화번호 입력 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-ipoten-gray-dark mb-2">
                  전화번호
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-ipoten-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-ipoten-blue focus:border-transparent"
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-ipoten-gray-dark mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-ipoten-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-ipoten-blue focus:border-transparent"
                    placeholder="6자 이상"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-ipoten-gray-dark mb-2">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-ipoten-gray-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-ipoten-blue focus:border-transparent"
                    placeholder="비밀번호 재입력"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-ipoten-blue focus:ring-ipoten-blue border-gray-300 rounded mt-0.5"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  <Link href="/terms" className="text-ipoten-blue hover:text-blue-600">
                    이용약관
                  </Link>
                  에 동의합니다 (필수)
                </label>
              </div>
              <div className="flex items-start">
                <input
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-ipoten-blue focus:ring-ipoten-blue border-gray-300 rounded mt-0.5"
                />
                <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                  <Link href="/privacy" className="text-ipoten-blue hover:text-blue-600">
                    개인정보 처리방침
                  </Link>
                  에 동의합니다 (필수)
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-ipoten-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ipoten-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? '가입 중...' : '회원가입'}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                이미 회원이신가요?{' '}
                <Link href="/login" className="font-medium text-ipoten-blue hover:text-blue-600">
                  로그인
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}