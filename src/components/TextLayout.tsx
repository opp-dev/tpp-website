import React from 'react';

interface TextLayoutProps {
    children: React.ReactNode;
    className?: string; // For typography styles
}

export function TextNarrow({ children, className = "" }: TextLayoutProps) {
    return (
        <div className={`max-w-[580px] ${className}`}>
            {children}
        </div>
    );
}

export function TextDefault({ children, className = "" }: TextLayoutProps) {
    return (
        <div className={`max-w-2xl ${className}`}>
            {/* 672px */}
            {children}
        </div>
    );
}

export function TextWide({ children, className = "" }: TextLayoutProps) {
    return (
        <div className={`max-w-[800px] ${className}`}>
            {children}
        </div>
    );
}
