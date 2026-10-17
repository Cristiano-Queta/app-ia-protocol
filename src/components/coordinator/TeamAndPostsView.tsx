import React, { useState } from 'react';
import {
  Users,
  Shield,
  Layers,
  MapPin,
  Star,
  Check,
  AlertTriangle
} from 'lucide-react';
import { EventOperationalModel, User, StaffProfile } from '../../types';
import { StorageService } from '../../services/storage';

interface TeamAndPostsViewProps {
  eventModel: EventOperationalModel;
  onRefresh: () => void;
}

export const TeamAndPostsView: React.FC<TeamAndPostsViewProps> = ({
  eventModel,
  onRefresh
}) => {
  const [activeTab, setActiveTab] = useState<'STAFF' | 'POSTS'>('STAFF');
  const users = StorageService.getUsers();
  const profiles = StorageService.getStaffProfiles();

  const toggleVipCertification = (userId: string) => {
    const updatedProfiles = profiles.map(p => {
      if (p.userId === userId) {
        return { ...p, isVipCertified: !p.isVipCertified };
      }
      return p;
    });
    StorageService.saveStaffProfiles(updatedProfiles);
    onRefresh();
  };

  return (
    <div className="space-y-6">

      {/* TOP TABS */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('STAFF')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'STAFF'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Equipa de Protocolo ({users.filter(u => u.role === 'PROTOCOL').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('POSTS')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'POSTS'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Directório de Postos ({eventModel.posts.length})</span>
          </button>
        </div>
      </div>

      {/* STAFF DIRECTORY */}
      {activeTab === 'STAFF' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {users.filter(u => u.role === 'PROTOCOL').map((member) => {
            const profile = profiles.find(p => p.userId === member.id);
            const currentAssignment = eventModel.assignments.find(a => a.staffId === member.id);
            const post = eventModel.posts.find(p => p.id === currentAssignment?.postId);

            return (
              <div key={member.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400">
                      {member.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{member.fullName}</h4>
                      <p className="text-[11px] text-slate-400">{member.phoneNumber}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleVipCertification(member.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                      profile?.isVipCertified
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                    title="Alternar certificação VIP deste protocolo"
                  >
                    {profile?.isVipCertified ? '⭐ Certificado VIP' : '+ Habilitar VIP'}
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1 text-[11px]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Posto Actual:</span>
                    <span className="font-semibold text-slate-200">{post?.name || 'Não Alocado'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Idiomas:</span>
                    <span className="font-semibold text-white uppercase">{profile?.spokenLanguages.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Uniforme / Exp:</span>
                    <span className="text-slate-300">Tam: {profile?.uniformSize || 'M'} • {profile?.yearsExperience} anos</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">PIN de Acesso: <span className="font-mono text-white">{member.pin}</span></span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    profile?.currentStatus === 'ON_POST'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {profile?.currentStatus === 'ON_POST' ? 'Em Posto' : 'Presente'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* POSTS DIRECTORY */}
      {activeTab === 'POSTS' && (
        <div className="space-y-3">
          {eventModel.posts.map((post) => (
            <div key={post.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 text-xs px-2 py-0.5 bg-slate-950 rounded border border-slate-800">
                      {post.code}
                    </span>
                    <h4 className="font-bold text-white text-sm">{post.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{post.locationDetails}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-black shrink-0 ${
                  post.priority === 'CRITICAL'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : post.priority === 'HIGH'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {post.priority}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="font-bold text-slate-200">Missão Táctica: </span>
                {post.missionStatement}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  <span className="font-bold text-red-400 block mb-1">✕ Proibições Estritas:</span>
                  <ul className="space-y-0.5 text-slate-300">
                    {post.prohibitedActions.map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                  <span className="font-bold text-emerald-400 block mb-1">✓ Requisitos de Acesso:</span>
                  <p className="text-slate-300">
                    Efectivo Mínimo: <strong>{post.minStaff} protocolo(s)</strong> {post.requiresVipQualification && '• Requer Certificação VIP'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
