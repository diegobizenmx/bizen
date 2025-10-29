"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const ADMIN_EMAILS = ["diego@bizen.mx", "202207895@mondragonmexico.edu.mx"];

interface UserData {
  userId: string;
  email?: string;
  diagnosticQuiz?: {
    score: number;
    totalQuestions: number;
    studentName?: string;
    completedAt: string;
  };
  quizAttempts: number;
  sectionsCompleted: number;
  pageVisits: number;
}

export default function ManageUsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

  useEffect(() => {
    if (!isAdmin && !loading) {
      router.push("/");
    }
  }, [isAdmin, loading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/list-users");
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserData = async (userId: string, userName?: string, userEmail?: string) => {
    const displayName = userName || userEmail || userId;
    if (!confirm(`¿Estás seguro de que quieres eliminar TODOS los datos del usuario:\n\n${displayName}\n\nID: ${userId}\n\nEsta acción NO se puede deshacer.`)) {
      return;
    }

    try {
      setDeleting(userId);
      const response = await fetch("/api/admin/delete-user-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ Datos del usuario eliminados correctamente!\n\nRegistros eliminados:\n${JSON.stringify(data.deletedRecords, null, 2)}`);
        fetchUsers(); // Refresh list
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("❌ Error al eliminar usuario");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div style={{ padding: 40, maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>
          🗑️ Gestión de Usuarios
        </h1>
        <p style={{ color: "#666", marginBottom: 10 }}>
          Lista de usuarios con datos en el sistema.
        </p>
        <div style={{ 
          background: '#fef3c7', 
          border: '1px solid #f59e0b', 
          borderRadius: '8px', 
          padding: '12px',
          marginBottom: 20,
          fontSize: '14px',
          color: '#78350f'
        }}>
          <strong>⚠️ Importante:</strong> Al eliminar un usuario, se borran TODOS sus datos:<br />
          • Quiz diagnóstico y quizzes de módulos<br />
          • Progreso y secciones completadas<br />
          • Visitas a páginas<br />
          • Archivos subidos (Módulo 6) - borra archivo físico y registro en BD<br /><br />
          <strong>Luego puedes eliminar al usuario de Supabase Auth.</strong>
        </div>
        <button
          onClick={() => router.push("/modules/menu")}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            background: "#0F62FE",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Volver al menú
        </button>
      </div>

      {users.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#666" }}>
          <p>No hay usuarios con datos en el sistema.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 20 }}>
          {users.map((userData) => (
            <div
              key={userData.userId}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 24,
                background: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
                    👤 {userData.diagnosticQuiz?.studentName || userData.email || "Usuario sin nombre"}
                  </h3>
                  {userData.email && !userData.diagnosticQuiz?.studentName && (
                    <p style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>
                      📧 {userData.email}
                    </p>
                  )}
                  <p style={{ fontSize: 12, color: "#999", marginBottom: 12, fontFamily: "monospace", wordBreak: "break-all" }}>
                    ID: {userData.userId}
                  </p>
                  {userData.diagnosticQuiz && (
                    <div style={{ marginBottom: 12, padding: 12, background: "#f0f9ff", borderRadius: 8 }}>
                      <strong>📝 Quiz Diagnóstico:</strong>{" "}
                      {userData.diagnosticQuiz.score}/{userData.diagnosticQuiz.totalQuestions} (
                      {Math.round((userData.diagnosticQuiz.score / userData.diagnosticQuiz.totalQuestions) * 100)}%)
                    </div>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, fontSize: 14 }}>
                    <div>
                      <strong>🎯 Quiz de Módulos:</strong> {userData.quizAttempts}
                    </div>
                    <div>
                      <strong>✅ Secciones:</strong> {userData.sectionsCompleted}
                    </div>
                    <div>
                      <strong>👁️ Páginas vistas:</strong> {userData.pageVisits}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteUserData(userData.userId, userData.diagnosticQuiz?.studentName, userData.email)}
                  disabled={deleting === userData.userId}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 8,
                    background: deleting === userData.userId ? "#94a3b8" : "#ef4444",
                    color: "white",
                    border: "none",
                    cursor: deleting === userData.userId ? "not-allowed" : "pointer",
                    fontWeight: 600,
                    fontSize: 14,
                    marginLeft: 16,
                    whiteSpace: "nowrap",
                  }}
                >
                  {deleting === userData.userId ? "Eliminando..." : "🗑️ Eliminar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


