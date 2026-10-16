import React from "react";

interface IconoHomeProps extends React.SVGProps<SVGSVGElement>{
    className?: string;
    size?: number;
}

export function IconoHome ({className, size = 24, ...props}: IconoHomeProps){
    return(
        <svg
              className={className}
              viewBox="0 0 24 24"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
    );
}