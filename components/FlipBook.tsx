
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, List, X, Hand } from 'lucide-react';
import { BOOK_PAGES } from '../constants';
import BookPage from './BookPage';

const FlipBook: React.FC = () => {
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  
  // Design Constants
  const PAGE_WIDTH = 1000;
  const PAGE_HEIGHT = 707;
  const TOTAL_PAGES = BOOK_PAGES.length;
  const TOTAL_SHEETS = Math.ceil(TOTAL_PAGES / 2);

  const sheets = useMemo(() => {
    const s = [];
    for (let i = 0; i < TOTAL_SHEETS; i++) {
      s.push({
        front: BOOK_PAGES[i * 2],
        back: BOOK_PAGES[i * 2 + 1]
      });
    }
    return s;
  }, []);

  // 1. Handle Responsive Scaling & Orientation
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const portrait = h > w;
      setIsPortrait(portrait);

      const targetW = portrait ? h : w;
      const targetH = portrait ? w : h;
      
      const padding = 20;
      const availableW = targetW - padding;
      const availableH = targetH - padding;
      
      const fullBookWidth = PAGE_WIDTH * 2;
      
      const scaleX = availableW / fullBookWidth;
      const scaleY = availableH / PAGE_HEIGHT;
      
      const fitScale = Math.min(scaleX, scaleY);
      setScale(fitScale * 0.96);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Hide hint after 3 seconds
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // 2. Navigation
  const nextSpread = () => {
    if (currentSheetIndex < TOTAL_SHEETS) {
      setCurrentSheetIndex(prev => prev + 1);
    }
  };

  const prevSpread = () => {
    if (currentSheetIndex > 0) {
      setCurrentSheetIndex(prev => prev - 1);
    }
  };
  
  const goToPage = (pageIdx: number) => {
    let targetState = 0;
    if (pageIdx === 0) targetState = 0;
    else targetState = Math.ceil(pageIdx / 2);
    
    setCurrentSheetIndex(targetState);
    setIsTocOpen(false);
  };

  // 3. Touch / Swipe Logic
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setShowHint(false);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    let diff = 0;
    
    if (isPortrait) {
        // When rotated 90deg (Portrait phone):
        // Visual "Right" is Screen "Top" (Y=0)
        // Visual "Left" is Screen "Bottom" (Y=MAX)
        // To go NEXT (Flip Right to Left), user gestures Top -> Bottom on screen.
        // Screen Y increases.
        // Diff = StartY - EndY.
        // Top(0) - Bottom(500) = -500.
        // So negative diff is NEXT.
        
        const diffY = touchStartY.current - endY;
        diff = diffY; 
    } else {
        // Standard Landscape
        const diffX = touchStartX.current - endX;
        diff = diffX;
    }

    // Threshold for swipe
    if (diff > 50) nextSpread();      // Swipe Left (or Up-ish relative to book?) Wait.
    // If standard: Swipe Left (Start > End) -> Diff + -> Next Page. Correct.
    // If portrait: Start(Top) < End(Bottom) -> Diff - -> Prev Page?
    // Let's re-verify portrait logic.
    // We want content to move Right -> Left.
    // User puts finger on "Right" (Top of phone) and drags to "Left" (Bottom of phone).
    // Finger moves Down. EndY > StartY. Diff (Start - End) is Negative.
    // So if Diff < -50, that is a "Next Page" gesture in Portrait?
    // Let's check typical UX.
    // Usually "Swipe Left" means "Next".
    // Visual "Left" is Bottom.
    // So drag towards Bottom.
    // Yes, Diff Negative should be Next.
    
    // Correcting Logic for Portrait:
    if (isPortrait) {
       // Drag Down (Top -> Bottom) = Next Page
       if (diff < -50) nextSpread();
       // Drag Up (Bottom -> Top) = Prev Page
       if (diff > 50) prevSpread();
    } else {
       // Drag Left = Next Page
       if (diff > 50) nextSpread();
       // Drag Right = Prev Page
       if (diff < -50) prevSpread();
    }
    
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div className="w-full h-full bg-[#1a1a1a] overflow-hidden font-sans select-none relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a]"></div>

      {/* Main Container - Rotates if Portrait */}
      <div 
        className="absolute left-1/2 top-1/2 transition-all duration-500 ease-out"
        style={{
             width: isPortrait ? '100vh' : '100vw',
             height: isPortrait ? '100vw' : '100vh',
             transform: `translate(-50%, -50%) ${isPortrait ? 'rotate(90deg)' : 'rotate(0deg)'}`,
        }}
      >
        {/* Book Scale Wrapper */}
        <div className="w-full h-full flex items-center justify-center">
            <div 
                className="relative perspective-[2500px]"
                style={{ 
                    width: PAGE_WIDTH * 2, 
                    height: PAGE_HEIGHT,
                    transform: `scale(${scale})`,
                    transition: 'transform 0.3s ease-out'
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* BOOK SPINE CENTER LINE */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 z-0"></div>

                <div className="relative w-full h-full preserve-3d">
                    {sheets.map((sheet, index) => {
                        let zIndex = 0;
                        if (index < currentSheetIndex) {
                            zIndex = index;
                        } else {
                            zIndex = TOTAL_SHEETS - index; 
                        }

                        const isFlipped = index < currentSheetIndex;
                        const rotation = isFlipped ? -180 : 0;

                        return (
                            <div 
                                key={index}
                                className="absolute top-0 left-1/2 w-[1000px] h-[707px] origin-left transition-transform duration-700 ease-in-out preserve-3d shadow-2xl"
                                style={{ 
                                    transform: `rotateY(${rotation}deg)`,
                                    zIndex: zIndex,
                                    marginLeft: '0px'
                                }}
                            >
                                {/* FRONT FACE (Right Page) */}
                                <div 
                                    className="absolute inset-0 backface-hidden bg-white overflow-hidden" 
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    {sheet.front ? (
                                        <BookPage content={sheet.front} pageIndex={index * 2} />
                                    ) : (
                                        <div className="w-full h-full bg-white"></div>
                                    )}
                                    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
                                    <div className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-700 ${isFlipped ? 'opacity-40' : 'opacity-0'}`}></div>
                                </div>

                                {/* BACK FACE (Left Page) */}
                                <div 
                                    className="absolute inset-0 bg-white overflow-hidden"
                                    style={{ 
                                        transform: 'rotateY(180deg)', 
                                        backfaceVisibility: 'hidden' 
                                    }}
                                >
                                    {sheet.back ? (
                                        <BookPage content={sheet.back} pageIndex={index * 2 + 1} />
                                    ) : (
                                        <div className="w-full h-full bg-white"></div>
                                    )}
                                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
                                    <div className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-700 ${!isFlipped ? 'opacity-40' : 'opacity-0'}`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
      </div>
      
      {/* Gesture Hint Overlay */}
      {showHint && (
        <div className={`fixed inset-0 pointer-events-none z-40 flex items-center justify-center transition-opacity duration-500 ${isPortrait ? 'rotate-90' : ''}`}>
           <div className="bg-black/60 text-white px-6 py-4 rounded-full flex items-center gap-4 backdrop-blur-md animate-pulse">
               <Hand className="animate-bounce" />
               <span className="text-sm font-bold tracking-widest">
                   {isPortrait ? "SWIPE DOWN TO FLIP" : "SWIPE LEFT TO FLIP"}
               </span>
           </div>
        </div>
      )}

      {/* Control Bar */}
      <div 
        className={`fixed left-1/2 -translate-x-1/2 flex items-center gap-6 z-50 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 text-white transition-all duration-300 ${isPortrait ? 'bottom-8 rotate-90 origin-center' : 'bottom-8'}`}
        style={ isPortrait ? { bottom: '50%', transform: 'translate(-50%, 50%) rotate(90deg)', transformOrigin: 'center' } : {}}
      >
        <button 
          onClick={prevSpread} 
          disabled={currentSheetIndex === 0}
          className="hover:text-[#C8AA6E] disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
            onClick={() => setIsTocOpen(true)}
            className="flex items-center gap-2 px-2 hover:text-[#C8AA6E] transition-colors"
        >
            <List size={20} />
            <span className="text-xs font-bold tracking-widest uppercase hidden sm:block">目录</span>
        </button>

        <div className="text-sm font-bold tracking-widest min-w-[40px] text-center">
           {currentSheetIndex} / {TOTAL_SHEETS}
        </div>
        
        <button 
          onClick={nextSpread} 
          disabled={currentSheetIndex === TOTAL_SHEETS}
          className="hover:text-[#C8AA6E] disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* TOC Overlay */}
      {isTocOpen && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
              <div 
                className="w-full max-w-md h-full bg-white text-gray-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                      <h2 className="text-xl font-bold text-[#5D4B8E]">目录 / Contents</h2>
                      <button onClick={() => setIsTocOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                          <X size={24} />
                      </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                      <div className="space-y-2">
                          {BOOK_PAGES.map((page, idx) => (
                              <button 
                                key={idx}
                                onClick={() => goToPage(idx)}
                                className="w-full text-left p-4 rounded-xl hover:bg-purple-50 transition-colors group border border-transparent hover:border-purple-100"
                              >
                                  <div className="flex justify-between items-start">
                                      <div>
                                          <div className="text-xs font-bold text-gray-400 mb-1">PAGE {idx + 1}</div>
                                          <div className="font-bold text-gray-800 group-hover:text-[#5D4B8E]">{page.title}</div>
                                      </div>
                                      {page.englishTitle && (
                                          <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1 group-hover:text-purple-300">
                                              {page.englishTitle}
                                          </div>
                                      )}
                                  </div>
                              </button>
                          ))}
                      </div>
                  </div>
              </div>
              <div className="flex-1" onClick={() => setIsTocOpen(false)}></div>
          </div>
      )}

      {/* Click Zones for Desktop */}
      <div className="fixed top-0 bottom-0 left-0 w-24 z-30 cursor-pointer hidden md:block hover:bg-white/5 transition-colors" onClick={prevSpread}></div>
      <div className="fixed top-0 bottom-0 right-0 w-24 z-30 cursor-pointer hidden md:block hover:bg-white/5 transition-colors" onClick={nextSpread}></div>

    </div>
  );
};

export default FlipBook;
