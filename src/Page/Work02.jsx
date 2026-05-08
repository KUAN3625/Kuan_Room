import React from 'react';

const Work_02 = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black cursor-zoom-out animate-in fade-in duration-300 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <img
        src={project.img}
        alt={project.title}

        className="w-full h-full object-contain"
      />

      {/* <div className="absolute bottom-10 left-10 flex flex-col gap-1 mix-blend-difference pointer-events-none">
        <h2 className="text-white text-4xl font-black tracking-tighter uppercase leading-none">
          {project.title}
        </h2>
        <p className="text-white/50 text-[10px] font-mono italic tracking-[0.2em] uppercase mt-2">
          INDEXED // {project.date}
        </p>
      </div> */}

      {/* 移除 mix-blend-difference，加入 drop-shadow */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1 pointer-events-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
        <h2 className="text-white text-4xl font-black tracking-tighter uppercase leading-none">
          {project.title}
        </h2>
        <p className="text-white/70 text-[10px] font-mono italic tracking-[0.2em] uppercase mt-2">
          INDEXED // {project.date}
        </p>
      </div>
    </div>
  );
};

export default Work_02;