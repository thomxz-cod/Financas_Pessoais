import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Play } from 'lucide-react';

export default function Simulador() {
  const [form, setForm] = useState({ valor: '10000', taxa: '12', anos: '10', aporteMensal: '500' });
  const [simulated, setSimulated] = useState(false);

  const result = useMemo(() => {
    if (!simulated) return null;
    const valor = parseFloat(form.valor) || 0;
    const taxaAnual = (parseFloat(form.taxa) || 0) / 100;
    const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
    const meses = (parseInt(form.anos) || 0) * 12;
    const aporte = parseFloat(form.aporteMensal) || 0;

    const data = [];
    let saldo = valor;
    let totalInvestido = valor;

    for (let i = 0; i <= meses; i++) {
      if (i > 0) {
        saldo = saldo * (1 + taxaMensal) + aporte;
        totalInvestido += aporte;
      }
      if (i % 12 === 0) {
        data.push({
          ano: `Ano ${i / 12}`,
          'Valor Total': Math.round(saldo),
          'Total Investido': Math.round(totalInvestido),
          Rendimento: Math.round(saldo - totalInvestido),
        });
      }
    }
    return data;
  }, [simulated, form]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Simulador de Investimentos</h1>
        <p className="text-sm text-muted-foreground mt-1">Projete o crescimento do seu patrimônio</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Parâmetros da Simulação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-xs">Valor Inicial (R$)</Label>
              <Input className="mt-1" type="number" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs">Aporte Mensal (R$)</Label>
              <Input className="mt-1" type="number" value={form.aporteMensal} onChange={(e) => setForm({ ...form, aporteMensal: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs">Taxa Anual (%)</Label>
              <Input className="mt-1" type="number" step="0.1" value={form.taxa} onChange={(e) => setForm({ ...form, taxa: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs">Período (anos)</Label>
              <Input className="mt-1" type="number" value={form.anos} onChange={(e) => setForm({ ...form, anos: e.target.value })} />
            </div>
          </div>
          <Button className="mt-4" onClick={() => setSimulated(true)}>
            <Play className="w-4 h-4 mr-2" />
            Simular
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-5">
              <p className="text-xs text-muted-foreground font-medium">Valor Final</p>
              <p className="text-2xl font-bold text-primary mt-1">
                R$ {result[result.length - 1]['Valor Total'].toLocaleString('pt-BR')}
              </p>
            </Card>
            <Card className="p-5">
              <p className="text-xs text-muted-foreground font-medium">Total Investido</p>
              <p className="text-2xl font-bold mt-1">
                R$ {result[result.length - 1]['Total Investido'].toLocaleString('pt-BR')}
              </p>
            </Card>
            <Card className="p-5">
              <p className="text-xs text-muted-foreground font-medium">Rendimento</p>
              <p className="text-2xl font-bold text-accent mt-1">
                R$ {result[result.length - 1]['Rendimento'].toLocaleString('pt-BR')}
              </p>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Evolução do Investimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="investido" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="ano" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(v) => `R$ ${v.toLocaleString('pt-BR')}`} />
                    <Area type="monotone" dataKey="Valor Total" stroke="hsl(var(--chart-1))" fill="url(#total)" strokeWidth={2} />
                    <Area type="monotone" dataKey="Total Investido" stroke="hsl(var(--chart-4))" fill="url(#investido)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Tabela de Evolução</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Período</TableHead>
                      <TableHead className="text-right">Total Investido</TableHead>
                      <TableHead className="text-right">Rendimento</TableHead>
                      <TableHead className="text-right">Valor Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.map((r) => (
                      <TableRow key={r.ano}>
                        <TableCell className="font-medium">{r.ano}</TableCell>
                        <TableCell className="text-right">R$ {r['Total Investido'].toLocaleString('pt-BR')}</TableCell>
                        <TableCell className="text-right text-accent">R$ {r.Rendimento.toLocaleString('pt-BR')}</TableCell>
                        <TableCell className="text-right font-semibold">R$ {r['Valor Total'].toLocaleString('pt-BR')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}