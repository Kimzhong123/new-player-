
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, List, X } from 'lucide-react';
import { BOOK_PAGES } from '../constants';
import BookPage from './BookPage';
import { PageContent } from '../types';

const FlipBook: React.FC = () => {
  // Logic: "Sheets" represent a physical piece of paper.
  // Sheet n has Front (Page 2n) and Back (Page 2n+1).
  // CurrentSheetIndex determines which sheet is currently "flipping" or on top of the right stack.
  // 0 means Sheet 0 is visible on right. -1 means all flipped to left.
  
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Design Constants
  const PAGE_WIDTH = 1000;
  const PAGE_HEIGHT = 707;
  const TOTAL_PAGES = BOOK_PAGES.length;
  // Calculate total sheets required
  const TOTAL_SHEETS = Math.ceil(TOTAL_PAGES / 2);

  // Group pages into sheets for easier rendering
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

      // Dimensions to fit into
      // If portrait, we conceptually swap W and H because we will rotate the container 90deg
      const targetW = portrait ? h : w;
      const targetH = portrait ? w : h;
      
      const padding = 20;
      const availableW = targetW - padding;
      const availableH = targetH - padding;
      
      // We need to fit TWO pages side by side (2 * PAGE_WIDTH)
      const fullBookWidth = PAGE_WIDTH * 2;
      
      const scaleX = availableW / fullBookWidth;
      const scaleY = availableH / PAGE_HEIGHT;
      
      const fitScale = Math.min(scaleX, scaleY);
      setScale(fitScale * 0.95);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
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
    // Determine which sheet contains this page
    const sheetIdx = Math.floor(pageIdx / 2);
    // If we want to see this page, we need to flip TO it.
    // If page is even (Front), it will be on Right.
    // If page is odd (Back), it will be on Left.
    // Logic: 
    // Target Sheet 0 -> Show Front(0), Back(1). currentSheetIndex = 0.
    // Target Sheet 1 -> Show Front(2), Back(3). currentSheetIndex = 1.
    // So if I click Page 2, I want Sheet 1 on Right.
    // If I click Page 3, I want Sheet 1 on Left? No, Spread 2 is Page 2(L) - Page 3(R)? 
    // WAIT.
    // Spread 0: [Empty] [Page 0 Cover]
    // Spread 1: [Page 1] [Page 2]
    // Spread 2: [Page 3] [Page 4]
    
    // My Sheet Logic:
    // Sheet 0: Front=P0, Back=P1.
    // State 0: Sheet 0 is Right. (Visible: Front P0). Left Empty.
    // State 1: Sheet 0 is Left. (Visible: Back P1). Sheet 1 is Right (Visible Front P2).
    // So to see Page P (index), we need state?
    // If P=0: State 0.
    // If P=1: State 1.
    // If P=2: State 1.
    // If P=3: State 2.
    // If P=4: State 2.
    
    // Formula: State = Math.ceil(P / 2) ?
    // P=0 -> 0.
    // P=1 -> 1. (0.5 ceil -> 1)
    // P=2 -> 1. (1 ceil -> 1)
    // P=3 -> 2. (1.5 ceil -> 2)
    // P=4 -> 2.
    
    let targetState = 0;
    if (pageIdx === 0) targetState = 0;
    else targetState = Math.ceil(pageIdx / 2);
    
    setCurrentSheetIndex(targetState);
    setIsTocOpen(false);
  };

  // 3. Touch / Swipe Logic
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null); // For rotated gesture detection

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    let diff = 0;
    
    // If Portrait, the app is rotated 90deg.
    // Visual Left is Physical Top? 
    // Rotate 90deg (Clockwise):
    // Top -> Right. Right -> Bottom. Bottom -> Left. Left -> Top.
    // Wait, CSS `rotate(90deg)` turns the element clockwise.
    // Visual "Left" corresponds to Physical "Bottom" relative to original?
    // Let's rely on simple X/Y axis in the *visual* space.
    // But touches are reported in screen coordinates.
    
    if (isPortrait) {
        // App is rotated 90deg clockwise.
        // User swipes "Left" (physically left on screen, X axis decreases).
        // Visually, that is "Up" on the book spine? No.
        // If I hold phone upright:
        // Book spine is horizontal.
        // I want to swipe "Left" (Screen X) to go next page?
        // No, if text is sideways, I rotate the phone.
        // If I rotate the phone, browser reports Landscape (w > h). `isPortrait` becomes false.
        // So `isPortrait` is ONLY true if user refuses to rotate phone or has lock on.
        // In that case, they are looking at sideways text.
        // To flip a "sideways" page "left", they would physically swipe "Up" (if top is left) or "Down"?
        // Let's assume most users rotate. 
        // If they don't, standard X swipe is fine, it just feels weird.
        diff = touchStartX.current - endX;
    } else {
        diff = touchStartX.current - endX;
    }

    if (diff > 50) nextSpread();
    if (diff < -50) prevSpread();
    
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
                    {/* Render Sheets */}
                    {sheets.map((sheet, index) => {
                        // Z-Index Logic
                        // Sheets < current (Left stack): Higher index = Higher Z (Page 1 is top of left stack)
                        // Sheets >= current (Right stack): Lower index = Higher Z (Page 2 is top of right stack)
                        
                        let zIndex = 0;
                        if (index < currentSheetIndex) {
                            // Left side: index 0 is bottom, index (current-1) is top.
                            zIndex = index;
                        } else {
                            // Right side: index current is top, index max is bottom.
                            zIndex = TOTAL_SHEETS - index; 
                        }

                        // Rotation Logic
                        // If index < current, it is flipped (-180deg)
                        const isFlipped = index < currentSheetIndex;
                        const rotation = isFlipped ? -180 : 0;

                        return (
                            <div 
                                key={index}
                                className="absolute top-0 left-1/2 w-[1000px] h-[707px] origin-left transition-transform duration-700 ease-in-out preserve-3d shadow-xl"
                                style={{ 
                                    transform: `rotateY(${rotation}deg)`,
                                    zIndex: zIndex,
                                    marginLeft: '0px' // Origin is left edge, so it sits on the right half by default
                                }}
                            >
                                {/* FRONT FACE (Right Page) */}
                                <div 
                                    className="absolute inset-0 backface-hidden bg-white overflow-hidden" 
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    {/* Page Content */}
                                    {sheet.front ? (
                                        <BookPage content={sheet.front} pageIndex={index * 2} />
                                    ) : (
                                        <div className="w-full h-full bg-white"></div> // Empty white page
                                    )}
                                    
                                    {/* Shadow Gradient for folding realism */}
                                    {/* When flipped (on left), this face is hidden. When on right, we might want shadow near spine. */}
                                    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none"></div>
                                    
                                    {/* Darken when flipping to left */}
                                    <div className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-700 ${isFlipped ? 'opacity-50' : 'opacity-0'}`}></div>
                                </div>

                                {/* BACK FACE (Left Page) */}
                                <div 
                                    className="absolute inset-0 bg-white overflow-hidden"
                                    style={{ 
                                        transform: 'rotateY(180deg)', 
                                        backfaceVisibility: 'hidden' 
                                    }}
                                >
                                    {/* Page Content */}
                                    {sheet.back ? (
                                        <BookPage content={sheet.back} pageIndex={index * 2 + 1} />
                                    ) : (
                                        <div className="w-full h-full bg-white"></div>
                                    )}

                                    {/* Shadow Gradient for spine */}
                                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>

                                    {/* Darken when sitting on right stack (unflipped) */}
                                    <div className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-700 ${!isFlipped ? 'opacity-50' : 'opacity-0'}`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
      </div>

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
