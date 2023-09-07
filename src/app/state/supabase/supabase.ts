export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Binary: {
        Row: {
          link: string
          offer: number
        }
        Insert: {
          link: string
          offer?: number
        }
        Update: {
          link?: string
          offer?: number
        }
        Relationships: [
          {
            foreignKeyName: "Binary_offer_fkey"
            columns: ["offer"]
            referencedRelation: "Offer"
            referencedColumns: ["id"]
          }
        ]
      }
      Category: {
        Row: {
          name: string
          tag: number | null
        }
        Insert: {
          name: string
          tag?: number | null
        }
        Update: {
          name?: string
          tag?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Category_tag_fkey"
            columns: ["tag"]
            referencedRelation: "Tag"
            referencedColumns: ["id"]
          }
        ]
      }
      Message: {
        Row: {
          created_at: string
          created_by: number
          created_for: number
          id: number
          message: string
        }
        Insert: {
          created_at?: string
          created_by: number
          created_for: number
          id?: number
          message: string
        }
        Update: {
          created_at?: string
          created_by?: number
          created_for?: number
          id?: number
          message?: string
        }
        Relationships: [
          {
            foreignKeyName: "Message_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Message_created_for_fkey"
            columns: ["created_for"]
            referencedRelation: "Offer"
            referencedColumns: ["id"]
          }
        ]
      }
      Offer: {
        Row: {
          category: string | null
          city: string | null
          created_at: string
          created_by: number
          description: string | null
          id: number
          location: string | null
          postal_code: number | null
          status: string
          street: string | null
          subject: string
        }
        Insert: {
          category?: string | null
          city?: string | null
          created_at?: string
          created_by: number
          description?: string | null
          id?: number
          location?: unknown | null
          postal_code?: number | null
          status: string
          street?: string | null
          subject: string
        }
        Update: {
          category?: string | null
          city?: string | null
          created_at?: string
          created_by?: number
          description?: string | null
          id?: number
          location?: unknown | null
          postal_code?: number | null
          status?: string
          street?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "Offer_category_fkey"
            columns: ["category"]
            referencedRelation: "Category"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "Offer_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Offer_status_fkey"
            columns: ["status"]
            referencedRelation: "Status"
            referencedColumns: ["name"]
          }
        ]
      }
      Status: {
        Row: {
          name: string
        }
        Insert: {
          name: string
        }
        Update: {
          name?: string
        }
        Relationships: []
      }
      Tag: {
        Row: {
          id: number
          path: string
        }
        Insert: {
          id?: number
          path: string
        }
        Update: {
          id?: number
          path?: string
        }
        Relationships: []
      }
      User: {
        Row: {
          avatar: number | null
          id: number
          name: string
          role: string | null
        }
        Insert: {
          avatar?: number | null
          id?: number
          name: string
          role?: string | null
        }
        Update: {
          avatar?: number | null
          id?: number
          name?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "User_avatar_fkey"
            columns: ["avatar"]
            referencedRelation: "Avatar"
            referencedColumns: ["id"]
          }
        ]
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
