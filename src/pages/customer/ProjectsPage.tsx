import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Layers, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BeforeAfterSlider } from '../../components/common/BeforeAfterSlider';
import { ProjectItem } from '../../types';

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const { projects, setIsBookVisitModalOpen, setPreselectedDesignCode } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects = projects.filter(p => {
    if (!p.isPublished) return false;
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  const handleBookFromProject = (designCode?: string) => {
    if (designCode) {
      setPreselectedDesignCode(designCode);
    }
    setIsBookVisitModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Proven Execution Track Record
        </div>
        <h1 className="font-serif-royal text-4xl sm:text-5xl font-extrabold text-white">
          Our Completed Projects
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
          Explore real residential penthouses, luxury villas, hotel lobbies, and commercial showrooms transformed with our seamless resin systems.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 justify-center overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'metallic-marble', label: 'Metallic & Marble' },
          { id: '3d-flooring', label: '3D Floors' },
          { id: 'wall-art', label: 'Wall Murals' },
          { id: 'staircase', label: 'Staircases' },
          { id: 'commercial-industrial', label: 'Commercial' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedCategory === tab.id
                ? 'bg-amber-500 text-black font-bold shadow-md'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-16">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-amber-500/30 shadow-2xl space-y-8"
          >
            {/* Top Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {project.location}
                </div>
                <h2 className="font-serif-royal text-2xl sm:text-3xl font-bold text-white">
                  {project.name}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                  <span className="text-slate-500">Area:</span> <strong className="text-white">{project.area}</strong>
                </div>
                {project.designUsed && (
                  <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">
                    Design: {project.designUsed}
                  </div>
                )}
                {project.completionDate && (
                  <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{project.completionDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Before & After Slider */}
            <div className="space-y-2">
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                title="Site Transformation (Interactive Slider)"
                subtitle="Slide horizontally to compare original raw/tiled floor with finished mirror resin"
              />
            </div>

            {/* Bottom details & CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {project.description}
              </p>

              <button
                onClick={() => handleBookFromProject(project.designUsed)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold text-xs flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Similar Design Visit</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
