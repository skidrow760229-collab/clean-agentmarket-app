"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Lock, AlertCircle } from "lucide-react"

interface AdminAuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const ADMIN_PASSWORD = "130314Jin"

export function AdminAuthModal({ isOpen, onClose, onSuccess }: AdminAuthModalProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (password === ADMIN_PASSWORD) {
      // Store admin session
      sessionStorage.setItem("admin_auth", "true")
      onSuccess()
    } else {
      setError("Incorrect password. Please try again.")
    }
    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl mx-4">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-card-foreground">
            Admin Verification
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter admin password to access the dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-password">Admin Password</Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input"
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading || !password}>
            {isLoading ? "Verifying..." : "Enter Admin"}
          </Button>
        </form>
      </div>
    </div>
  )
}
