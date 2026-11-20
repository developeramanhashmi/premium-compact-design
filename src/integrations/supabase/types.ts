export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      certificates: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          href: string
          id: string
          name: string
          tag: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          href: string
          id: string
          name: string
          tag: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          href?: string
          id?: string
          name?: string
          tag?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      education_experience: {
        Row: {
          description: string
          display_order: number | null
          grade: string | null
          id: string
          organization: string
          period: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          description: string
          display_order?: number | null
          grade?: string | null
          id: string
          organization: string
          period: string
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          description?: string
          display_order?: number | null
          grade?: string | null
          id?: string
          organization?: string
          period?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      inbox: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          alternate_name: string | null
          badge: string | null
          bio: string | null
          email: string
          github: string | null
          id: string
          linkedin: string | null
          location: string | null
          name: string
          title: string
          twitter: string | null
          updated_at: string | null
          whatsapp: string | null
        }
        Insert: {
          alternate_name?: string | null
          badge?: string | null
          bio?: string | null
          email: string
          github?: string | null
          id?: string
          linkedin?: string | null
          location?: string | null
          name: string
          title: string
          twitter?: string | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Update: {
          alternate_name?: string | null
          badge?: string | null
          bio?: string | null
          email?: string
          github?: string | null
          id?: string
          linkedin?: string | null
          location?: string | null
          name?: string
          title?: string
          twitter?: string | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          cta: string | null
          description: string
          display_order: number | null
          features: string[] | null
          github_href: string | null
          href: string
          id: string
          tag: string
          tech: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          cta?: string | null
          description: string
          display_order?: number | null
          features?: string[] | null
          github_href?: string | null
          href: string
          id: string
          tag: string
          tech?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          cta?: string | null
          description?: string
          display_order?: number | null
          features?: string[] | null
          github_href?: string | null
          href?: string
          id?: string
          tag?: string
          tech?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_analytics: {
        Row: {
          browser: string | null
          created_at: string
          device_type: string | null
          id: string
          page_path: string
          referrer: string | null
          screen_resolution: string | null
          session_id: string | null
        }
        Insert: {
          browser?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          page_path?: string
          referrer?: string | null
          screen_resolution?: string | null
          session_id?: string | null
        }
        Update: {
          browser?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          page_path?: string
          referrer?: string | null
          screen_resolution?: string | null
          session_id?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          display_order: number | null
          id: string
          level: number
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          display_order?: number | null
          id?: string
          level: number
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          display_order?: number | null
          id?: string
          level?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          company: string
          content: string
          created_at: string | null
          display_order: number
          id: string
          is_featured: boolean
          name: string
          project_tag: string | null
          rating: number
          role: string
        }
        Insert: {
          avatar_url?: string | null
          company: string
          content: string
          created_at?: string | null
          display_order?: number
          id?: string
          is_featured?: boolean
          name: string
          project_tag?: string | null
          rating?: number
          role: string
        }
        Update: {
          avatar_url?: string | null
          company?: string
          content?: string
          created_at?: string | null
          display_order?: number
          id?: string
          is_featured?: boolean
          name?: string
          project_tag?: string | null
          rating?: number
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
