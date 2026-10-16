import React from "react";

interface IconoMancuernaProps extends React.SVGProps<SVGSVGElement>{
    className?: string;
    size?: number;
}

export function IconoMancuerna ({className, size = 24, ...props}: IconoMancuernaProps){
    return(
        <svg
              className={className}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m6.5 6.5 11 11" />
              <path d="m21 21-1-1a2.8 2.8 0 0 0-4 0l-1 1" />
              <path d="m9 9-1-1a2.8 2.8 0 0 0-4 0l-1 1" />
              <path d="m3 3 1 1a2.8 2.8 0 0 0 4 0l1-1" />
              <path d="m15 15 1 1a2.8 2.8 0 0 0 4 0l1-1" />
            </svg>
    );
}