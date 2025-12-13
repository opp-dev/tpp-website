import React from 'react';

// Define the allowed alignment values
type TextSectionAlign = 'left' | 'center' | 'right';

interface TextSectionProps {
    children: React.ReactNode;
    className?: string;
    align?: TextSectionAlign;
}

export default function TextSection({ children, className = "", align = 'left' }: TextSectionProps) {
    const alignmentClasses = {
        left: '', // Default behavior (usually block or flex-start)
        center: 'mx-auto w-fit max-w-full',
        right: 'flex flex-col items-end',
    };

    return (
        <div className={`${alignmentClasses[align]} ${className}`}>
            {children}
        </div>
    );
}

/**
 * TextSection
 * 
 * A flexible container for text sections. It wraps content but doesn't enforce specific
 * internal structure or widths. It should be composed with TextLayout components
 * (TextDefault, TextNarrow) to define the widths of headings and paragraphs.
 * 
 * Usage:
 * <TextSection>
 *   <TextDefault className="typography-h3">Title</TextDefault>
 *   <TextNarrow className="typography-body">Content...</TextNarrow>
 * </TextSection>
 */
