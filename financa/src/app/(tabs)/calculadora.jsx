import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, Landmark, PiggyBank } from 'lucide-react';

function EmprestimoCalculator() {
  const [form, setForm] = useState({ valor: '50000', taxa: '1.5', parcelas: '36' });
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const valor = parseFloat(form.valor) || 0;
    const taxaMensal = (parseFloat(form.taxa) || 0) / 100;
    const n = parseInt(form.parcelas) || 1;
    const parcela = valor * (taxaMensal * Math.pow(1 + taxaMensal, n)) / (Math.pow(1 + taxaMensal, n) - 1);
    const totalPago = parcela * n;
    const totalJuros = totalPago - valor;
    const tabela = [];
    let saldoDevedor = valor;
    for (let i = 1; i <= n; i++) {
      const juros = saldoDevedor * taxaMensal;
      const amortizacao = parcela - juros;
      saldoDevedor -= amortizacao;
      tabela.push({
        mes: i,
        parcela: Math.round(parcela * 100) / 100,
        juros: Math.round(juros * 100) / 100,
        amortizacao: Math.round(amortizacao * 100) / 100,
        saldo: Math.max(0, Math.round(saldoDevedor * 100) / 100),
      });
    }
    return { parcela, totalPago, totalJuros, tabela };
  }, [calculated, form]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-xs">Valor do Empréstimo (R$)</Label>
          <Input className="mt-1" type="number" value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs">Taxa Mensal (%)</Label>
          <Input className="mt-1" type="number" step="0.01" value={form.taxa} onChange={(e) => setForm({ ...form, taxa: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs">Parcelas</Label>
          <Input className="mt-1" type="number" value={form.parcelas} onChange={(e) => setForm({ ...form, parcelas: e.target.value })} />
        </div>
      </div>
      <Button onClick={() => setCalculated(true)}>
        <Calculator className="w-4 h-4 mr-2" />
        Calcular
      </Button>

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Parcela Mensal</p>
              <p className="text-xl font-bold text-primary mt-1">R$ {result.parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Total Pago</p>
              <p className="text-xl font-bold mt-1">R$ {result.totalPago.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Total de Juros</p>
              <p className="text-xl font-bold text-destructive mt-1">R$ {result.totalJuros.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </Card>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto max-h-72 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mês</TableHead>
                      <TableHead className="text-right">Parcela</TableHead>
                      <TableHead className="text-right">Juros</TableHead>
                      <TableHead className="text-right">Amortização</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.tabela.slice(0, 12).map((r) => (
                      <TableRow key={r.mes}>
                        <TableCell>{r.mes}</TableCell>
                        <TableCell className="text-right">R$ {r.parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right text-destructive">R$ {r.juros.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right text-accent">R$ {r.amortizacao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right font-medium">R$ {r.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {result.tabela.length > 12 && (
                  <p className="text-xs text-muted-foreground text-center py-2">Mostrando primeiros 12 meses de {result.tabela.length}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function PoupancaCalculator() {
  const [form, setForm] = useState({ valorInicial: '1000', depositoMensal: '200', taxa: '0.5', meses: '24' });
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    if (!calculated) return null;
    const vi = parseFloat(form.valorInicial) || 0;
    const dm = parseFloat(form.depositoMensal) || 0;
    const taxaMensal = (parseFloat(form.taxa) || 0) / 100;
    const n = parseInt(form.meses) || 1;
    let saldo = vi;
    let totalDepositos = vi;
    const tabela = [{ mes: 0, saldo: Math.round(vi * 100) / 100, depositos: Math.round(vi * 100) / 100, rendimento: 0 }];
    for (let i = 1; i <= n; i++) {
      const rendimento = saldo * taxaMensal;
      saldo += rendimento + dm;
      totalDepositos += dm;
      if (i % 3 === 0 || i === n) {
        tabela.push({
          mes: i,
          saldo: Math.round(saldo * 100) / 100,
          depositos: Math.round(totalDepositos * 100) / 100,
          rendimento: Math.round((saldo - totalDepositos) * 100) / 100,
        });
      }
    }
    return { saldoFinal: saldo, totalDepositos, rendimentoTotal: saldo - totalDepositos, tabela };
  }, [calculated, form]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label className="text-xs">Valor Inicial (R$)</Label>
          <Input className="mt-1" type="number" value={form.valorInicial} onChange={(e) => setForm({ ...form, valorInicial: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs">Depósito Mensal (R$)</Label>
          <Input className="mt-1" type="number" value={form.depositoMensal} onChange={(e) => setForm({ ...form, depositoMensal: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs">Taxa Mensal (%)</Label>
          <Input className="mt-1" type="number" step="0.01" value={form.taxa} onChange={(e) => setForm({ ...form, taxa: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs">Período (meses)</Label>
          <Input className="mt-1" type="number" value={form.meses} onChange={(e) => setForm({ ...form, meses: e.target.value })} />
        </div>
      </div>
      <Button onClick={() => setCalculated(true)}>
        <PiggyBank className="w-4 h-4 mr-2" />
        Calcular Poupança
      </Button>

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Saldo Final</p>
              <p className="text-xl font-bold text-primary mt-1">R$ {result.saldoFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Total Depositado</p>
              <p className="text-xl font-bold mt-1">R$ {result.totalDepositos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </Card>
            <Card className="p-4">
              <p className="text-xs text-muted-foreground">Rendimento Total</p>
              <p className="text-xl font-bold text-accent mt-1">R$ {result.rendimentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </Card>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mês</TableHead>
                      <TableHead className="text-right">Total Depositado</TableHead>
                      <TableHead className="text-right">Rendimento</TableHead>
                      <TableHead className="text-right">Saldo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.tabela.map((r) => (
                      <TableRow key={r.mes}>
                        <TableCell>{r.mes}</TableCell>
                        <TableCell className="text-right">R$ {r.depositos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right text-accent">R$ {r.rendimento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right font-semibold">R$ {r.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
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

export default function Calculadora() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calculadora Financeira</h1>
        <p className="text-sm text-muted-foreground mt-1">Simule empréstimos e poupança</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="emprestimo">
            <TabsList className="mb-6">
              <TabsTrigger value="emprestimo" className="gap-2">
                <Landmark className="w-4 h-4" />
                Empréstimo
              </TabsTrigger>
              <TabsTrigger value="poupanca" className="gap-2">
                <PiggyBank className="w-4 h-4" />
                Poupança
              </TabsTrigger>
            </TabsList>
            <TabsContent value="emprestimo">
              <EmprestimoCalculator />
            </TabsContent>
            <TabsContent value="poupanca">
              <PoupancaCalculator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}