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

/**
 * TextLayout Components
 * 
 * Reusable width wrappers for text content to ensure consistency across the site.
 * 
 * - TextNarrow (max-w-[580px]): For body text, long-form reading content.
 * - TextDefault (max-w-2xl / ~672px): For standard content, headings, shorter text.
 * - TextWide (max-w-[800px]): For wider content that needs more breathing room.
 * 
 * These components accept a className prop for applying typography styles (e.g. typography-h3).
 */
