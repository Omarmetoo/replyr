// MongoDB collection types — implemented in Phase 1
export type WorkspaceStatus = 'active' | 'paused'
export type DocumentStatus = 'processing' | 'ready' | 'failed'
export type DocumentSourceType = 'pdf' | 'text' | 'url'
export type ConversationStatus = 'open' | 'handoff_requested' | 'closed'
export type LeadStatus = 'new' | 'handled'

export interface Workspace {
  _id?: string
  ownerId: string
  name: string
  status: WorkspaceStatus
  publicKey: string
  widgetConfig: WidgetConfig
  createdAt: Date
  updatedAt: Date
}

export interface WidgetConfig {
  botName: string
  greeting: string
  primaryColor: string
  position: 'bottom-right' | 'bottom-left'
  logoUrl?: string
}

export interface Document {
  _id?: string
  workspaceId: string
  filename: string
  sourceType: DocumentSourceType
  status: DocumentStatus
  charCount: number
  createdAt: Date
}

export interface Chunk {
  _id?: string
  workspaceId: string
  documentId: string
  text: string
  embedding: number[]
  tokenCount: number
  createdAt: Date
}

export interface Conversation {
  _id?: string
  workspaceId: string
  visitorId: string
  status: ConversationStatus
  createdAt: Date
  lastMessageAt: Date
}

export interface Message {
  _id?: string
  conversationId: string
  role: 'user' | 'assistant'
  content: string
  sources: { documentId: string; snippet: string }[]
  createdAt: Date
}

export interface Lead {
  _id?: string
  workspaceId: string
  conversationId: string
  email: string
  message: string
  status: LeadStatus
  createdAt: Date
}
