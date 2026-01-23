import { useEffect, useState } from 'react';

const Portfolio = () => {
  const [audioOn, setAudioOn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loading after 2.2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    // Animate attribute bars after loading
    const attrTimer = setTimeout(() => {
      const attrFills = document.querySelectorAll('.attr-fill');
      attrFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.width = width;
        }, 100);
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(attrTimer);
    };
  }, []);

  useEffect(() => {
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    // Parallax effect for fog
    const handleMouseMove = (e) => {
      const fogLayers = document.querySelectorAll('.fog-layer');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      fogLayers.forEach((layer, index) => {
        const speed = (index + 1) * 10;
        layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToStats = () => {
    document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Loading Overlay */}
      <div className={`loading-overlay ${!loading ? 'hidden' : ''}`}>
        <div className="loading-text">INITIALIZING SYSTEM...</div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>

      {/* Atmospheric Effects */}
      <div className="fog-container">
        <div className="fog-layer"></div>
        <div className="fog-layer"></div>
        <div className="fog-layer"></div>
      </div>
      <div className="scanlines"></div>

      {/* HUD Header */}
      <header className="hud-header">
        <div className="status-bars">
          <div className="stat-bar hp-bar">
            <span className="stat-label">HP</span>
            <div className="bar-container">
              <div className="bar-fill"></div>
            </div>
          </div>
          <div className="stat-bar mp-bar">
            <span className="stat-label">MP</span>
            <div className="bar-container">
              <div className="bar-fill"></div>
            </div>
          </div>
        </div>
        <div className="hud-controls">
          <a href="https://open.spotify.com/playlist/7EC6ybszCLPQEcDgQrYyH0" target="_blank" rel="noopener noreferrer" className="hud-btn">
            <i className="fab fa-spotify"></i>
            <span>♫ CURATED PLAYLIST</span>
          </a>
          <button className="hud-btn audio-toggle" onClick={() => setAudioOn(!audioOn)} title="Toggle Audio">
            <i className={audioOn ? 'fas fa-volume-high' : 'fas fa-volume-xmark'}></i>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-frame">
            <div className="gothic-divider"></div>
            <h1 className="hero-title">Augusto Corona</h1>
            <p className="hero-subtitle">Senior Mobile Engineer</p>
            <p className="hero-class">
              Veteran Mobile Architect specialized in modular architecture, 
              secure payment integrations, and performance optimization 
              for enterprise and startup environments.
            </p>
            <button className="init-btn" onClick={scrollToStats}>
              Initialize System
            </button>
            <div className="gothic-divider"></div>
          </div>
        </section>

        {/* Character Stats Section */}
        <section className="stats-section" id="stats">
          <h2 className="section-title">Character Status</h2>
          <div className="stats-container">
            {/* Primary Stats Panel */}
            <div className="stat-panel fade-in">
              <div className="stat-panel-header">
                <div className="stat-icon">
                  <i className="fas fa-shield-halved"></i>
                </div>
                <h3 className="stat-panel-title">Core Stats</h3>
              </div>
              <div className="level-display">
                LEVEL: <span className="level-number">14</span>
              </div>
              <div className="class-display">
                CLASS: <span className="class-name">ARCHITECT</span>
              </div>
              <div className="attributes-list">
                <div className="attribute-item">
                  <span className="attr-name">STR</span>
                  <span className="attr-name" style={{color: 'var(--text-primary)'}}>Android</span>
                  <div className="attr-bar">
                    <div className="attr-fill" data-width="99%" style={{width: '99%'}}></div>
                  </div>
                  <span className="attr-value">99</span>
                </div>
                <div className="attribute-item">
                  <span className="attr-name">DEX</span>
                  <span className="attr-name" style={{color: 'var(--text-primary)'}}>iOS/Swift</span>
                  <div className="attr-bar">
                    <div className="attr-fill" data-width="95%" style={{width: '95%'}}></div>
                  </div>
                  <span className="attr-value">95</span>
                </div>
                <div className="attribute-item">
                  <span className="attr-name">INT</span>
                  <span className="attr-name" style={{color: 'var(--text-primary)'}}>Unity</span>
                  <div className="attr-bar">
                    <div className="attr-fill" data-width="90%" style={{width: '90%'}}></div>
                  </div>
                  <span className="attr-value">90</span>
                </div>
                <div className="attribute-item">
                  <span className="attr-name">LCK</span>
                  <span className="attr-name" style={{color: 'var(--text-primary)'}}>RNG</span>
                  <div className="attr-bar">
                    <div className="attr-fill" data-width="15%" style={{width: '15%'}}></div>
                  </div>
                  <span className="attr-value">15</span>
                </div>
              </div>
            </div>

            {/* Bio Panel */}
            <div className="stat-panel fade-in">
              <div className="stat-panel-header">
                <div className="stat-icon">
                  <i className="fas fa-scroll"></i>
                </div>
                <h3 className="stat-panel-title">Biography</h3>
              </div>
              <p className="bio-text">
                A seasoned mobile architect with <strong style={{color: 'var(--gold)'}}>14 years</strong> of battle-tested experience 
                in the digital realm. Specializing in crafting modular, scalable architectures 
                that stand the test of time.
                <br/><br/>
                Master of <strong style={{color: 'var(--gold)'}}>MVVM patterns</strong>, wielder of 
                <strong style={{color: 'var(--gold)'}}> secure payment integrations</strong>, and optimizer 
                of performance across both enterprise fortresses and startup battlegrounds.
                <br/><br/>
                When not architecting mobile solutions, ventures into the realm of 
                <strong style={{color: 'var(--gold)'}}> indie game development</strong> — 
                crafting atmospheric experiences that bridge code and creativity.
              </p>
            </div>
          </div>
        </section>

        {/* Inventory / Projects Section */}
        <section className="inventory-section">
          <h2 className="section-title">Equipped Inventory</h2>
          <div className="inventory-grid">
            {/* Item 1: Enterprise */}
            <div className="inventory-item fade-in">
              <span className="item-rarity rarity-enterprise">ENTERPRISE</span>
              <div className="item-icon">
                <i className="fas fa-pills"></i>
              </div>
              <h3 className="item-name">Farmacia San Pablo</h3>
              <p className="item-description">
                Legendary modular refactor implementing MVVM architecture, 
                achieving <strong style={{color: 'var(--gold)'}}>40% improvement</strong> in load times. 
                A critical healthcare infrastructure serving millions.
              </p>
              <div className="item-stats">
                <span className="item-stat">ARCH: <span className="item-stat-value">MVVM</span></span>
                <span className="item-stat">PERF: <span className="item-stat-value">+40%</span></span>
                <span className="item-stat">TYPE: <span className="item-stat-value">Android</span></span>
              </div>
              <a href="https://play.google.com/store/apps/details?id=mx.com.farmaciasanpablo&pcampaignid=web_share" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="item-link">
                <i className="fab fa-google-play"></i>
                VIEW ON PLAY STORE
              </a>
            </div>

            {/* Item 2: EdTech */}
            <div className="inventory-item fade-in">
              <span className="item-rarity rarity-edtech">EDTECH</span>
              <div className="item-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3 className="item-name">CollegeOne Suite</h3>
              <p className="item-description">
                Secure SwiftUI fortress built with Combine reactive armor 
                and Stripe payment enchantments. Empowering educational 
                institutions with modern tooling.
              </p>
              <div className="item-stats">
                <span className="item-stat">LANG: <span className="item-stat-value">SwiftUI</span></span>
                <span className="item-stat">REACT: <span className="item-stat-value">Combine</span></span>
                <span className="item-stat">PAY: <span className="item-stat-value">Stripe</span></span>
              </div>
              <a href="https://apps.apple.com/mx/app/collegeone/id1537518908" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="item-link">
                <i className="fab fa-app-store"></i>
                VIEW ON APP STORE
              </a>
            </div>

            {/* Item 3: Startup */}
            <div className="inventory-item fade-in">
              <span className="item-rarity rarity-startup">STARTUP</span>
              <div className="item-icon">
                <i className="fas fa-store"></i>
              </div>
              <h3 className="item-name">Tiendita App</h3>
              <p className="item-description">
                Founding Engineer artifact. Built B2B ordering infrastructure 
                from the ground up in Kotlin. A testament to startup agility 
                and full-stack prowess.
              </p>
              <div className="item-stats">
                <span className="item-stat">ROLE: <span className="item-stat-value">Founder</span></span>
                <span className="item-stat">LANG: <span className="item-stat-value">Kotlin</span></span>
                <span className="item-stat">TYPE: <span className="item-stat-value">B2B</span></span>
              </div>
              <span className="item-link" style={{opacity: 0.6, cursor: 'default'}}>
                <i className="fas fa-lock"></i>
                PRIVATE PROJECT
              </span>
            </div>

            {/* Item 4: Epic Indie Game */}
            <div className="inventory-item fade-in" style={{borderColor: '#6a2a8a'}}>
              <span className="item-rarity rarity-epic">EPIC</span>
              <div className="epic-particles">
                <div className="particle" style={{left: '10%', animationDelay: '0s'}}></div>
                <div className="particle" style={{left: '30%', animationDelay: '0.5s'}}></div>
                <div className="particle" style={{left: '50%', animationDelay: '1s'}}></div>
                <div className="particle" style={{left: '70%', animationDelay: '1.5s'}}></div>
                <div className="particle" style={{left: '90%', animationDelay: '2s'}}></div>
              </div>
              <div className="item-icon" style={{borderColor: '#6a2a8a', color: '#9a4aca'}}>
                <i className="fas fa-moon"></i>
              </div>
              <h3 className="item-name" style={{color: '#c88aee'}}>Under the Full Moon</h3>
              <p className="item-description">
                Atmospheric Unity game crafted by TobyGame Studio. 
                A journey into the supernatural, blending gothic aesthetics 
                with immersive gameplay. <em style={{color: '#9a4aca'}}>An indie passion project.</em>
              </p>
              <div className="item-stats">
                <span className="item-stat">ENGINE: <span className="item-stat-value" style={{color: '#c88aee'}}>Unity</span></span>
                <span className="item-stat">STUDIO: <span className="item-stat-value" style={{color: '#c88aee'}}>TobyGame</span></span>
                <span className="item-stat">TYPE: <span className="item-stat-value" style={{color: '#c88aee'}}>Indie</span></span>
              </div>
              <a href="https://ccoronacesar.itch.io/under-the-full-moon" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="item-link"
                 style={{borderColor: '#6a2a8a', color: '#c88aee'}}>
                <i className="fab fa-itch-io"></i>
                PLAY ON ITCH.IO
              </a>
            </div>
          </div>
        </section>

        {/* Side Projects Section */}
        <section className="sideprojects-section">
          <h2 className="section-title">Side Projects</h2>
          <div className="slider-container">
            <div className="slider-track">
              {/* Slide 1: Book */}
              <div className="slider-item fade-in">
                <div className="slider-image-container">
                  <div className="slider-image-glow"></div>
                  <img src="https://m.media-amazon.com/images/I/81xHxHULA8L._SY466_.jpg" 
                       alt="Manual para habitar los escombros - Portada del libro" 
                       className="slider-image" />
                </div>
                <div className="slider-content">
                  <span className="slider-badge">Literatura</span>
                  <h3 className="slider-title">Manual para Habitar los Escombros</h3>
                  <span className="slider-subtitle">Diario de una falsa vida</span>
                  <p className="slider-description">
                    Manual para habitar los escombros no es una historia. Es un inventario.
                    <br/><br/>
                    Un registro de lo que queda cuando se cae la fe, se gasta el cuerpo, 
                    se oxidan las relaciones y la vida en la ciudad se vuelve rutina.
                    <br/><br/>
                    Este libro no intenta salvar a nadie. No consuela. No acompaña. No enseña.
                    <em>Solo observa. Solo deja constancia.</em>
                  </p>
                  <a href="https://a.co/d/8Q7m2rE" target="_blank" rel="noopener noreferrer" className="slider-cta">
                    <i className="fab fa-amazon"></i>
                    Ver en Amazon
                  </a>
                </div>
              </div>
            </div>
            {/* Navigation dots */}
            <div className="slider-nav">
              <div className="slider-dot active"></div>
            </div>
          </div>
        </section>

        {/* Footer - Data Uplink */}
        <footer className="footer-section">
          <h3 className="footer-title">&lt; DATA UPLINK PROTOCOLS &gt;</h3>
          <div className="data-uplinks">
            <a href="https://www.linkedin.com/in/cesar-cabrera-corona-b1269775/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="uplink">
              <i className="fab fa-linkedin"></i>
              <div>
                <div>LinkedIn</div>
                <div className="uplink-protocol">PROTOCOL: HTTPS</div>
              </div>
            </a>
            <a href="https://github.com/cccorona" 
               target="_blank" 
               rel="noopener noreferrer"
               className="uplink">
              <i className="fab fa-github"></i>
              <div>
                <div>GitHub</div>
                <div className="uplink-protocol">PROTOCOL: GIT</div>
              </div>
            </a>
            <a href="https://x.com/ceccorona" 
               target="_blank" 
               rel="noopener noreferrer"
               className="uplink">
              <i className="fab fa-x-twitter"></i>
              <div>
                <div>X / Twitter</div>
                <div className="uplink-protocol">PROTOCOL: SOCIAL</div>
              </div>
            </a>
            <a href="https://ccoronacesar.itch.io/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="uplink">
              <i className="fab fa-itch-io"></i>
              <div>
                <div>Itch.io</div>
                <div className="uplink-protocol">PROTOCOL: GAMEDEV</div>
              </div>
            </a>
          </div>
          <div className="terminal-footer">
            <div className="terminal-line">&gt; SYSTEM STATUS: ONLINE</div>
            <div className="terminal-line">&gt; UPTIME: 14 YEARS</div>
            <div className="terminal-line">&gt; READY FOR NEW QUEST<span className="terminal-cursor">_</span></div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Portfolio;
