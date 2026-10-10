import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { anatomyData } from '../data/anatomyData'

export default function AnatomiPreview({ onBackToLanding }) {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const organsRef = useRef({})
  const [selectedOrganId, setSelectedOrganId] = useState('lungs')
  const [sliderYear, setSliderYear] = useState(0)
  const [activeTab, setActiveTab] = useState('simulation') // 'education' | 'simulation' | 'economy'
  const [recoveryMode, setRecoveryMode] = useState(false)
  const [isRotating, setIsRotating] = useState(true)

  const currentOrgan = anatomyData.organs.find((o) => o.id === selectedOrganId) || anatomyData.organs[0]

  // Map slider year (0, 1, 3, 5) to timeline item
  const currentTimeline =
    currentOrgan.timeline.find((t) => t.year === sliderYear) ||
    currentOrgan.timeline.reduce((prev, curr) =>
      Math.abs(curr.year - sliderYear) < Math.abs(prev.year - sliderYear) ? curr : prev
    )

  // 1. Inisialisasi Scene Three.js
  useEffect(() => {
    const currentMount = mountRef.current
    if (!currentMount) return

    const width = currentMount.clientWidth || 600
    const height = currentMount.clientHeight || 500

    // Scene & Camera
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color('#090d16') // Dark sci-fi medical backdrop

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    currentMount.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.5) // Cyan rim light
    dirLight1.position.set(5, 5, 5)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.2) // Purple back rim
    dirLight2.position.set(-5, -3, -4)
    scene.add(dirLight2)

    // Grid Floor
    const gridHelper = new THREE.GridHelper(10, 20, 0x0284c7, 0x1e293b)
    gridHelper.position.y = -3.2
    scene.add(gridHelper)

    // Container Group (untuk rotasi)
    const bodyGroup = new THREE.Group()
    scene.add(bodyGroup)

    // --- A. SILUET TUBUH TRANSPARAN (Holographic Glass Torso) ---
    const torsoGeo = new THREE.CylinderGeometry(1.2, 0.95, 3.4, 24, 8)
    const torsoMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.1,
    })
    const torsoMesh = new THREE.Mesh(torsoGeo, torsoMat)
    torsoMesh.position.set(0, 0, 0)
    bodyGroup.add(torsoMesh)

    // Kepala Hologram
    const headGeo = new THREE.SphereGeometry(0.65, 20, 20)
    const headMesh = new THREE.Mesh(headGeo, torsoMat)
    headMesh.position.set(0, 2.3, 0)
    bodyGroup.add(headMesh)

    // Tulang Belakang (Spine Hologram Indicator)
    const spineGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 12)
    const spineMat = new THREE.MeshBasicMaterial({ color: 0x0284c7, wireframe: true })
    const spineMesh = new THREE.Mesh(spineGeo, spineMat)
    spineMesh.position.set(0, 0, -0.3)
    bodyGroup.add(spineMesh)

    // --- B. ORGAN 1: PARU-PARU (Lungs) ---
    const lungGroup = new THREE.Group()
    const lungGeo = new THREE.CapsuleGeometry(0.48, 0.9, 16, 24)
    
    // Left & Right Lung Lobes
    const lungMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fb7185'),
      roughness: 0.3,
      metalness: 0.1,
      emissive: new THREE.Color('#fb7185'),
      emissiveIntensity: 0.2,
    })

    const leftLung = new THREE.Mesh(lungGeo, lungMat)
    leftLung.position.set(-0.55, 0.45, 0.15)
    leftLung.rotation.z = -0.15
    lungGroup.add(leftLung)

    const rightLung = new THREE.Mesh(lungGeo, lungMat)
    rightLung.position.set(0.55, 0.45, 0.15)
    rightLung.rotation.z = 0.15
    lungGroup.add(rightLung)

    bodyGroup.add(lungGroup)
    organsRef.current.lungs = { group: lungGroup, material: lungMat }

    // --- C. ORGAN 2: JANTUNG (Heart) ---
    const heartGeo = new THREE.SphereGeometry(0.35, 24, 24)
    heartGeo.scale(1, 1.25, 0.9)
    const heartMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e11d48'),
      roughness: 0.35,
      metalness: 0.2,
      emissive: new THREE.Color('#e11d48'),
      emissiveIntensity: 0.25,
    })
    const heartMesh = new THREE.Mesh(heartGeo, heartMat)
    heartMesh.position.set(-0.1, 0.25, 0.42) // Terletak agak ke kiri dada
    heartMesh.rotation.z = 0.25
    bodyGroup.add(heartMesh)
    organsRef.current.heart = { group: heartMesh, material: heartMat }

    // Interaction drag rotation
    let isDragging = false
    let prevMouseX = 0
    const handleMouseDown = (e) => {
      isDragging = true
      prevMouseX = e.clientX
    }
    const handleMouseMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      bodyGroup.rotation.y += deltaX * 0.01
      prevMouseX = e.clientX
    }
    const handleMouseUp = () => {
      isDragging = false
    }

    currentMount.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    // Animation Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Subtle heartbeat pulse
      const heartObj = organsRef.current.heart
      if (heartObj) {
        const pulse = 1 + Math.sin(elapsed * 6) * 0.04
        heartObj.group.scale.set(pulse, pulse * 1.2, pulse * 0.9)
      }

      // Gentle auto-rotation if idle
      if (!isDragging && isRotating) {
        bodyGroup.rotation.y += 0.003
      }

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return
      const w = currentMount.clientWidth
      const h = currentMount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      currentMount.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [isRotating])

  // 2. Real-time Material Update saat Slider digeser
  useEffect(() => {
    const activeRef = organsRef.current[selectedOrganId]
    if (!activeRef || !activeRef.material) return

    // Interpolasi warna & tekstur sesuai timeline
    const targetColor = new THREE.Color(recoveryMode ? '#10b981' : currentTimeline.color)
    activeRef.material.color.lerp(targetColor, 0.8)
    activeRef.material.roughness = recoveryMode ? 0.2 : currentTimeline.roughness
    activeRef.material.emissive = targetColor
    activeRef.material.emissiveIntensity = recoveryMode ? 0.35 : currentTimeline.emissiveIntensity
  }, [selectedOrganId, sliderYear, recoveryMode, currentTimeline])

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col font-sans select-none">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-cyan-900/40 bg-[#090e1a]/80 backdrop-blur px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 text-lg">
                AnatomiLab 3D
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                JOINTS UGM 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Interactive 3D Anatomy &middot; Systemic Impact Simulation &middot; UMKM Affiliate
            </p>
          </div>
        </div>

        {/* Organ Selector Tabs */}
        <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {anatomyData.organs.map((organ) => (
            <button
              key={organ.id}
              onClick={() => setSelectedOrganId(organ.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedOrganId === organ.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {organ.name}
            </button>
          ))}
        </div>

        {/* Back Link to Home */}
        <button
          type="button"
          onClick={() => {
            if (onBackToLanding) {
              onBackToLanding()
            } else {
              window.location.href = '/'
            }
          }}
          className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition cursor-pointer"
        >
          &larr; Back to Landing
        </button>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative">
        {/* Left Column: 3D Viewport (Cols 1-7) */}
        <div className="lg:col-span-7 relative h-[450px] lg:h-auto flex flex-col justify-between overflow-hidden">
          {/* Three.js Canvas Container */}
          <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

          {/* Overlay UI: Viewport Controls */}
          <div className="relative z-10 p-5 flex items-center justify-between pointer-events-none">
            <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 text-[11px] text-cyan-300 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>3D WebGL Engine Active &bull; Drag to Rotate</span>
            </div>

            <div className="pointer-events-auto flex gap-2">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className="px-2.5 py-1 text-xs bg-slate-900/80 border border-slate-700 hover:border-cyan-500 rounded-md text-slate-300 transition"
              >
                {isRotating ? '⏸ Pause Auto-Spin' : '▶ Resume Auto-Spin'}
              </button>
            </div>
          </div>

          {/* Quick HUD Metric Bar on Bottom 3D Screen */}
          <div className="relative z-10 p-5 pointer-events-none">
            <div className="bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-xl p-4 max-w-md pointer-events-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">
                  {currentOrgan.system}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    recoveryMode
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                      : sliderYear === 0
                      ? 'bg-sky-950 text-sky-400 border border-sky-800'
                      : sliderYear <= 2
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {recoveryMode ? 'Proses Pemulihan Aktif' : currentTimeline.status}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-black text-white">
                    {recoveryMode ? '95%' : `${currentTimeline.capacityPercent}%`}
                  </div>
                  <div className="text-[11px] text-slate-400">Efisiensi & Kapasitas Organ</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-200">
                    {recoveryMode ? 'Elastis & Sehat' : currentTimeline.elasticity}
                  </div>
                  <div className="text-[11px] text-slate-400">Status Jaringan</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Dashboard & Pillars (Cols 8-12) */}
        <div className="lg:col-span-5 bg-[#0a0f1d] border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-full overflow-y-auto">
          {/* Pillar Selector Navigation */}
          <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-900/60 p-2 gap-1 sticky top-0 z-10 backdrop-blur">
            <button
              onClick={() => setActiveTab('simulation')}
              className={`py-2 px-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'simulation'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🔥 Healthcare (Simulasi)
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`py-2 px-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'education'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📚 Education (Anatomi)
            </button>
            <button
              onClick={() => setActiveTab('economy')}
              className={`py-2 px-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'economy'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🛍️ Economy (UMKM)
            </button>
          </div>

          {/* Panel Contents */}
          <div className="p-6 space-y-6 flex-1">
            {/* --- 1. TAB SIMULASI HEALTHCARE --- */}
            {activeTab === 'simulation' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">Time-Lapse Degradasi Organ</h2>
                    <p className="text-xs text-slate-400">
                      Simulasikan dampak paparan gaya hidup buruk secara kumulatif
                    </p>
                  </div>
                  <button
                    onClick={() => setRecoveryMode(!recoveryMode)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                      recoveryMode
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-emerald-600'
                    }`}
                  >
                    {recoveryMode ? '✓ Recovery Aktif' : 'Simulasi Pemulihan'}
                  </button>
                </div>

                {/* Slider Kontrol */}
                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Durasi Paparan Kronis</span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {sliderYear === 0 ? 'Kondisi Sehat (0 Thn)' : `Tahun ke-${sliderYear}`}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    value={sliderYear}
                    onChange={(e) => setSliderYear(Number(e.target.value))}
                    disabled={recoveryMode}
                    className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Tahun 0</span>
                    <span>Tahun 1</span>
                    <span>Tahun 2</span>
                    <span>Tahun 3</span>
                    <span>Tahun 4</span>
                    <span>Tahun 5</span>
                  </div>
                </div>

                {/* Status Box */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Dampak Klinis Teramati
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {recoveryMode ? (
                      <span className="text-emerald-300">
                        {currentOrgan.recoveryInfo.milestones[0]}
                      </span>
                    ) : (
                      currentTimeline.description
                    )}
                  </p>
                </div>

                {/* Faktor Risiko Utama */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400">Pemicu Risiko Utama:</div>
                  <div className="space-y-1.5">
                    {currentOrgan.lifestyleRisks.map((risk, idx) => (
                      <div
                        key={idx}
                        className="text-xs flex items-start gap-2 text-slate-300 bg-slate-900/40 p-2 rounded-lg border border-slate-800/80"
                      >
                        <span className="text-rose-400 font-bold">&bull;</span>
                        <span>{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct CTA to UMKM */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 border border-emerald-800/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-300">Cegah Kerusakan Lebih Lanjut</div>
                    <div className="text-[11px] text-slate-400">Lihat solusi herbal terkurasi dari UMKM</div>
                  </div>
                  <button
                    onClick={() => setActiveTab('economy')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition"
                  >
                    Buka Produk &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* --- 2. TAB EDUCATION (ANATOMI) --- */}
            {activeTab === 'education' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-lg font-bold text-white">{currentOrgan.name}</h2>
                  <span className="text-xs text-cyan-400 font-mono">{currentOrgan.system}</span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{currentOrgan.overview}</p>

                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Fakta Medis & Fisiologis:
                  </h3>
                  <div className="space-y-2">
                    {currentOrgan.healthyFacts.map((fact, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900/70 border border-slate-800 p-3 rounded-lg text-xs text-slate-200 flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center justify-center shrink-0 text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs font-bold text-slate-300 mb-1">Misi Inovasi JOINTS UGM</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Visualisasi 3D memungkinkan siswa dan masyarakat memahami fungsi organ secara mendalam tanpa harus membaca terminologi medis yang abstrak.
                  </p>
                </div>
              </div>
            )}

            {/* --- 3. TAB ECONOMY (UMKM AFFILIATE) --- */}
            {activeTab === 'economy' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">Rekomendasi Solusi UMKM</h2>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-mono">
                      Context-Aware
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Produk pencegahan kesehatan terkurasi resmi BPOM dari pelaku usaha lokal
                  </p>
                </div>

                <div className="space-y-3">
                  {currentOrgan.affiliateProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-slate-900/80 border border-slate-800 hover:border-emerald-600/50 p-4 rounded-xl transition space-y-3"
                    >
                      <div className="flex gap-3">
                        <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-2xl border border-slate-700 shrink-0">
                          {prod.imagePlaceholder}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">{prod.name}</h4>
                          <div className="text-[11px] text-slate-400">{prod.umkmName}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded">
                              {prod.bpom}
                            </span>
                            <span className="text-[10px] text-emerald-400 font-semibold">
                              &check; {prod.verifiedBadge}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300">{prod.benefit}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <div className="text-sm font-black text-emerald-400">{prod.price}</div>
                        <a
                          href={prod.marketplaceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition shadow-lg shadow-emerald-900/30"
                        >
                          <span>Beli via Shopee/Tokopedia</span>
                          <span>&nearr;</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                  <span>ℹ️</span>
                  <span>
                    Setiap pembelian melalui deep link ini menyalurkan pendapatan afiliasi langsung ke ekosistem UMKM kesehatan nasional.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
