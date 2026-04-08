import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const categoryLabels = {
  alimentacao: 'Alimentação', transporte: 'Transporte', moradia: 'Moradia',
  lazer: 'Lazer', saude: 'Saúde', educacao: 'Educação', salario: 'Salário',
  investimentos: 'Investimentos', freelance: 'Freelance', outros: 'Outros',
};

export default function TransactionList({ transactions }) {
  const queryClient = useQueryClient();

  const handleDelete = async (id) => {
    await base44.entities.Transaction.delete(id);
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Nenhuma transação registrada</p>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${t.type === 'receita' ? 'bg-accent/15 text-accent' : 'bg-destructive/15 text-destructive'}`}>
                  {t.type === 'receita' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{t.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">{categoryLabels[t.category] || t.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {t.date ? format(new Date(t.date), 'dd MMM', { locale: ptBR }) : ''}
                    </span>
                  </div>
                </div>
                <span className={`text-sm font-semibold whitespace-nowrap ${t.type === 'receita' ? 'text-accent' : 'text-destructive'}`}>
                  {t.type === 'receita' ? '+' : '-'}R$ {t.amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(t.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}