import React from 'react';
import { TextDefault, TextNarrow } from './TextLayout';

interface TextSectionProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export default function TextSection({ title, children, className = "" }: TextSectionProps) {
    return (
        <div className={className}>
            {title && (
                <TextDefault className="typography-h3 mb-8">
                    {title}
                </TextDefault>
            )}
            <TextNarrow className="typography-body">
                {children}
            </TextNarrow>
        </div>
    );
}
