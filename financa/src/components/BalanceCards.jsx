import React from 'react';
import { Card } from '@/components/ui/card';
import { Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function BalanceCards({ transactions }) {
  const receitas = transactions.filter(t => t.type === 'receita').reduce((sum, t) => sum + (t.amount || 0), 0);
  const despesas = transactions.filter(t => t.type === 'despesa').reduce((sum, t) => sum + (t.amount || 0), 0);
  const saldo = receitas - despesas;

  const cards = [
    { label: 'Saldo', value: saldo, icon: Wallet, color: saldo >= 0 ? 'text-accent' : 'text-destructive', bg: saldo >= 0 ? 'bg-accent/10' : 'bg-destructive/10' },
    { label: 'Receitas', value: receitas, icon: ArrowUpRight, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Despesas', value: despesas, icon: ArrowDownRight, color: 'text-destructive', bg: 'bg-destructive/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <Card key={label} className="p-5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{label}</p>
              <p className={`text-xl font-bold ${color}`}>
                R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}