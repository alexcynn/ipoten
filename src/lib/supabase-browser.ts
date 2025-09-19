import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './supabase'

export function createSupabaseBrowser() {
  // Supabase 연결 주석 처리 (환경 변수 설정 후 활성화)
  // return createBrowserClient<Database>(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // )

  // 임시 mock 객체 반환
  return {
    auth: {
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase가 연결되지 않았습니다.' } }),
      signUp: async () => ({ data: null, error: { message: 'Supabase가 연결되지 않았습니다.' } }),
    },
    from: () => ({
      insert: async () => ({ error: null }),
      select: async () => ({ data: null, error: null }),
    })
  } as any
}