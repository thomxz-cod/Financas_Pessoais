import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const categoryLabels = {
  alimentacao: 'Alimentação', transporte: 'Transporte', moradia: 'Moradia',
  lazer: 'Lazer', saude: 'Saúde', educacao: 'Educação', outros: 'Outros',
};

const COLORS = [
  'hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))',
  'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--muted-foreground))', 'hsl(var(--primary))',
];

export default function ExpenseChart({ transactions }) {
  const despesas = transactions.filter(t => t.type === 'despesa');
  const byCategory = {};
  despesas.forEach(t => { byCategory[t.category] = (byCategory[t.category] || 0) + (t.amount || 0); });
  const data = Object.entries(byCategory).map(([key, value]) => ({
    name: categoryLabels[key] || key,
    value: Math.round(value * 100) / 100,
  }));

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Despesas por Categoria</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground text-center py-10">Adicione despesas para ver o gráfico</p></CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-base font-semibold">Despesas por Categoria</CardTitle></CardHeader>
      <CardContent>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v) => `R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 justify-center">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-muted-foreground">{d.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}