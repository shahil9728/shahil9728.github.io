import { RESUME } from './resume-data.js';

function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function renderHome() {
  const nameEl = document.getElementById('name');
  const postEl = document.getElementById('post');
  const descEl = document.getElementById('description');
  const cvLink = document.getElementById('download-cv');

  if (nameEl) nameEl.textContent = RESUME.name;
  if (postEl) postEl.textContent = RESUME.title;
  if (descEl) descEl.textContent = RESUME.description;
  if (cvLink) cvLink.setAttribute('href', RESUME.cv);
}

function renderSocials() {
  const container = document.getElementById('social-icons');
  if (!container || !Array.isArray(RESUME.socials)) return;

  container.innerHTML = ''; // clear existing
  RESUME.socials.forEach((s, i) => {
    const a = document.createElement('a');
    a.href = s.url;
    a.target = '_blank';
    a.className = 'social-links';
    a.dataset.aos = 'fade-right';
    a.dataset.aosOffset = 10 + i * 10;

    const img = document.createElement('img');
    img.src = s.icon;
    img.alt = s.name;
    img.className = 'social-img';

    a.appendChild(img);
    container.appendChild(a);
  });
}

function renderEducation() {
  const container = document.getElementById('education-cards');
  if (!container || !Array.isArray(RESUME.education)) return;

  container.innerHTML = '';
  RESUME.education.forEach((edu) => {
    const html = `
      <div class="edu-card" data-aos="fade-up">
        <div class="edu-images">
          <img src="assets/scholar.svg" alt="" class="edu-img">
        </div>
        <div class="edu-content">
          <h3 class="edu-time">${edu.time}</h3>
          <h2 class="edu-head">${edu.head}</h2>
          <h2 class="edu-subhead">${edu.sub || ''}</h2>
        </div>
      </div>`;

    container.appendChild(createElementFromHTML(html));
  });
}

function renderSkills() {
  const container = document.getElementById('skills-cards');
  if (!container || !Array.isArray(RESUME.skills)) return;

  container.innerHTML = '';
  RESUME.skills.forEach((skill, i) => {
    const html = `
      <div class="skill-card" data-aos="fade-left" data-aos-offset="${30 + i * 30}">
        <div class="skill-images">
          <img src="${skill.img}" alt="" class="skill-img">
        </div>
        <div>
          <h1 class="skill-name">${skill.name}</h1>
        </div>
      </div>`;
    container.appendChild(createElementFromHTML(html));
  });
}

function renderExperience() {
  const container = document.getElementById('experience-cards');
  if (!container || !Array.isArray(RESUME.experience)) return;

  container.innerHTML = '';
  RESUME.experience.forEach((exp) => {
    const html = `
      <div class="edu-card" data-aos="fade-up">
        <div class="edu-images">
          <img src="assets/exp-logo.svg" alt="" class="edu-img">
        </div>
        <div class="edu-content">
          <h3 class="edu-time">${exp.time}</h3>
          <h2 class="edu-head">${exp.head}</h2>
          <h2 class="edu-subhead">${exp.sub || ''}</h2>
        </div>
      </div>`;
    container.appendChild(createElementFromHTML(html));
  });
}

function renderProjectsForType(type, projectArray) {
  const containers = Array.from(document.querySelectorAll(`.project-cards[data-type="${type}"]`));
  if (containers.length === 0 || !Array.isArray(projectArray)) return;

  // clear target containers
  containers.forEach((c) => (c.innerHTML = ''));

  const itemsPerContainer = 3;
  projectArray.forEach((p, i) => {
    const containerIndex = Math.floor(i / itemsPerContainer);
    const container = containers[containerIndex] || containers[containers.length - 1];
    const html = `
      <div class="project-card" data-aos="fade-left" data-aos-offset="${60 + i * 60}">
        <div>
          <h1 class="project-head">${p.head}</h1>
        </div>
        <div class="project-images">
          <img src="${p.img}" style="border-radius: 10px;" alt="" class="project-img">
        </div>
        <div class="project-btn">
          <a href="${p.url}" target="_blank" class="project-link">
            <div class="btn-img play"></div>
          </a>
        </div>

        <div class="project-trans">
          <div class="project-left">
            ${p.desc}
          </div>
          <div class="project-right">
            ${p.tech}
          </div>
        </div>
      </div>`;

    const el = createElementFromHTML(html);

    container.appendChild(el);
  });
}

function renderProjects() {
  renderProjectsForType('live', RESUME.liveProjects);
  renderProjectsForType('project', RESUME.projects);
}

function renderAchievements() {
  const container = document.getElementById('achievements-cards');
  if (!container || !Array.isArray(RESUME.achievements)) return;

  container.innerHTML = '';
  RESUME.achievements.forEach((a) => {
    const html = `
      <div class="edu-card" data-aos="fade-up">
        <div class="edu-images">
          <img src="assets/exp-logo.svg" alt="" class="edu-img">
        </div>
        <div class="edu-content">
          <h3 class="edu-time">${a.time}</h3>
          <h2 class="edu-head">${a.head}</h2>
          <h2 class="edu-subhead">${a.sub || ''}</h2>
        </div>
      </div>`;
    container.appendChild(createElementFromHTML(html));
  });
}

function renderContact() {
  const emailEl = document.getElementById('contact-email');
  const phoneEl = document.getElementById('contact-phone');
  const locationEl = document.getElementById('contact-location');
  const emailLink = document.getElementById('contact-email-link');
  const phoneLink = document.getElementById('contact-phone-link');

  if (emailEl) emailEl.textContent = RESUME.contact.email;
  if (emailLink) emailLink.href = `mailto:${RESUME.contact.email}`;
  if (phoneEl) phoneEl.textContent = RESUME.contact.phone;
  if (phoneLink) phoneLink.href = `tel:${RESUME.contact.phone.replace(/\s+/g, '')}`;
  if (locationEl) locationEl.textContent = RESUME.contact.location;
}

function init() {
  renderHome();
  renderSocials();
  renderEducation();
  renderSkills();
  renderExperience();
  renderProjects();
  renderAchievements();
  renderContact();

  // Refresh AOS to make sure animations are applied to newly added DOM elements.
  if (window.AOS && typeof window.AOS.refresh === 'function') {
    window.AOS.refresh();
  }
  console.info('Resume renderer initialized');
}

// Run once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
