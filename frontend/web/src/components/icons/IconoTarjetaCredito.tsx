import React from "react";

interface IconoTarjetaCreditoProps extends React.SVGProps<SVGSVGElement>{
    className?: string;
    size?: number;
}

export function IconoTarjetaCredito ({className, size = 24, ...props}: IconoTarjetaCreditoProps){
    return(
        <svg
            className={className}
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width={size} 
            height={size}
            >
        <path fillRule="evenodd" clipRule="evenodd" d="M14 5v1H2V5h12zM2 7h12v5H2V7zm12-3H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-3 6h2v1h-2v-1z"/>        </svg>
    );
}