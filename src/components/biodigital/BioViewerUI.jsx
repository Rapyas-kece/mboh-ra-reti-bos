import React, { useState } from 'react'
import '../../styles/biodigital-isolated.css'
import {
  ChevronsLeft,
  ChevronsRight,
  MousePointer,
  SlidersHorizontal,
  Search,
  Pencil,
  MoreVertical,
  Maximize,
  RotateCcw,
  ChevronUp,
  ArrowLeft,
} from 'lucide-react'

export default function BioViewerUI({ onBackToLanding }) {
  const [panelOpen, setPanelOpen] = useState(true)
  const [activeTool, setActiveTool] = useState('select') // 'select' | 'layers' | 'search' | 'draw' | 'more'
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {})
      }
      setIsFullscreen(false)
    }
  }

  return (
    <div
      id="biodigital-root"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#f1f5f9',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Optional Top Exit / Back to Landing Button */}
      {onBackToLanding && (
        <button
          onClick={onBackToLanding}
          style={{
            position: 'absolute',
            top: '12px',
            right: '16px',
            zIndex: 40,
            padding: '6px 14px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#334155',
            fontSize: '12px',
            fontWeight: 500,
            borderRadius: '9999px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft style={{ width: '14px', height: '14px' }} />
          <span>Kembali ke Beranda</span>
        </button>
      )}

      {/* 1. Left Information Drawer Panel */}
      <aside
        id="anatomy-info-panel"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 20,
          width: '320px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          transform: panelOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              margin: '0 0 16px 0',
              lineHeight: 1.25,
            }}
          >
            Brain
          </h1>
          <p
            style={{
              fontSize: '13.5px',
              color: '#334155',
              lineHeight: 1.65,
              margin: 0,
              fontWeight: 400,
            }}
          >
            The human body is a complex structure made of thousands of distinct parts.
            These components can be organized based on region, such as head, neck, thorax,
            abdomen, and limbs, or based on similar functions, such as respiration or
            circulation. By working together, these structures enable humans to survive and
            reproduce.
          </p>
        </div>
      </aside>

      {/* 2. Floating Left Toolbar & Drawer Toggle */}
      <div
        id="viewer-floating-toolbar"
        style={{
          position: 'absolute',
          top: '12px',
          left: panelOpen ? '332px' : '12px',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          transition: 'left 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Drawer Toggle Button (<< / >>) */}
        <button
          onClick={() => setPanelOpen(!panelOpen)}
          aria-label={panelOpen ? 'Close Info Panel' : 'Open Info Panel'}
          title={panelOpen ? 'Tutup Panel' : 'Buka Panel'}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#334155',
            cursor: 'pointer',
          }}
        >
          {panelOpen ? (
            <ChevronsLeft style={{ width: '16px', height: '16px', strokeWidth: 2.2 }} />
          ) : (
            <ChevronsRight style={{ width: '16px', height: '16px', strokeWidth: 2.2 }} />
          )}
        </button>

        {/* Vertical Tool Buttons Stack */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Tool: Pointer / Selection */}
          <button
            onClick={() => setActiveTool('select')}
            aria-label="Selection Tools"
            title="Selection Tools"
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              borderBottom: '1px solid #f1f5f9',
              backgroundColor: activeTool === 'select' ? '#eff6ff' : '#ffffff',
              color: activeTool === 'select' ? '#2563eb' : '#334155',
              cursor: 'pointer',
            }}
          >
            <MousePointer style={{ width: '16px', height: '16px' }} />
          </button>

          {/* Tool: Anatomy Layers */}
          <button
            onClick={() => setActiveTool('layers')}
            aria-label="Anatomy Layers"
            title="Anatomy Layers"
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              borderBottom: '1px solid #f1f5f9',
              backgroundColor: activeTool === 'layers' ? '#eff6ff' : '#ffffff',
              color: activeTool === 'layers' ? '#2563eb' : '#334155',
              cursor: 'pointer',
            }}
          >
            <SlidersHorizontal style={{ width: '16px', height: '16px' }} />
          </button>

          {/* Tool: Anatomy Search */}
          <button
            onClick={() => setActiveTool('search')}
            aria-label="Anatomy Search"
            title="Anatomy Search"
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              borderBottom: '1px solid #f1f5f9',
              backgroundColor: activeTool === 'search' ? '#eff6ff' : '#ffffff',
              color: activeTool === 'search' ? '#2563eb' : '#334155',
              cursor: 'pointer',
            }}
          >
            <Search style={{ width: '16px', height: '16px' }} />
          </button>

          {/* Tool: Draw / Annotation */}
          <button
            onClick={() => setActiveTool('draw')}
            aria-label="Draw"
            title="Draw"
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              borderBottom: '1px solid #f1f5f9',
              backgroundColor: activeTool === 'draw' ? '#eff6ff' : '#ffffff',
              color: activeTool === 'draw' ? '#2563eb' : '#334155',
              cursor: 'pointer',
            }}
          >
            <Pencil style={{ width: '16px', height: '16px' }} />
          </button>

          {/* Tool: More Options */}
          <button
            onClick={() => setActiveTool('more')}
            aria-label="More Options"
            title="More Options"
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              backgroundColor: activeTool === 'more' ? '#eff6ff' : '#ffffff',
              color: activeTool === 'more' ? '#2563eb' : '#334155',
              cursor: 'pointer',
            }}
          >
            <MoreVertical style={{ width: '16px', height: '16px' }} />
          </button>
        </div>
      </div>

      {/* 3. Center Viewport (Bersih / Canvas Placeholder) */}
      <main
        id="center-3d-viewport"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          backgroundImage:
            'radial-gradient(circle at center, #ffffff 0%, #f1f5f9 70%, #e2e8f0 100%)',
        }}
      >
        {/* Subtle Ambient Placeholder Indicator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '32px',
            userSelect: 'none',
            pointerEvents: 'none',
            opacity: 0.45,
          }}
        >
          <div
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '9999px',
              border: '2px dashed #94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#64748b',
                fontFamily: 'monospace',
              }}
            >
              3D
            </span>
          </div>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#64748b',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
              margin: 0,
            }}
          >
            Interactive Viewport Area
          </p>
          <p
            style={{
              fontSize: '11px',
              color: '#94a3b8',
              marginTop: '4px',
              maxWidth: '280px',
              lineHeight: 1.4,
            }}
          >
            Wadah kanvas bersih siap diintegrasikan dengan Three.js atau widget BioDigital
          </p>
        </div>
      </main>

      {/* 4. Bottom-Left Watermark: BioDigital | a division of Anatomage */}
      <div
        id="viewer-watermark"
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {/* Logo Icon Mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <div
            style={{
              width: '5px',
              height: '14px',
              backgroundColor: '#d93829',
              borderRadius: '1px',
            }}
          ></div>
          <div
            style={{
              width: '5px',
              height: '14px',
              backgroundColor: '#0f172a',
              borderRadius: '1px',
            }}
          ></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: '13px',
              letterSpacing: '0.06em',
              color: '#0f172a',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            BIODIGITAL
          </span>
          <span
            style={{
              fontSize: '9.5px',
              color: '#64748b',
              fontStyle: 'italic',
              marginTop: '2px',
              lineHeight: 1,
            }}
          >
            a division of{' '}
            <span style={{ fontWeight: 600, color: '#1e293b', fontStyle: 'normal' }}>
              Anatomage
            </span>
          </span>
        </div>
      </div>

      {/* 5. Bottom-Right Navigation & Action Controls */}
      <div
        id="viewer-action-controls"
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {/* Navigation & Camera Reset Stack */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Toggle 3D Navigation Controls */}
          <button
            aria-label="Toggle 3D navigation controls"
            title="Navigasi 3D"
            style={{
              width: '42px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              borderBottom: '1px solid #f1f5f9',
              backgroundColor: '#ffffff',
              color: '#475569',
              cursor: 'pointer',
            }}
          >
            <ChevronUp style={{ width: '14px', height: '14px' }} />
          </button>

          {/* Reset Camera Button */}
          <button
            aria-label="Clicking this button will reset the camera viewing the 3D model"
            title="Reset Posisi Kamera"
            style={{
              width: '42px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              backgroundColor: '#ffffff',
              color: '#475569',
              cursor: 'pointer',
            }}
          >
            <RotateCcw style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          aria-label="Enter Fullscreen"
          title="Mode Layar Penuh"
          style={{
            width: '42px',
            height: '40px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
            cursor: 'pointer',
          }}
        >
          <Maximize style={{ width: '16px', height: '16px' }} />
        </button>
      </div>
    </div>
  )
}
