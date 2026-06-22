import React, { useEffect, useRef, useState } from 'react'
import fotoPerfil from '../foto perfil/Foto Profissional 2 (longe).jpeg'
import imgHtml from '../experiencia tecnologia/html.png'
import imgCss from '../experiencia tecnologia/css.png'
import imgJs from '../experiencia tecnologia/javascript.png'
import imgReact from '../experiencia tecnologia/React.svg.png'
import imgMysql from '../estudando tecnologia/mysql.png'
import imgNode from '../estudando tecnologia/Node.js.png'
import imgNextjs from '../estudando tecnologia/nextjs-ghnqttyc6ffbnqnn8xlrpj.webp'
import imgTypescript from '../estudando tecnologia/Typescript_logo_2020.svg.png'

const Principal = () => {
  const [badgeVisible, setBadgeVisible] = useState(false)
  const terminalRef = useRef(null)

  useEffect(() => {
    const body = terminalRef.current
    if (!body) return

    const linhas = [
      `<span class="kw">const</span> <span class="out-val">developer</span> <span class="punct">=</span> <span class="punct">{</span>`,
      `<span class="indent"><span class="key">nome</span><span class="punct">:</span> <span class="str">"Thyago Emanoel"</span><span class="punct">,</span></span>`,
      `<span class="indent"><span class="key">cargo</span><span class="punct">:</span> <span class="str">"Web Developer"</span><span class="punct">,</span></span>`,
      `<span class="indent"><span class="key">stack</span><span class="punct">:</span> <span class="punct">[</span><span class="str">"HTML"</span><span class="punct">,</span> <span class="str">"CSS"</span><span class="punct">,</span> <span class="str">"JavaScript"</span><span class="punct">,</span> <span class="str">"React"</span><span class="punct">],</span></span>`,
      `<span class="indent"><span class="key">aprendendo</span><span class="punct">:</span> <span class="punct">[</span><span class="str">"Node.js"</span><span class="punct">,</span> <span class="str">"Next.js"</span><span class="punct">,</span> <span class="str">"TypeScript"</span><span class="punct">],</span></span>`,
      `<span class="indent"><span class="key">foco</span><span class="punct">:</span> <span class="str">"Interfaces rápidas e acessíveis"</span><span class="punct">,</span></span>`,
      `<span class="indent"><span class="key">disponivel</span><span class="punct">:</span> <span class="bool">true</span></span>`,
      `<span class="punct">};</span>`,
    ]

    const CHAR_DELAY = 28
    const LINE_DELAY = 180
    const ids = []

    const tokenize = (html) => {
      const tokens = []
      let i = 0
      while (i < html.length) {
        if (html[i] === '<') {
          const end = html.indexOf('>', i)
          tokens.push({ tag: true, content: html.slice(i, end + 1) })
          i = end + 1
        } else {
          tokens.push({ tag: false, content: html[i] })
          i++
        }
      }
      return tokens
    }

    let lineIndex = 0

    const typeLine = (div, tokens, idx, built, onDone) => {
      if (idx >= tokens.length) {
        div.innerHTML = built
        onDone()
        return
      }
      const token = tokens[idx]
      const next = built + token.content
      div.innerHTML = next + '<span class="cursor"></span>'
      if (token.tag) {
        typeLine(div, tokens, idx + 1, next, onDone)
      } else {
        const id = setTimeout(() => typeLine(div, tokens, idx + 1, next, onDone), CHAR_DELAY)
        ids.push(id)
      }
    }

    const typeNextLine = () => {
      if (lineIndex >= linhas.length) {
        const last = body.lastElementChild
        if (last) {
          const cursor = document.createElement('span')
          cursor.className = 'cursor'
          last.appendChild(cursor)
        }
        setBadgeVisible(true)
        return
      }
      const div = document.createElement('div')
      body.appendChild(div)
      const tokens = tokenize(linhas[lineIndex++])
      typeLine(div, tokens, 0, '', () => {
        const id = setTimeout(typeNextLine, LINE_DELAY)
        ids.push(id)
      })
    }

    const id = setTimeout(typeNextLine, 800)
    ids.push(id)

    return () => ids.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.reveal, .stack-card').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Tela Principal */}

      <section className="hero" id="home">
        <div>
          {/* <span className="eyebrow">web developer</span> */}
          <h1>
            Olá, me chamo Thyago Emanoel —{' '}
            <span className="blue">A sua ideia pode virar um sistema.</span>
          </h1>
          <p className="lead">
            Construo sites e aplicações web com HTML, CSS, JavaScript e React — focado
            em código limpo, performance e fidelidade ao design original.
          </p>
          <div className="hero-actions">
            <a href="#projetos" className="btn-primary">
              Ver projetos
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#contato" className="btn-secondary">Fale comigo</a>
          </div>
          <div className="hero-tags">
            <span className="hero-tag">HTML5</span>
            <span className="hero-tag">CSS3</span>
            <span className="hero-tag">JavaScript</span>
            <span className="hero-tag">React</span>
          </div>
        </div>

        <div className="terminal-wrap">
          <div className={`float-badge${badgeVisible ? ' show' : ''}`}>
            <span className="badge-dot"></span>
            <span className="badge-text">
              <span className="label">build passing</span>
              <span className="sub">deploy ok · 2s</span>
            </span>
          </div>
          <div className="terminal">
            <div className="terminal-bar">
              <span className="terminal-dot" style={{ background: '#FF5F57' }}></span>
              <span className="terminal-dot" style={{ background: '#FEBC2E' }}></span>
              <span className="terminal-dot" style={{ background: '#28C840' }}></span>
              <span className="fname mono">~/thyago — zsh</span>
            </div>
            <div className="terminal-body" ref={terminalRef}></div>
          </div>
        </div>
      </section>

      {/* Sobre Mim */}
      
      <section className="section" id="sobre">
        <div className="section-head reveal">
          {/* <span className="eyebrow">sobre mim</span> */}
          <h2>Deixe-me me Apresentar...</h2>
        </div>

        <div className="about-grid">
          <div className="about-photo reveal">
            <span className="status-chip">
              <span className="dot"></span>disponível
            </span>
            <img src={fotoPerfil} alt="Thyago Emanoel" />
          </div>

          <div className="about-text">
            <p className="reveal">
              Sou <strong>desenvolvedor front-end Júnior</strong> e atualmente estou em fase de desenvolvimento com o
              foco em transformar design em interfaces funcionais, responsivas e rápidas. Faço Bacharel em Ciência da Computação
              e atualmente estou em aprendizagem para entender as melhores tecnologias na qual o mercado exige.
            </p>
            <p className="reveal">
              Trabalho com <strong>HTML, CSS, JavaScript e React</strong> no meu dia a dia,
              sempre buscando me aperfeiçoar de maneira simples, rápida e eficaz, contudo tendo uma atenção redobrada aos
              detalhes de UI, códigos e design para deixar o projeto mais consolidado e atender as expectativa dos meus clientes.
            </p>
            <p className="reveal">
              Fora dos projetos, estudo boas práticas de acessibilidade, performance web
              e novas formas de estruturar componentes de forma escalável.
            </p>

            <div className="about-facts reveal">
              <div>
                {/* <div className="fact-num">20+</div>
                <div className="fact-label">Projetos construídos</div> */}
              </div>
              <div>
                {/* <div className="fact-num">3</div>
                <div className="fact-label">Anos com React</div> */}
              </div>
              <div>
                {/* <div className="fact-num">100%</div>
                <div className="fact-label">Responsivo &amp; acessível</div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minhas Experiências e Aprendizagem em Tecnologia */}
      <section className="section" id="stack">
        <div className="section-head reveal">
          {/* <span className="eyebrow">stack</span> */}
          <h2>Tecnologias que domino</h2>
          <p>
            As ferramentas que uso para transformar layout em produto real, do primeiro
            componente ao deploy — e o que estou estudando agora para expandir para o back-end.
          </p>
        </div>

        <div className="stack-grid">
          <div className="stack-card reveal" style={{ '--level': '90%' }}>
            <div className="stack-top">
              <div className="stack-icon">
                <img src={imgHtml} alt="HTML" />
              </div>
              <span className="stack-tag mono">v5</span>
            </div>
            <h3>HTML</h3>
            <p className="stack-desc">Estrutura semântica, acessível e otimizada para SEO.</p>
            <div className="stack-bar"><div className="stack-bar-fill"></div></div>
            <span className="stack-percent mono">90%</span>
          </div>

          <div className="stack-card reveal" style={{ '--level': '75%' }}>
            <div className="stack-top">
              <div className="stack-icon">
                <img src={imgCss} alt="CSS" />
              </div>
              <span className="stack-tag mono">v3</span>
            </div>
            <h3>CSS</h3>
            <p className="stack-desc">Layouts responsivos com Flexbox, Grid e animações.</p>
            <div className="stack-bar"><div className="stack-bar-fill"></div></div>
            <span className="stack-percent mono">75%</span>
          </div>

          <div className="stack-card reveal" style={{ '--level': '70%' }}>
            <div className="stack-top">
              <div className="stack-icon">
                <img src={imgJs} alt="JavaScript" />
              </div>
              <span className="stack-tag mono">ES6+</span>
            </div>
            <h3>JavaScript</h3>
            <p className="stack-desc">Lógica de interação, manipulação de DOM e APIs.</p>
            <div className="stack-bar"><div className="stack-bar-fill"></div></div>
            <span className="stack-percent mono">70%</span>
          </div>

          <div className="stack-card reveal" style={{ '--level': '85%' }}>
            <div className="stack-top">
              <div className="stack-icon">
                <img src={imgReact} alt="React" />
              </div>
              <span className="stack-tag mono">18</span>
            </div>
            <h3>React</h3>
            <p className="stack-desc">Componentização, hooks e gerenciamento de estado.</p>
            <div className="stack-bar"><div className="stack-bar-fill"></div></div>
            <span className="stack-percent mono">85%</span>
          </div>

          <div className="stack-card reveal" style={{ '--level': '78%' }}>
            <div className="stack-top">
              <div className="stack-icon">
                <img src={imgMysql} alt="MySQL" />
              </div>
              <span className="stack-tag mono">SQL</span>
            </div>
            <h3>MySQL</h3>
            <p className="stack-desc">Modelagem de dados, queries e integração com back-end.</p>
            <div className="stack-bar"><div className="stack-bar-fill"></div></div>
            <span className="stack-percent mono">78%</span>
          </div>
        </div>

        <div className="learning-head reveal">
          <span className="learning-label">
            <span className="learning-dot"></span>em aprendizagem
          </span>
          <span className="learning-line"></span>
        </div>

        <div className="learning-grid reveal">
          <div className="learning-card">
            <div className="learning-icon">
              <img src={imgNode} alt="Node.js" className="img-white" />
            </div>
            <div>
              <h4>Node.js</h4>
              <span>back-end &amp; APIs</span>
            </div>
          </div>

          <div className="learning-card">
            <div className="learning-icon">
              <img src={imgNextjs} alt="Next.js" className="img-white" />
            </div>
            <div>
              <h4>Next.js</h4>
              <span>SSR &amp; rotas</span>
            </div>
          </div>

          <div className="learning-card">
            <div className="learning-icon">
              <img src={imgTypescript} alt="TypeScript" />
            </div>
            <div>
              <h4>TypeScript</h4>
              <span>tipagem estática</span>
            </div>
          </div>
        </div>
      </section>

      
      {/* Projetos Feitos ou Andamento para adicionar */}

      <section className="section" id="projetos">
        <div className="section-head reveal">
          {/* <span className="eyebrow">projetos</span> */}
          <h2>Trabalhos selecionados</h2>
          <p>
            Uma seleção de projetos recentes — interfaces construídas do zero ou a
            partir de um design entregue.
          </p>
        </div>

        <div className="project-grid">
          <div className="project-card reveal">
            <div className="project-thumb">
              <div className="browser-bar"><span></span><span></span><span></span></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
            <div className="project-body">
              <div className="project-status"><span className="dot"></span>em produção</div>
              <h3>Plataforma Fintech</h3>
              <p>
                Dashboard de gestão financeira para pequenas empresas, com gráficos em
                tempo real e fluxo de aprovação.
              </p>
              <div className="project-tags">
                <span>React</span><span>CSS Modules</span><span>API REST</span>
              </div>
              <div className="project-links">
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Ver demo
                </a>
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                  Código
                </a>
              </div>
            </div>
          </div>

          <div className="project-card reveal">
            <div className="project-thumb">
              <div className="browser-bar"><span></span><span></span><span></span></div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </div>
            <div className="project-body">
              <div className="project-status"><span className="dot"></span>em produção</div>
              <h3>Studio Nômade</h3>
              <p>
                Site institucional para um estúdio de arquitetura, com foco em
                performance e animações sutis no scroll.
              </p>
              <div className="project-tags">
                <span>HTML</span><span>CSS3</span><span>JavaScript</span>
              </div>
              <div className="project-links">
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Ver demo
                </a>
                <a href="#">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                  Código
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Falar Comigo */}

      <section className="section" id="contato">
        <div className="contact-box reveal">
          {/* <span className="eyebrow">contato</span> */}
          <h2>
            Tem um projeto em mente?<br />
            Vamos <span className="blue">conversar.</span>
          </h2>
          <p>
            Estou disponível para projetos freelance, oportunidades CLT ou só trocar
            uma ideia sobre tecnologia.
          </p>
          
          {/* <a href="" className="contact-email"></a> */}
          
          <div className="contact-channels">
            <a href="https://github.com/thyagoemanoell" className="channel" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/thyago-emanoel-souza-sales-2621b1163/" className="channel" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
            <a href="mailto:thyagoemanoel@outlook.com" className="channel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              E-mail
            </a>
            <a href="https://wa.me/5598988005249" className="channel" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Principal;
