/* ================================================
   SAMAY — script.js
   Real-time world clock dashboard.
   ================================================ */

// ─── TIMEZONE → COORDINATES ─────────────────────
const TZ_COORDS = {
  "America/Los_Angeles":  [34.05, -118.24], "America/New_York":     [40.71,  -74.01],
  "America/Chicago":      [41.85,  -87.65], "America/Toronto":      [43.65,  -79.38],
  "America/Sao_Paulo":    [-23.55, -46.63], "America/Bogota":       [4.71,   -74.07],
  "America/Lima":         [-12.05, -77.04], "America/Santiago":     [-33.46, -70.65],
  "America/Argentina/Buenos_Aires": [-34.60, -58.38],
  "America/Mexico_City":  [19.43,  -99.13], "America/Denver":       [39.74, -104.99],
  "America/Phoenix":      [33.45, -112.07], "America/Vancouver":    [49.25, -123.12],
  "America/Anchorage":    [61.22, -149.90], "Pacific/Honolulu":     [21.31, -157.86],
  "Europe/London":        [51.51,   -0.13], "Europe/Paris":         [48.85,    2.35],
  "Europe/Berlin":        [52.52,   13.41], "Europe/Madrid":        [40.42,   -3.70],
  "Europe/Rome":          [41.90,   12.48], "Europe/Amsterdam":     [52.37,    4.90],
  "Europe/Stockholm":     [59.33,   18.07], "Europe/Zurich":        [47.38,    8.54],
  "Europe/Helsinki":      [60.17,   24.94], "Europe/Istanbul":      [41.01,   28.95],
  "Europe/Athens":        [37.98,   23.73], "Europe/Warsaw":        [52.23,   21.01],
  "Europe/Prague":        [50.08,   14.44], "Europe/Vienna":        [48.21,   16.37],
  "Europe/Brussels":      [50.85,    4.35], "Europe/Lisbon":        [38.72,   -9.14],
  "Europe/Oslo":          [59.91,   10.75], "Europe/Copenhagen":    [55.68,   12.57],
  "Europe/Kyiv":          [50.45,   30.52], "Europe/Moscow":        [55.75,   37.62],
  "Atlantic/Reykjavik":   [64.13,  -21.82], "Africa/Cairo":         [30.06,   31.25],
  "Africa/Lagos":         [6.52,     3.38], "Africa/Nairobi":       [-1.29,   36.82],
  "Africa/Johannesburg":  [-26.20,  28.05], "Africa/Accra":         [5.55,    -0.20],
  "Africa/Casablanca":    [33.59,   -7.62], "Africa/Algiers":       [36.74,    3.06],
  "Africa/Dakar":         [14.69,  -17.44], "Africa/Dar_es_Salaam": [-6.79,   39.21],
  "Africa/Addis_Ababa":   [8.99,   38.75],  "Asia/Dubai":           [25.20,   55.27],
  "Asia/Riyadh":          [24.69,  46.72],  "Asia/Karachi":         [24.86,   67.01],
  "Asia/Kolkata":         [22.57,  88.36],  "Asia/Calcutta":        [22.57,   88.36],
  "Asia/Dhaka":           [23.72,  90.41],  "Asia/Bangkok":         [13.75,  100.52],
  "Asia/Jakarta":         [-6.21, 106.85],  "Asia/Singapore":       [1.35,   103.82],
  "Asia/Kuala_Lumpur":    [3.14,  101.69],  "Asia/Hong_Kong":       [22.32,  114.17],
  "Asia/Shanghai":        [31.23, 121.47],  "Asia/Seoul":           [37.57,  126.98],
  "Asia/Tokyo":           [35.69, 139.69],  "Asia/Taipei":          [25.04,  121.56],
  "Asia/Jerusalem":       [31.77,  35.22],  "Asia/Baghdad":         [33.34,   44.40],
  "Asia/Tehran":          [35.69,  51.42],  "Asia/Baku":            [40.41,   49.87],
  "Asia/Tashkent":        [41.30,  69.24],  "Asia/Almaty":          [43.26,   76.95],
  "Asia/Ulaanbaatar":     [47.91, 106.88],  "Asia/Ho_Chi_Minh":     [10.82,  106.63],
  "Asia/Phnom_Penh":      [11.56, 104.92],  "Asia/Rangoon":         [16.87,   96.19],
  "Asia/Kathmandu":       [27.70,  85.32],  "Asia/Colombo":         [6.93,    79.85],
  "Asia/Kabul":           [34.53,  69.17],  "Australia/Sydney":     [-33.87, 151.21],
  "Australia/Melbourne":  [-37.81,144.96],  "Australia/Brisbane":   [-27.47, 153.03],
  "Pacific/Auckland":     [-36.87,174.77],
};

// ─── CITY DATABASE ───────────────────────────────
const CITY_DB = [
  { name: "Los Angeles",   country: "USA",          tz: "America/Los_Angeles"  },
  { name: "New York",      country: "USA",           tz: "America/New_York"     },
  { name: "Chicago",       country: "USA",           tz: "America/Chicago"      },
  { name: "Toronto",       country: "Canada",        tz: "America/Toronto"      },
  { name: "São Paulo",     country: "Brazil",        tz: "America/Sao_Paulo"    },
  { name: "London",        country: "UK",            tz: "Europe/London"        },
  { name: "Paris",         country: "France",        tz: "Europe/Paris"         },
  { name: "Berlin",        country: "Germany",       tz: "Europe/Berlin"        },
  { name: "Madrid",        country: "Spain",         tz: "Europe/Madrid"        },
  { name: "Rome",          country: "Italy",         tz: "Europe/Rome"          },
  { name: "Amsterdam",     country: "Netherlands",   tz: "Europe/Amsterdam"     },
  { name: "Stockholm",     country: "Sweden",        tz: "Europe/Stockholm"     },
  { name: "Zurich",        country: "Switzerland",   tz: "Europe/Zurich"        },
  { name: "Helsinki",      country: "Finland",       tz: "Europe/Helsinki"      },
  { name: "Istanbul",      country: "Turkey",        tz: "Europe/Istanbul"      },
  { name: "Athens",        country: "Greece",        tz: "Europe/Athens"        },
  { name: "Warsaw",        country: "Poland",        tz: "Europe/Warsaw"        },
  { name: "Vienna",        country: "Austria",       tz: "Europe/Vienna"        },
  { name: "Prague",        country: "Czech Rep.",    tz: "Europe/Prague"        },
  { name: "Brussels",      country: "Belgium",       tz: "Europe/Brussels"      },
  { name: "Lisbon",        country: "Portugal",      tz: "Europe/Lisbon"        },
  { name: "Oslo",          country: "Norway",        tz: "Europe/Oslo"          },
  { name: "Copenhagen",    country: "Denmark",       tz: "Europe/Copenhagen"    },
  { name: "Kyiv",          country: "Ukraine",       tz: "Europe/Kyiv"          },
  { name: "Moscow",        country: "Russia",        tz: "Europe/Moscow"        },
  { name: "Reykjavik",     country: "Iceland",       tz: "Atlantic/Reykjavik"   },
  { name: "Cairo",         country: "Egypt",         tz: "Africa/Cairo"         },
  { name: "Lagos",         country: "Nigeria",       tz: "Africa/Lagos"         },
  { name: "Nairobi",       country: "Kenya",         tz: "Africa/Nairobi"       },
  { name: "Johannesburg",  country: "South Africa",  tz: "Africa/Johannesburg"  },
  { name: "Accra",         country: "Ghana",         tz: "Africa/Accra"         },
  { name: "Casablanca",    country: "Morocco",       tz: "Africa/Casablanca"    },
  { name: "Dar es Salaam", country: "Tanzania",      tz: "Africa/Dar_es_Salaam" },
  { name: "Addis Ababa",   country: "Ethiopia",      tz: "Africa/Addis_Ababa"   },
  { name: "Dubai",         country: "UAE",           tz: "Asia/Dubai"           },
  { name: "Riyadh",        country: "Saudi Arabia",  tz: "Asia/Riyadh"          },
  { name: "Karachi",       country: "Pakistan",      tz: "Asia/Karachi"         },
  { name: "Mumbai",        country: "India",         tz: "Asia/Kolkata"         },
  { name: "Delhi",         country: "India",         tz: "Asia/Kolkata"         },
  { name: "Kolkata",       country: "India",         tz: "Asia/Kolkata"         },
  { name: "Bengaluru",     country: "India",         tz: "Asia/Kolkata"         },
  { name: "Chennai",       country: "India",         tz: "Asia/Kolkata"         },
  { name: "Dhaka",         country: "Bangladesh",    tz: "Asia/Dhaka"           },
  { name: "Bangkok",       country: "Thailand",      tz: "Asia/Bangkok"         },
  { name: "Jakarta",       country: "Indonesia",     tz: "Asia/Jakarta"         },
  { name: "Singapore",     country: "Singapore",     tz: "Asia/Singapore"       },
  { name: "Kuala Lumpur",  country: "Malaysia",      tz: "Asia/Kuala_Lumpur"    },
  { name: "Hong Kong",     country: "China",         tz: "Asia/Hong_Kong"       },
  { name: "Shanghai",      country: "China",         tz: "Asia/Shanghai"        },
  { name: "Beijing",       country: "China",         tz: "Asia/Shanghai"        },
  { name: "Seoul",         country: "South Korea",   tz: "Asia/Seoul"           },
  { name: "Tokyo",         country: "Japan",         tz: "Asia/Tokyo"           },
  { name: "Taipei",        country: "Taiwan",        tz: "Asia/Taipei"          },
  { name: "Sydney",        country: "Australia",     tz: "Australia/Sydney"     },
  { name: "Melbourne",     country: "Australia",     tz: "Australia/Melbourne"  },
  { name: "Brisbane",      country: "Australia",     tz: "Australia/Brisbane"   },
  { name: "Auckland",      country: "New Zealand",   tz: "Pacific/Auckland"     },
  { name: "Honolulu",      country: "USA",           tz: "Pacific/Honolulu"     },
  { name: "Anchorage",     country: "USA",           tz: "America/Anchorage"    },
  { name: "Denver",        country: "USA",           tz: "America/Denver"       },
  { name: "Phoenix",       country: "USA",           tz: "America/Phoenix"      },
  { name: "Seattle",       country: "USA",           tz: "America/Los_Angeles"  },
  { name: "Vancouver",     country: "Canada",        tz: "America/Vancouver"    },
  { name: "Mexico City",   country: "Mexico",        tz: "America/Mexico_City"  },
  { name: "Buenos Aires",  country: "Argentina",     tz: "America/Argentina/Buenos_Aires" },
  { name: "Santiago",      country: "Chile",         tz: "America/Santiago"     },
  { name: "Bogotá",        country: "Colombia",      tz: "America/Bogota"       },
  { name: "Lima",          country: "Peru",          tz: "America/Lima"         },
  { name: "Tel Aviv",      country: "Israel",        tz: "Asia/Jerusalem"       },
  { name: "Baghdad",       country: "Iraq",          tz: "Asia/Baghdad"         },
  { name: "Tehran",        country: "Iran",          tz: "Asia/Tehran"          },
  { name: "Kathmandu",     country: "Nepal",         tz: "Asia/Kathmandu"       },
  { name: "Colombo",       country: "Sri Lanka",     tz: "Asia/Colombo"         },
  { name: "Yangon",        country: "Myanmar",       tz: "Asia/Rangoon"         },
  { name: "Ho Chi Minh",   country: "Vietnam",       tz: "Asia/Ho_Chi_Minh"     },
  { name: "Phnom Penh",    country: "Cambodia",      tz: "Asia/Phnom_Penh"      },
  { name: "Almaty",        country: "Kazakhstan",    tz: "Asia/Almaty"          },
  { name: "Kabul",         country: "Afghanistan",   tz: "Asia/Kabul"           },
];

// ─── TZ NAME NORMALISATION ───────────────────────
const TZ_NAMES = {
  "Asia/Calcutta":  { name: "Kolkata",  country: "India"   },
  "Asia/Kolkata":   { name: "Kolkata",  country: "India"   },
  "Asia/Rangoon":   { name: "Yangon",   country: "Myanmar" },
};

// ─── SVG PERIOD ICONS ────────────────────────────
const ICON_MORNING = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 12h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M8 9a3 3 0 0 1 3 3H5a3 3 0 0 1 3-3z" fill="currentColor"/><line x1="8" y1="2" x2="8" y2="4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="3.5" y1="3.5" x2="4.9" y2="4.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="12.5" y1="3.5" x2="11.1" y2="4.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;

const ICON_DAY = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="currentColor"/><line x1="8" y1="1" x2="8" y2="3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="8" y1="13" x2="8" y2="15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="1" y1="8" x2="3" y2="8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="13" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="3.1" y1="3.1" x2="4.5" y2="4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="11.5" y1="11.5" x2="12.9" y2="12.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="12.9" y1="3.1" x2="11.5" y2="4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="4.5" y1="11.5" x2="3.1" y2="12.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;

const ICON_EVENING = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 11h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M8 8a3 3 0 0 1 3 3H5a3 3 0 0 1 3-3z" fill="currentColor"/><line x1="8" y1="1" x2="8" y2="3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="3.5" y1="3.5" x2="4.9" y2="4.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="12.5" y1="3.5" x2="11.1" y2="4.9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="1" y1="7" x2="3" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="13" y1="7" x2="15" y2="7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;

const ICON_NIGHT = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13.5 10A6 6 0 0 1 6.5 3a6.5 6.5 0 1 0 7 7z" fill="currentColor"/></svg>`;

// ─── STATE ───────────────────────────────────────
let is24h          = true;
let userTz         = Intl.DateTimeFormat().resolvedOptions().timeZone;
let userCityLabel  = "";   // "Name\nCountry" format
let displayTz      = userTz;
let displayLabel   = "";
let activeCityIdx  = null; // null = showing user's city
let pinnedCities   = JSON.parse(localStorage.getItem("samay_v2") || "null");

if (!pinnedCities) {
  pinnedCities = [
    { name: "New York",   country: "USA",     tz: "America/New_York"  },
    { name: "London",     country: "UK",      tz: "Europe/London"     },
    { name: "Dubai",      country: "UAE",     tz: "Asia/Dubai"        },
    { name: "Tokyo",      country: "Japan",   tz: "Asia/Tokyo"        },
  ];
}

// ─── HELPERS ─────────────────────────────────────
function getUTCOffset(tz) {
  try {
    const now  = new Date();
    const a    = new Date(now.toLocaleString("en-US", { timeZone: tz }));
    const b    = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
    const diff = Math.round((a - b) / 60000);
    const sign = diff >= 0 ? "+" : "−";
    const h    = Math.floor(Math.abs(diff) / 60);
    const m    = Math.abs(diff) % 60;
    return `UTC${sign}${h}${m ? ":" + String(m).padStart(2, "0") : ""}`;
  } catch { return "UTC"; }
}

function getHourInTz(tz) {
  const now = new Date();
  return +new Date(now.toLocaleString("en-US", { timeZone: tz })).getHours();
}

// Returns { time, ampm }
function getTzTime(tz, format24, includeSeconds = false) {
  const now  = new Date();
  const opts = {
    timeZone: tz,
    hour:   "2-digit",
    minute: "2-digit",
    ...(includeSeconds ? { second: "2-digit" } : {}),
    hour12: !format24,
  };
  const raw   = now.toLocaleTimeString("en-US", opts);
  if (!format24) {
    const m = raw.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s?(AM|PM)/);
    if (m) return { time: m[1], ampm: m[2] };
  }
  return { time: raw, ampm: "" };
}

function getDate(tz) {
  return new Date().toLocaleDateString("en-US", {
    timeZone: tz,
    weekday: "long",
    month:   "short",
    day:     "numeric",
    year:    "numeric",
  });
}

function getPeriod(hour) {
  if (hour >=  6 && hour < 12) return { label: "Morning", icon: ICON_MORNING };
  if (hour >= 12 && hour < 17) return { label: "Day",     icon: ICON_DAY     };
  if (hour >= 17 && hour < 20) return { label: "Evening", icon: ICON_EVENING };
  return                               { label: "Night",   icon: ICON_NIGHT   };
}

// Accurate sunrise/sunset (NOAA solar)
function getSunTimes(tz) {
  const now     = new Date();
  const coords  = TZ_COORDS[tz] || [0, 0];
  const lat     = coords[0], lon = coords[1];
  const doy     = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const decl    = 23.45 * Math.sin((Math.PI / 180) * (360 / 365) * (doy - 81));
  const declR   = decl  * (Math.PI / 180);
  const latR    = lat   * (Math.PI / 180);
  let   cosH    = -Math.tan(latR) * Math.tan(declR);
  cosH          = Math.max(-1, Math.min(1, cosH));
  const H       = Math.acos(cosH) * (180 / Math.PI);
  const B       = (360 / 365) * (doy - 81) * (Math.PI / 180);
  const EoT     = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  const tzDate  = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  const utcDate = new Date(now.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzOff   = (tzDate - utcDate) / 3600000;
  const noon    = 12 - (lon / 15 - tzOff) - EoT / 60;
  const rise    = noon - H / 15;
  const set     = noon + H / 15;

  const fmt = d => {
    const n = ((d % 24) + 24) % 24;
    const h = Math.floor(n), m = Math.round((n - h) * 60) % 60;
    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
  };
  const dur  = Math.max(0, set - rise);
  const dh   = Math.floor(dur), dm = Math.round((dur - dh) * 60);
  return { rise: fmt(rise), set: fmt(set), dur: `${dh}h ${dm}m` };
}

// ─── LOCATION DETECTION ──────────────────────────
function detectUserCity() {
  const tz = userTz;
  if (TZ_NAMES[tz]) {
    const { name, country } = TZ_NAMES[tz];
    userCityLabel = `${name}\n${country}`;
  } else {
    const match = CITY_DB.find(c => c.tz === tz);
    if (match) {
      userCityLabel = `${match.name}\n${match.country}`;
    } else {
      const parts = tz.split("/");
      userCityLabel = parts[parts.length - 1].replace(/_/g, " ");
    }
  }
  displayTz    = userTz;
  displayLabel = userCityLabel;
  renderLocation(userCityLabel);
}

function renderLocation(label) {
  const el    = document.getElementById("location-name");
  const parts = label.split("\n");
  if (parts.length >= 2) {
    const city    = parts[0].replace(/,+$/, "").trim();
    const country = parts.slice(1).join(" ").trim();
    el.innerHTML  = `${city},<br>${country}`;
  } else {
    el.textContent = label.replace(/,+$/, "").trim();
  }
}

// ─── MAIN CLOCK UPDATE ───────────────────────────
function updateClock() {
  const { time, ampm } = getTzTime(displayTz, is24h, true);
  const clockEl  = document.getElementById("main-clock");
  const ampmEl   = document.getElementById("clock-ampm");
  clockEl.textContent = time;
  ampmEl.textContent  = ampm;
  ampmEl.classList.toggle("visible", !!ampm);

  document.getElementById("date-str").textContent = getDate(displayTz);
  document.getElementById("tz-label").textContent  = getUTCOffset(displayTz);
}

// ─── CITY CARDS ──────────────────────────────────
function cardTimeHTML(tz) {
  const { time, ampm } = getTzTime(tz, is24h);
  return ampm
    ? `${time}<span class="card-ampm">${ampm}</span>`
    : time;
}

function renderCards() {
  const wrap = document.getElementById("cards");
  wrap.innerHTML = "";

  pinnedCities.forEach((city, idx) => {
    const isActive = (activeCityIdx === idx);
    const hour     = getHourInTz(city.tz);
    const period   = getPeriod(hour);
    const utcOff   = getUTCOffset(city.tz);

    const card     = document.createElement("div");
    card.className = "city-card" + (isActive ? " active-card" : "");

    card.innerHTML = `
      <div class="card-header">
        <div>
          <div class="card-city-name">${city.name}</div>
          <div class="card-utc">${utcOff}</div>
        </div>
        <button class="card-remove" title="Remove ${city.name}" data-idx="${idx}">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="card-footer">
        <div class="card-time">${cardTimeHTML(city.tz)}</div>
      </div>
    `;

    // Remove button
    card.querySelector(".card-remove").addEventListener("click", e => {
      e.stopPropagation();
      removeCity(idx);
    });

    // Card click → update main section
    card.addEventListener("click", () => {
      if (activeCityIdx === idx) {
        // Deactivate: revert to user's city
        activeCityIdx = null;
        displayTz     = userTz;
        displayLabel  = userCityLabel;
        renderLocation(userCityLabel);
      } else {
        activeCityIdx = idx;
        displayTz     = city.tz;
        displayLabel  = `${city.name}\n${city.country}`;
        renderLocation(displayLabel);
      }
      updateClock();
      renderCards();
      persist();
    });

    wrap.appendChild(card);
  });

  updateScrollbar();
}

// ─── CUSTOM SCROLLBAR LOGIC ──────────────────────
function updateScrollbar() {
  const cards = document.getElementById("cards");
  const track = document.getElementById("scroll-track");
  const thumb = document.getElementById("scroll-thumb");

  if (!cards || !track || !thumb) return;

  const scrollWidth = cards.scrollWidth;
  const clientWidth = cards.clientWidth;

  if (scrollWidth <= clientWidth) {
    track.style.display = "none";
    return;
  }

  track.style.display = "block";
  const trackWidth = track.clientWidth;
  const thumbWidth = Math.max(48, (clientWidth / scrollWidth) * trackWidth);
  thumb.style.width = `${thumbWidth}px`;

  const scrollLeft = cards.scrollLeft;
  const maxScroll = scrollWidth - clientWidth;
  const maxThumbLeft = trackWidth - thumbWidth;
  const thumbLeft = (scrollLeft / maxScroll) * maxThumbLeft;
  thumb.style.left = `${thumbLeft}px`;
}

let isDraggingThumb = false;
let startX = 0;
let startThumbLeft = 0;

function initScrollbar() {
  const cards = document.getElementById("cards");
  const track = document.getElementById("scroll-track");
  const thumb = document.getElementById("scroll-thumb");

  if (!cards || !track || !thumb) return;

  cards.addEventListener("scroll", updateScrollbar);
  window.addEventListener("resize", updateScrollbar);

  thumb.addEventListener("mousedown", e => {
    isDraggingThumb = true;
    startX = e.clientX;
    startThumbLeft = parseFloat(thumb.style.left) || 0;
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", e => {
    if (!isDraggingThumb) return;

    const deltaX = e.clientX - startX;
    const trackWidth = track.clientWidth;
    const thumbWidth = thumb.clientWidth;
    const maxThumbLeft = trackWidth - thumbWidth;

    let newThumbLeft = startThumbLeft + deltaX;
    newThumbLeft = Math.max(0, Math.min(newThumbLeft, maxThumbLeft));

    const scrollWidth = cards.scrollWidth;
    const clientWidth = cards.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    const scrollPercentage = newThumbLeft / maxThumbLeft;
    cards.scrollLeft = scrollPercentage * maxScroll;
  });

  document.addEventListener("mouseup", () => {
    isDraggingThumb = false;
    document.body.style.userSelect = "";
  });

  // Click on track to jump
  track.addEventListener("click", e => {
    if (e.target === thumb) return;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const thumbWidth = thumb.clientWidth;
    const centerThumbX = clickX - thumbWidth / 2;

    const maxThumbLeft = track.clientWidth - thumbWidth;
    const scrollPercentage = Math.max(0, Math.min(centerThumbX / maxThumbLeft, 1));

    const scrollWidth = cards.scrollWidth;
    const clientWidth = cards.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    cards.scrollLeft = scrollPercentage * maxScroll;
  });
}

function updateCardTimes() {
  const cards = document.querySelectorAll(".city-card");
  cards.forEach((card, idx) => {
    const city   = pinnedCities[idx];
    if (!city) return;
    const timeEl = card.querySelector(".card-time");
    if (timeEl) timeEl.innerHTML = cardTimeHTML(city.tz);
  });
}

// ─── FORMAT TOGGLE ───────────────────────────────
function setFormat(h) {
  is24h = (h === 24);
  document.getElementById("btn12").classList.toggle("active", !is24h);
  document.getElementById("btn24").classList.toggle("active",  is24h);
  updateClock();
  renderCards();
}

// ─── REMOVE / PERSIST ────────────────────────────
function removeCity(idx) {
  if (activeCityIdx === idx) {
    activeCityIdx = null;
    displayTz     = userTz;
    displayLabel  = userCityLabel;
    renderLocation(userCityLabel);
    updateClock();
  } else if (activeCityIdx !== null && activeCityIdx > idx) {
    activeCityIdx--;
  }
  pinnedCities.splice(idx, 1);
  renderCards();
  persist();
}

function persist() {
  localStorage.setItem("samay_v2", JSON.stringify(pinnedCities));
}

function addCity(name, country, tz) {
  const exists = pinnedCities.some(
    c => c.name === name && c.tz === tz
  );
  if (!exists) {
    pinnedCities.push({ name, country, tz });
    renderCards();
    persist();
  }
}

// ─── MODAL ───────────────────────────────────────
function openModal() {
  const overlay = document.getElementById("modal-overlay");
  overlay.classList.add("open");
  const input = document.getElementById("modal-input");
  input.value = "";
  renderModalList("");
  setTimeout(() => input.focus(), 40);
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById("modal-overlay")) closeModal();
}

function renderModalList(query) {
  const wrap = document.getElementById("modal-list");
  wrap.innerHTML = "";

  const q        = query.toLowerCase().trim();
  const filtered = q.length === 0
    ? CITY_DB.slice(0, 35)
    : CITY_DB.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.tz.toLowerCase().includes(q)
      ).slice(0, 40);

  if (filtered.length === 0) {
    wrap.innerHTML = `<div class="modal-empty">No cities found for "${query}"</div>`;
    return;
  }

  filtered.forEach(city => {
    const added = pinnedCities.some(p => p.name === city.name && p.tz === city.tz);
    const item  = document.createElement("div");
    item.className = "modal-item";
    item.innerHTML = `
      <div class="modal-item-info">
        <div class="modal-item-name">${city.name}</div>
        <div class="modal-item-country">${city.country}</div>
      </div>
      <div class="modal-item-meta">
        <span class="modal-item-tz">${getUTCOffset(city.tz)}</span>
        <button
          class="modal-add-btn ${added ? "added" : ""}"
          data-name="${city.name}"
          data-country="${city.country}"
          data-tz="${city.tz}"
          ${added ? "disabled" : ""}
        >${added ? "Added" : "Add"}</button>
      </div>
    `;
    if (!added) {
      item.querySelector(".modal-add-btn").addEventListener("click", () => {
        addCity(city.name, city.country, city.tz);
        renderModalList(document.getElementById("modal-input").value);
      });
    }
    wrap.appendChild(item);
  });
}

document.getElementById("modal-input").addEventListener("input", e => {
  renderModalList(e.target.value);
});

// ─── NAV SEARCH (quick-add dropdown) ─────────────
function initNavSearch() {
  const input    = document.getElementById("search-input");
  const dropdown = document.getElementById("search-dropdown");

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { dropdown.classList.remove("open"); dropdown.innerHTML = ""; return; }

    const hits = CITY_DB.filter(c =>
      c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
    ).slice(0, 7);

    if (!hits.length) { dropdown.classList.remove("open"); return; }

    dropdown.innerHTML = hits.map(c => `
      <div class="dropdown-item"
           data-name="${c.name}" data-country="${c.country}" data-tz="${c.tz}">
        ${c.name}
        <span class="dropdown-item-sub">${c.country} · ${getUTCOffset(c.tz)}</span>
      </div>
    `).join("");

    dropdown.querySelectorAll(".dropdown-item").forEach(el => {
      el.addEventListener("click", () => {
        addCity(el.dataset.name, el.dataset.country, el.dataset.tz);
        input.value = "";
        dropdown.classList.remove("open");
        dropdown.innerHTML = "";
      });
    });

    dropdown.classList.add("open");
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".search-box")) {
      dropdown.classList.remove("open");
    }
  });
}

// ─── KEYBOARD ────────────────────────────────────
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// ─── TICK ────────────────────────────────────────
function tick() {
  updateClock();
  updateCardTimes();
}

// ─── BOOT ────────────────────────────────────────
(function init() {
  detectUserCity();
  updateClock();
  renderCards();
  initNavSearch();
  initScrollbar();
  setInterval(tick, 1000);
})();