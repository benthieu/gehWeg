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
          },
          {
            foreignKeyName: "Binary_offer_fkey"
            columns: ["offer"]
            referencedRelation: "offer_json"
            referencedColumns: ["id"]
          }
        ]
      }
      Category: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
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
          },
          {
            foreignKeyName: "Message_created_for_fkey"
            columns: ["created_for"]
            referencedRelation: "offer_json"
            referencedColumns: ["id"]
          }
        ]
      }
      Offer: {
        Row: {
          category: number | null
          city: string | null
          created_at: string
          created_by: number
          description: string | null
          id: number
          images: string[] | null
          location: unknown | null
          postal_code: number | null
          status: string
          street: string | null
          subject: string
        }
        Insert: {
          category?: number | null
          city?: string | null
          created_at?: string
          created_by: number
          description?: string | null
          id?: number
          images?: string[] | null
          location?: unknown | null
          postal_code?: number | null
          status: string
          street?: string | null
          subject: string
        }
        Update: {
          category?: number | null
          city?: string | null
          created_at?: string
          created_by?: number
          description?: string | null
          id?: number
          images?: string[] | null
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
            referencedColumns: ["id"]
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
      User: {
        Row: {
          id: number
          name: string
          role: string | null
        }
        Insert: {
          id?: number
          name: string
          role?: string | null
        }
        Update: {
          id?: number
          name?: string
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      offer_json: {
        Row: {
          category: number | null
          city: string | null
          created_at: string | null
          created_by: number | null
          description: string | null
          id: number | null
          images: string[] | null
          location: string | null
          postal_code: number | null
          status: string | null
          street: string | null
          subject: string | null
        }
        Insert: {
          category?: number | null
          city?: string | null
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          id?: number | null
          images?: string[] | null
          location?: never
          postal_code?: number | null
          status?: string | null
          street?: string | null
          subject?: string | null
        }
        Update: {
          category?: number | null
          city?: string | null
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          id?: number | null
          images?: string[] | null
          location?: never
          postal_code?: number | null
          status?: string | null
          street?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Offer_category_fkey"
            columns: ["category"]
            referencedRelation: "Category"
            referencedColumns: ["id"]
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
    }
    Functions: {
      offers_in_view: {
        Args: {
          min_lat: number
          min_long: number
          max_lat: number
          max_long: number
        }
        Returns: {
          id: number
          created_at: string
          created_by: number
          subject: string
          status: string
          description: string
          category: number
          city: string
          postal_code: number
          street: string
          images: string[]
          location: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
