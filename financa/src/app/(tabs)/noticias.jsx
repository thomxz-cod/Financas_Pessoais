import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const noticias = [
  {
    id: 1,
    title: 'Ibovespa fecha em alta de 1,2% com otimismo sobre política monetária',
    summary: 'O principal índice da bolsa brasileira fechou em alta nesta terça-feira, impulsionado por expectativas de corte na taxa Selic na próxima reunião do Copom.',
    category: 'Mercado',
    sentiment: 'positivo',
    date: '08 Abr 2026',
    readTime: '3 min',
  },
  {
    id: 2,
    title: 'Dólar recua para R$ 4,97 com entrada de capital estrangeiro',
    summary: 'A moeda americana registrou queda frente ao real, refletindo o aumento de investimentos estrangeiros no mercado brasileiro.',
    category: 'Câmbio',
    sentiment: 'positivo',
    date: '08 Abr 2026',
    readTime: '2 min',
  },
  {
    id: 3,
    title: 'Inflação de março surpreende e fica acima das expectativas',
    summary: 'O IPCA de março registrou alta de 0,71%, acima da mediana das projeções do mercado financeiro, pressionado por alimentos e energia.',
    category: 'Economia',
    sentiment: 'negativo',
    date: '07 Abr 2026',
    readTime: '4 min',
  },
  {
    id: 4,
    title: 'Bitcoin atinge novo recorde e supera US$ 90 mil',
    summary: 'A principal criptomoeda do mundo bateu um novo recorde histórico, impulsionada pela aprovação de ETFs e pela expectativa de halving.',
    category: 'Cripto',
    sentiment: 'positivo',
    date: '07 Abr 2026',
    readTime: '3 min',
  },
  {
    id: 5,
    title: 'Banco Central mantém taxa Selic em 10,5% ao ano',
    summary: 'Em decisão unânime, o Comitê de Política Monetária decidiu manter a taxa básica de juros, sinalizando cautela com o cenário inflacionário.',
    category: 'Política Monetária',
    sentiment: 'neutro',
    date: '06 Abr 2026',
    readTime: '5 min',
  },
  {
    id: 6,
    title: 'Petrobras anuncia distribuição recorde de dividendos',
    summary: 'A estatal divulgou que distribuirá R$ 72 bilhões em dividendos referentes ao exercício de 2025, o maior valor da história da companhia.',
    category: 'Empresas',
    sentiment: 'positivo',
    date: '06 Abr 2026',
    readTime: '3 min',
  },
  {
    id: 7,
    title: 'Reforma tributária: novas regras para investidores em 2026',
    summary: 'O governo publicou as novas regras de tributação sobre investimentos financeiros que entram em vigor no segundo semestre de 2026.',
    category: 'Legislação',
    sentiment: 'neutro',
    date: '05 Abr 2026',
    readTime: '6 min',
  },
  {
    id: 8,
    title: 'Mercado imobiliário registra queda nas vendas em março',
    summary: 'O setor imobiliário apresentou retração de 8% nas vendas de imóveis novos em comparação ao mesmo período do ano anterior.',
    category: 'Imóveis',
    sentiment: 'negativo',
    date: '05 Abr 2026',
    readTime: '4 min',
  },
];

const sentimentConfig = {
  positivo: { icon: TrendingUp, color: 'text-accent', bg: 'bg-accent/10' },
  negativo: { icon: TrendingDown, color: 'text-destructive', bg: 'bg-destructive/10' },
  neutro: { icon: Minus, color: 'text-muted-foreground', bg: 'bg-muted' },
};

export default function Noticias() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notícias Financeiras</h1>
        <p className="text-sm text-muted-foreground mt-1">Últimas notícias do mercado financeiro</p>
      </div>

      <div className="space-y-4">
        {noticias.map((n) => {
          const { icon: Icon, color, bg } = sentimentConfig[n.sentiment];
          return (
            <Card key={n.id} className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant="secondary" className="text-xs">{n.category}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {n.readTime}
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm leading-snug">{n.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{n.summary}</p>
                    <p className="text-xs text-muted-foreground/70 mt-2">{n.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}