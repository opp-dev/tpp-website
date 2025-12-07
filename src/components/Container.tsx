import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function Container({ children, className = "", style }: ContainerProps) {
    return (
        <div className={`mx-auto px-6 max-w-[1280px] ${className}`} style={style}>
            {children}
        </div>
    );
}
