// app/module/[moduleId]/section/[section]/page/[page]/page.tsx
"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import SectionLayout from "@/components/SectionLayout";
import { SectionGate } from "@/components/SectionGate";
import { QuizTracker } from "@/components/QuizTracker";
import FinalTestQuiz from "@/components/FinalTestQuiz";
import BillyFinalTestIntro from "@/components/BillyFinalTestIntro";
// Content imports removed - using database-driven content instead

// =========================
// Config
// =========================

// Quiz page configuration - which pages have quizzes and their types
// TODO: Replace with database-driven quiz configuration from seed script
const QUIZ_PAGES: Record<number, Record<number, Record<number, { type: "true_false" | "multiple_choice" }>>> = {
  // Structure: { moduleId: { sectionId: { pageNumber: { type: "quiz_type" } } } }
  // Example: 1: { 1: { 4: { type: "true_false" } } } means Module 1, Section 1, Page 4 has a true/false quiz
};

// ==========================================
// Map section content based on module and section
// ==========================================
type SectionLayoutOverride = {
  contentMaxWidth?: number | string;
  completionHref?: string;
  completionLabel?: string;
  firstPageBackHref?: string;
  firstPageBackLabel?: string;
};

// Content will now come from database via seed script or manual entry
const SECTION_CONTENT: Record<number, Record<number, Record<number, React.ReactNode>>> = {
  // TODO: Populate with content from database or seed script
  // Structure:
  // 1: { // Module 1
  //   1: { 1: <Page1Content />, 2: <Page2Content />, ... },
  //   2: { 1: <Page1Content />, 2: <Page2Content />, ... },
  //   3: { 1: <Page1Content />, 2: <Page2Content />, ... },
  // },
};

const SECTION_LAYOUT_OVERRIDES: Partial<Record<number, Partial<Record<number, SectionLayoutOverride>>>> = {
  1: {
    1: { contentMaxWidth: "100%", completionHref: "/module/1/sections" },
    2: { contentMaxWidth: "100%", completionHref: "/module/1/sections" },
    3: { contentMaxWidth: "100%", completionHref: "/module/1/complete" },
  },
  2: {
    1: { contentMaxWidth: "100%", completionHref: "/module/2/sections" },
    2: { contentMaxWidth: "100%", completionHref: "/module/2/sections" },
    3: { contentMaxWidth: "100%", completionHref: "/module/2/complete" },
  },
  3: {
    1: { contentMaxWidth: "100%", completionHref: "/module/3/sections" },
    2: { contentMaxWidth: "100%", completionHref: "/module/3/sections" },
    3: { contentMaxWidth: "100%", completionHref: "/module/3/complete" },
  },
  4: {
    1: { contentMaxWidth: "100%", completionHref: "/module/4/sections" },
    2: { contentMaxWidth: "100%", completionHref: "/module/4/sections" },
    3: { contentMaxWidth: "100%", completionHref: "/module/4/complete" },
  },
  5: {
    1: { contentMaxWidth: "100%", completionHref: "/module/5/sections" },
    2: { contentMaxWidth: "100%", completionHref: "/module/5/sections" },
    3: { contentMaxWidth: "100%", completionHref: "/module/5/complete" },
  },
  6: {
    1: { contentMaxWidth: "100%", completionHref: "/module/6/sections" },
  },
};

// ==========================================
// File Upload Page Wrapper
// ==========================================
function FileUploadPageWrapper({
  children,
  moduleId,
  section,
  page,
  totalPages,
  contentMaxWidth,
  completionHref,
  completionLabel,
  firstPageBackHref,
  firstPageBackLabel,
}: {
  children: React.ReactNode;
  moduleId: number;
  section: number;
  page: number;
  totalPages: number;
  contentMaxWidth?: number | string;
  completionHref?: string;
  completionLabel?: string;
  firstPageBackHref?: string;
  firstPageBackLabel?: string;
}) {
  const [fileUploaded, setFileUploaded] = React.useState(false);
  const [showBillyIntro, setShowBillyIntro] = React.useState(false);
  const [showFinalTest, setShowFinalTest] = React.useState(false);
  const [showCelebration, setShowCelebration] = React.useState(false);
  const [isTestCompleted, setIsTestCompleted] = React.useState(false);

  // Suppress unused variable warnings
  void completionHref;
  void completionLabel;

  // Check if Module 6 is already completed
  React.useEffect(() => {
    async function checkModule6Completion() {
      try {
        const response = await fetch('/api/modules/unlocked');
        if (response.ok) {
          const data = await response.json();
          if (data.completedModules?.includes(6)) {
            setIsTestCompleted(true);
            // TODO: Fetch actual test score if needed
          }
        }
      } catch (error) {
        console.error('Error checking module 6 completion:', error);
      }
    }
    
    checkModule6Completion();
  }, []);

  // Listen for file upload success from the Page3 component
  React.useEffect(() => {
    const handleFileUploaded = () => {
      setFileUploaded(true);
      // Show Billy intro after a short delay, only if test not already completed
      setTimeout(() => {
        if (!isTestCompleted) {
        setShowBillyIntro(true);
        }
      }, 1500);
    };

    window.addEventListener('fileUploaded', handleFileUploaded);
    return () => window.removeEventListener('fileUploaded', handleFileUploaded);
  }, [isTestCompleted]);

  // IMPORTANT: Check in correct priority order
  // 0. Test Already Completed (highest - skip everything if already done)
  // 1. Celebration (after test completes)
  // 2. Final Test (test is in progress)
  // 3. Billy Intro (intro before test)

  // If test is already completed, show completion message
  if (isTestCompleted) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
        padding: 40,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "white",
            borderRadius: 32,
            padding: 60,
            maxWidth: 600,
            textAlign: "center",
            boxShadow: "0 25px 80px rgba(15, 98, 254, 0.2)",
          }}
        >
          <h1 style={{ fontSize: 48, margin: "0 0 24px 0", fontWeight: 900, color: "#0F62FE" }}>
            ¡Test Final Completado!
          </h1>
          <p style={{ fontSize: 20, color: "#666", margin: "0 0 32px 0" }}>
            Ya has completado el test final anteriormente.
          </p>
          <a href="/modules/menu" style={{
            display: "inline-block",
            padding: "16px 40px",
            background: "linear-gradient(135deg, #0F62FE, #3B82F6)",
            color: "white",
            borderRadius: 16,
            textDecoration: "none",
            fontSize: 18,
            fontWeight: 700,
          }}>
            Volver al Menú
          </a>
        </motion.div>
      </div>
    );
  }

  // If celebration should be shown, redirect to modules menu immediately
  if (showCelebration) {
    // Redirect immediately to modules menu
    if (typeof window !== 'undefined') {
      window.location.href = '/modules/menu';
    }
    return null;
  }

  // If final test should be shown, render it SECOND
  if (showFinalTest) {
    return (
      <FinalTestQuiz
        onComplete={async () => {
          // Mark Module 6 Section 1 as complete using simple-complete API
          try {
            await fetch('/api/sections/simple-complete', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                moduleId: 6, 
                sectionNumber: 1 
              }),
            });
            console.log('✅ Module 6 Section 1 marked as complete');
          } catch (error) {
            console.error('❌ Error marking Module 6 as complete:', error);
          }
          
          // Show celebration after test is complete
          setTimeout(() => {
            setShowCelebration(true);
          }, 1000);
        }}
      />
    );
  }

  // If Billy intro should be shown, render it THIRD
  if (showBillyIntro) {
    return (
      <BillyFinalTestIntro
        onContinue={() => {
          setShowFinalTest(true);
        }}
      />
    );
  }

  // Clone children and pass file upload status
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        fileUploaded,
        onFileUploaded: () => setFileUploaded(true),
      } as Record<string, unknown>);
    }
    return child;
  });

  return (
    <SectionLayout
      moduleId={moduleId}
      section={section}
      page={page}
      totalPages={totalPages}
      contentMaxWidth={contentMaxWidth}
      completionHref={undefined} // Never show completion button - use "Ir al Test Final" instead
      completionLabel={undefined}
      firstPageBackHref={fileUploaded ? firstPageBackHref : undefined}
      firstPageBackLabel={fileUploaded ? firstPageBackLabel : undefined}
      isQuizPage={false}
      quizCompleted={false}
    >
      {childrenWithProps}
    </SectionLayout>
  );
}

// ==========================================
// Página dinámica
// ==========================================

export default function Page() {
  const params = useParams<{ moduleId: string; section: string; page: string }>();
  const moduleId = Number(params.moduleId || 1);
  const section = Number(params.section || 1);
  const sectionContent = SECTION_CONTENT[moduleId]?.[section];
  const availablePageNumbers = sectionContent ? Object.keys(sectionContent).map(Number) : [];
  const totalPages = availablePageNumbers.length > 0 ? Math.max(...availablePageNumbers) : 1;
  const page = Math.min(Math.max(Number(params.page || 1), 1), totalPages);
  
  
  // Track quiz completion state
  const [quizCompleted, setQuizCompleted] = React.useState(false);

  // Guarda última página vista por sección
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`lastPage:m${moduleId}:s${section}`, String(page));
    }
  }, [moduleId, section, page]);

  // Check if this page is a quiz page
  const quizConfig = QUIZ_PAGES[moduleId]?.[section]?.[page];
  const isQuizPage = Boolean(quizConfig);
  
  // Debug logging
  React.useEffect(() => {
    console.log(`🎯 Page State - Module ${moduleId}, Section ${section}, Page ${page}: isQuizPage=${isQuizPage}, quizCompleted=${quizCompleted}`);
    console.log(`📋 Quiz config:`, quizConfig);
  }, [moduleId, section, page, isQuizPage, quizCompleted, quizConfig]);
  
  // Callback to handle quiz completion status changes
  const handleQuizCompletionChange = React.useCallback((isCompleted: boolean) => {
    console.log(`🔔 Quiz completion callback fired: ${isCompleted}`);
    setQuizCompleted(isCompleted);
  }, []);

  // Get raw content for the specific module, section, and page
  const rawContent = sectionContent?.[page] ?? (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Contenido no disponible</h1>
      <p>Módulo {moduleId}, Sección {section}, Página {page}</p>
      <p style={{ marginTop: 20, fontSize: 14, color: '#666' }}>
        Este contenido aún no ha sido creado.
      </p>
    </div>
  );

  // Wrap quiz pages with QuizTracker to preserve completion state
  // Special handling for Module 6 Section 1 Page 3 (file upload required)
  const isFileUploadPage = moduleId === 6 && section === 1 && page === 3;
  
  // Wrap quiz pages with QuizTracker to handle completion properly
  const content = isQuizPage ? (
    <QuizTracker
      moduleId={moduleId}
      sectionId={section}
      pageNumber={page}
      quizType={quizConfig?.type || "true_false"}
      questions={[]} // Questions will be provided by the quiz component
      onCompletionStatusChange={handleQuizCompletionChange}
    >
      {(props) => {
        console.log("🎯 Main page QuizTracker passing props to Page4:", props);
        // Clone the raw content and pass the quiz props
        if (React.isValidElement(rawContent)) {
          return React.cloneElement(rawContent, props);
        }
        return rawContent;
      }}
    </QuizTracker>
  ) : rawContent;

  const layoutOverride = SECTION_LAYOUT_OVERRIDES[moduleId]?.[section];
  const contentMaxWidth = layoutOverride?.contentMaxWidth;
  const completionHref = layoutOverride?.completionHref;
  const completionLabel = layoutOverride?.completionLabel;
  const firstPageBackHref =
    page === 1
      ? layoutOverride?.firstPageBackHref ?? `/module/${moduleId}/sections`
      : layoutOverride?.firstPageBackHref;
  const firstPageBackLabel =
    page === 1
      ? layoutOverride?.firstPageBackLabel ?? "← Menú de Secciones"
      : layoutOverride?.firstPageBackLabel;

  // Custom wrapper for file upload page that blocks navigation
  if (isFileUploadPage) {
    return (
      <SectionGate moduleId={moduleId} sectionId={section}>
        <FileUploadPageWrapper
          moduleId={moduleId}
          section={section}
          page={page}
          totalPages={totalPages}
          contentMaxWidth={contentMaxWidth}
          completionHref={completionHref}
          completionLabel={completionLabel}
          firstPageBackHref={firstPageBackHref}
          firstPageBackLabel={firstPageBackLabel}
        >
          {content}
        </FileUploadPageWrapper>
      </SectionGate>
    );
  }

  return (
    <SectionLayout
      moduleId={moduleId}
      section={section}
      page={page}
      totalPages={totalPages}
      contentMaxWidth={contentMaxWidth}
      completionHref={completionHref}
      completionLabel={completionLabel}
      firstPageBackHref={firstPageBackHref}
      firstPageBackLabel={firstPageBackLabel}
      isQuizPage={isQuizPage}
      quizCompleted={quizCompleted}
    >
      {content}
    </SectionLayout>
  );
}
