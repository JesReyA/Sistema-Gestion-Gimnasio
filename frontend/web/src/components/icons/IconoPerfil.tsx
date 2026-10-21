import React from "react";

interface IconoPerfilProps extends React.SVGProps<SVGSVGElement>{
    className?: string;
    size?: number;
}

export function IconoPerfil ({className, size = 24, ...props}: IconoPerfilProps){
    return(
        <svg
              className={className}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
    );
}