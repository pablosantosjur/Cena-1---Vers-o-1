
import React from 'react';

export const LoadingVideo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center animate-in fade-in duration-700">
      <div className="relative w-32 h-32 mb-10">
        {/* Progress Ring Background */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-[#3F3F3F]"
          />
          {/* Animated Progress Ring */}
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeDasharray="377"
            strokeDashoffset="100"
            strokeLinecap="round"
            fill="transparent"
            className="animate-[spin_3s_linear_infinite]"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF0000" />
              <stop offset="100%" stopColor="#CC0000" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-[#F1F1F1] rounded-full flex items-center justify-center shadow-lg border border-[#3F3F3F] group animate-pulse">
            <svg 
              className="w-8 h-8 text-[#FF0000] ml-1" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Rotating Sparkle */}
        <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <div className="w-8 h-8 bg-[#272727] rounded-full shadow-xl flex items-center justify-center border border-[#3F3F3F]">
                <svg className="w-4 h-4 text-[#FF0000] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-md">
        <h3 className="text-xl font-black text-[#F1F1F1] mb-4 tracking-tighter uppercase">
          Criando conteúdo viral...
        </h3>
        <p className="text-[#AAAAAA] text-sm md:text-base leading-relaxed font-medium">
          Aguarde enquanto a nossa IA Generativa especializada em Processamento de Linguagem Natural está criando um conteúdo viral, com gancho de retenção e incluindo os dados de SEO para melhor ranqueamento nas buscas orgânicas.
        </p>
      </div>

      <div className="mt-12 flex gap-2 justify-center">
        <div className="w-2 h-2 rounded-full bg-[#FF0000] animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-[#AAAAAA] animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-[#FF0000] animate-bounce"></div>
      </div>
    </div>
  );
};
