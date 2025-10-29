"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface User {
  id: string
  email?: string
  user_metadata?: {
    username?: string
    app_source?: string
  }
  created_at: string
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "bizen" | "microcredential">("all")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        alert("Please log in first")
        return
      }

      const response = await fetch("/api/users/list")
      const data = await response.json()
      
      if (data.error) {
        console.error("Error fetching users:", data.error)
        return
      }

      // Combine users from both apps
      const allUsers = [
        ...(data.bizen || []).map((u: any) => ({ ...u, app: "bizen" })),
        ...(data.microcredential || []).map((u: any) => ({ ...u, app: "microcredential" }))
      ]
      
      setUsers(allUsers)
      setLoading(false)
    } catch (error) {
      console.error("Error:", error)
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    if (filter === "all") return true
    return (user as any).app === filter
  })

  const bizenCount = users.filter(u => (u as any).app === "bizen").length
  const microcredentialCount = users.filter(u => (u as any).app === "microcredential").length

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p>Loading users...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 32 }}>
        User Management
      </h1>

      {/* Stats */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: 20, 
        marginBottom: 40 
      }}>
        <div style={{ background: "#f0f7ff", padding: 20, borderRadius: 12 }}>
          <p style={{ color: "#718096", margin: 0, fontSize: 14 }}>Total Users</p>
          <p style={{ color: "#0F62FE", margin: "8px 0 0 0", fontSize: 32, fontWeight: 700 }}>
            {users.length}
          </p>
        </div>
        <div style={{ background: "#fef0ff", padding: 20, borderRadius: 12 }}>
          <p style={{ color: "#718096", margin: 0, fontSize: 14 }}>BIZEN Users</p>
          <p style={{ color: "#0F62FE", margin: "8px 0 0 0", fontSize: 32, fontWeight: 700 }}>
            {bizenCount}
          </p>
        </div>
        <div style={{ background: "#f0f7ff", padding: 20, borderRadius: 12 }}>
          <p style={{ color: "#718096", margin: 0, fontSize: 14 }}>Microcredential Users</p>
          <p style={{ color: "#0F62FE", margin: "8px 0 0 0", fontSize: 32, fontWeight: 700 }}>
            {microcredentialCount}
          </p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "8px 16px",
            marginRight: 8,
            borderRadius: 8,
            border: filter === "all" ? "2px solid #0F62FE" : "2px solid #E5E7EB",
            background: filter === "all" ? "#0F62FE" : "white",
            color: filter === "all" ? "white" : "#4A5568",
            cursor: "pointer"
          }}
        >
          All ({users.length})
        </button>
        <button
          onClick={() => setFilter("bizen")}
          style={{
            padding: "8px 16px",
            marginRight: 8,
            borderRadius: 8,
            border: filter === "bizen" ? "2px solid #0F62FE" : "2px solid #E5E7EB",
            background: filter === "bizen" ? "#0F62FE" : "white",
            color: filter === "bizen" ? "white" : "#4A5568",
            cursor: "pointer"
          }}
        >
          BIZEN ({bizenCount})
        </button>
        <button
          onClick={() => setFilter("microcredential")}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: filter === "microcredential" ? "2px solid #0F62FE" : "2px solid #E5E7EB",
            background: filter === "microcredential" ? "#0F62FE" : "white",
            color: filter === "microcredential" ? "white" : "#4A5568",
            cursor: "pointer"
          }}
        >
          Microcredential ({microcredentialCount})
        </button>
      </div>

      {/* Users List */}
      <div style={{
        background: "white",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #E5E7EB" }}>
              <th style={{ padding: 16, textAlign: "left", fontWeight: 600 }}>App</th>
              <th style={{ padding: 16, textAlign: "left", fontWeight: 600 }}>Email</th>
              <th style={{ padding: 16, textAlign: "left", fontWeight: 600 }}>Username</th>
              <th style={{ padding: 16, textAlign: "left", fontWeight: 600 }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                <td style={{ padding: 16 }}>
                  <span style={{
                    padding: "4px 12px",
                    borderRadius: 6,
                    background: (user as any).app === "bizen" ? "#fef0ff" : "#f0f7ff",
                    color: "#0F62FE",
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {(user as any).app === "bizen" ? "BIZEN" : "Micro"}
                  </span>
                </td>
                <td style={{ padding: 16 }}>{user.email || "N/A"}</td>
                <td style={{ padding: 16 }}>{user.user_metadata?.username || "N/A"}</td>
                <td style={{ padding: 16 }}>
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


