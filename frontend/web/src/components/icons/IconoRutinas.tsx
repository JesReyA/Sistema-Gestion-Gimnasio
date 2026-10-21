import React from "react";

interface IconoRutinasProps extends React.SVGProps<SVGSVGElement>{
    className?: string;
    size?: number;
}

export function IconoRutinas ({className, size = 24, ...props}: IconoRutinasProps){
    return(
        <svg
              className={className}
              viewBox="0 0 24 24"
            >
              <rect x="2" y="7.5" width="2" height="9" rx="1" />
              <rect x="4.5" y="4.5" width="3.5" height="15" rx="1.5" />
              <rect x="8" y="10.5" width="8" height="3" rx="0.5" />
              <rect x="16" y="4.5" width="3.5" height="15" rx="1.5" />
              <rect x="20" y="7.5" width="2" height="9" rx="1" />
            </svg>
    );
}