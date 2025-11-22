'use client'

import { useState } from 'react'

interface EmailCopyLinkProps {
    email: string;
}

export default function EmailCopyLink({ email }: EmailCopyLinkProps) {
    const [showTooltip, setShowTooltip] = useState(false)

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await navigator.clipboard.writeText(email)
            setShowTooltip(true)

            // Hide tooltip after 2 seconds
            setTimeout(() => {
                setShowTooltip(false)
            }, 2000)
        } catch (err) {
            console.error('Failed to copy email:', err)
        }
    }

    return (
        <span style={{ position: 'relative', display: 'inline-block' }}>
            <span
                onClick={handleCopy}
                className="cursor-pointer hover:text-gray-600 transition-colors duration-200"
                style={{ textDecoration: 'underline' }}
            >
                {email}
            </span>

            {/* Tooltip */}
            {showTooltip && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginTop: '8px',
                        padding: '4px 8px',
                        backgroundColor: 'black',
                        color: 'white',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        transition: 'opacity 0.3s',
                        zIndex: 10,
                        borderRadius: '2px',
                    }}
                >
                    Email address copied
                </div>
            )}
        </span>
    )
}
