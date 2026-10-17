import React from "react";

interface IconoWalletProps extends React.SVGProps<SVGSVGElement>{
    className?: string;
    size?: number;
}

export function IconoWallet ({className, size = 24, ...props}: IconoWalletProps){
    return(
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            >
            <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H20v4H5.5A2.5 2.5 0 0 1 3 4.5v1ZM3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm13 5v3h5v-3h-5Zm2.5 2a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
        </svg>
    );
}