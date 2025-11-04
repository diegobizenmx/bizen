import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // 1. Create a demo school
  console.log('📚 Creating demo school...')
  const school = await prisma.school.upsert({
    where: { id: 'demo-school-1' },
    update: {},
    create: {
      id: 'demo-school-1',
      name: 'Demo High School',
      region: 'North Region',
      contactEmail: 'admin@demoschool.edu'
    }
  })
  console.log('✅ School created:', school.name)

  // 2. Create a license for the school
  console.log('🔑 Creating license...')
  const license = await prisma.license.upsert({
    where: { id: 'demo-license-1' },
    update: {},
    create: {
      id: 'demo-license-1',
      schoolId: school.id,
      plan: 'annual',
      seats: 100,
      status: 'active',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2026-01-01')
    }
  })
  console.log('✅ License created:', license.plan, '-', license.seats, 'seats')

  // 3. Create a demo course
  console.log('📖 Creating course...')
  const course = await prisma.course.upsert({
    where: { id: 'demo-course-1' },
    update: {},
    create: {
      id: 'demo-course-1',
      title: 'Fundamentos de Finanzas Personales',
      description: 'Aprende los conceptos básicos de finanzas personales, presupuesto, ahorro e inversión para estudiantes de secundaria.',
      level: 'Beginner',
      isActive: true
    }
  })
  console.log('✅ Course created:', course.title)

  // 4. Enable course for school
  console.log('🔗 Enabling course for school...')
  await prisma.schoolCourse.upsert({
    where: {
      schoolId_courseId: {
        schoolId: school.id,
        courseId: course.id
      }
    },
    update: { isEnabled: true },
    create: {
      schoolId: school.id,
      courseId: course.id,
      isEnabled: true
    }
  })
  console.log('✅ Course enabled for school')

  // 5. Create Unit 1
  console.log('📦 Creating unit...')
  const unit = await prisma.unit.upsert({
    where: { id: 'demo-unit-1' },
    update: {},
    create: {
      id: 'demo-unit-1',
      courseId: course.id,
      title: 'Unidad 1: Introducción a las Finanzas',
      order: 1,
      isLocked: false
    }
  })
  console.log('✅ Unit created:', unit.title)

  // 6. Create 12 lessons for the monopoly board
  console.log('📝 Creating 12 lessons...')
  
  const lessonsData = [
    { order: 1, title: '¿Qué es el Dinero?', contentType: 'reading', hasQuiz: true },
    { order: 2, title: 'Historia del Dinero', contentType: 'video', hasQuiz: true },
    { order: 3, title: 'Tipos de Moneda', contentType: 'reading', hasQuiz: false },
    { order: 4, title: 'Sistemas Financieros', contentType: 'exercise', hasQuiz: true },
    { order: 5, title: 'Bancos Centrales', contentType: 'reading', hasQuiz: false },
    { order: 6, title: 'Inflación y Deflación', contentType: 'video', hasQuiz: true },
    { order: 7, title: 'Política Monetaria', contentType: 'reading', hasQuiz: false },
    { order: 8, title: 'Mercados Financieros', contentType: 'exercise', hasQuiz: false },
    { order: 9, title: 'Tasas de Interés', contentType: 'reading', hasQuiz: true },
    { order: 10, title: 'Proyecto Final Unidad 1', contentType: 'exercise', hasQuiz: false },
    { order: 11, title: 'Repaso General', contentType: 'reading', hasQuiz: false },
    { order: 12, title: 'Examen Unidad 1', contentType: 'exercise', hasQuiz: true }
  ]

  for (const lessonData of lessonsData) {
    const lesson = await prisma.lesson.upsert({
      where: { id: `demo-lesson-${lessonData.order}` },
      update: {},
      create: {
        id: `demo-lesson-${lessonData.order}`,
        unitId: unit.id,
        title: lessonData.title,
        contentType: lessonData.contentType,
        order: lessonData.order
      }
    })

    // Create quiz if needed
    if (lessonData.hasQuiz) {
      const quiz = await prisma.quiz.upsert({
        where: { id: `demo-quiz-${lessonData.order}` },
        update: {},
        create: {
          id: `demo-quiz-${lessonData.order}`,
          lessonId: lesson.id,
          title: `Quiz: ${lessonData.title}`,
          passScore: 70,
          totalPoints: 100
        }
      })

      // Create 3 sample questions per quiz
      for (let q = 1; q <= 3; q++) {
        const question = await prisma.question.upsert({
          where: { id: `demo-q-${lessonData.order}-${q}` },
          update: {},
          create: {
            id: `demo-q-${lessonData.order}-${q}`,
            quizId: quiz.id,
            type: 'mcq',
            prompt: `Pregunta ${q} sobre ${lessonData.title}`,
            order: q
          }
        })

        // Create 4 options per question
        const optionTexts = ['Opción A', 'Opción B (Correcta)', 'Opción C', 'Opción D']
        for (let o = 0; o < 4; o++) {
          await prisma.option.upsert({
            where: { id: `demo-opt-${lessonData.order}-${q}-${o}` },
            update: {},
            create: {
              id: `demo-opt-${lessonData.order}-${q}-${o}`,
              questionId: question.id,
              text: optionTexts[o],
              isCorrect: o === 1 // Option B is correct
            }
          })
        }
      }
    }

    console.log(`  ✅ Lesson ${lessonData.order}: ${lessonData.title}${lessonData.hasQuiz ? ' (with quiz)' : ''}`)
  }

  console.log('✅ All 12 lessons created!')

  // 7. Create 2 assignments
  console.log('📂 Creating assignments...')
  await prisma.assignment.upsert({
    where: { id: 'demo-assignment-1' },
    update: {},
    create: {
      id: 'demo-assignment-1',
      unitId: unit.id,
      title: 'Ensayo: La Importancia del Dinero',
      type: 'text',
      dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      points: 50
    }
  })

  await prisma.assignment.upsert({
    where: { id: 'demo-assignment-2' },
    update: {},
    create: {
      id: 'demo-assignment-2',
      unitId: unit.id,
      title: 'Proyecto Final: Plan Financiero Personal',
      type: 'file',
      dueAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      points: 100
    }
  })
  console.log('✅ 2 assignments created')

  // 8. Create learning objectives
  console.log('🎯 Creating objectives...')
  const objective = await prisma.objective.upsert({
    where: { id: 'demo-obj-1' },
    update: {},
    create: {
      id: 'demo-obj-1',
      title: 'Comprender los conceptos fundamentales del dinero',
      description: 'Los estudiantes serán capaces de explicar qué es el dinero, su historia y funciones principales.',
      level: 'unit'
    }
  })
  console.log('✅ Objective created')

  console.log('')
  console.log('🎉 SEED COMPLETE!')
  console.log('')
  console.log('📋 Summary:')
  console.log('  - 1 School: "Demo High School"')
  console.log('  - 1 License: 100 seats, annual plan')
  console.log('  - 1 Course: "Fundamentos de Finanzas Personales"')
  console.log('  - 1 Unit: "Introducción a las Finanzas"')
  console.log('  - 12 Lessons (monopoly board ready!)')
  console.log('  - 6 Quizzes (with 3 questions each)')
  console.log('  - 2 Assignments')
  console.log('  - 1 Learning Objective')
  console.log('')
  console.log('🚀 Next steps:')
  console.log('  1. Signup at http://localhost:3000/signup')
  console.log('  2. Profile will auto-create as "student"')
  console.log('  3. Visit /path → Click "Unidad 1" → See monopoly board!')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

