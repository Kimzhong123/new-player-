
import React from 'react';
import { PageContent } from '../types';
import { APPLICATION_STEPS } from '../constants';

interface BookPageProps {
  content: PageContent;
  pageIndex: number;
}

const BookPage: React.FC<BookPageProps> = ({ content }) => {
  // Base fixed resolution: 1000px x 707px
  // The parent container handles the sizing via CSS scale
  
  const ApplicationBlock = () => (
    <div className="mt-auto p-4 rounded-xl bg-purple-50/50 border border-purple-100/50">
       <h4 className="text-xs font-bold text-[#5D4B8E] mb-3 flex items-center gap-2 uppercase tracking-wider">
          <div className="w-1.5 h-1.5 rounded-full bg-[#5D4B8E]"></div>
          服务申请方式
       </h4>
       <div className="flex gap-4">
          {APPLICATION_STEPS.map((step, idx) => (
             <div key={idx} className="flex flex-1 items-center gap-2 p-2 bg-white rounded-lg border border-purple-50 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#5D4B8E]/5 text-[#5D4B8E] flex items-center justify-center flex-shrink-0">
                   <step.icon size={16} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-800">{step.title}</div>
                  <div className="text-[9px] text-gray-400">{step.desc}</div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );

  // --- LAYOUT: COVER ---
  if (content.layout === 'cover') {
    return (
      <div className="w-full h-full relative overflow-hidden bg-[#5D4B8E] text-white flex-shrink-0 select-none">
        <img src={content.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5D4B8E] to-transparent/50"></div>
        
        <div className="relative z-10 h-full flex items-center justify-between p-24">
           <div className="w-[500px]">
              <div className="flex items-center gap-3 mb-12 opacity-80">
                <div className="w-10 h-10 border border-white/30 flex items-center justify-center text-xs font-bold tracking-widest bg-white/10 backdrop-blur">THTF</div>
                <div className="text-sm font-light tracking-[0.2em]">AEGON THTF</div>
              </div>
              
              <h1 className="text-7xl font-bold font-sans tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-purple-200">
                {content.englishTitle}
              </h1>
              
              <div className="w-24 h-2 bg-[#C8AA6E] mb-8"></div>
              
              <h2 className="text-4xl font-serif tracking-wide text-white">
                {content.title} <span className="text-[#C8AA6E] ml-2 font-sans text-2xl font-light">{content.subtitle}</span>
              </h2>
           </div>
           
           {/* Decorative Element */}
           <div className="w-64 h-64 rounded-full border-[32px] border-white/5 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C8AA6E] to-transparent opacity-20 rounded-full blur-2xl"></div>
           </div>
        </div>
      </div>
    );
  }

  // --- LAYOUT: INTRO ---
  if (content.layout === 'intro') {
    return (
      <div className="w-full h-full relative bg-white flex flex-shrink-0 select-none">
         <div className="w-[350px] bg-[#5D4B8E] text-white p-16 flex flex-col justify-center relative overflow-hidden">
            <h1 className="text-5xl font-bold tracking-tighter leading-none mb-6 opacity-90">{content.englishTitle}</h1>
            <div className="w-12 h-1.5 bg-[#C8AA6E] mb-12"></div>
            <div className="text-sm font-light opacity-60 leading-loose tracking-widest">PREMIUM HEALTH<br/>SERVICE HANDBOOK<br/>2025 EDITION</div>
         </div>
         <div className="flex-1 p-16 flex flex-col">
            <div className="flex-1">
                <h3 className="text-3xl font-bold text-[#5D4B8E] mb-10">{content.title}</h3>
                <div className="space-y-6">
                   {content.text?.map((p, i) => (
                      <p key={i} className="text-base text-gray-600 leading-8 text-justify">{p}</p>
                   ))}
                </div>
            </div>
            <div className="text-right mt-12">
               <div className="text-xl font-bold text-[#5D4B8E]">{content.subtitle}</div>
            </div>
         </div>
      </div>
    );
  }

  // --- LAYOUT: TOC ---
  if (content.layout === 'toc') {
    return (
      <div className="w-full h-full bg-white relative overflow-hidden flex flex-shrink-0 select-none">
         <div className="absolute right-0 top-0 w-[400px] h-full bg-gray-50 skew-x-12 origin-top-right"></div>
         
         <div className="relative z-10 w-full h-full p-20 flex gap-16">
            <div className="w-1/2 flex flex-col justify-center">
               <h1 className="text-7xl font-bold text-[#5D4B8E] tracking-tighter mb-4">{content.englishTitle}</h1>
               <h2 className="text-2xl text-gray-400 tracking-[0.5em] uppercase">{content.title}</h2>
            </div>
            
            <div className="w-1/2 flex flex-col justify-center space-y-10">
                {content.bullets?.map((item, idx) => {
                   const [num, ...rest] = item.split('...');
                   const textParts = rest.join('').split('\n');
                   return (
                     <div key={idx} className="flex gap-6 items-center group">
                        <div className="text-6xl font-serif text-[#C8AA6E] opacity-50 font-bold group-hover:opacity-100 group-hover:text-[#5D4B8E] transition-all">{num.trim()}</div>
                        <div>
                           <div className="text-xl font-bold text-gray-800">{textParts[0]}</div>
                           <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{textParts[1]}</div>
                        </div>
                     </div>
                   );
                })}
            </div>
         </div>
      </div>
    );
  }

  // --- LAYOUT: BACK COVER ---
  if (content.layout === 'back_cover') {
    return (
      <div className="w-full h-full relative bg-[#5D4B8E] text-white flex flex-col items-center justify-center flex-shrink-0 select-none">
         <img src={content.backgroundImage} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" alt=""/>
         <div className="relative z-10 text-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">{content.englishTitle}</h1>
            <h2 className="text-2xl font-light tracking-[0.2em]">{content.title}</h2>
            <div className="w-20 h-1 bg-[#C8AA6E] mx-auto my-8"></div>
            <div className="text-sm font-light opacity-80 leading-loose">
               {content.subtitle}<br/>
               {content.text?.map(t => <div key={t}>{t}</div>)}
            </div>
         </div>
      </div>
    );
  }

  // --- LAYOUT: STANDARD ---
  return (
    <div className="w-full h-full bg-white relative overflow-hidden flex flex-col flex-shrink-0 shadow-inner select-none">
       {/* Background Header */}
       <div className="absolute top-0 left-0 w-full h-[180px] bg-gradient-to-b from-gray-50 to-white z-0">
          <div className="absolute top-8 right-12 text-8xl font-bold text-gray-100 select-none whitespace-nowrap">
             {content.englishTitle}
          </div>
       </div>
       <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5D4B8E] to-[#C8AA6E]"></div>

       {/* Content Area */}
       <div className="relative z-10 flex-1 p-16 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-6 mb-10">
             <div className="w-14 h-14 bg-[#5D4B8E] text-white flex items-center justify-center text-2xl font-bold rounded-xl shadow-lg shadow-purple-200">
                {content.pageNumber}
             </div>
             <div>
                <h2 className="text-3xl font-bold text-gray-800">{content.title}</h2>
             </div>
          </div>

          <div className="flex-1 flex flex-col gap-6">
             {/* Optional Image */}
             {content.image && (
                <div className="h-48 w-full rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                   <img src={content.image} className="w-full h-full object-cover" alt="" />
                </div>
             )}

             {/* Text Block */}
             {content.text && (
                <div className="space-y-4">
                   {content.text.map((p, idx) => (
                      <p key={idx} className="text-[17px] text-gray-600 leading-[1.8] text-justify">{p}</p>
                   ))}
                </div>
             )}

             {/* Bullets Block */}
             {content.bullets && (
                <div className="grid grid-cols-1 gap-3">
                   {content.bullets.map((b, idx) => (
                      <div key={idx} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                         <div className="w-2 h-2 rounded-full bg-[#C8AA6E] mt-2 flex-shrink-0"></div>
                         <div className="text-[15px] text-gray-700 leading-relaxed">{b}</div>
                      </div>
                   ))}
                </div>
             )}

             {/* Table Block */}
             {content.table && (
                <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
                   <table className="w-full text-sm">
                      <thead className="bg-[#5D4B8E] text-white">
                         <tr>
                            {content.table.headers.map((h, i) => (
                               <th key={i} className="p-3 text-left font-medium border-r border-white/10 last:border-none" style={{width: content.table?.colWidths?.[i]}}>{h}</th>
                            ))}
                         </tr>
                      </thead>
                      <tbody>
                         {content.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                               {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2.5 border-b border-gray-100 border-r last:border-r-0 text-gray-600">{cell}</td>
                               ))}
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             )}
             
             {/* Highlight Box */}
             {(content.boxTitle || content.boxText) && (
                <div className="bg-amber-50 border border-amber-100 p-5 rounded-xl mt-2">
                   {content.boxTitle && <h4 className="text-amber-600 font-bold text-sm mb-2 uppercase">{content.boxTitle}</h4>}
                   {content.boxText?.map((t, i) => <p key={i} className="text-sm text-gray-600">{t}</p>)}
                </div>
             )}
          </div>

          {/* Footer Area */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-end">
             {content.hasServiceApplication && <div className="flex-1 mr-8"><ApplicationBlock /></div>}
             <div className="text-right">
                <div className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">Tong Shou Hu 2025</div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default BookPage;
