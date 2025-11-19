"use client"

import { useState, useEffect } from "react"
import Dice from "@/components/cashflow/Dice"

type SpaceType = 'opportunity' | 'payday' | 'market' | 'doodad' | 'charity' | 'baby'

type BoardSpace = {
  id: number
  type: SpaceType
  label: string
  icon: string
  color: string
}

type GameBoardProps = {
  playerPosition: number
  isRolling: boolean
  onRollDice: () => void
  canRoll: boolean
  isOnFastTrack: boolean
  diceResult: number | null
}

// Define the Rat Race board spaces (24 spaces)
// Layout: Rectangular board (wider than tall) - going counter-clockwise from bottom-right
const RAT_RACE_SPACES: BoardSpace[] = [
  // BOTTOM ROW (right to left) - spaces 0-7 (8 spaces)
  { id: 0, type: 'payday', label: 'PAYDAY', icon: '💵', color: '#a7f3d0' }, // Corner: Bottom-right (lighter green)
  { id: 1, type: 'opportunity', label: 'Oportunidad', icon: '🏠', color: '#bfdbfe' },
  { id: 2, type: 'opportunity', label: 'Oportunidad', icon: '💼', color: '#bfdbfe' },
  { id: 3, type: 'doodad', label: 'Lujo', icon: '💎', color: '#fecaca' },
  { id: 4, type: 'opportunity', label: 'Oportunidad', icon: '📊', color: '#bfdbfe' },
  { id: 5, type: 'market', label: 'Mercado', icon: '📉', color: '#ddd6fe' },
  { id: 6, type: 'opportunity', label: 'Oportunidad', icon: '🏠', color: '#bfdbfe' },
  { id: 7, type: 'opportunity', label: 'Oportunidad', icon: '💼', color: '#bfdbfe' },
  
  // LEFT SIDE (bottom to top) - spaces 8-11 (4 spaces including corner)
  { id: 8, type: 'charity', label: 'CARIDAD', icon: '❤️', color: '#fed7aa' }, // Corner: Bottom-left (lighter orange)
  { id: 9, type: 'opportunity', label: 'Oportunidad', icon: '🏠', color: '#bfdbfe' },
  { id: 10, type: 'opportunity', label: 'Oportunidad', icon: '📊', color: '#bfdbfe' },
  { id: 11, type: 'doodad', label: 'Lujo', icon: '💎', color: '#fecaca' },
  
  // TOP ROW (left to right) - spaces 12-19 (8 spaces)
  { id: 12, type: 'market', label: 'MERCADO', icon: '📈', color: '#ddd6fe' }, // Corner: Top-left (lighter purple)
  { id: 13, type: 'opportunity', label: 'Oportunidad', icon: '💼', color: '#bfdbfe' },
  { id: 14, type: 'opportunity', label: 'Oportunidad', icon: '🏠', color: '#bfdbfe' },
  { id: 15, type: 'market', label: 'Mercado', icon: '📈', color: '#ddd6fe' },
  { id: 16, type: 'opportunity', label: 'Oportunidad', icon: '📊', color: '#bfdbfe' },
  { id: 17, type: 'opportunity', label: 'Oportunidad', icon: '💼', color: '#bfdbfe' },
  { id: 18, type: 'doodad', label: 'Lujo', icon: '💎', color: '#fecaca' },
  { id: 19, type: 'opportunity', label: 'Oportunidad', icon: '🏠', color: '#bfdbfe' },
  
  // RIGHT SIDE (top to bottom) - spaces 20-23 (4 spaces including corner)
  { id: 20, type: 'baby', label: 'BEBÉ', icon: '👶', color: '#fbcfe8' }, // Corner: Top-right (lighter pink)
  { id: 21, type: 'opportunity', label: 'Oportunidad', icon: '📊', color: '#bfdbfe' },
  { id: 22, type: 'market', label: 'Mercado', icon: '📉', color: '#ddd6fe' },
  { id: 23, type: 'opportunity', label: 'Oportunidad', icon: '💼', color: '#bfdbfe' },
]

// Fast Track spaces (larger loop, 32 spaces)
const FAST_TRACK_SPACES: BoardSpace[] = [
  { id: 0, type: 'payday', label: 'Payday', icon: '💰', color: '#fbbf24' },
  { id: 1, type: 'opportunity', label: 'Gran Negocio', icon: '🏢', color: '#3b82f6' },
  { id: 2, type: 'market', label: 'Mercado', icon: '📊', color: '#8b5cf6' },
  { id: 3, type: 'opportunity', label: 'Inversión', icon: '💎', color: '#3b82f6' },
  { id: 4, type: 'opportunity', label: 'Empresa', icon: '🏭', color: '#3b82f6' },
  { id: 5, type: 'market', label: 'Mercado', icon: '📈', color: '#8b5cf6' },
  { id: 6, type: 'opportunity', label: 'Propiedad', icon: '🏰', color: '#3b82f6' },
  { id: 7, type: 'charity', label: 'Caridad', icon: '❤️', color: '#f59e0b' },
  { id: 8, type: 'payday', label: 'Payday', icon: '💰', color: '#fbbf24' },
  // ... continue pattern (abbreviated for brevity)
]

export default function GameBoard({ playerPosition, isRolling, onRollDice, canRoll, isOnFastTrack, diceResult }: GameBoardProps) {
  const spaces = isOnFastTrack ? FAST_TRACK_SPACES : RAT_RACE_SPACES
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Fixed board dimensions (will be scaled with CSS)
  const spaceSize = 60
  const gap = 8
  const columns = 9 // includes both corners on each row
  const interiorRows = 3 // rows between top and bottom corners
  const totalRows = interiorRows + 2
  const boardPadding = 16
  const boardWidth = boardPadding * 2 + (columns * spaceSize) + ((columns - 1) * gap)
  const boardHeight = boardPadding * 2 + (totalRows * spaceSize) + ((totalRows - 1) * gap)
  

  // Calculate position on rectangular board (Monopoly-style)
  const getSpacePosition = (index: number) => {
    // Bottom edge (indexes 0-8 inclusive)
    if (index >= 0 && index <= 8) {
      const column = columns - 1 - index
      return {
        x: boardPadding + column * (spaceSize + gap),
        y: boardPadding + (totalRows - 1) * (spaceSize + gap),
        isCorner: index === 0 || index === 8
      }
    }

    // Left edge moving upward (indexes 9-11)
    if (index >= 9 && index <= 11) {
      const row = (totalRows - 2) - (index - 9)
      return {
        x: boardPadding,
        y: boardPadding + row * (spaceSize + gap),
        isCorner: false
      }
    }

    // Top edge (indexes 12-20 inclusive)
    if (index >= 12 && index <= 20) {
      const column = index - 12
      return {
        x: boardPadding + column * (spaceSize + gap),
        y: boardPadding,
        isCorner: index === 12 || index === 20
      }
    }

    // Right edge moving downward (indexes 21-23)
    const row = index - 20
    return {
      x: boardPadding + (columns - 1) * (spaceSize + gap),
      y: boardPadding + row * (spaceSize + gap),
      isCorner: false
    }
  }

  return (
    <>
      <style>{`
        .game-board-wrapper {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          overflow: visible !important;
        }
        .game-board-inner {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          position: relative !important;
          overflow: visible !important;
        }
        .game-board-surface {
          flex-shrink: 0 !important;
          transform-origin: center center !important;
          box-sizing: border-box !important;
          display: block !important;
          margin: 0 auto !important;
        }
        @media (max-width: 374px) {
          .game-board-surface {
            transform: scale(min(1, calc((100vw - 20px) / ${boardWidth}), calc((100dvh - 350px) / ${boardHeight}))) !important;
          }
          .game-board-controls {
            gap: 8px !important;
          }
          .game-board-roll-button {
            padding: 8px 16px !important;
            font-size: 11px !important;
          }
        }
        @media (min-width: 375px) and (max-width: 480px) {
          .game-board-surface {
            transform: scale(min(1, calc((100vw - 24px) / ${boardWidth}), calc((100dvh - 320px) / ${boardHeight}))) !important;
          }
          .game-board-controls {
            gap: 10px !important;
          }
          .game-board-roll-button {
            padding: 10px 18px !important;
            font-size: 12px !important;
          }
        }
        @media (min-width: 481px) and (max-width: 767px) {
          .game-board-surface {
            transform: scale(min(1, calc((100vw - 32px) / ${boardWidth}), calc((100dvh - 300px) / ${boardHeight}))) !important;
          }
          .game-board-controls {
            gap: 12px !important;
          }
          .game-board-roll-button {
            padding: 10px 20px !important;
            font-size: 13px !important;
          }
        }
        @media (max-width: 767px) {
          .game-board-wrapper {
            padding: clamp(4px, 1vw, 8px) !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .game-board-inner {
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
            height: 100% !important;
            display: flex !important;
          }
          .game-board-surface {
            width: ${boardWidth}px !important;
            height: ${boardHeight}px !important;
            margin: 0 auto !important;
            display: block !important;
            transform-origin: center center !important;
          }
          .game-board-space-label {
            font-size: clamp(7px, 1.2vw, 9px) !important;
          }
          .game-board-space-icon {
            font-size: clamp(18px, 3.5vw, 28px) !important;
          }
          .game-board-corner-icon {
            font-size: clamp(24px, 4.5vw, 36px) !important;
          }
          .game-board-controls {
            gap: clamp(8px, 2vw, 16px) !important;
          }
          .game-board-roll-button {
            padding: clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 24px) !important;
            font-size: clamp(11px, 2vw, 14px) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 960px) {
          .game-board-surface {
            transform: scale(min(1, calc((100vw - 240px) / ${boardWidth}), calc((100vh - 120px) / ${boardHeight}))) !important;
          }
        }
        @media (min-width: 961px) and (max-width: 1160px) {
          .game-board-surface {
            transform: scale(min(1, calc((100vw - 240px) / ${boardWidth}), calc((100vh - 120px) / ${boardHeight}))) !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1160px) {
          .game-board-wrapper {
            padding: clamp(8px, 1.5vw, 16px) !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .game-board-inner {
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: visible !important;
            height: 100% !important;
            display: flex !important;
          }
          .game-board-surface {
            width: ${boardWidth}px !important;
            height: ${boardHeight}px !important;
            margin: 0 auto !important;
            display: block !important;
            transform-origin: center center !important;
          }
          .game-board-space-label {
            font-size: clamp(9px, 1.5vw, 12px) !important;
          }
          .game-board-space-icon {
            font-size: clamp(28px, 4vw, 40px) !important;
          }
          .game-board-corner-icon {
            font-size: clamp(36px, 5vw, 50px) !important;
          }
          .game-board-roll-button {
            padding: clamp(10px, 2vw, 14px) clamp(20px, 4vw, 28px) !important;
            font-size: clamp(12px, 2.5vw, 16px) !important;
          }
        }
        @media (min-width: 1161px) {
          .game-board-wrapper {
            padding: clamp(16px, 2vw, 24px) !important;
          }
          .game-board-inner {
            justify-content: center !important;
          }
          .game-board-surface {
            width: ${boardWidth}px !important;
            height: ${boardHeight}px !important;
            transform: scale(min(calc((100vw - 320px) / ${boardWidth}), calc((100vh - 120px) / ${boardHeight}))) !important;
            transform-origin: center center !important;
          }
        }
        @media (min-width: 1400px) and (max-width: 1599px) {
          .game-board-surface {
            transform: scale(min(calc((100vw - 320px) / ${boardWidth}), calc((100vh - 120px) / ${boardHeight}))) !important;
          }
        }
        @media (min-width: 1600px) and (max-width: 1919px) {
          .game-board-surface {
            transform: scale(min(calc((100vw - 320px) / ${boardWidth}), calc((100vh - 120px) / ${boardHeight}))) !important;
          }
        }
        @media (min-width: 1920px) {
          .game-board-surface {
            transform: scale(min(calc((100vw - 320px) / ${boardWidth}), calc((100vh - 120px) / ${boardHeight}))) !important;
          }
        }
      `}</style>
      <div className="game-board-wrapper" style={{
        background: 'white',
        borderRadius: 'clamp(16px, 3vw, 20px)',
        padding: 'clamp(8px, 1.5vw, 16px)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Board Container */}
        <div className="game-board-inner" style={{
          width: '100%',
          maxWidth: '100%',
          overflowX: 'visible',
          overflowY: 'visible',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
          position: 'relative'
        }}>
          <div className="game-board-surface" style={{
            position: 'relative',
            width: boardWidth,
            height: boardHeight,
            margin: '0 auto',
            background: 'linear-gradient(135deg, #fafafa, #f5f5f5)',
            borderRadius: 28,
            padding: 0,
            flexShrink: 0
          }}>
        {/* Center controls */}
        <div className="game-board-controls" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          zIndex: 20
        }}>
          <button
            onClick={onRollDice}
            disabled={!canRoll || isRolling}
            className="game-board-roll-button"
            style={{
              background: isOnFastTrack ? '#fbbf24' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: 999,
              padding: '12px 24px',
              fontSize: 14,
              fontWeight: 800,
              cursor: canRoll && !isRolling ? 'pointer' : 'not-allowed',
              opacity: canRoll && !isRolling ? 1 : 0.6,
              transition: 'all 0.2s',
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
              animation: isRolling ? 'shake 0.5s infinite' : 'none',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (canRoll && !isRolling) {
                e.currentTarget.style.transform = 'scale(1.06)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {isRolling ? '🎲 Tirando...' : '🎲 Tirar Dado'}
          </button>
          <Dice isRolling={isRolling} result={diceResult} size={isMobile ? 50 : 70} />
        </div>

        {/* Board Spaces */}
        {spaces.map((space, index) => {
          const pos = getSpacePosition(index)
          const isPlayerHere = playerPosition === index
          const isCorner = pos.isCorner
          
          return (
            <div
              key={space.id}
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                width: spaceSize,
                height: spaceSize,
                background: isPlayerHere 
                  ? 'linear-gradient(135deg, #fcd34d, #fbbf24)'
                  : space.color,
                borderRadius: isCorner ? 12 : 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isPlayerHere 
                  ? '0 0 0 5px #fbbf24, 0 0 0 8px white, 0 10px 30px rgba(251, 191, 36, 0.5)'
                  : '0 2px 8px rgba(0,0,0,0.1)',
                border: isPlayerHere 
                  ? '3px solid #fbbf24' 
                  : '2px solid white',
                transition: 'box-shadow 0.3s ease, border 0.3s ease',
                animation: isPlayerHere ? 'pulse 1.8s ease-in-out infinite' : 'none',
                cursor: 'pointer',
                zIndex: isPlayerHere ? 5 : 1,
                transformOrigin: 'center'
              }}
            >
              <div className={isCorner ? 'game-board-corner-icon' : 'game-board-space-icon'} style={{ fontSize: isCorner ? 36 : 28 }}>{space.icon}</div>
            </div>
          )
        })}

          </div>
        </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: 'clamp(8px, 2vw, 16px)',
        marginTop: 'clamp(8px, 2vw, 16px)',
        padding: '0 clamp(8px, 2vw, 12px)',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(3px, 0.8vw, 5px)', fontSize: 'clamp(8px, 1.5vw, 10px)', fontWeight: 600 }}>
          <div style={{ width: 'clamp(12px, 2.5vw, 18px)', height: 'clamp(12px, 2.5vw, 18px)', background: '#bfdbfe', borderRadius: 4, border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
          <span style={{ color: '#334155' }}>Oportunidad</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(3px, 0.8vw, 5px)', fontSize: 'clamp(8px, 1.5vw, 10px)', fontWeight: 600 }}>
          <div style={{ width: 'clamp(12px, 2.5vw, 18px)', height: 'clamp(12px, 2.5vw, 18px)', background: '#a7f3d0', borderRadius: 4, border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
          <span style={{ color: '#334155' }}>Payday</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(3px, 0.8vw, 5px)', fontSize: 'clamp(8px, 1.5vw, 10px)', fontWeight: 600 }}>
          <div style={{ width: 'clamp(12px, 2.5vw, 18px)', height: 'clamp(12px, 2.5vw, 18px)', background: '#ddd6fe', borderRadius: 4, border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
          <span style={{ color: '#334155' }}>Mercado</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(3px, 0.8vw, 5px)', fontSize: 'clamp(8px, 1.5vw, 10px)', fontWeight: 600 }}>
          <div style={{ width: 'clamp(12px, 2.5vw, 18px)', height: 'clamp(12px, 2.5vw, 18px)', background: '#fecaca', borderRadius: 4, border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
          <span style={{ color: '#334155' }}>Lujo</span>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      </div>
    </>
  )
}

