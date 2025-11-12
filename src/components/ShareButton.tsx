'use client'

import { useState } from 'react'

interface ShareButtonProps {
  url?: string;
}

export default function ShareButton({ url }: ShareButtonProps = {}) {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleShare = async () => {
    try {
      const shareUrl = url || window.location.href;
      await navigator.clipboard.writeText(shareUrl)
      setShowTooltip(true)
      
      // Hide tooltip after 2 seconds
      setTimeout(() => {
        setShowTooltip(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 link-mono" 
        style={{ 
          color: 'var(--color-text-lighter)',
          cursor: 'pointer',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--color-text-hover)';
          const span = e.currentTarget.querySelector('span');
          if (span) (span as HTMLElement).style.textDecoration = 'underline';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--color-text-lighter)';
          const span = e.currentTarget.querySelector('span');
          if (span) (span as HTMLElement).style.textDecoration = 'none';
        }}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" 
          />
        </svg>
        <span style={{ transition: 'text-decoration 0.2s ease' }}>Share</span>
      </button>
      
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
          }}
        >
          Link copied
        </div>
      )}
    </div>
  )
}
