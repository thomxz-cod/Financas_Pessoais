import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MarketCard({ name, value, change, symbol }) {
  const isPositive = change >= 0;
  return (
    <Card className="p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{symbol}</p>
          <p className="text-sm font-semibold mt-1">{name}</p>
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
          isPositive ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </div>
      </div>
      <p className="text-2xl font-bold mt-3 tracking-tight">
        R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </p>
    </Card>
  );
}