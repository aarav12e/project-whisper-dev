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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      anc_records: {
        Row: {
          blood_pressure: string | null
          complications: string | null
          created_at: string | null
          created_by: string
          delivery_date_estimate: string | null
          hemoglobin: number | null
          id: string
          next_visit_date: string | null
          patient_id: string
          risk_factors: Json | null
          synced_at: string | null
          updated_at: string | null
          visit_date: string
          visit_number: number
          weeks_pregnant: number | null
          weight_kg: number | null
        }
        Insert: {
          blood_pressure?: string | null
          complications?: string | null
          created_at?: string | null
          created_by: string
          delivery_date_estimate?: string | null
          hemoglobin?: number | null
          id?: string
          next_visit_date?: string | null
          patient_id: string
          risk_factors?: Json | null
          synced_at?: string | null
          updated_at?: string | null
          visit_date: string
          visit_number: number
          weeks_pregnant?: number | null
          weight_kg?: number | null
        }
        Update: {
          blood_pressure?: string | null
          complications?: string | null
          created_at?: string | null
          created_by?: string
          delivery_date_estimate?: string | null
          hemoglobin?: number | null
          id?: string
          next_visit_date?: string | null
          patient_id?: string
          risk_factors?: Json | null
          synced_at?: string | null
          updated_at?: string | null
          visit_date?: string
          visit_number?: number
          weeks_pregnant?: number | null
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "anc_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          age: number
          contact_number: string | null
          created_at: string | null
          created_by: string
          family_details: Json | null
          full_name: string
          gender: Database["public"]["Enums"]["gender"]
          gps_latitude: number | null
          gps_longitude: number | null
          id: string
          is_pregnant: boolean | null
          medical_history: Json | null
          photo_url: string | null
          synced_at: string | null
          updated_at: string | null
          village: string | null
        }
        Insert: {
          address?: string | null
          age: number
          contact_number?: string | null
          created_at?: string | null
          created_by: string
          family_details?: Json | null
          full_name: string
          gender: Database["public"]["Enums"]["gender"]
          gps_latitude?: number | null
          gps_longitude?: number | null
          id?: string
          is_pregnant?: boolean | null
          medical_history?: Json | null
          photo_url?: string | null
          synced_at?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Update: {
          address?: string | null
          age?: number
          contact_number?: string | null
          created_at?: string | null
          created_by?: string
          family_details?: Json | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender"]
          gps_latitude?: number | null
          gps_longitude?: number | null
          id?: string
          is_pregnant?: boolean | null
          medical_history?: Json | null
          photo_url?: string | null
          synced_at?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          area_assigned: string | null
          avatar_url: string | null
          created_at: string | null
          full_name: string
          id: string
          language_preference: string | null
          phone: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          updated_at: string | null
        }
        Insert: {
          area_assigned?: string | null
          avatar_url?: string | null
          created_at?: string | null
          full_name: string
          id: string
          language_preference?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string | null
        }
        Update: {
          area_assigned?: string | null
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          language_preference?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vaccinations: {
        Row: {
          administered_by: string
          administered_date: string | null
          batch_number: string | null
          created_at: string | null
          due_date: string
          id: string
          next_due_date: string | null
          notes: string | null
          patient_id: string
          status: Database["public"]["Enums"]["vaccination_status"] | null
          synced_at: string | null
          updated_at: string | null
          vaccine_name: string
        }
        Insert: {
          administered_by: string
          administered_date?: string | null
          batch_number?: string | null
          created_at?: string | null
          due_date: string
          id?: string
          next_due_date?: string | null
          notes?: string | null
          patient_id: string
          status?: Database["public"]["Enums"]["vaccination_status"] | null
          synced_at?: string | null
          updated_at?: string | null
          vaccine_name: string
        }
        Update: {
          administered_by?: string
          administered_date?: string | null
          batch_number?: string | null
          created_at?: string | null
          due_date?: string
          id?: string
          next_due_date?: string | null
          notes?: string | null
          patient_id?: string
          status?: Database["public"]["Enums"]["vaccination_status"] | null
          synced_at?: string | null
          updated_at?: string | null
          vaccine_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "vaccinations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      visits: {
        Row: {
          chief_complaint: string | null
          created_at: string | null
          created_by: string
          follow_up_date: string | null
          gps_latitude: number | null
          gps_longitude: number | null
          id: string
          patient_id: string
          photos: Json | null
          referral_details: string | null
          referral_required: boolean | null
          status: Database["public"]["Enums"]["visit_status"] | null
          symptoms: Json | null
          synced_at: string | null
          treatment_given: string | null
          updated_at: string | null
          visit_date: string | null
          voice_notes_url: string | null
        }
        Insert: {
          chief_complaint?: string | null
          created_at?: string | null
          created_by: string
          follow_up_date?: string | null
          gps_latitude?: number | null
          gps_longitude?: number | null
          id?: string
          patient_id: string
          photos?: Json | null
          referral_details?: string | null
          referral_required?: boolean | null
          status?: Database["public"]["Enums"]["visit_status"] | null
          symptoms?: Json | null
          synced_at?: string | null
          treatment_given?: string | null
          updated_at?: string | null
          visit_date?: string | null
          voice_notes_url?: string | null
        }
        Update: {
          chief_complaint?: string | null
          created_at?: string | null
          created_by?: string
          follow_up_date?: string | null
          gps_latitude?: number | null
          gps_longitude?: number | null
          id?: string
          patient_id?: string
          photos?: Json | null
          referral_details?: string | null
          referral_required?: boolean | null
          status?: Database["public"]["Enums"]["visit_status"] | null
          symptoms?: Json | null
          synced_at?: string | null
          treatment_given?: string | null
          updated_at?: string | null
          visit_date?: string | null
          voice_notes_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visits_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "asha_worker" | "phc_staff" | "admin"
      gender: "male" | "female" | "other"
      vaccination_status: "due" | "completed" | "overdue"
      visit_status: "scheduled" | "completed" | "cancelled"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["asha_worker", "phc_staff", "admin"],
      gender: ["male", "female", "other"],
      vaccination_status: ["due", "completed", "overdue"],
      visit_status: ["scheduled", "completed", "cancelled"],
    },
  },
} as const
