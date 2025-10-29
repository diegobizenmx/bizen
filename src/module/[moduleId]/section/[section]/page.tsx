"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function SectionRedirect() {
  const params = useParams<{ moduleId: string; section: string }>()
  const router = useRouter()

  useEffect(() => {
    const moduleId = params?.moduleId || "1"
    const section = params?.section || "1"
    router.replace(`/module/${moduleId}/section/${section}/page/1`)
  }, [params, router])

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh",
      background: "#FFFFFF"
    }}>
      <p style={{ fontSize: 18, color: "#666" }}>Redirigiendo...</p>
    </div>
  )
}
