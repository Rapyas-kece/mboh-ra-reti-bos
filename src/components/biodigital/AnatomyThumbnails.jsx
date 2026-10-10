import React from 'react'

/**
 * High-fidelity 1:1 Medical 3D Anatomical Visual Thumbnails
 * Replicating BioDigital Human 3D viewport canvas captures
 */

export function CardiovascularThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="cvBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id="aortaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="venaCavaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="myoGrad" x1="0%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="40%" stopColor="#dc2626" />
          <stop offset="85%" stopColor="#7f1d1d" />
        </linearGradient>
        <filter id="medGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.15" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#cvBg)" />
      
      {/* 3D Anatomical Heart & Great Vessels */}
      <g filter="url(#medGlow)">
        {/* Superior Vena Cava & Pulmonary Artery */}
        <path d="M125 45 C125 30 140 25 140 10 L155 10 C155 25 145 35 145 45 Z" fill="url(#venaCavaGrad)" />
        <path d="M115 50 C110 30 115 15 125 10 L138 10 C130 20 125 35 128 52 Z" fill="url(#venaCavaGrad)" />
        
        {/* Aortic Arch */}
        <path d="M148 55 C145 25 175 18 190 32 C198 40 200 55 195 70 C182 62 170 55 160 55 Z" fill="url(#aortaGrad)" />
        {/* Brachiocephalic branches */}
        <path d="M165 24 L168 12 L175 13 L172 26 Z" fill="url(#aortaGrad)" />
        <path d="M178 27 L184 14 L191 16 L186 31 Z" fill="url(#aortaGrad)" />
        <path d="M190 34 L200 20 L206 23 L197 38 Z" fill="url(#aortaGrad)" />

        {/* Pulmonary Trunk */}
        <path d="M138 60 C145 50 170 52 180 68 C175 78 150 78 138 60 Z" fill="url(#venaCavaGrad)" />

        {/* Left & Right Atria / Ventricles (Myocardium Mass) */}
        <path
          d="M115 72 C98 85 92 115 102 135 C115 160 145 185 165 198 C185 182 220 145 228 115 C234 92 222 75 200 70 C185 66 172 75 160 78 C145 74 130 65 115 72 Z"
          fill="url(#myoGrad)"
        />

        {/* Ventricular Groove & Coronary Arteries */}
        <path d="M160 78 C158 105 150 140 165 195" stroke="#fca5a5" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M158 100 C170 112 185 120 195 125" stroke="#fecaca" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M155 130 C140 142 125 150 115 155" stroke="#60a5fa" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M158 155 C168 165 180 172 188 178" stroke="#fecaca" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Specular 3D Highlight */}
        <path d="M118 85 C110 95 108 112 114 125 C110 112 112 98 122 88 Z" fill="#ffffff" opacity="0.35" />
      </g>
    </svg>
  )
}

export function RespiratoryThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="respBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id="lungGradR" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="60%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
        <linearGradient id="lungGradL" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="60%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
        <filter id="respGlow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#respBg)" />

      <g filter="url(#respGlow)">
        {/* Larynx & Trachea */}
        <rect x="153" y="15" width="14" height="48" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
        {/* Cartilage rings */}
        {[22, 30, 38, 46, 54].map((y) => (
          <line key={y} x1="153" y1={y} x2="167" y2={y} stroke="#64748b" strokeWidth="1.5" />
        ))}

        {/* Right Lung (3 Lobes) */}
        <path
          d="M148 68 C135 62 110 65 95 85 C80 108 75 145 82 175 C88 192 112 195 130 188 C145 182 148 160 148 140 C148 115 152 85 148 68 Z"
          fill="url(#lungGradR)"
        />
        {/* Right Fissures */}
        <path d="M85 130 C105 138 128 142 145 142" stroke="#4c0519" strokeWidth="2" strokeDasharray="3 2" fill="none" opacity="0.6" />

        {/* Left Lung (2 Lobes with Cardiac Notch) */}
        <path
          d="M172 68 C185 62 210 65 225 85 C240 108 245 145 238 175 C232 192 208 195 192 188 C178 182 172 165 174 148 C176 130 166 115 168 95 C170 82 170 74 172 68 Z"
          fill="url(#lungGradL)"
        />
        {/* Left Oblique Fissure */}
        <path d="M235 125 C215 142 195 160 176 168" stroke="#4c0519" strokeWidth="2" strokeDasharray="3 2" fill="none" opacity="0.6" />

        {/* Bronchial Tree Overlay */}
        <path d="M160 63 L142 85 M142 85 L125 105 M142 85 L145 115 M160 63 L178 85 M178 85 L195 105 M178 85 L175 115" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      </g>
    </svg>
  )
}

export function NervousThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="nervBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#581c87" />
        </linearGradient>
        <filter id="nervGlow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#581c87" floodOpacity="0.18" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#nervBg)" />

      <g filter="url(#nervGlow)">
        {/* Cerebrum (Lateral Hemisphere Profile) */}
        <path
          d="M105 110 C95 85 115 50 145 40 C175 30 215 35 235 60 C250 80 250 105 240 120 C230 135 210 140 195 140 C185 140 180 152 175 165 C170 178 155 185 145 178 C135 170 140 150 130 145 C115 140 108 128 105 110 Z"
          fill="url(#brainGrad)"
        />

        {/* Cerebellum */}
        <path
          d="M120 142 C115 155 125 172 140 172 C148 172 152 165 152 155 C145 150 130 145 120 142 Z"
          fill="#7e22ce"
        />

        {/* Brainstem & Spinal Cord */}
        <path d="M152 155 L155 205 L165 205 L162 155 Z" fill="#a855f7" />

        {/* Cortical Sulci & Gyri Pattern */}
        <path
          d="M125 70 C140 68 150 78 165 72 C180 66 195 72 210 65
             M135 90 C155 85 170 98 190 90 C205 84 225 95 235 90
             M120 110 C140 108 155 120 175 115 C195 110 210 122 225 115
             M145 130 C165 128 180 135 200 130"
          stroke="#e9d5ff"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />

        {/* Synaptic Light Nodes */}
        {[
          [145, 60], [185, 55], [225, 75],
          [160, 95], [200, 100], [135, 115],
          [175, 125], [158, 175], [160, 195]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill="#38bdf8" />
        ))}
      </g>
    </svg>
  )
}

export function DigestiveThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="digBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id="liverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="60%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="stomachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="70%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <filter id="digGlow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.15" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#digBg)" />

      <g filter="url(#digGlow)">
        {/* Esophagus */}
        <rect x="156" y="15" width="10" height="45" rx="3" fill="#fdba74" />

        {/* Liver (Right Hypochondrium) */}
        <path
          d="M105 60 C125 50 165 52 170 65 C175 80 160 108 140 115 C120 120 95 105 92 88 C90 75 98 65 105 60 Z"
          fill="url(#liverGrad)"
        />

        {/* Stomach (J-Shaped Organ) */}
        <path
          d="M158 55 C175 58 200 65 212 85 C222 102 215 125 198 135 C180 142 165 132 160 120 C155 108 165 95 162 82 C160 72 155 62 158 55 Z"
          fill="url(#stomachGrad)"
        />

        {/* Duodenum & Pancreas */}
        <path d="M160 120 C155 132 145 138 140 132 C135 125 142 118 152 115" stroke="#facc15" strokeWidth="8" strokeLinecap="round" fill="none" />

        {/* Small & Large Intestines Loop Graphic */}
        <path
          d="M130 145 C150 140 170 142 185 145 C192 160 188 175 180 185 C165 195 140 195 130 185 C122 175 122 155 130 145 Z"
          fill="#fed7aa"
          stroke="#ea580c"
          strokeWidth="3"
        />
        {/* Mesenteric convolution loops */}
        <path d="M140 155 C155 152 165 162 155 170 C145 178 165 182 172 175" stroke="#ea580c" strokeWidth="2.5" fill="none" />
      </g>
    </svg>
  )
}

export function MusculoskeletalThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="mskBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="60%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="boneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <filter id="mskGlow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#mskBg)" />

      <g filter="url(#mskGlow)">
        {/* Spine / Vertebral Column */}
        <rect x="156" y="25" width="8" height="160" rx="3" fill="url(#boneGrad)" stroke="#94a3b8" strokeWidth="1" />
        {[40, 55, 70, 85, 100, 115, 130, 145, 160].map((y) => (
          <ellipse key={y} cx="160" cy={y} rx="9" ry="4" fill="url(#boneGrad)" stroke="#64748b" strokeWidth="1.2" />
        ))}

        {/* Rib Cage (Curved Costal Cartilage) */}
        {[
          [140, 50, 180, 50],
          [125, 65, 195, 65],
          [115, 80, 205, 80],
          [112, 98, 208, 98],
          [118, 116, 202, 116],
          [128, 132, 192, 132],
        ].map(([x1, y1, x2, y2], idx) => (
          <g key={idx}>
            <path d={`M156 ${y1-2} C${x1+10} ${y1-12} ${x1} ${y1} ${x1+5} ${y1+10} C${x1+15} ${y1+18} 156 ${y1+12}`} fill="none" stroke="url(#boneGrad)" strokeWidth="3" />
            <path d={`M164 ${y2-2} C${x2-10} ${y2-12} ${x2} ${y2} ${x2-5} ${y2+10} C${x2-15} ${y2+18} 164 ${y2+12}`} fill="none" stroke="url(#boneGrad)" strokeWidth="3" />
          </g>
        ))}

        {/* Pectoralis Major / Intercostal Muscles */}
        <path d="M125 65 C145 68 155 85 155 105 C140 102 125 90 120 78 Z" fill="url(#muscleGrad)" opacity="0.85" />
        <path d="M195 65 C175 68 165 85 165 105 C180 102 195 90 200 78 Z" fill="url(#muscleGrad)" opacity="0.85" />

        {/* Pelvic Girdle Outline */}
        <path d="M130 165 C140 155 180 155 190 165 C200 180 185 195 160 195 C135 195 120 180 130 165 Z" fill="url(#boneGrad)" stroke="#64748b" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function UrinaryThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="uriBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id="kidneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="70%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
        <filter id="uriGlow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#uriBg)" />

      <g filter="url(#uriGlow)">
        {/* Abdominal Aorta & Inferior Vena Cava */}
        <line x1="156" y1="20" x2="156" y2="160" stroke="#dc2626" strokeWidth="6" />
        <line x1="166" y1="20" x2="166" y2="160" stroke="#2563eb" strokeWidth="6" />

        {/* Renal Arteries & Veins */}
        <line x1="156" y1="75" x2="128" y2="82" stroke="#dc2626" strokeWidth="3" />
        <line x1="166" y1="78" x2="192" y2="85" stroke="#2563eb" strokeWidth="3" />

        {/* Left & Right Kidneys (Renal Parenchyma) */}
        <path
          d="M115 65 C130 65 132 82 125 95 C120 105 105 110 95 100 C88 90 95 70 115 65 Z"
          fill="url(#kidneyGrad)"
        />
        <path
          d="M205 70 C190 70 188 88 195 100 C200 110 215 115 225 105 C232 95 225 75 205 70 Z"
          fill="url(#kidneyGrad)"
        />

        {/* Ureters */}
        <path d="M122 95 C125 125 145 155 152 170" stroke="#facc15" strokeWidth="2.5" fill="none" />
        <path d="M198 100 C195 130 175 155 168 170" stroke="#facc15" strokeWidth="2.5" fill="none" />

        {/* Urinary Bladder */}
        <ellipse cx="160" cy="182" rx="20" ry="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
      </g>
    </svg>
  )
}

export function EndocrineThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="endoBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id="thyroidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="endoGlow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#d97706" floodOpacity="0.2" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#endoBg)" />

      <g filter="url(#endoGlow)">
        {/* Hypothalamus & Pituitary Gland Top Axis */}
        <ellipse cx="160" cy="35" rx="14" ry="10" fill="#a855f7" />
        <circle cx="160" cy="50" r="6" fill="#ec4899" />
        <line x1="160" y1="56" x2="160" y2="85" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 2" />

        {/* Butterfly-shaped Thyroid Gland */}
        <path
          d="M135 90 C125 95 115 115 120 135 C125 150 142 145 145 130 C148 115 155 115 160 115 C165 115 172 115 175 130 C178 145 195 150 200 135 C205 115 195 95 185 90 C175 105 165 105 160 105 C155 105 145 105 135 90 Z"
          fill="url(#thyroidGrad)"
        />

        {/* Adrenal Glands & Pancreas */}
        <path d="M130 165 C138 152 150 155 152 168 Z" fill="#f59e0b" />
        <path d="M190 165 C182 152 170 155 168 168 Z" fill="#f59e0b" />
        <path d="M140 185 C155 178 175 180 185 188 C175 194 150 195 140 185 Z" fill="#eab308" />
      </g>
    </svg>
  )
}

export function LymphaticThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="lymBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <filter id="lymGlow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#059669" floodOpacity="0.2" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#lymBg)" />

      <g filter="url(#lymGlow)">
        {/* Human Silhouette outline */}
        <path d="M160 30 C150 30 145 38 145 48 C145 58 152 64 160 64 C168 64 175 58 175 48 C175 38 170 30 160 30 Z" fill="#e2e8f0" />
        <path d="M135 75 C145 68 175 68 185 75 C195 90 205 120 198 160 C190 200 130 200 122 160 C115 120 125 90 135 75 Z" fill="#f1f5f9" opacity="0.6" />

        {/* Thoracic Duct (Green Lymph Network) */}
        <path d="M160 70 L158 155" stroke="#10b981" strokeWidth="2.5" fill="none" />
        <path d="M158 110 L135 95 M158 110 L185 95" stroke="#10b981" strokeWidth="1.8" fill="none" />
        <path d="M158 145 L142 175 M158 145 L178 175" stroke="#10b981" strokeWidth="1.8" fill="none" />

        {/* Lymph Nodes (Cervical, Axillary, Inguinal Clusters) */}
        {[
          [152, 65], [168, 65],
          [135, 95], [185, 95],
          [158, 90], [158, 120], [158, 138],
          [142, 175], [178, 175],
          [148, 185], [172, 185],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill="#059669" stroke="#ffffff" strokeWidth="1" />
        ))}

        {/* Spleen */}
        <ellipse cx="188" cy="115" rx="10" ry="7" fill="#831843" stroke="#be185d" strokeWidth="1.5" />
      </g>
    </svg>
  )
}

export function IntegumentaryThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="integBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id="skinGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="skinGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="fatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <filter id="integGlow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#integBg)" />

      <g filter="url(#integGlow)">
        {/* Layer 1: Epidermis */}
        <path d="M60 70 Q110 65 160 70 T260 70 L260 95 Q210 90 160 95 T60 95 Z" fill="url(#skinGrad1)" />

        {/* Layer 2: Dermis (with dermal papillae) */}
        <path d="M60 95 Q110 90 160 95 T260 95 L260 145 Q210 140 160 145 T60 145 Z" fill="url(#skinGrad2)" />

        {/* Layer 3: Subcutaneous Hypodermis (Adipose tissue) */}
        <path d="M60 145 Q110 140 160 145 T260 145 L260 175 Q210 170 160 175 T60 175 Z" fill="url(#fatGrad)" />

        {/* Hair Shaft & Follicle */}
        <path d="M180 30 L165 130" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="165" cy="130" rx="6" ry="9" fill="#92400e" />

        {/* Sebaceous Gland & Capillary Loops */}
        <circle cx="155" cy="115" r="7" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        <path d="M110 90 Q115 80 120 90 Q125 80 130 90" stroke="#ef4444" strokeWidth="2" fill="none" />
        <path d="M200 90 Q205 80 210 90 Q215 80 220 90" stroke="#3b82f6" strokeWidth="2" fill="none" />
      </g>
    </svg>
  )
}

export function ReproductiveThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="repBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id="repGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="70%" stopColor="#be185d" />
          <stop offset="100%" stopColor="#831843" />
        </linearGradient>
        <filter id="repGlow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#831843" floodOpacity="0.16" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#repBg)" />

      <g filter="url(#repGlow)">
        {/* Pelvic Skeleton Base */}
        <path d="M90 75 C105 55 140 60 160 70 C180 60 215 55 230 75 C240 100 230 145 200 165 C175 180 145 180 120 165 C90 145 80 100 90 75 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />

        {/* Uterus & Ovarian Fimbriae Anatomical Graphic */}
        <path d="M160 85 C145 85 138 105 142 125 C148 140 172 140 178 125 C182 105 175 85 160 85 Z" fill="url(#repGrad)" />
        {/* Fallopian tubes */}
        <path d="M142 92 C125 90 105 95 105 110" stroke="#f472b6" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="103" cy="112" r="7" fill="#fb7185" />
        <path d="M178 92 C195 90 215 95 215 110" stroke="#f472b6" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="217" cy="112" r="7" fill="#fb7185" />
      </g>
    </svg>
  )
}

export function SensoryThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="sensBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="60%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </radialGradient>
        <filter id="sensGlow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#sensBg)" />

      <g filter="url(#sensGlow)">
        {/* Sclera Eyeball Sphere */}
        <circle cx="160" cy="110" r="62" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />

        {/* Retinal Vasculature fine red lines */}
        <path d="M110 85 Q130 95 145 105 M115 135 Q135 125 148 115" stroke="#f87171" strokeWidth="1.2" fill="none" />
        <path d="M210 85 Q190 95 175 105 M205 135 Q185 125 172 115" stroke="#f87171" strokeWidth="1.2" fill="none" />

        {/* Iris */}
        <circle cx="160" cy="110" r="30" fill="url(#irisGrad)" stroke="#075985" strokeWidth="2" />
        {/* Pupil */}
        <circle cx="160" cy="110" r="14" fill="#0f172a" />
        {/* Light reflection */}
        <circle cx="152" cy="102" r="5" fill="#ffffff" opacity="0.85" />
      </g>
    </svg>
  )
}

export function SpineThumb() {
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full object-cover select-none">
      <defs>
        <radialGradient id="spBg" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id="vertGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <filter id="spGlow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.14" />
        </filter>
      </defs>
      <rect width="320" height="220" fill="url(#spBg)" />

      <g filter="url(#spGlow)">
        {/* S-shaped spinal curvature line */}
        <path d="M160 20 C145 55 175 110 152 170 C145 185 155 200 160 205" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 2" fill="none" opacity="0.4" />

        {/* Segmented Vertebral Bodies with Intervertebral Discs */}
        {[
          [160, 25, 24, 8],
          [157, 40, 26, 9],
          [154, 56, 28, 9],
          [155, 72, 30, 10],
          [160, 89, 32, 10],
          [165, 107, 34, 11],
          [168, 126, 36, 12],
          [165, 146, 38, 13],
          [158, 167, 40, 14],
          [155, 189, 42, 15],
        ].map(([x, y, w, h], idx) => (
          <g key={idx}>
            {/* Vertebra body */}
            <rect x={x - w/2} y={y} width={w} height={h} rx={4} fill="url(#vertGrad)" stroke="#64748b" strokeWidth="1.2" />
            {/* Intervertebral disc (blue gel) */}
            <rect x={x - (w*0.8)/2} y={y + h} width={w*0.8} height="2.5" rx="1" fill="#38bdf8" />
          </g>
        ))}
      </g>
    </svg>
  )
}
