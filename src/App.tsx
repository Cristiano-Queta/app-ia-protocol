import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CoordinatorLayout } from './layouts/CoordinatorLayout';
import { LiveOpsPage } from './pages/coordinator/LiveOpsPage';
import { IngestionPage } from './pages/coordinator/IngestionPage';
import { EOMPage } from './pages/coordinator/EOMPage';
import { ValidationPage } from './pages/coordinator/ValidationPage';
import { ApprovalPage } from './pages/coordinator/ApprovalPage';
import { TeamPostsPage } from './pages/coordinator/TeamPostsPage';
import { IncidentsPage } from './pages/coordinator/IncidentsPage';
import { AuditReportPage } from './pages/coordinator/AuditReportPage';
import { ProtocolPage } from './pages/protocol/ProtocolPage';
import { StorageService } from './services/storage';
import { EventOperationalModel } from './types';

export default function App() {
  const [eventModel, setEventModel] = useState<EventOperationalModel>(() => StorageService.getEventModel());

  const refreshData = () => {
    const updated = StorageService.getEventModel();
    setEventModel({ ...updated });
  };

  const handleResetDemo = () => {
    const reset = StorageService.resetDemoData();
    setEventModel({ ...reset });
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Terminal Móvel PWA do Protocolo (Totalmente Independente e Dedicado) */}
        <Route
          path="/protocolo"
          element={<ProtocolPage eventModel={eventModel} onRefresh={refreshData} />}
        />
        <Route
          path="/protocolo/:staffId"
          element={<ProtocolPage eventModel={eventModel} onRefresh={refreshData} />}
        />

        {/* Cockpit Modular do Coordenador (Com Navegação Modular por Páginas) */}
        <Route
          element={
            <CoordinatorLayout
              eventModel={eventModel}
              onResetDemo={handleResetDemo}
              onRefreshData={refreshData}
            />
          }
        >
          {/* Módulo 2: Operações no Terreno (Página Principal Directa) */}
          <Route
            path="/live"
            element={<LiveOpsPage eventModel={eventModel} onRefresh={refreshData} />}
          />
          <Route
            path="/live/equipa"
            element={<TeamPostsPage eventModel={eventModel} onRefresh={refreshData} />}
          />
          <Route
            path="/live/incidentes"
            element={<IncidentsPage eventModel={eventModel} onRefresh={refreshData} />}
          />

          {/* Módulo 1: Pré-Evento & Inteligência (Páginas Individuais) */}
          <Route
            path="/pre-evento/ingestao"
            element={<IngestionPage eventModel={eventModel} onRefresh={refreshData} />}
          />
          <Route
            path="/pre-evento/eom"
            element={<EOMPage eventModel={eventModel} onRefresh={refreshData} />}
          />
          <Route
            path="/pre-evento/validacao"
            element={<ValidationPage eventModel={eventModel} onRefresh={refreshData} />}
          />
          <Route
            path="/pre-evento/aprovacao"
            element={<ApprovalPage eventModel={eventModel} onRefresh={refreshData} />}
          />

          {/* Módulo 3: Governança & Pós-Evento */}
          <Route
            path="/governanca/auditoria"
            element={<AuditReportPage eventModel={eventModel} />}
          />

          {/* Rota Raiz Redireciona para o Cockpit Directo */}
          <Route path="/" element={<Navigate to="/live" replace />} />
          <Route path="*" element={<Navigate to="/live" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
