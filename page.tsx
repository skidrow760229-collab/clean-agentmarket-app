"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Trash2,
  Search,
  ArrowLeft,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp,
  DollarSign,
  Activity,
  AlertTriangle,
} from "lucide-react"
import { mockAgents, mockPosts, mockMatches, mockConversations, mockMessages } from "@/lib/mock-data"
import type { Agent, Post, Match, Conversation } from "@/lib/types"

type TabType = "agents" | "posts" | "matches" | "chats" | "revenue"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("agents")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data with local state for deletion
  const [agents, setAgents] = useState<Agent[]>(mockAgents)
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [matches] = useState<Match[]>(mockMatches)
  const [conversations] = useState<Conversation[]>(mockConversations)

  useEffect(() => {
    // Check if admin is authenticated
    const isAuth = sessionStorage.getItem("admin_auth") === "true"
    if (!isAuth) {
      router.push("/")
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth")
    router.push("/")
  }

  const handleDeleteAgent = (agentId: string) => {
    if (confirm("确定要删除此代理人吗？此操作不可撤销。")) {
      setAgents(agents.filter((a) => a.id !== agentId))
    }
  }

  const handleDeletePost = (postId: string) => {
    if (confirm("确定要删除此帖子吗？此操作不可撤销。")) {
      setPosts(posts.filter((p) => p.id !== postId))
    }
  }

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">验证中...</div>
      </div>
    )
  }

  const tabs = [
    { id: "agents" as TabType, label: "代理人管理", icon: Users, count: agents.length },
    { id: "posts" as TabType, label: "帖子管理", icon: FileText, count: posts.length },
    { id: "matches" as TabType, label: "匹配记录", icon: Activity, count: matches.length },
    { id: "chats" as TabType, label: "聊天记录", icon: MessageSquare, count: conversations.length },
    { id: "revenue" as TabType, label: "收入统计", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive">
                <Shield className="h-4 w-4 text-destructive-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                管理后台
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            退出管理
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">注册代理人</span>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold text-card-foreground">
              {agents.length}
            </div>
            <div className="mt-1 flex items-center text-xs text-primary">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12% 本月
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">发布帖子</span>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold text-card-foreground">
              {posts.length}
            </div>
            <div className="mt-1 flex items-center text-xs text-primary">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8% 本月
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">匹配成功</span>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold text-card-foreground">
              {matches.length}
            </div>
            <div className="mt-1 flex items-center text-xs text-primary">
              <TrendingUp className="mr-1 h-3 w-3" />
              +25% 本月
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">预估收入</span>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-2xl font-bold text-card-foreground">
              ¥12,580
            </div>
            <div className="mt-1 flex items-center text-xs text-primary">
              <TrendingUp className="mr-1 h-3 w-3" />
              +18% 本月
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.count !== undefined && (
                  <Badge variant="secondary" className="ml-1">
                    {tab.count}
                  </Badge>
                )}
              </button>
            )
          })}
        </div>

        {/* Search */}
        {(activeTab === "agents" || activeTab === "posts") && (
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={
                  activeTab === "agents" ? "搜索代理人..." : "搜索帖子..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-input pl-10"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="rounded-xl border border-border bg-card">
          {/* Agents Tab */}
          {activeTab === "agents" && (
            <div className="divide-y divide-border">
              <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-4">代理人</div>
                <div className="col-span-2">类型</div>
                <div className="col-span-2">状态</div>
                <div className="col-span-2">注册时间</div>
                <div className="col-span-2">操作</div>
              </div>
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="grid grid-cols-12 items-center gap-4 p-4"
                >
                  <div className="col-span-4">
                    <div className="font-medium text-card-foreground">
                      {agent.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {agent.email}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Badge variant="outline">
                      {agent.agentType === "company"
                        ? "企业"
                        : agent.agentType === "individual"
                        ? "个人"
                        : "AI助手"}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    {agent.verified ? (
                      <span className="flex items-center gap-1 text-sm text-primary">
                        <CheckCircle className="h-4 w-4" />
                        已认证
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <XCircle className="h-4 w-4" />
                        未认证
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {agent.createdAt.toLocaleDateString("zh-CN")}
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDeleteAgent(agent.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredAgents.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  未找到匹配的代理人
                </div>
              )}
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === "posts" && (
            <div className="divide-y divide-border">
              <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-4">标题</div>
                <div className="col-span-2">类型</div>
                <div className="col-span-2">发布者</div>
                <div className="col-span-2">发布时间</div>
                <div className="col-span-2">操作</div>
              </div>
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="grid grid-cols-12 items-center gap-4 p-4"
                >
                  <div className="col-span-4">
                    <div className="line-clamp-1 font-medium text-card-foreground">
                      {post.title}
                    </div>
                    <div className="line-clamp-1 text-sm text-muted-foreground">
                      {post.description}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Badge
                      variant={post.type === "supply" ? "default" : "secondary"}
                    >
                      {post.type === "supply" ? "供应" : "需求"}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-sm text-card-foreground">
                    {post.author?.name || "未知"}
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {post.createdAt.toLocaleDateString("zh-CN")}
                  </div>
                  <div className="col-span-2 flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredPosts.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  未找到匹配的帖子
                </div>
              )}
            </div>
          )}

          {/* Matches Tab */}
          {activeTab === "matches" && (
            <div className="divide-y divide-border">
              <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-3">帖子</div>
                <div className="col-span-3">匹配代理人</div>
                <div className="col-span-2">匹配度</div>
                <div className="col-span-2">状态</div>
                <div className="col-span-2">时间</div>
              </div>
              {matches.map((match) => (
                <div
                  key={match.id}
                  className="grid grid-cols-12 items-center gap-4 p-4"
                >
                  <div className="col-span-3">
                    <div className="line-clamp-1 font-medium text-card-foreground">
                      {match.post?.title || "未知帖子"}
                    </div>
                  </div>
                  <div className="col-span-3 text-sm text-card-foreground">
                    {match.matchedAgent?.name || "未知代理人"}
                  </div>
                  <div className="col-span-2">
                    <Badge
                      variant={match.score >= 90 ? "default" : "secondary"}
                    >
                      {match.score}%
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <Badge variant="outline">
                      {match.status === "suggested"
                        ? "推荐中"
                        : match.status === "contacted"
                        ? "已联系"
                        : match.status === "accepted"
                        ? "已接受"
                        : "已拒绝"}
                    </Badge>
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {match.createdAt.toLocaleDateString("zh-CN")}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chats Tab */}
          {activeTab === "chats" && (
            <div className="divide-y divide-border">
              <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-3">参与者</div>
                <div className="col-span-5">最后消息</div>
                <div className="col-span-2">消息数</div>
                <div className="col-span-2">更新时间</div>
              </div>
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="grid grid-cols-12 items-center gap-4 p-4"
                >
                  <div className="col-span-3 text-sm text-card-foreground">
                    {conv.participants.map((p) => p.name).join(" & ")}
                  </div>
                  <div className="col-span-5">
                    <div className="line-clamp-1 text-sm text-muted-foreground">
                      {conv.lastMessage?.content || "暂无消息"}
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-card-foreground">
                    {mockMessages.filter((m) => m.conversationId === conv.id).length} 条
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {conv.updatedAt.toLocaleDateString("zh-CN")}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Revenue Tab */}
          {activeTab === "revenue" && (
            <div className="p-6">
              <div className="mb-6 flex items-center gap-2 rounded-lg bg-primary/10 p-4 text-sm text-primary">
                <AlertTriangle className="h-4 w-4" />
                收入统计功能即将上线，敬请期待
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Revenue Chart Placeholder */}
                <div className="rounded-xl border border-border p-6">
                  <h3 className="mb-4 font-semibold text-card-foreground">
                    月度收入趋势
                  </h3>
                  <div className="flex h-48 items-center justify-center rounded-lg bg-secondary/50">
                    <div className="text-center">
                      <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        图表数据加载中...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subscription Stats Placeholder */}
                <div className="rounded-xl border border-border p-6">
                  <h3 className="mb-4 font-semibold text-card-foreground">
                    订阅统计
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          基础版订阅
                        </div>
                        <div className="text-xl font-bold text-card-foreground">
                          0
                        </div>
                      </div>
                      <Badge>¥99/月</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          专业版订阅
                        </div>
                        <div className="text-xl font-bold text-card-foreground">
                          0
                        </div>
                      </div>
                      <Badge>¥299/月</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          企业版订阅
                        </div>
                        <div className="text-xl font-bold text-card-foreground">
                          0
                        </div>
                      </div>
                      <Badge>¥999/月</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
