// Shared helpers for the mock-up

function $(sel) {
  return document.querySelector(sel);
}

function setActiveNav(pageName) {
  const links = document.querySelectorAll("a.navlink");
  links.forEach(a => {
    if (a.dataset.page === pageName) a.classList.add("active");
  });
}

// Simple stub "auth"
function signInStub(email) {
  localStorage.setItem("aft_user", JSON.stringify({ email, signedInAt: new Date().toISOString() }));
}

function signOutStub() {
  localStorage.removeItem("aft_user");
}

function getUserStub() {
  const raw = localStorage.getItem("aft_user");
  return raw ? JSON.parse(raw) : null;
}
