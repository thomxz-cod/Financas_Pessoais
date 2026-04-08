import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TabsLayout from './(tabs)/_layout';
import Index from './(tabs)/index';
import Noticias from './(tabs)/noticias';
import Simulador from './(tabs)/simulador';
import Calculadora from './(tabs)/calculadora';
import PageNotFound from '@/lib/PageNotFound';

export default function RootLayout() {
  return (
    <Routes>
      <Route element={<TabsLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/calculadora" element={<Calculadora />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}