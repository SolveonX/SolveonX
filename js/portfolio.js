document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("portfolio-grid");
  const filters = document.getElementById("portfolio-filters");
  const searchInput = document.getElementById("portfolio-search");
  const sortSelect = document.getElementById("portfolio-sort");
  const countEl = document.getElementById("portfolio-count");
  const resetBtn = document.getElementById("portfolio-reset");
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("project-modal-content");
  if (!grid || typeof PROJECTS === "undefined") return;

  let active = "All";
  let search = "";
  let sort = "featured";

  function getFilteredProjects() {
    let list = PROJECTS.filter((project) => {
      const matchesCategory = active === "All" || project.category === active;
      const haystack = [
        project.title,
        project.description,
        project.category,
        project.sector,
        project.outcome,
        ...(project.tags || []),
        ...(project.tools || [])
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = !search || haystack.includes(search);
      return matchesCategory && matchesSearch;
    });

    list = [...list].sort((a, b) => {
      if (sort === "newest") return Number(b.year) - Number(a.year);
      if (sort === "category") return a.category.localeCompare(b.category) || Number(b.year) - Number(a.year);
      if (sort === "sector") return a.sector.localeCompare(b.sector) || Number(b.year) - Number(a.year);
      if (a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
      return Number(b.year) - Number(a.year);
    });

    return list;
  }

  function renderCount(total) {
    if (!countEl) return;
    countEl.textContent = `${total} project${total === 1 ? "" : "s"} visible`;
  }

  function render() {
    const list = getFilteredProjects();
    renderCount(list.length);
    grid.innerHTML = list.length
      ? list.map(renderProjectCard).join("")
      : '<p class="section-desc">No projects match the current filters yet.</p>';
  }

  function renderModal(project) {
    if (!modalContent) return;
    const impact = (project.impact || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
    const tags = (project.tags || []).map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("");
    const tools = (project.tools || []).map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("");
    const message = `Hi, I saw the ${project.title} case study and want a similar system for my business.`;
    const demoHref = getProjectDemoHref(project);

    modalContent.innerHTML = `
      <div class="project-modal-header">
        <span class="badge">${escapeHtml(project.category)}</span>
        <h2 id="project-modal-title">${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.description)}</p>
      </div>
      <div class="project-modal-metrics">
        <div><span>Sector</span><strong>${escapeHtml(project.sector)}</strong></div>
        <div><span>Year</span><strong>${escapeHtml(project.year)}</strong></div>
        <div><span>Highlight</span><strong>${escapeHtml(project.metric)}</strong></div>
      </div>
      <div class="project-modal-sections">
        <section>
          <h3>Challenge</h3>
          <p>${escapeHtml(project.challenge)}</p>
        </section>
        <section>
          <h3>Solution</h3>
          <p>${escapeHtml(project.solution)}</p>
        </section>
        <section>
          <h3>Outcome</h3>
          <p>${escapeHtml(project.outcome)}</p>
        </section>
      </div>
      <div class="project-modal-columns">
        <div>
          <h3>Impact</h3>
          <ul class="check-list">${impact}</ul>
        </div>
        <div>
          <h3>Tags</h3>
          <div class="tags">${tags}</div>
          <h3>Tools</h3>
          <div class="tags">${tools}</div>
        </div>
      </div>
      <div class="cta-actions" style="justify-content:flex-start;margin-top:1.5rem">
        <a href="${demoHref}" class="btn btn-secondary">Browse demo</a>
        <a href="${waLink(message)}" class="btn btn-primary">Discuss similar system</a>
      </div>
    `;
  }

  let lastFocus = null;

  function getModalFocusables() {
    if (!modalContent) return [];
    return [...modalContent.querySelectorAll("a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])")].filter(
      (el) => !el.disabled && el.offsetParent !== null
    );
  }

  function openModal(projectId) {
    const project = PROJECTS.find((item) => item.id === projectId);
    if (!project || !modal) return;
    lastFocus = document.activeElement;
    renderModal(project);
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    const closeBtn = modal.querySelector(".project-modal-close");
    closeBtn?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  if (filters && typeof PROJECT_CATEGORIES !== "undefined") {
    filters.innerHTML = PROJECT_CATEGORIES.map(
      (cat) =>
        `<button type="button" class="filter-btn${cat === active ? " active" : ""}" data-cat="${cat}">${cat}</button>`
    ).join("");

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      active = btn.dataset.cat;
      filters.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.toggle("active", b.dataset.cat === active);
      });
      render();
    });
  }

  searchInput?.addEventListener("input", (e) => {
    search = e.target.value.trim().toLowerCase();
    render();
  });

  sortSelect?.addEventListener("change", (e) => {
    sort = e.target.value;
    render();
  });

  resetBtn?.addEventListener("click", () => {
    active = "All";
    search = "";
    sort = "featured";
    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "featured";
    filters?.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.toggle("active", b.dataset.cat === active);
    });
    render();
  });

  grid.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-project-open]");
    if (!openBtn) return;
    openModal(openBtn.dataset.projectOpen);
  });

  modal?.addEventListener("click", (e) => {
    if (e.target.closest("[data-project-close]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!modal || modal.classList.contains("hidden")) return;
    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key !== "Tab") return;
    const focusables = getModalFocusables();
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  render();
});
