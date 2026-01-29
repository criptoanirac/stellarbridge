import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Zap, Users, Shield } from "lucide-react";

/**
 * Onboarding Page - Welcome Screen
 * Design: Cyberpunk Futuristic with neon gradients
 * Features: Hero section with bridge imagery, symmetric action buttons
 */
export default function Onboarding() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-dark-bg grid-bg relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] opacity-80" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl" />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Hero Image */}
        <div className="mb-8 w-full max-w-2xl">
          <img 
            src="/images/hero-bridge.png" 
            alt="StellarBridge - Digital Bridge" 
            className="w-full h-auto rounded-lg neon-glow"
          />
        </div>

        {/* Content Section */}
        <div className="text-center mb-12 max-w-2xl">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-mono">
            <span className="gradient-cyber-text">StellarBridge</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-6 font-light">
            Sua ponte para a liberdade
          </p>
          
          {/* Description */}
          <p className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed">
            Capacitação, validação em blockchain e conexões reais
          </p>
          
          {/* Divider */}
          <div className="h-1 w-32 mx-auto mb-8 divider-angular" />
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card-neon">
              <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold text-cyan-400 mb-2">Capacitação</h3>
              <p className="text-sm text-gray-400">Desenvolva suas habilidades com cursos validados</p>
            </div>
            
            <div className="card-neon">
              <Shield className="w-8 h-8 text-magenta-400 mx-auto mb-3" />
              <h3 className="font-semibold text-magenta-400 mb-2">Blockchain</h3>
              <p className="text-sm text-gray-400">Credenciais verificadas e imutáveis</p>
            </div>
            
            <div className="card-neon">
              <Users className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold text-cyan-400 mb-2">Conexões</h3>
              <p className="text-sm text-gray-400">Encontre oportunidades reais e significativas</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl mb-20">
          <button
            onClick={() => setLocation("/talent-signup")}
            className="btn-cyber flex-1 text-center"
          >
            Sou Talento
          </button>
          
          <button
            onClick={() => setLocation("/employer-dashboard")}
            className="btn-cyber-outline flex-1 text-center"
          >
            Sou Empresa
          </button>
          
          <button
            onClick={() => setLocation("/impacto-social")}
            className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            Ver Impacto
          </button>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 pb-6 text-center text-gray-500 text-sm">
          <p>Conectando talento verificado a oportunidades reais</p>
        </div>
      </div>
    </div>
  );
}
