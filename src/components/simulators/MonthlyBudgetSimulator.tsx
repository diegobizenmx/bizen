'use client';

/**
 * Monthly Budget 50/30/20 Simulator
 */

import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NumberField } from './NumberField';
import { ResultsCard } from './ResultsCard';
import { SaveRunButton } from './SaveRunButton';
import { Alert } from './Alert';
import { Label } from './Label';
import { Chart } from './Chart';
import {
  monthlyBudgetSchema,
  type MonthlyBudgetInput,
  type MonthlyBudgetOutput,
  PRESET_VALUES,
} from '@/lib/simulators/schemas';
import { calculateMonthlyBudget } from '@/lib/simulators/engines';
import { currencyMXN } from '@/lib/simulators';

export function MonthlyBudgetSimulator() {
  const [result, setResult] = React.useState<MonthlyBudgetOutput | null>(null);
  
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MonthlyBudgetInput>({
    resolver: zodResolver(monthlyBudgetSchema),
    defaultValues: {
      monthlyIncome: 0,
      fixedExpenses: [],
      variableExpenses: [],
      savingsGoal: 0,
      mode: '50/30/20',
    },
  });
  
  const { fields: fixedFields, append: appendFixed, remove: removeFixed } = useFieldArray({
    control,
    name: 'fixedExpenses',
  });
  
  const { fields: variableFields, append: appendVariable, remove: removeVariable } = useFieldArray({
    control,
    name: 'variableExpenses',
  });
  
  const monthlyIncome = watch('monthlyIncome');
  const mode = watch('mode');
  
  function onSubmit(data: MonthlyBudgetInput) {
    const output = calculateMonthlyBudget(data);
    setResult(output);
  }
  
  function loadPreset() {
    const preset = PRESET_VALUES.monthlyBudget;
    setValue('monthlyIncome', preset.monthlyIncome);
    setValue('fixedExpenses', preset.fixedExpenses);
    setValue('variableExpenses', preset.variableExpenses);
    setValue('savingsGoal', preset.savingsGoal);
    setValue('mode', preset.mode);
  }
  
  // Auto-calculate on changes
  React.useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);
  
  const chartData = result?.breakdown
    ? [
        {
          category: 'Esenciales',
          target: result.breakdown.essentialTarget || 0,
          actual: result.breakdown.essentialActual,
        },
        {
          category: 'Deseos',
          target: result.breakdown.wantsTarget || 0,
          actual: result.breakdown.wantsActual,
        },
        {
          category: 'Ahorro',
          target: result.breakdown.savingsTarget || 0,
          actual: result.breakdown.savingsActual,
        },
      ]
    : [];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Input Form */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Datos de Entrada</CardTitle>
            <Button onClick={loadPreset} variant="outline" size="sm">
              📝 Cargar Valores de Prueba
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Income */}
            <NumberField
              label="Ingreso Mensual"
              value={monthlyIncome}
              onChange={(val) => setValue('monthlyIncome', val)}
              currency
              error={errors.monthlyIncome?.message}
            />
            
            {/* Mode */}
            <div>
              <Label>Modo</Label>
              <select
                {...register('mode')}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              >
                <option value="50/30/20">Regla 50/30/20</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>
            
            {/* Fixed Expenses */}
            <div>
              <Label>Gastos Fijos (Esenciales)</Label>
              <div className="space-y-2 mt-2">
                {fixedFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`fixedExpenses.${index}.name`)}
                      placeholder="Nombre"
                      className="flex-1"
                    />
                    <NumberField
                      value={watch(`fixedExpenses.${index}.amount`) || 0}
                      onChange={(val) => setValue(`fixedExpenses.${index}.amount`, val)}
                      currency
                      className="w-32"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFixed(index)}
                    >
                      🗑️
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendFixed({ name: '', amount: 0 })}
                >
                  + Agregar Gasto Fijo
                </Button>
              </div>
            </div>
            
            {/* Variable Expenses */}
            <div>
              <Label>Gastos Variables (Deseos)</Label>
              <div className="space-y-2 mt-2">
                {variableFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`variableExpenses.${index}.name`)}
                      placeholder="Nombre"
                      className="flex-1"
                    />
                    <NumberField
                      value={watch(`variableExpenses.${index}.amount`) || 0}
                      onChange={(val) => setValue(`variableExpenses.${index}.amount`, val)}
                      currency
                      className="w-32"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeVariable(index)}
                    >
                      🗑️
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendVariable({ name: '', amount: 0 })}
                >
                  + Agregar Gasto Variable
                </Button>
              </div>
            </div>
            
            {/* Savings Goal */}
            <NumberField
              label="Meta de Ahorro Mensual"
              value={watch('savingsGoal')}
              onChange={(val) => setValue('savingsGoal', val)}
              currency
              error={errors.savingsGoal?.message}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Right: Results */}
      <div className="space-y-4">
        {result ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <ResultsCard
                title="Gastos Totales"
                value={currencyMXN(result.totalExpenses)}
                variant={result.totalExpenses > monthlyIncome ? 'danger' : 'default'}
              />
              <ResultsCard
                title="Ahorro Real"
                value={currencyMXN(result.actualSavings)}
                variant={result.meetsGoal ? 'success' : 'warning'}
              />
              <ResultsCard
                title="Gastos Fijos"
                value={currencyMXN(result.totalFixed)}
              />
              <ResultsCard
                title="Gastos Variables"
                value={currencyMXN(result.totalVariable)}
              />
            </div>
            
            {mode === '50/30/20' && result.breakdown && (
              <Card>
                <CardHeader>
                  <CardTitle>Regla 50/30/20</CardTitle>
                </CardHeader>
                <CardContent>
                  <Chart
                    data={chartData}
                    type="bar"
                    xAxisKey="category"
                    lines={[
                      { dataKey: 'target', name: 'Meta', color: '#3b82f6' },
                      { dataKey: 'actual', name: 'Real', color: '#10b981' },
                    ]}
                    formatYAxis="currency"
                    height={250}
                  />
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <Alert key={i} variant={rec.includes('⚠️') ? 'warning' : 'info'}>
                    {rec}
                  </Alert>
                ))}
              </CardContent>
            </Card>
            
            <SaveRunButton
              simulatorSlug="monthly-budget"
              inputs={watch()}
              outputs={result}
            />
          </>
        ) : (
          <Alert variant="info">
            Completa los campos de entrada para ver los resultados.
          </Alert>
        )}
      </div>
    </div>
  );
}

