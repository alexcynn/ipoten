import { createClient } from '@supabase/supabase-js'

// Supabase 설정 주석 처리 (환경 변수 설정 후 활성화)
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 임시 mock 객체
export const supabase = null as any

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string | null
          phone: string | null
          address: string | null
          role: 'parent' | 'counselor' | 'admin'
          bio: string | null
          certification: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string | null
          phone?: string | null
          address?: string | null
          role: 'parent' | 'counselor' | 'admin'
          bio?: string | null
          certification?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string | null
          phone?: string | null
          address?: string | null
          role?: 'parent' | 'counselor' | 'admin'
          bio?: string | null
          certification?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      children: {
        Row: {
          id: string
          parent_id: string
          name: string
          birth_date: string
          gender: 'male' | 'female'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          name: string
          birth_date: string
          gender: 'male' | 'female'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          name?: string
          birth_date?: string
          gender?: 'male' | 'female'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          title: string
          description: string | null
          age_range: string
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          age_range: string
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          age_range?: string
          category?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'parent' | 'counselor' | 'admin'
      child_gender: 'male' | 'female'
      assessment_category: 'gross_motor' | 'fine_motor' | 'cognitive' | 'language' | 'social_emotional' | 'daily_living'
    }
  }
}