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
          images: string[] | null
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
          images: string[] | null

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
          images: string[] | null

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
      Reservation: {
        Row: {
          reserved_at: string
          reserved_by: number
          reserved_for: number
        }
        Insert: {
          reserved_at?: string
          reserved_by?: number
          reserved_for?: number
        }
        Update: {
          reserved_at?: string
          reserved_by?: number
          reserved_for?: number
        }
        Relationships: [
          {
            foreignKeyName: "Reservation_reserved_by_fkey"
            columns: ["reserved_by"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Reservation_reserved_for_fkey"
            columns: ["reserved_for"]
            referencedRelation: "Offer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Reservation_reserved_for_fkey"
            columns: ["reserved_for"]
            referencedRelation: "offer_json"
            referencedColumns: ["id"]
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
          category: string | null
          city: string | null
          created_at: string | null
          created_by: number | null
          description: string | null
          id: number | null
          location: string | null
          postal_code: number | null
          status: string | null
          street: string | null
          subject: string | null
        }
        Insert: {
          category?: string | null
          city?: string | null
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          id?: number | null
          location?: never
          postal_code?: number | null
          status?: string | null
          street?: string | null
          subject?: string | null
        }
        Update: {
          category?: string | null
          city?: string | null
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          id?: number | null
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
