import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import BalanceCards from '@/components/BalanceCards';
import MarketCard from '@/components/MarketCard';
import MarketChart from '@/components/MarketChart';
import ExpenseChart from '@/components/ExpenseChart';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';

const marketData = [
  { name: 'IBOVESPA', symbol: 'IBOV', value: 128456.32, change: 1.24 },
  { name: 'Dólar', symbol: 'USD/BRL', value: 4.97, change: -0.38 },
  { name: 'Euro', symbol: 'EUR/BRL', value: 5.42, change: 0.15 },
  { name: 'Bitcoin', symbol: 'BTC', value: 352890.0, change: 2.87 },
];

export default function Index() {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => base44.entities.Transaction.list('-created_date', 100),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral das suas finanças</p>
      </div>

      <BalanceCards transactions={transactions} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {marketData.map((m) => (
          <MarketCard key={m.symbol} {...m} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MarketChart />
        <ExpenseChart transactions={transactions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TransactionForm />
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}