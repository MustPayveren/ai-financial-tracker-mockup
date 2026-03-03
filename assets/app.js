// ===== Shared helpers for the mock-up =====

function $(sel) {
  return document.querySelector(sel);
}

function setActiveNav(pageName) {
  const links = document.querySelectorAll("a.navlink");
  links.forEach(a => {
    if (a.dataset.page === pageName) a.classList.add("active");
  });
}

// ===== Stub "auth" =====
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

// ===== Storage: Transactions =====
const TX_KEY = "aft_transactions_v1";

function getTransactions() {
  const raw = localStorage.getItem(TX_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveTransactions(txs) {
  localStorage.setItem(TX_KEY, JSON.stringify(txs));
}

function addTransaction(tx) {
  const txs = getTransactions();
  txs.unshift(tx); // newest first
  saveTransactions(txs);
}

function seedDemoDataIfEmpty() {
  const existing = getTransactions();
  if (existing.length > 0) return;

  const demo = [
    {
      id: crypto.randomUUID(),
      type: "expense",
      category: "Food",
      amount: 52.30,
      date: "2026-02-28",
      note: "Trader Joe's"
    },
    {
      id: crypto.randomUUID(),
      type: "income",
      category: "Paycheck",
      amount: 450.00,
      date: "2026-02-27",
      note: "Part-time job"
    },
    {
      id: crypto.randomUUID(),
      type: "expense",
      category: "Transport",
      amount: 18.75,
      date: "2026-02-26",
      note: "Subway"
    },
    {
      id: crypto.randomUUID(),
      type: "expense",
      category: "Shopping",
      amount: 39.99,
      date: "2026-02-25",
      note: "Amazon"
    }
  ];

  saveTransactions(demo);
}

// ===== Utilities =====
function formatMoney(n) {
  const num = Number(n) || 0;
  return num.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function safeDateLabel(isoDate) {
  // isoDate like "2026-02-28"
  if (!isoDate) return "—";
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
}

function monthKey(isoDate) {
  // returns "YYYY-MM"
  if (!isoDate) return "";
  return isoDate.slice(0, 7);
}

function currentMonthKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// ===== Calculations =====
function calcMonthlySummary(txs, yyyymm) {
  let income = 0;
  let expense = 0;

  for (const t of txs) {
    if (monthKey(t.date) !== yyyymm) continue;
    const amt = Number(t.amount) || 0;
    if (t.type === "income") income += amt;
    if (t.type === "expense") expense += amt;
  }

  return {
    income,
    expense,
    remaining: income - expense
  };
}

function calcCategoryTotals(txs, yyyymm) {
  const totals = {}; // {category: number}
  for (const t of txs) {
    if (t.type !== "expense") continue;
    if (monthKey(t.date) !== yyyymm) continue;
    const cat = t.category || "Other";
    const amt = Number(t.amount) || 0;
    totals[cat] = (totals[cat] || 0) + amt;
  }
  return totals;
}

function buildInsights(txs, yyyymm) {
  const summary = calcMonthlySummary(txs, yyyymm);
  const catTotals = calcCategoryTotals(txs, yyyymm);

  const entries = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
  const top = entries[0]; // [category, amount] or undefined

  const insights = [];

  if (summary.expense === 0 && summary.income === 0) {
    insights.push({
      title: "No data yet",
      text: "Add a few transactions to generate insights."
    });
    return insights;
  }

  if (top) {
    const [cat, amt] = top;
    const share = summary.expense > 0 ? (amt / summary.expense) : 0;

    let suggestion = "Try setting a small weekly limit and tracking it.";
    if (cat.toLowerCase() === "food") suggestion = "Meal-prepping once a week can help reduce food spending.";
    if (cat.toLowerCase() === "shopping") suggestion = "Try a 24-hour rule before buying non-essentials.";
    if (cat.toLowerCase() === "transport") suggestion = "Consider weekly/monthly transit passes if you commute often.";

    insights.push({
      title: "Top spending category",
      text: `You spent the most on ${cat} (${formatMoney(amt)}). ${share >= 0.4 ? "This is a large portion of your expenses. " : ""}${suggestion}`
    });
  }

  if (summary.remaining < 0) {
    insights.push({
      title: "Spending exceeds income",
      text: `You are over budget by ${formatMoney(Math.abs(summary.remaining))}. Consider reducing discretionary categories this month.`
    });
  } else {
    insights.push({
      title: "Budget health",
      text: `You currently have ${formatMoney(summary.remaining)} remaining this month. Nice!`
    });
  }

  return insights;
}