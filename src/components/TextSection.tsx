import React from 'react';

interface TextSectionProps {
    children: React.ReactNode;
    className?: string;
}

export default function TextSection({ children, className = "" }: TextSectionProps) {
    return (
        <div className={className}>
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
