import React, { useState } from 'react';
import Work_02 from './Work02';

const Work = ({ onBack, lang }) => {
    const [filter, setFilter] = useState('3D');
    const [selectedProject, setSelectedProject] = useState(null);

    const translations = {
        Ch: { title: "WORKS", desc: "Index of projects", btn: "" },
        En: { title: "WORKS", desc: "Index of projects", btn: "" },
        Jp: { title: "作品索引", desc: "プロジェクトの記録", btn: "" }
    };

    const t = translations[lang] || translations.Ch;
    const categories = ['3D', 'Web', 'Design'];

    const projects = [
        { id: 3, title: "重啟", category: "3D", date: "2026.05", img: "img/Work/3D/Flower-0501.webp" },
        { id: 2, title: "Computer", category: "3D", date: "2026.03", img: "img/Work/3D/Computer.webp" },
        { id: 1, title: "Cat", category: "3D", date: "2026.03", img: "img/Work/3D/Cat.webp" },
        { id: 4, title: "Garden", category: "3D", date: "2026.03", img: "img/Work/3D/Garden.webp" },
        { id: 5, title: "Rabbit", category: "3D", date: "2026.03", img: "img/Work/3D/Rabbit.webp" },
        { id: 6, title: "Trial", category: "3D", date: "2026.03", img: "img/Work/3D/Trial.webp" },
        { id: 7, title: "Traffic Cone", category: "3D", date: "2026.02", img: "img/Work/3D/Triangular pyramid.webp" },
        { id: 8, title: "Plastic Sunset", category: "Web", date: "2025.06", img: "img/Work/web/Plastic_Sunse.jpg" },
        { id: 9, title: "X ?", category: "Design", date: "2025.03 ~ 202X.XX", img: "img/Work/Design/Boom.jpg" },
    ];

    const filteredProjects = projects.filter(p => p.category === filter);

    return (
        <div
            className="absolute inset-0 bg-white/10 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 lg:p-8"
            onClick={onBack}
        >
            <div
                className="relative flex-1 max-h-[95vh] h-full flex flex-col bg-orange-50/95 border border-white/60 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(180,83,9,0.15)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* 1. Header: 縮小 padding 與字體以適應筆電 */}
                {/* 1. Header: 縮小 padding 與字體以適應筆電 */}
                <header className="relative w-full flex justify-between items-end px-6 md:px-10 py-5 md:py-8 border-b border-orange-200/40 shrink-0">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4">
                            {/* 標題 */}
                            <h1 className="text-3xl md:text-5xl font-black text-orange-950 tracking-tighter uppercase leading-none">
                                {t.title}
                            </h1>

                            {/* 簡約返回按鈕：直接跟在標題後面 */}
                            <button
                                onClick={onBack}
                                className="group flex items-center justify-center p-1 transition-all active:scale-90"
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 md:w-6 md:h-6 text-orange-950/20 group-hover:text-orange-950 transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <p className="text-orange-800/40 text-[10px] mt-2 font-bold tracking-widest uppercase">
                            {t.desc}
                        </p>
                    </div>

                    {/* 右側保留給語言切換或音量按鈕（如果有） */}
                    <div className="flex gap-4">
                        {/* ... */}
                    </div>
                </header>

                {/* 2. Nav: 縮小垂直間距 */}
                <nav className="flex gap-6 md:gap-10 px-8 md:px-12 py-3 md:py-5 border-b border-orange-200/40 shrink-0">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`text-[10px] md:text-xs tracking-[0.2em] font-black transition-all relative pb-1 ${filter === cat ? 'text-orange-900' : 'text-orange-200 hover:text-orange-400'}`}
                        >
                            {cat}
                            {filter === cat && <div className="absolute -bottom-1 left-0 w-full h-[2px] md:h-[3px] bg-orange-800 rounded-full" />}
                        </button>
                    ))}
                </nav>

                {/* 3. Main: 縮小 Gap */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8">
                        {filteredProjects.map((proj) => (
                            <div
                                key={proj.id}
                                className="break-inside-avoid group cursor-pointer"
                                onClick={() => setSelectedProject(proj)}
                            >
                                <div className="bg-orange-100 rounded-xl md:rounded-2xl overflow-hidden relative shadow-inner border border-orange-200/20">
                                    <img
                                        src={proj.img}
                                        alt={proj.title}
                                        className="w-full h-auto block transition-all duration-700 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <Work_02
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
};

export default Work;