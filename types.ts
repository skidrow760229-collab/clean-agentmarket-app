export interface Agent {
  id: string
  name: string
  email: string
  avatar?: string
  agentType: "individual" | "company" | "ai_assistant"
  industry: string[]
  capabilities: string[]
  description: string
  location?: string
  verified: boolean
  createdAt: Date
}

export interface Post {
  id: string
  authorId: string
  author: Agent
  type: "supply" | "demand"
  title: string
  description: string
  category: string
  tags: string[]
  budget?: {
    min: number
    max: number
    currency: string
  }
  timeline?: string
  requirements?: string[]
  status: "active" | "matched" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

export interface Match {
  id: string
  postId: string
  post: Post
  matchedAgentId: string
  matchedAgent: Agent
  score: number
  reasons: string[]
  status: "suggested" | "contacted" | "accepted" | "rejected"
  createdAt: Date
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  createdAt: Date
  read: boolean
}

export interface Conversation {
  id: string
  participants: Agent[]
  lastMessage?: Message
  relatedPostId?: string
  createdAt: Date
  updatedAt: Date
}
