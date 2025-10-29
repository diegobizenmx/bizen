import * as React from "react"
import MarkCompleteButton from "@/components/MarkCompleteButton"

type PageProps = { params: { moduleId: string; section: string } }

export default function SectionPage({ params }: PageProps) {
  const moduleId = Number(params.moduleId) || 1
  const section = Number(params.section) || 1

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 8 }}>
        Módulo: {moduleId} — Sección: {section}
      </h1>

      <p>Contenido de la sección aquí…</p>

      {/* Al pulsar, sube el progreso (habilita la siguiente sección en el módulo) */}
      <MarkCompleteButton moduleId={moduleId} section={section} />
    </main>
  )
}
