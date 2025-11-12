# BIZEN Financial Simulators - Testing Checklist

## 🧪 Pre-Deployment Testing Checklist

Use this checklist to verify all simulators work correctly before deploying to production.

---

## ⚙️ Setup Verification

- [ ] Recharts installed (`npm list recharts` shows package)
- [ ] Database schema created (run `SIMULATORS_QUICKSTART.sql`)
- [ ] Simulators seeded (6 rows in `simulators` table)
- [ ] RLS policies enabled (check `pg_policies`)
- [ ] Dev server running (`npm run dev` on port 3004)

---

## 📄 Page Loading Tests

### Catalog Page (`/simulators`)
- [ ] Page loads without errors
- [ ] All 6 simulator cards display
- [ ] Card icons show correctly (💰🎯💳🏦📈📊)
- [ ] Educational disclaimer visible
- [ ] "Mis Simulaciones Guardadas" button present
- [ ] Cards are clickable and navigate to simulator pages

### History Page (`/simulators/history`)
- [ ] Page loads (empty state if no runs)
- [ ] Shows "No tienes simulaciones guardadas" when empty
- [ ] Back button works
- [ ] "Explorar Simuladores" link works

---

## 💰 Simulator #1: Monthly Budget 50/30/20

### Basic Functionality
- [ ] Page loads at `/simulators/monthly-budget`
- [ ] Form shows all input fields
- [ ] "Cargar Valores de Prueba" button works
- [ ] Can add/remove expense items
- [ ] Mode toggle (50/30/20 vs custom) works
- [ ] "Calcular" button triggers calculation
- [ ] Results display after submission

### Test Case 1: 50/30/20 Mode
```
Income: 10,000
Fixed: Renta 2,000, Transporte 500, Servicios 500
Variable: Comida 1,500, Entretenimiento 500, Ropa 500
Goal: 2,000
Mode: 50/30/20
```

**Expected Results:**
- [ ] Total Fixed: 3,000 MXN
- [ ] Total Variable: 2,500 MXN
- [ ] Total Expenses: 5,500 MXN
- [ ] Actual Savings: 4,500 MXN
- [ ] Meets Goal: ✅ Yes
- [ ] Recommendations show positive feedback
- [ ] Bar chart displays 50/30/20 breakdown

### Test Case 2: Over Budget
```
Income: 5,000
Fixed: Renta 4,000
Variable: Comida 2,000
Goal: 1,000
```

**Expected Results:**
- [ ] Shows deficit warning
- [ ] Recommendations suggest reducing expenses
- [ ] Does not meet savings goal

### Save Functionality
- [ ] "Guardar Simulación" button enabled after calculation
- [ ] Dialog opens with name and notes fields
- [ ] Can save with custom name
- [ ] Success message after save
- [ ] Saved run appears in history

---

## 🎯 Simulator #2: Savings Goal & Compound Interest

### Basic Functionality
- [ ] Page loads at `/simulators/savings-goal`
- [ ] Can switch between "Forecast" and "Time to Goal" modes
- [ ] Test values button works
- [ ] Chart renders after calculation

### Test Case 1: Forecast Mode
```
Initial: 1,000
Monthly: 500
Rate: 8%
Months: 24
Mode: Forecast
```

**Expected Results:**
- [ ] Future Value: ~13,800 MXN
- [ ] Total Contributions: 13,000 MXN
- [ ] Total Interest: ~800 MXN
- [ ] Chart shows growth over 24 months
- [ ] Line chart has 3 lines (balance, contributions, interest)

### Test Case 2: Time to Goal Mode
```
Initial: 1,000
Monthly: 500
Rate: 8%
Target: 15,000
Mode: Time to Goal
```

**Expected Results:**
- [ ] Months: ~25-26 months
- [ ] Future Value: ≥ 15,000 MXN
- [ ] Chart shows projection
- [ ] No error message

### Test Case 3: Impossible Goal
```
Initial: 100
Monthly: 0
Rate: 5%
Target: 10,000
Mode: Time to Goal
```

**Expected Results:**
- [ ] Error message: "No puedes alcanzar la meta sin aportaciones"
- [ ] Suggested action displayed

---

## 💳 Simulator #3: Credit Card Payoff

### Basic Functionality
- [ ] Page loads at `/simulators/credit-card-payoff`
- [ ] All numeric fields accept input
- [ ] Test values load correctly

### Test Case 1: Comparison
```
Balance: 12,000
APR: 70%
Min %: 5%
Min Floor: 200
Fixed Payment: 1,200
```

**Expected Results:**
- [ ] Minimum strategy: ~21 months, high interest
- [ ] Fixed strategy: ~11-12 months, lower interest
- [ ] Savings shown: ~9 months, ~3,000+ MXN interest
- [ ] Chart compares both strategies
- [ ] Table shows first few months of each

### Test Case 2: Payment Too Low
```
Balance: 10,000
APR: 50%
Fixed Payment: 200
```

**Expected Results:**
- [ ] Error message: "El pago mensual debe ser mayor a..."
- [ ] Calculation blocked or warning shown

---

## 🏦 Simulator #4: Simple Loan / Microcredit

### Basic Functionality
- [ ] Page loads at `/simulators/simple-loan`
- [ ] All fields accept input
- [ ] Test values button works

### Test Case 1: With Fees
```
Principal: 20,000
APR: 35%
Term: 18 months
Upfront Fees: 500
Monthly Fees: 50
```

**Expected Results:**
- [ ] Monthly Payment: ~1,400-1,500 MXN
- [ ] Total Interest: ~4,000-5,000 MXN
- [ ] Total Cost: > 25,000 MXN
- [ ] CAT: > 35% (due to fees)
- [ ] Amortization table shows all 18 months
- [ ] Balance decreases each month
- [ ] Final balance: 0 MXN

### Test Case 2: No Fees
```
Principal: 10,000
APR: 12%
Term: 12 months
Upfront Fees: 0
Monthly Fees: 0
```

**Expected Results:**
- [ ] Monthly payment calculated
- [ ] CAT ≈ APR (no fee markup)
- [ ] Clean amortization schedule

---

## 📈 Simulator #5: Investment Comparison

### Basic Functionality
- [ ] Page loads at `/simulators/investment-comparison`
- [ ] Can edit labels for each option
- [ ] Preset buttons work (Conservative, Medium, Optimistic)

### Test Case 1: Standard Comparison
```
Initial: 5,000
Monthly: 1,000
Months: 12
Rate A: 5% (Ahorro Tradicional)
Rate B: 8% (CETES)
Rate C: 12% (Fondo de Inversión)
```

**Expected Results:**
- [ ] Option A: ~17,500 MXN
- [ ] Option B: ~18,500 MXN
- [ ] Option C: ~19,500 MXN
- [ ] Winner: C (Fondo de Inversión)
- [ ] Chart shows all three lines
- [ ] Difference between options clearly shown

### Test Case 2: Conservative Preset
```
Click "Conservador" button
```

**Expected Results:**
- [ ] Rates auto-fill: 3%, 5%, 7%
- [ ] Can still edit if needed
- [ ] Calculation updates correctly

---

## 📊 Simulator #6: Inflation Calculator

### Basic Functionality
- [ ] Page loads at `/simulators/inflation-calculator`
- [ ] Optional income field can be left empty

### Test Case 1: Price Only
```
Current Price: 100
Inflation: 5%
Years: 3
```

**Expected Results:**
- [ ] Future Price: ~115.76 MXN
- [ ] Price Increase: ~15.76 MXN
- [ ] Price Increase %: ~15.76%
- [ ] Chart shows yearly progression
- [ ] No income fields in results

### Test Case 2: With Income
```
Current Price: 100
Inflation: 5%
Years: 3
Current Income: 10,000
```

**Expected Results:**
- [ ] Future Price: ~115.76 MXN
- [ ] Required Income: ~11,576 MXN
- [ ] Income Increase: ~1,576 MXN
- [ ] Chart shows both price and income lines
- [ ] Clear explanation of purchasing power loss

### Test Case 3: High Inflation
```
Current Price: 1,000
Inflation: 15%
Years: 5
```

**Expected Results:**
- [ ] Dramatic price increase shown
- [ ] Chart clearly illustrates compound effect
- [ ] Warning or note about high inflation impact

---

## 💾 Save & Load Functionality

### Saving Runs
For each simulator:
- [ ] "Guardar Simulación" button appears after calculation
- [ ] Click opens dialog
- [ ] Can enter custom name
- [ ] Can enter notes
- [ ] "Cancelar" closes without saving
- [ ] "Guardar" saves and shows success
- [ ] Saved run appears in history immediately

### Viewing History
- [ ] Navigate to `/simulators/history`
- [ ] See all saved runs
- [ ] Filter by simulator type works
- [ ] Each card shows:
  - [ ] Simulator name with icon
  - [ ] Run name (or "Sin nombre")
  - [ ] Creation date
  - [ ] Quick summary
  - [ ] Notes (if provided)
- [ ] "Ver Detalles" button works (future feature)

### Deleting Runs
- [ ] Delete button (🗑️) on each card
- [ ] Confirmation dialog appears
- [ ] "Cancel" keeps the run
- [ ] "Confirm" deletes the run
- [ ] Run disappears from list
- [ ] No errors in console

---

## 🔒 Security Tests

### Authentication
- [ ] Logged out users can view catalog
- [ ] Logged out users can use simulators
- [ ] Logged out users CANNOT save runs (show login prompt)
- [ ] Logged in users can save runs
- [ ] Logged in users only see their own runs

### RLS Verification
```sql
-- Run as different users
SELECT * FROM sim_runs;
```
- [ ] User A cannot see User B's runs
- [ ] Admin can see all runs
- [ ] Cannot delete other users' runs

---

## 📱 Responsive Design Tests

### Desktop (1920x1080)
- [ ] Catalog shows 3 columns
- [ ] Simulator forms use left/right layout
- [ ] Charts render properly
- [ ] No horizontal scroll

### Tablet (768x1024)
- [ ] Catalog shows 2 columns
- [ ] Forms may stack
- [ ] Charts remain readable
- [ ] Touch-friendly buttons

### Mobile (375x667)
- [ ] Catalog shows 1 column
- [ ] Forms stack vertically
- [ ] Charts resize appropriately
- [ ] Inputs are large enough to tap
- [ ] No tiny text

---

## 🎨 Visual Design Tests

### Colors & Branding
- [ ] Gradient backgrounds render correctly
- [ ] Buttons have proper hover states
- [ ] Cards have consistent styling
- [ ] Icons display properly (emojis)
- [ ] No visual glitches or overlaps

### Charts
- [ ] Recharts library loads
- [ ] Chart tooltips work on hover
- [ ] Legend is readable
- [ ] Axis labels display correctly
- [ ] Colors are distinct and accessible

### Typography
- [ ] All text is readable
- [ ] Spanish accents display correctly (México, crédito, etc.)
- [ ] Numbers use MXN formatting
- [ ] Dates in Spanish format

---

## 🌐 Browser Compatibility

Test in multiple browsers:

### Chrome/Edge
- [ ] All features work
- [ ] Charts render
- [ ] No console errors

### Firefox
- [ ] All features work
- [ ] Charts render
- [ ] No console errors

### Safari
- [ ] All features work
- [ ] Charts render
- [ ] No console errors
- [ ] Date pickers work

---

## ⚡ Performance Tests

### Load Times
- [ ] Catalog loads in < 1 second
- [ ] Simulator pages load in < 1 second
- [ ] Calculations are instant (<100ms)
- [ ] Charts render smoothly

### Large Data
Test with edge cases:
- [ ] 100+ expense items (Budget simulator)
- [ ] 600 months payoff (Credit Card)
- [ ] Large numbers (999,999,999)
- [ ] Zero values
- [ ] Negative scenarios

---

## 🐛 Error Handling Tests

### Invalid Inputs
- [ ] Negative numbers rejected where appropriate
- [ ] Required fields show errors
- [ ] Out-of-range values clamped or rejected
- [ ] Zod validation messages display in Spanish

### Network Errors
- [ ] Saving fails gracefully if offline
- [ ] Error messages are user-friendly
- [ ] Retry mechanism or manual option

### Edge Cases
- [ ] Zero interest rate
- [ ] Zero monthly payment
- [ ] Impossible goals
- [ ] Very long time periods (600 months)
- [ ] Very high APRs (200%)

---

## 📚 Content & Copy Tests

### Educational Disclaimer
- [ ] Appears on catalog page
- [ ] Appears on each simulator page
- [ ] Clear and prominent
- [ ] In Spanish

### Instructions
- [ ] Each simulator has clear labels
- [ ] Hints/tooltips where helpful
- [ ] Test value buttons have clear labels
- [ ] Results are easy to understand

### Recommendations
- [ ] Budget simulator gives actionable advice
- [ ] Messages are encouraging (not judgmental)
- [ ] Spanish grammar is correct
- [ ] Numbers format properly in sentences

---

## 🔄 Data Flow Tests

### Client → Server → Database
1. [ ] User fills form
2. [ ] Client validates with Zod
3. [ ] Results calculated client-side
4. [ ] User clicks "Guardar"
5. [ ] POST to `/api/simulators/runs`
6. [ ] Server validates again
7. [ ] Server checks authentication
8. [ ] RLS enforces user_id
9. [ ] Data saved to `sim_runs` table
10. [ ] Success response returned
11. [ ] Client shows confirmation

### Server → Client
1. [ ] GET `/api/simulators` returns catalog
2. [ ] GET `/api/simulators/runs` returns user's runs
3. [ ] Filtered queries work (`?slug=...`)
4. [ ] Pagination not needed yet (< 100 runs expected)

---

## 🚀 Pre-Production Checklist

Before deploying:
- [ ] All above tests pass
- [ ] No console errors in production build
- [ ] Environment variables set (SUPABASE_URL, etc.)
- [ ] Database backed up
- [ ] SSL certificates valid
- [ ] Analytics configured (optional)
- [ ] Error monitoring configured (optional)
- [ ] SEO meta tags set
- [ ] Social share cards configured (optional)

---

## 📊 Post-Deployment Verification

After deploying:
- [ ] Visit production URL
- [ ] Run through 2-3 simulators
- [ ] Save at least one run
- [ ] Check database for saved data
- [ ] Monitor logs for errors
- [ ] Check performance metrics
- [ ] Test from mobile device
- [ ] Verify SSL works

---

## 🎓 User Acceptance Testing (UAT)

Have 2-3 students test:
- [ ] Can they understand each simulator?
- [ ] Do they find it useful?
- [ ] Any confusion on inputs/outputs?
- [ ] Are recommendations helpful?
- [ ] Would they use it again?

Collect feedback on:
- Usability
- Design
- Content clarity
- Missing features
- Bugs encountered

---

## ✅ Sign-Off

**Tested by:** _________________  
**Date:** _________________  
**Version:** v1.0  
**Status:** [ ] Pass  [ ] Needs fixes  

**Notes:**
```
[Any issues found or observations]
```

---

**Ready for Production:** [ ] YES  [ ] NO

If NO, list blockers:
1. _______________
2. _______________
3. _______________

