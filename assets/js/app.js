// VNBD Website JavaScript

// Global state
let allMembers = [];
let filteredMembers = [];
let currentFilters = {
  search: '',
  focusAreas: [],
  roleType: 'all',
  district: 'all',
  sort: 'newest',
  showLimited: true
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Set active navigation
  setActiveNavigation();
  
  // Mobile menu toggle
  setupMobileMenu();
  
  // Initialize members page if on members.html
  if (window.location.pathname.includes('members.html')) {
    initializeMembersPage();
  }
});

// ============================================
// Navigation
// ============================================
function setActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.site-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function setupMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.site-nav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
}

// ============================================
// Members Page Initialization
// ============================================
async function initializeMembersPage() {
  // Load URL parameters
  loadFiltersFromURL();
  
  // Setup filter event listeners
  setupFilterListeners();
  
  // Load members data
  await loadMembers();
}

// ============================================
// Load Members Data
// ============================================
async function loadMembers() {
  try {
    const response = await fetch('/assets/data/members.json');
    if (!response.ok) {
      throw new Error('Failed to load members data');
    }
    
    const data = await response.json();
    allMembers = data.members;
    
    // Build focus areas filter
    buildFocusAreaChipsFromData();
    
    // Build district filter
    buildDistrictFilter();
    
    // Apply initial filters and render
    applyMembersFilters();
    
  } catch (error) {
    console.error('Error loading members:', error);
    showLoadingError();
  }
}

// ============================================
// Build Dynamic Filters
// ============================================
function buildFocusAreaChipsFromData() {
  const focusAreasSet = new Set();
  
  allMembers.forEach(member => {
    member.focus_areas.forEach(area => {
      focusAreasSet.add(area);
    });
  });
  
  const focusAreasArray = Array.from(focusAreasSet).sort();
  const container = document.getElementById('focus-areas-chips');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  focusAreasArray.forEach(area => {
    const chip = document.createElement('div');
    chip.className = 'focus-chip';
    chip.textContent = formatFocusArea(area);
    chip.dataset.value = area;
    chip.setAttribute('role', 'checkbox');
    chip.setAttribute('aria-checked', 'false');
    chip.setAttribute('tabindex', '0');
    
    // Click handler
    chip.addEventListener('click', () => toggleFocusChip(chip, area));
    
    // Keyboard handler
    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFocusChip(chip, area);
      }
    });
    
    container.appendChild(chip);
  });
}

function buildDistrictFilter() {
  const districtsSet = new Set();
  
  allMembers.forEach(member => {
    districtsSet.add(member.district);
  });
  
  const districtsArray = Array.from(districtsSet).sort();
  const select = document.getElementById('district-filter');
  
  if (!select) return;
  
  // Clear existing options except first
  select.innerHTML = '<option value="all">All districts</option>';
  
  districtsArray.forEach(district => {
    const option = document.createElement('option');
    option.value = district;
    option.textContent = district;
    select.appendChild(option);
  });
}

function toggleFocusChip(chip, area) {
  chip.classList.toggle('active');
  const isActive = chip.classList.contains('active');
  chip.setAttribute('aria-checked', isActive ? 'true' : 'false');
  
  if (isActive) {
    currentFilters.focusAreas.push(area);
  } else {
    currentFilters.focusAreas = currentFilters.focusAreas.filter(a => a !== area);
  }
  
  applyMembersFilters();
}

function formatFocusArea(area) {
  return area.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// ============================================
// Filter Setup
// ============================================
function setupFilterListeners() {
  // Search input
  const searchInput = document.getElementById('search-filter');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentFilters.search = e.target.value.toLowerCase();
        applyMembersFilters();
      }, 300);
    });
  }
  
  // Role type filter
  const roleFilter = document.getElementById('role-filter');
  if (roleFilter) {
    roleFilter.addEventListener('change', (e) => {
      currentFilters.roleType = e.target.value;
      applyMembersFilters();
    });
  }
  
  // District filter
  const districtFilter = document.getElementById('district-filter');
  if (districtFilter) {
    districtFilter.addEventListener('change', (e) => {
      currentFilters.district = e.target.value;
      applyMembersFilters();
    });
  }
  
  // Sort filter
  const sortFilter = document.getElementById('sort-filter');
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      currentFilters.sort = e.target.value;
      applyMembersFilters();
    });
  }
  
  // Show limited toggle
  const limitedToggle = document.getElementById('show-limited-toggle');
  if (limitedToggle) {
    limitedToggle.addEventListener('change', (e) => {
      currentFilters.showLimited = e.target.checked;
      applyMembersFilters();
    });
  }
}

// ============================================
// Apply Filters and Render
// ============================================
function applyMembersFilters() {
  filteredMembers = allMembers.filter(member => {
    // Search filter
    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      const nameMatch = member.name.toLowerCase().includes(searchLower);
      const districtMatch = member.district.toLowerCase().includes(searchLower);
      if (!nameMatch && !districtMatch) return false;
    }
    
    // Focus areas filter (AND logic)
    if (currentFilters.focusAreas.length > 0) {
      const hasAllAreas = currentFilters.focusAreas.every(area => 
        member.focus_areas.includes(area)
      );
      if (!hasAllAreas) return false;
    }
    
    // Role type filter
    if (currentFilters.roleType !== 'all') {
      if (member.role_type !== currentFilters.roleType) return false;
    }
    
    // District filter
    if (currentFilters.district !== 'all') {
      if (member.district !== currentFilters.district) return false;
    }
    
    // Limited visibility filter
    if (!currentFilters.showLimited) {
      if (member.visibility === 'limited') return false;
    }
    
    return true;
  });
  
  // Sort filtered members
  sortMembers();
  
  // Update URL
  updateURLParams();
  
  // Render grid
  renderMembersGrid();
}

function sortMembers() {
  const sortType = currentFilters.sort;
  
  filteredMembers.sort((a, b) => {
    if (sortType === 'newest') {
      return new Date(b.join_date) - new Date(a.join_date);
    } else if (sortType === 'oldest') {
      return new Date(a.join_date) - new Date(b.join_date);
    } else if (sortType === 'a-z') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });
}

// ============================================
// Render Members Grid
// ============================================
function renderMembersGrid() {
  const grid = document.getElementById('members-grid');
  if (!grid) return;
  
  // Clear grid
  grid.innerHTML = '';
  
  if (filteredMembers.length === 0) {
    showNoResults(grid);
    return;
  }
  
  // Render each member card
  filteredMembers.forEach(member => {
    const card = createMemberCard(member);
    grid.appendChild(card);
  });
}

function createMemberCard(member) {
  const card = document.createElement('div');
  card.className = 'member-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `View profile of ${member.name}, ${member.role_type}`);
  
  // Avatar
  const avatar = document.createElement('img');
  avatar.className = 'member-avatar';
  avatar.alt = `${member.name} avatar`;
  
  if (member.photo) {
    avatar.src = member.photo;
    avatar.onerror = () => {
      avatar.src = generateInitialAvatar(member.name);
    };
  } else {
    avatar.src = generateInitialAvatar(member.name);
  }
  
  // Name (handle limited profiles)
  const displayName = member.visibility === 'limited' 
    ? abbreviateName(member.name) 
    : member.name;
  
  const name = document.createElement('h3');
  name.className = 'member-name';
  name.textContent = displayName;
  
  // Role badge
  const roleBadge = document.createElement('span');
  roleBadge.className = `role-badge ${getRoleBadgeClass(member.role_type)}`;
  roleBadge.textContent = member.role_type;
  
  // District
  const district = document.createElement('p');
  district.className = 'member-district';
  district.textContent = member.district;
  
  // Focus areas
  const focusAreasDiv = document.createElement('div');
  focusAreasDiv.className = 'member-focus-areas';
  
  const displayAreas = member.focus_areas.slice(0, 3);
  displayAreas.forEach(area => {
    const tag = document.createElement('span');
    tag.className = 'focus-tag';
    tag.textContent = formatFocusArea(area);
    focusAreasDiv.appendChild(tag);
  });
  
  if (member.focus_areas.length > 3) {
    const more = document.createElement('span');
    more.className = 'focus-tag';
    more.textContent = `+${member.focus_areas.length - 3} more`;
    focusAreasDiv.appendChild(more);
  }
  
  // Bio (truncate for limited profiles)
  const bio = document.createElement('p');
  bio.className = 'member-bio';
  const maxLength = member.visibility === 'limited' ? 60 : 120;
  bio.textContent = member.bio.length > maxLength 
    ? member.bio.substring(0, maxLength) + '...' 
    : member.bio;
  
  // Join date
  const joinDate = document.createElement('p');
  joinDate.className = 'join-date';
  joinDate.textContent = formatJoinDate(member.join_date);
  
  // Auto badges
  const badges = generateAutoBadges(member);
  const badgesDiv = document.createElement('div');
  badgesDiv.className = 'auto-badges';
  badges.forEach(badge => {
    const badgeSpan = document.createElement('span');
    badgeSpan.className = `auto-badge ${badge.class}`;
    badgeSpan.textContent = badge.text;
    badgesDiv.appendChild(badgeSpan);
  });
  
  // Limited profile label
  let limitedLabel = null;
  if (member.visibility === 'limited') {
    limitedLabel = document.createElement('span');
    limitedLabel.className = 'limited-label';
    limitedLabel.textContent = 'Limited profile';
  }
  
  // Assemble card
  card.appendChild(avatar);
  card.appendChild(name);
  card.appendChild(roleBadge);
  card.appendChild(district);
  card.appendChild(focusAreasDiv);
  card.appendChild(bio);
  card.appendChild(joinDate);
  if (badges.length > 0) {
    card.appendChild(badgesDiv);
  }
  if (limitedLabel) {
    card.appendChild(limitedLabel);
  }
  
  // Click handler
  card.addEventListener('click', () => openMemberModal(member.id));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openMemberModal(member.id);
    }
  });
  
  return card;
}

// ============================================
// Helper Functions
// ============================================
function abbreviateName(fullName) {
  const parts = fullName.split(' ');
  if (parts.length === 1) return fullName;
  
  const firstName = parts[0];
  const lastInitial = parts[parts.length - 1].charAt(0);
  return `${firstName} ${lastInitial}.`;
}

function getRoleBadgeClass(roleType) {
  return roleType.toLowerCase().replace(/\s+/g, '-');
}

function formatJoinDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long' };
  return `Joined ${date.toLocaleDateString('en-GB', options)}`;
}

function generateAutoBadges(member) {
  const badges = [];
  const joinDate = new Date(member.join_date);
  const now = new Date();
  const daysSinceJoin = Math.floor((now - joinDate) / (1000 * 60 * 60 * 24));
  
  // Active Contributor (joined within 120 days)
  if (daysSinceJoin <= 120) {
    badges.push({ class: 'active-contributor', text: 'Active Contributor' });
  }
  
  // Community Builder (3+ focus areas)
  if (member.focus_areas.length >= 3) {
    badges.push({ class: 'community-builder', text: 'Community Builder' });
  }
  
  // Steward (Core Team or Moderator)
  if (member.role_type === 'Core Team' || member.role_type === 'Moderator') {
    badges.push({ class: 'steward', text: 'Steward' });
  }
  
  return badges;
}

// Avatar generation cache
const avatarCache = {};

function generateInitialAvatar(name) {
  if (avatarCache[name]) {
    return avatarCache[name];
  }
  
  const initial = name.charAt(0).toUpperCase();
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  // Green background
  ctx.fillStyle = '#2D8659';
  ctx.fillRect(0, 0, 200, 200);
  
  // White text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 100px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initial, 100, 100);
  
  const dataURL = canvas.toDataURL();
  avatarCache[name] = dataURL;
  return dataURL;
}

// ============================================
// Member Modal
// ============================================
function openMemberModal(memberId) {
  const member = allMembers.find(m => m.id === memberId);
  if (!member) return;
  
  const modal = document.getElementById('member-modal');
  const overlay = document.getElementById('modal-overlay');
  
  if (!modal || !overlay) return;
  
  // Populate modal
  populateModal(member);
  
  // Show modal
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Focus management
  const closeButton = modal.querySelector('.modal-close');
  if (closeButton) {
    closeButton.focus();
  }
  
  // Setup close handlers
  setupModalCloseHandlers(overlay, modal);
}

function populateModal(member) {
  const modal = document.getElementById('member-modal');
  
  // Avatar
  const avatar = modal.querySelector('.modal-avatar');
  if (avatar) {
    if (member.photo) {
      avatar.src = member.photo;
      avatar.onerror = () => {
        avatar.src = generateInitialAvatar(member.name);
      };
    } else {
      avatar.src = generateInitialAvatar(member.name);
    }
    avatar.alt = `${member.name} avatar`;
  }
  
  // Name (always show full name in modal)
  const name = modal.querySelector('.modal-name');
  if (name) {
    name.textContent = member.name;
  }
  
  // Role badge
  const roleBadge = modal.querySelector('.modal-role-badge');
  if (roleBadge) {
    roleBadge.className = `role-badge ${getRoleBadgeClass(member.role_type)}`;
    roleBadge.textContent = member.role_type;
  }
  
  // Bio
  const bio = modal.querySelector('.modal-bio');
  if (bio) {
    bio.textContent = member.bio;
  }
  
  // District
  const district = modal.querySelector('.modal-district');
  if (district) {
    district.textContent = member.district;
  }
  
  // Focus areas
  const focusAreasContainer = modal.querySelector('.modal-focus-areas');
  if (focusAreasContainer) {
    focusAreasContainer.innerHTML = '';
    member.focus_areas.forEach(area => {
      const tag = document.createElement('span');
      tag.className = 'focus-tag';
      tag.textContent = formatFocusArea(area);
      focusAreasContainer.appendChild(tag);
    });
  }
  
  // Join date
  const joinDate = modal.querySelector('.modal-join-date');
  if (joinDate) {
    joinDate.textContent = formatJoinDate(member.join_date);
  }
  
  // Social links (only if public and links exist)
  const socialContainer = modal.querySelector('.modal-social-links');
  if (socialContainer) {
    socialContainer.innerHTML = '';
    
    if (member.visibility === 'public') {
      const hasLinks = member.social.facebook || member.social.linkedin || member.social.website;
      
      if (hasLinks) {
        const socialSection = modal.querySelector('.modal-social-section');
        if (socialSection) {
          socialSection.style.display = 'block';
        }
        
        if (member.social.facebook) {
          const link = createSocialLink('Facebook', member.social.facebook, '📘');
          socialContainer.appendChild(link);
        }
        
        if (member.social.linkedin) {
          const link = createSocialLink('LinkedIn', member.social.linkedin, '💼');
          socialContainer.appendChild(link);
        }
        
        if (member.social.website) {
          const link = createSocialLink('Website', member.social.website, '🌐');
          socialContainer.appendChild(link);
        }
      } else {
        const socialSection = modal.querySelector('.modal-social-section');
        if (socialSection) {
          socialSection.style.display = 'none';
        }
      }
    } else {
      const socialSection = modal.querySelector('.modal-social-section');
      if (socialSection) {
        socialSection.style.display = 'none';
      }
    }
  }
}

function createSocialLink(platform, url, icon) {
  const link = document.createElement('a');
  link.href = url;
  link.className = 'social-link';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.innerHTML = `<span>${icon}</span> ${platform}`;
  return link;
}

function setupModalCloseHandlers(overlay, modal) {
  // Close button
  const closeButton = modal.querySelector('.modal-close');
  if (closeButton) {
    closeButton.onclick = () => closeModal(overlay);
  }
  
  // Click outside
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      closeModal(overlay);
    }
  };
  
  // Escape key
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal(overlay);
      document.removeEventListener('keydown', escapeHandler);
    }
  };
  document.addEventListener('keydown', escapeHandler);
  
  // Focus trap
  setupFocusTrap(modal);
}

function closeModal(overlay) {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function setupFocusTrap(modal) {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}

// ============================================
// URL Parameter Management
// ============================================
function updateURLParams() {
  const params = new URLSearchParams();
  
  if (currentFilters.search) {
    params.set('search', currentFilters.search);
  }
  
  if (currentFilters.focusAreas.length > 0) {
    params.set('focus', currentFilters.focusAreas.join(','));
  }
  
  if (currentFilters.roleType !== 'all') {
    params.set('role', currentFilters.roleType);
  }
  
  if (currentFilters.district !== 'all') {
    params.set('district', currentFilters.district);
  }
  
  if (currentFilters.sort !== 'newest') {
    params.set('sort', currentFilters.sort);
  }
  
  if (!currentFilters.showLimited) {
    params.set('showLimited', 'false');
  }
  
  const newURL = params.toString() 
    ? `${window.location.pathname}?${params.toString()}` 
    : window.location.pathname;
  
  window.history.replaceState({}, '', newURL);
}

function loadFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  
  // Search
  const search = params.get('search');
  if (search) {
    currentFilters.search = search;
    const searchInput = document.getElementById('search-filter');
    if (searchInput) searchInput.value = search;
  }
  
  // Focus areas
  const focus = params.get('focus');
  if (focus) {
    currentFilters.focusAreas = focus.split(',');
  }
  
  // Role type
  const role = params.get('role');
  if (role) {
    currentFilters.roleType = role;
    const roleFilter = document.getElementById('role-filter');
    if (roleFilter) roleFilter.value = role;
  }
  
  // District
  const district = params.get('district');
  if (district) {
    currentFilters.district = district;
    const districtFilter = document.getElementById('district-filter');
    if (districtFilter) districtFilter.value = district;
  }
  
  // Sort
  const sort = params.get('sort');
  if (sort) {
    currentFilters.sort = sort;
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) sortFilter.value = sort;
  }
  
  // Show limited
  const showLimited = params.get('showLimited');
  if (showLimited === 'false') {
    currentFilters.showLimited = false;
    const limitedToggle = document.getElementById('show-limited-toggle');
    if (limitedToggle) limitedToggle.checked = false;
  }
  
  // Activate focus chips after they're built
  setTimeout(() => {
    currentFilters.focusAreas.forEach(area => {
      const chip = document.querySelector(`.focus-chip[data-value="${area}"]`);
      if (chip) {
        chip.classList.add('active');
        chip.setAttribute('aria-checked', 'true');
      }
    });
  }, 100);
}

// ============================================
// UI States
// ============================================
function showNoResults(container) {
  container.innerHTML = `
    <div class="no-results">
      <h3>No members found</h3>
      <p>Try adjusting your filters to see more results.</p>
    </div>
  `;
}

function showLoadingError() {
  const grid = document.getElementById('members-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>Unable to load members</h3>
        <p>Please try refreshing the page.</p>
      </div>
    `;
  }
}
