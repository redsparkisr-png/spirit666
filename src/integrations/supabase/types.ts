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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          display_order: number
          id: string
          name_en: string
          name_he: string
          slug: string
        }
        Insert: {
          display_order?: number
          id?: string
          name_en: string
          name_he: string
          slug: string
        }
        Update: {
          display_order?: number
          id?: string
          name_en?: string
          name_he?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          body_en: string
          body_he: string
          canonical_url: string | null
          category: string | null
          created_at: string
          excerpt_en: string
          excerpt_he: string
          featured_image: string | null
          id: string
          meta_description_en: string | null
          meta_description_he: string | null
          noindex: boolean
          og_image: string | null
          publish_date: string
          reading_time_minutes: number
          seo_title_en: string | null
          seo_title_he: string | null
          slug: string
          status: string
          tags: string[] | null
          title_en: string
          title_he: string
          updated_at: string
        }
        Insert: {
          author?: string
          body_en?: string
          body_he?: string
          canonical_url?: string | null
          category?: string | null
          created_at?: string
          excerpt_en?: string
          excerpt_he?: string
          featured_image?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_he?: string | null
          noindex?: boolean
          og_image?: string | null
          publish_date?: string
          reading_time_minutes?: number
          seo_title_en?: string | null
          seo_title_he?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title_en?: string
          title_he?: string
          updated_at?: string
        }
        Update: {
          author?: string
          body_en?: string
          body_he?: string
          canonical_url?: string | null
          category?: string | null
          created_at?: string
          excerpt_en?: string
          excerpt_he?: string
          featured_image?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_he?: string | null
          noindex?: boolean
          og_image?: string | null
          publish_date?: string
          reading_time_minutes?: number
          seo_title_en?: string | null
          seo_title_he?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title_en?: string
          title_he?: string
          updated_at?: string
        }
        Relationships: []
      }
      buyer_guide_sections: {
        Row: {
          body: string
          id: string
          image_captions: string[] | null
          images: string[] | null
          quote_source: string | null
          quote_text: string | null
          section_number: number
          subtitle: string
          title: string
          updated_at: string
        }
        Insert: {
          body?: string
          id?: string
          image_captions?: string[] | null
          images?: string[] | null
          quote_source?: string | null
          quote_text?: string | null
          section_number: number
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Update: {
          body?: string
          id?: string
          image_captions?: string[] | null
          images?: string[] | null
          quote_source?: string | null
          quote_text?: string | null
          section_number?: number
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      crm_activities: {
        Row: {
          action_type: string
          created_at: string
          description: string | null
          id: string
          lead_id: string
          metadata: Json | null
          performed_by: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          description?: string | null
          id?: string
          lead_id: string
          metadata?: Json | null
          performed_by?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          description?: string | null
          id?: string
          lead_id?: string
          metadata?: Json | null
          performed_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_leads: {
        Row: {
          ad_content: string | null
          assigned_to: string | null
          budget_currency: string | null
          budget_max: number | null
          budget_min: number | null
          buyer_type: string | null
          campaign: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          entry_point: string | null
          financing_needed: boolean | null
          first_page_visited: string | null
          full_name: string
          guide_requested: boolean | null
          id: string
          landing_page: string | null
          language: string | null
          last_contacted_at: string | null
          lead_score: number | null
          medium: string | null
          motivation_notes: string | null
          must_have_features: string[] | null
          next_action: string | null
          next_followup_date: string | null
          next_followup_type: string | null
          original_message: string | null
          phone: string | null
          pipeline_stage: string
          preferred_neighborhoods: string[] | null
          priority: string | null
          property_type_preference: string | null
          public_lead_id: string | null
          related_property: string | null
          source: string
          status: string
          temperature: string | null
          timeline_to_buy: string | null
          timezone: string | null
          updated_at: string
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
          whatsapp: string | null
        }
        Insert: {
          ad_content?: string | null
          assigned_to?: string | null
          budget_currency?: string | null
          budget_max?: number | null
          budget_min?: number | null
          buyer_type?: string | null
          campaign?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          entry_point?: string | null
          financing_needed?: boolean | null
          first_page_visited?: string | null
          full_name: string
          guide_requested?: boolean | null
          id?: string
          landing_page?: string | null
          language?: string | null
          last_contacted_at?: string | null
          lead_score?: number | null
          medium?: string | null
          motivation_notes?: string | null
          must_have_features?: string[] | null
          next_action?: string | null
          next_followup_date?: string | null
          next_followup_type?: string | null
          original_message?: string | null
          phone?: string | null
          pipeline_stage?: string
          preferred_neighborhoods?: string[] | null
          priority?: string | null
          property_type_preference?: string | null
          public_lead_id?: string | null
          related_property?: string | null
          source?: string
          status?: string
          temperature?: string | null
          timeline_to_buy?: string | null
          timezone?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Update: {
          ad_content?: string | null
          assigned_to?: string | null
          budget_currency?: string | null
          budget_max?: number | null
          budget_min?: number | null
          buyer_type?: string | null
          campaign?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          entry_point?: string | null
          financing_needed?: boolean | null
          first_page_visited?: string | null
          full_name?: string
          guide_requested?: boolean | null
          id?: string
          landing_page?: string | null
          language?: string | null
          last_contacted_at?: string | null
          lead_score?: number | null
          medium?: string | null
          motivation_notes?: string | null
          must_have_features?: string[] | null
          next_action?: string | null
          next_followup_date?: string | null
          next_followup_type?: string | null
          original_message?: string | null
          phone?: string | null
          pipeline_stage?: string
          preferred_neighborhoods?: string[] | null
          priority?: string | null
          property_type_preference?: string | null
          public_lead_id?: string | null
          related_property?: string | null
          source?: string
          status?: string
          temperature?: string | null
          timeline_to_buy?: string | null
          timezone?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crm_leads_public_lead_id_fkey"
            columns: ["public_lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_notes: {
        Row: {
          content: string
          created_at: string
          created_by: string
          id: string
          is_pinned: boolean | null
          lead_id: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by: string
          id?: string
          is_pinned?: boolean | null
          lead_id: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string
          id?: string
          is_pinned?: boolean | null
          lead_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_tasks: {
        Row: {
          action_type: string
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          due_date: string
          due_time: string | null
          id: string
          lead_id: string | null
          notes: string | null
          status: string
        }
        Insert: {
          action_type?: string
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          due_date: string
          due_time?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          status?: string
        }
        Update: {
          action_type?: string
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          due_date?: string
          due_time?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "crm_tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "crm_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          message: string | null
          notes: string | null
          phone: string | null
          source: string
          status: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          message?: string | null
          notes?: string | null
          phone?: string | null
          source?: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          message?: string | null
          notes?: string | null
          phone?: string | null
          source?: string
          status?: string
        }
        Relationships: []
      }
      lifestyle_gallery: {
        Row: {
          alt_en: string | null
          alt_he: string | null
          caption: string | null
          category: string | null
          description_en: string | null
          description_he: string | null
          display_order: number
          id: string
          image_url: string
          is_hero: boolean
          title_en: string | null
          title_he: string | null
        }
        Insert: {
          alt_en?: string | null
          alt_he?: string | null
          caption?: string | null
          category?: string | null
          description_en?: string | null
          description_he?: string | null
          display_order?: number
          id?: string
          image_url: string
          is_hero?: boolean
          title_en?: string | null
          title_he?: string | null
        }
        Update: {
          alt_en?: string | null
          alt_he?: string | null
          caption?: string | null
          category?: string | null
          description_en?: string | null
          description_he?: string | null
          display_order?: number
          id?: string
          image_url?: string
          is_hero?: boolean
          title_en?: string | null
          title_he?: string | null
        }
        Relationships: []
      }
      properties_available: {
        Row: {
          bathrooms: number | null
          bedrooms: number | null
          built_sqm: number | null
          created_at: string
          currency: string
          featured: boolean
          full_description: string | null
          full_description_he: string | null
          google_maps_url: string | null
          id: string
          images: string[] | null
          location: string | null
          lot_sqm: number | null
          mamad: boolean | null
          meta_description: string | null
          meta_title: string | null
          neighborhood_note: string | null
          og_image: string | null
          parking: string | null
          price_label: string | null
          price_number: number | null
          price_status: string
          priority_order: number
          property_status: string
          property_type: string | null
          short_description: string | null
          short_description_he: string | null
          slug: string | null
          storage: boolean | null
          tags: string[] | null
          title: string
          title_he: string | null
        }
        Insert: {
          bathrooms?: number | null
          bedrooms?: number | null
          built_sqm?: number | null
          created_at?: string
          currency?: string
          featured?: boolean
          full_description?: string | null
          full_description_he?: string | null
          google_maps_url?: string | null
          id?: string
          images?: string[] | null
          location?: string | null
          lot_sqm?: number | null
          mamad?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          neighborhood_note?: string | null
          og_image?: string | null
          parking?: string | null
          price_label?: string | null
          price_number?: number | null
          price_status?: string
          priority_order?: number
          property_status?: string
          property_type?: string | null
          short_description?: string | null
          short_description_he?: string | null
          slug?: string | null
          storage?: boolean | null
          tags?: string[] | null
          title: string
          title_he?: string | null
        }
        Update: {
          bathrooms?: number | null
          bedrooms?: number | null
          built_sqm?: number | null
          created_at?: string
          currency?: string
          featured?: boolean
          full_description?: string | null
          full_description_he?: string | null
          google_maps_url?: string | null
          id?: string
          images?: string[] | null
          location?: string | null
          lot_sqm?: number | null
          mamad?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          neighborhood_note?: string | null
          og_image?: string | null
          parking?: string | null
          price_label?: string | null
          price_number?: number | null
          price_status?: string
          priority_order?: number
          property_status?: string
          property_type?: string | null
          short_description?: string | null
          short_description_he?: string | null
          slug?: string | null
          storage?: boolean | null
          tags?: string[] | null
          title?: string
          title_he?: string | null
        }
        Relationships: []
      }
      properties_sold: {
        Row: {
          bedrooms: number | null
          built_sqm: number | null
          created_at: string
          currency: string
          id: string
          images: string[] | null
          lot_sqm: number | null
          neighborhood_note: string | null
          price_label: string | null
          price_number: number | null
          short_description: string | null
          sold_date: string | null
          title: string
        }
        Insert: {
          bedrooms?: number | null
          built_sqm?: number | null
          created_at?: string
          currency?: string
          id?: string
          images?: string[] | null
          lot_sqm?: number | null
          neighborhood_note?: string | null
          price_label?: string | null
          price_number?: number | null
          short_description?: string | null
          sold_date?: string | null
          title: string
        }
        Update: {
          bedrooms?: number | null
          built_sqm?: number | null
          created_at?: string
          currency?: string
          id?: string
          images?: string[] | null
          lot_sqm?: number | null
          neighborhood_note?: string | null
          price_label?: string | null
          price_number?: number | null
          short_description?: string | null
          sold_date?: string | null
          title?: string
        }
        Relationships: []
      }
      search_locations: {
        Row: {
          display_order: number
          id: string
          name_en: string
          name_he: string
        }
        Insert: {
          display_order?: number
          id?: string
          name_en: string
          name_he: string
        }
        Update: {
          display_order?: number
          id?: string
          name_en?: string
          name_he?: string
        }
        Relationships: []
      }
      search_property_types: {
        Row: {
          display_order: number
          id: string
          name_en: string
          name_he: string
        }
        Insert: {
          display_order?: number
          id?: string
          name_en: string
          name_he: string
        }
        Update: {
          display_order?: number
          id?: string
          name_en?: string
          name_he?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          id: string
          key: string
          page: string
          section: string
          updated_at: string
          value_en: string
          value_he: string
        }
        Insert: {
          id?: string
          key: string
          page?: string
          section?: string
          updated_at?: string
          value_en?: string
          value_he?: string
        }
        Update: {
          id?: string
          key?: string
          page?: string
          section?: string
          updated_at?: string
          value_en?: string
          value_he?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          country: string | null
          created_at: string
          display_order: number
          id: string
          initials: string | null
          is_featured: boolean | null
          name: string
          photo_url: string | null
          quote_en: string
          quote_he: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          display_order?: number
          id?: string
          initials?: string | null
          is_featured?: boolean | null
          name?: string
          photo_url?: string | null
          quote_en?: string
          quote_he?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          display_order?: number
          id?: string
          initials?: string | null
          is_featured?: boolean | null
          name?: string
          photo_url?: string | null
          quote_en?: string
          quote_he?: string | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_crm_access: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "super_admin" | "lead_manager"
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
      app_role: ["admin", "super_admin", "lead_manager"],
    },
  },
} as const
