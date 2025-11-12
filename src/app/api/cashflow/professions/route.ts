import { NextResponse } from "next/server"
import { createSupabaseServer } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createSupabaseServer()
    
    const { data: professions, error } = await supabase
      .from('professions')
      .select('*')
      .order('salary', { ascending: true })

    if (error) throw error

    // Transform snake_case to camelCase for frontend
    const transformedProfessions = professions?.map((prof: any) => ({
      id: prof.id,
      name: prof.name,
      description: prof.description,
      salary: prof.salary,
      taxes: prof.taxes,
      homeMortgagePayment: prof.home_mortgage_payment,
      schoolLoanPayment: prof.school_loan_payment,
      carLoanPayment: prof.car_loan_payment,
      creditCardPayment: prof.credit_card_payment,
      retailPayment: prof.retail_payment,
      otherExpenses: prof.other_expenses,
      childExpense: prof.child_expense,
      homeMortgage: prof.home_mortgage,
      schoolLoans: prof.school_loans,
      carLoans: prof.car_loans,
      creditCards: prof.credit_cards,
      retailDebt: prof.retail_debt,
      startingCash: prof.starting_cash,
      startingSavings: prof.starting_savings,
      createdAt: prof.created_at
    })) || []

    return NextResponse.json(transformedProfessions)
  } catch (error) {
    console.error("Error fetching professions:", error)
    return NextResponse.json(
      { error: "Failed to fetch professions" },
      { status: 500 }
    )
  }
}

