import { useEffect } from 'react';

export function useGiscusStyles(showAllComments: boolean) {
  useEffect(() => {
    const styleId = 'giscus-limit-style';
    const existingStyle = document.getElementById(styleId);
    
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = styleId;
    
    let cssRules = `
      /* Ensure Giscus iframe is interactive and properly aligned */
      #interactive {
        transform: none !important;
      }
      .giscus-container {
        pointer-events: auto !important;
        position: relative !important;
        z-index: 10 !important;
        isolation: isolate !important;
        width: 100% !important;
        max-width: 100% !important;
        overflow: visible !important;
        transform: none !important;
        box-sizing: border-box !important;
      }
      .giscus-container iframe {
        pointer-events: auto !important;
        position: static !important;
        z-index: 10 !important;
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        overflow-x: hidden !important;
        transform: none !important;
        left: 0 !important;
        right: 0 !important;
      }
      .giscus-container *, 
      .giscus-container iframe * {
        pointer-events: auto !important;
      }
      .giscus {
        width: 100% !important;
        max-width: 100% !important;
        transform: none !important;
      }
    `;
    
    // Limit comments to 2 when not showing all
    if (!showAllComments) {
      cssRules += `
        .giscus .giscus-comment:nth-child(n+3) {
          display: none !important;
        }
      `;
    }
    
    style.innerHTML = cssRules;
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, [showAllComments]);
}