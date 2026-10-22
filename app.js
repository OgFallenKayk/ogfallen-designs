"use strict";

const projects = {
  aura: {
    name: "AURA", image: "assets/aura.webp", social: "assets/aura-social.svg", banner: "assets/aura-banner.svg",
    palette: ["#d0b9e6", "#f1edf7", "#302639"],
    pt: {
      title: "AURA — Ritual de luz", subtitle: "Uma pausa no excesso. Um universo de beleza construído a partir de luz, transparência e respiro.",
      tags: ["Marca fictícia", "Beleza", "Campanha + IA"],
      brief: "Como apresentar um ritual de cuidado sem recorrer a promessas de transformação? Criar um conceito de lançamento para uma marca fictícia de beleza, com foco na experiência visual e no tempo dedicado a si.",
      audience: "Público imaginado: pessoas interessadas em beleza e rituais cotidianos. Objetivo de comunicação: despertar curiosidade e reconhecimento visual; sem alegações de eficácia cosmética.",
      idea: "“Seu ritual. Uma nova luz.” O frasco funciona como ponto de calma. Vidro fosco, pedra perolada e um arco translúcido transformam luz em matéria.",
      decisions: ["Lavanda suave e branco perolado para uma atmosfera serena.", "Composição assimétrica e bastante espaço em branco.", "Tipografia fora da imagem gerada para manter a mensagem editável."],
      applications: ["Peça social / 1080 × 1080", "Banner digital / 1600 × 900"],
      production: "Imagem de produto gerada no Runway a partir de um briefing original, com apoio de IA. Mensagens e aplicações compostas em SVG editável. Os frascos são fictícios: rótulos, embalagem, materiais e viabilidade industrial não foram validados. Este estudo não inclui formulação, testes ou arquivos técnicos para produção.",
      outcome: "Entrega deste estudo: um visual principal e duas aplicações digitais. Não houve veiculação, teste com público ou medição de resultados."
    },
    en: {
      title: "AURA — A ritual of light", subtitle: "A pause from excess. A beauty world built around light, transparency and breathing room.",
      tags: ["Fictional brand", "Beauty", "Campaign + AI"],
      brief: "How can a self-care ritual be presented without promises of transformation? Develop a launch concept for a fictional beauty brand, focusing on visual experience and time for oneself.",
      audience: "Imagined audience: people interested in beauty and daily rituals. Communication goal: create curiosity and visual recognition, without cosmetic efficacy claims.",
      idea: "“Your ritual. A new light.” The bottle becomes a point of calm. Frosted glass, pearlescent stone and a translucent arc turn light into material.",
      decisions: ["Soft lavender and pearl white create a serene atmosphere.", "Asymmetrical composition with generous negative space.", "Type sits outside the generated image to keep the message editable."],
      applications: ["Social artwork / 1080 × 1080", "Digital banner / 1600 × 900"],
      production: "Product image generated in Runway from an original AI-assisted brief. Messaging and applications composed in editable SVG. The bottles are fictional: labels, packaging, materials and industrial feasibility have not been validated. This study includes no formulation, testing or technical production files.",
      outcome: "Study deliverables: one key visual and two digital applications. No campaign launch, audience testing or results measurement took place."
    }
  },
  orbit: {
    name: "ORBIT", image: "assets/orbit.webp", social: "assets/orbit-social.svg", banner: "assets/orbit-banner.svg",
    palette: ["#0d0c10", "#bd9bff", "#e7deef"],
    pt: {
      title: "ORBIT — Além do som", subtitle: "O som ocupa espaço. Um objeto cotidiano ganha um universo próprio, entre precisão e imaginação.",
      tags: ["Marca fictícia", "Áudio", "Narrativa de produto + IA"],
      brief: "Criar uma campanha digital para um fone de ouvido imaginário. O desafio é sugerir uma experiência de escuta envolvente com uma linguagem visual, sem inventar especificações técnicas.",
      audience: "Público imaginado: pessoas conectadas a música, tecnologia e cultura visual. Objetivo de comunicação: construir uma presença distinta em lançamentos digitais e redes sociais.",
      idea: "“O som ocupa espaço.” Um anel de vidro traduz uma onda sonora em órbita. O produto é o centro de gravidade da composição.",
      decisions: ["Grafite e preto para destacar o desenho do objeto.", "Violeta como luz, atmosfera e fio condutor da campanha.", "Mensagem curta e enquadramentos diferentes para social e banner."],
      applications: ["Peça social / 1080 × 1080", "Banner digital / 1600 × 900"],
      production: "Imagem gerada no Runway com apoio de IA; composição e tipografia das aplicações em SVG editável. O fone é um conceito visual, sem modelo 3D, protótipo funcional ou especificações verificadas. Não há alegações sobre bateria, qualidade sonora ou cancelamento de ruído.",
      outcome: "Entrega deste estudo: um visual principal e duas aplicações digitais. A proposta ilustra uma direção de comunicação, sem resultados comerciais ou experiência de fabricação implícitos."
    },
    en: {
      title: "ORBIT — Beyond sound", subtitle: "Sound takes shape. An everyday object gains a world of its own, between precision and imagination.",
      tags: ["Fictional brand", "Audio", "Product storytelling + AI"],
      brief: "Create a digital campaign for an imaginary pair of headphones. The challenge is to suggest an immersive listening experience through visual language, without inventing technical specifications.",
      audience: "Imagined audience: people drawn to music, technology and visual culture. Communication goal: build a distinctive presence for digital launches and social channels.",
      idea: "“Sound takes shape.” A glass ring turns a sound wave into an orbit. The product becomes the composition's centre of gravity.",
      decisions: ["Graphite and black bring out the object's form.", "Violet works as light, atmosphere and a consistent campaign thread.", "Short messaging and different framing for social and banner formats."],
      applications: ["Social artwork / 1080 × 1080", "Digital banner / 1600 × 900"],
      production: "AI-assisted image generated in Runway; application composition and typography in editable SVG. The headphones are a visual concept, without a 3D model, working prototype or verified specifications. There are no battery, sound quality or noise cancellation claims.",
      outcome: "Study deliverables: one key visual and two digital applications. This demonstrates a communication direction, with no implied commercial results or manufacturing experience."
    }
  },
  entre: {
    name: "ENTRE", image: "assets/entre-board.svg", social: "assets/entre-social.svg", banner: "assets/entre-ticket.svg",
    palette: ["#ff693b", "#f1e9da", "#171717"],
    pt: {
      title: "ENTRE — Cidade em pausa", subtitle: "Entre uma esquina e outra, espaço para encontrar. Um sistema gráfico para um encontro cultural imaginário.",
      tags: ["Evento fictício", "Cultura", "Sistema vetorial"],
      brief: "Desenvolver uma linguagem visual para um encontro cultural independente fictício. Conectar cartaz, redes sociais e ingresso sem depender de fotografia ou de uma lista de atrações inventada.",
      audience: "Público imaginado: pessoas que exploram arte, design e cultura na cidade. Objetivo de comunicação: convidar a olhar o cotidiano com mais atenção e curiosidade.",
      idea: "“Cidade em pausa.” Arcos, círculos e blocos lembram passagens urbanas. As formas se reorganizam a cada formato, como diferentes encontros no mesmo lugar.",
      decisions: ["Laranja para energia; creme para respiro; preto para contraste.", "Geometria modular e hierarquia tipográfica consistente.", "Arquivos vetoriais com versões editáveis e exportações com fontes em curvas."],
      applications: ["Peça social / 1080 × 1080", "Ingresso conceitual / 1400 × 600"],
      production: "Sistema criado com apoio de IA e executado no VectorCraft 0.12.0: cartaz, peça social e ingresso. Os documentos nativos mantêm formas e textos editáveis; SVGs com fontes em curvas preservam a aparência no navegador. Não é um evento anunciado, e o ingresso não concede acesso a nenhum local.",
      outcome: "Entrega deste estudo: cartaz, peça social, ingresso e um pequeno estudo de movimento. Nenhuma edição do evento ocorreu; não há público, patrocinadores ou resultados de bilheteria atribuídos."
    },
    en: {
      title: "ENTRE — A city on pause", subtitle: "Between one corner and the next, room to connect. A graphic system for an imagined cultural gathering.",
      tags: ["Fictional event", "Culture", "Vector system"],
      brief: "Develop a visual language for a fictional independent cultural gathering. Connect posters, social media and a ticket without relying on photography or an invented line-up.",
      audience: "Imagined audience: people exploring art, design and urban culture. Communication goal: invite a more attentive and curious look at everyday life.",
      idea: "“A city on pause.” Arches, circles and blocks recall urban passages. The shapes rearrange for each format, like different encounters in the same place.",
      decisions: ["Orange for energy; cream for breathing room; black for contrast.", "Modular geometry with a consistent typographic hierarchy.", "Editable vector sources and outlined-type exports."],
      applications: ["Social artwork / 1080 × 1080", "Concept ticket / 1400 × 600"],
      production: "AI-assisted system executed in VectorCraft 0.12.0: poster, social artwork and ticket. Native documents keep shapes and text editable; outlined SVGs preserve appearance in browsers. This is not an announced event, and the ticket grants no admission.",
      outcome: "Study deliverables: a poster, social artwork, ticket and a short motion study. No event took place; no attendance, sponsors or ticket sales are claimed."
    }
  }
};

const dialog = document.querySelector('#project-dialog');
const caseContent = document.querySelector('#case-content');
let activeProject = null;
let lastOpener = null;
let lang = 'pt';
try { lang = localStorage.getItem('ogfallen-language') === 'en' ? 'en' : 'pt'; } catch { /* Storage is optional. */ }
const queryLang = new URLSearchParams(location.search).get('lang');
if (queryLang === 'en' || queryLang === 'pt') lang = queryLang;

function setLanguage(next) {
  lang = next;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-pt][data-en]').forEach(el => { el.textContent = el.dataset[lang]; });
  document.querySelectorAll('[data-label-pt]').forEach(el => { el.setAttribute('aria-label', el.dataset[lang === 'pt' ? 'labelPt' : 'labelEn']); });
  document.querySelectorAll('[data-alt-pt]').forEach(el => { el.alt = el.dataset[lang === 'pt' ? 'altPt' : 'altEn']; });
  const toggle = document.querySelector('#language');
  toggle.textContent = lang === 'pt' ? 'EN' : 'PT';
  toggle.setAttribute('aria-label', lang === 'pt' ? 'Switch to English' : 'Mudar para português');
  document.querySelector('meta[name="description"]').content = lang === 'pt'
    ? 'Kayk Canova / OGFallen Designs. Estudos independentes de campanhas, identidade visual e imagens com apoio de IA.'
    : 'Kayk Canova / OGFallen Designs. Independent AI-assisted campaign, visual identity and imagery studies.';
  try { localStorage.setItem('ogfallen-language', lang); } catch { /* No persistence needed. */ }
  if (activeProject) renderProject(activeProject);
}

// All project copy is static, owned content. DOM text nodes keep it separate from markup.
function node(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function renderProject(id) {
  const project = projects[id];
  const copy = project[lang];
  const label = lang === 'pt'
    ? { brief:'O desafio', audience:'Público e intenção', idea:'A ideia central', decisions:'Decisões visuais', applications:'Do conceito às aplicações', process:'Como foi produzido', outcome:'Escopo e resultado', full:'Abrir visual principal ↗', source:'Baixar arquivos editáveis ↓', campaign:'A arte original permanece em português.' }
    : { brief:'The challenge', audience:'Audience and intention', idea:'The central idea', decisions:'Visual decisions', applications:'From concept to applications', process:'How it was made', outcome:'Scope and outcome', full:'Open key visual ↗', source:'Download editable files ↓', campaign:'Original campaign artwork remains in Portuguese.' };
  caseContent.replaceChildren();
  const heading = node('div','case-heading');
  heading.append(node('h2','',copy.title),node('p','',copy.subtitle));
  heading.querySelector('h2').id = 'case-title';
  const tags = node('div','case-meta');
  copy.tags.forEach(tag => tags.append(node('span','',tag)));
  heading.append(tags);
  const keyvisual = node('img','case-keyvisual');
  keyvisual.src = project.image;
  keyvisual.alt = copy.title;
  const grid = node('div','case-grid');
  for (const key of ['brief','audience','idea','decisions']) {
    const section = node('section','');
    section.append(node('h3','',label[key]));
    if (key === 'decisions') {
      const ul = node('ul','');
      copy.decisions.forEach(item=>ul.append(node('li','',item)));
      section.append(ul);
      const palette = node('div','case-palette');
      project.palette.forEach(colour=>{const swatch=node('span','');const dot=node('i','');dot.style.background=colour;dot.setAttribute('aria-hidden','true');swatch.append(dot,document.createTextNode(colour));palette.append(swatch);});
      section.append(palette);
    } else section.append(node('p','',copy[key]));
    grid.append(section);
  }
  const applications = node('section','case-applications');
  applications.append(node('h3','',label.applications));
  const gallery = node('div','application-grid');
  [project.social, project.banner].forEach((src,index)=>{
    const figure=node('figure','');const img=node('img','');img.src=src;img.alt=copy.applications[index];img.loading='lazy';
    figure.append(img,node('figcaption','',copy.applications[index]+' · '+label.campaign));gallery.append(figure);
  });
  applications.append(gallery);
  if (id === 'entre') {
    const video=node('video','case-video'); video.controls=true; video.preload='none'; video.poster='assets/entre-motion-poster.webp';
    video.setAttribute('aria-label',lang==='pt'?'Estudo de movimento geométrico ENTRE, sem áudio':'ENTRE geometric motion study, no audio');
    const source=node('source','');source.src='assets/entre-motion.mp4';source.type='video/mp4';video.append(source);
    video.append(document.createTextNode(lang==='pt'?'Seu navegador não suporta vídeo.':'Your browser does not support video.'));
    applications.append(video,node('p','transparency-note',lang==='pt'?'Estudo de movimento / 4 segundos / sem áudio. Reprodução manual.':'Motion study / 4 seconds / no audio. Play manually.'));
  }
  const disclosure=node('div','case-disclosure');
  disclosure.append(node('strong','',label.process+': '),document.createTextNode(copy.production),node('br',''),node('br',''),node('strong','',label.outcome+': '),document.createTextNode(copy.outcome));
  const links=node('div','case-links');
  const full=node('a','',label.full);full.href=project.image;full.target='_blank';full.rel='noopener';
  const source=node('a','',label.source);source.href='assets/'+id+'-editable.zip';source.download='';
  links.append(full,source);
  caseContent.append(heading,keyvisual,grid,applications,disclosure,links);
}
function openProject(id,opener) {
  if (!projects[id]) return;
  activeProject=id;
  lastOpener=opener || document.activeElement;
  renderProject(id);
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop=0;
  document.body.classList.add('modal-open');
  document.querySelector('.dialog-close').focus({preventScroll:true});
}
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>openProject(button.dataset.project,button)));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('keydown',event=>{
  if(event.key!=='Tab') return;
  const focusable=[...dialog.querySelectorAll('a[href],button:not([disabled]),video[controls],[tabindex="0"]')].filter(el=>el.getClientRects().length);
  const first=focusable[0],last=focusable[focusable.length-1];
  if(event.shiftKey && (document.activeElement===first || document.activeElement===dialog)) { event.preventDefault();last?.focus(); }
  else if(!event.shiftKey && document.activeElement===last) { event.preventDefault();first?.focus(); }
});
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');activeProject=null;if(lastOpener?.isConnected)lastOpener.focus({preventScroll:true});});
document.querySelector('#language').addEventListener('click',()=>setLanguage(lang==='pt'?'en':'pt'));
setLanguage(lang);
