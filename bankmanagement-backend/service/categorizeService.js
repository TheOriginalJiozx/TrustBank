import stringSimilarity from "string-similarity";

let categories = {
  "Mad & Drikke": {
    priority: 1,
    companies: [
      { name: "Netto", regNo: "3348", accNo: "71920483" },
      { name: "Bilka", regNo: "3356", accNo: "48291037" },
      { name: "Føtex", regNo: "3362", accNo: "90347125" },
      { name: "Rema 1000", regNo: "3371", accNo: "12039487" },
      { name: "Lidl", regNo: "3380", accNo: "56473819" },
      { name: "Meny", regNo: "3394", accNo: "82746190" },
      { name: "Kvickly", regNo: "3402", accNo: "67582901" },
      { name: "Salling", regNo: "3410", accNo: "23871946" },
      { name: "SuperBrugsen", regNo: "3427", accNo: "49817205" },
      { name: "Dagli'Brugsen", regNo: "3433", accNo: "76190324" },
      { name: "Coop365", regNo: "3441", accNo: "38290561" },
      { name: "7-Eleven", regNo: "3458", accNo: "59103784" },
      { name: "Aldi", regNo: "3466", accNo: "70412895" }
    ]
  },

  "Transport": {
    priority: 2,
    companies: [
      { name: "DSB", regNo: "3301", accNo: "41237905" },
      { name: "Movia", regNo: "3312", accNo: "98041236" },
      { name: "Flixbus", regNo: "3324", accNo: "23098741" },
      { name: "Shell", regNo: "3335", accNo: "56429018" },
      { name: "Circle K", regNo: "3340", accNo: "71829340" },
      { name: "OK", regNo: "3345", accNo: "60519382" },
      { name: "Uno-X", regNo: "3350", accNo: "49182037" },
      { name: "Q8", regNo: "3358", accNo: "87321940" },
      { name: "SAS", regNo: "3368", accNo: "20938471" },
      { name: "Norwegian", regNo: "3374", accNo: "65490312" },
      { name: "Parkering", regNo: "3382", accNo: "32049856" },
      { name: "BroBizz", regNo: "3389", accNo: "49712038" },
      { name: "Taxa", regNo: "3398", accNo: "58103927" },
      { name: "Letbanen", regNo: "3405", accNo: "76429013" },
      { name: "Metroselskabet", regNo: "3414", accNo: "29581740" },
      { name: "FDM", regNo: "3420", accNo: "12837459" }
    ]
  },

  "Streaming & Abonnementer": {
    priority: 3,
    companies: [
      { name: "Netflix", regNo: "3501", accNo: "90381427" },
      { name: "Spotify", regNo: "3512", accNo: "47239018" },
      { name: "HBO", regNo: "3523", accNo: "56192037" },
      { name: "Max", regNo: "3534", accNo: "20837491" },
      { name: "Disney+", regNo: "3545", accNo: "67492013" },
      { name: "Viaplay", regNo: "3556", accNo: "39182740" },
      { name: "TV2 Play", regNo: "3567", accNo: "82039475" },
      { name: "YouSee", regNo: "3578", accNo: "49017263" },
      { name: "Tidal", regNo: "3589", accNo: "21739408" },
      { name: "Apple Music", regNo: "3596", accNo: "73509128" },
      { name: "Storytel", regNo: "3604", accNo: "64820391" },
      { name: "Podimo", regNo: "3613", accNo: "51928047" },
      { name: "Audible", regNo: "3622", accNo: "28419370" },
      { name: "C More", regNo: "3631", accNo: "90713245" }
    ]
  },

  "Bolig": {
    priority: 3,
    companies: [
      { name: "Husleje", regNo: "3701", accNo: "61920384" },
      { name: "Leje", regNo: "3712", accNo: "28371905" },
      { name: "Andelsbolig", regNo: "3723", accNo: "74029183" },
      { name: "Realkredit Danmark", regNo: "3734", accNo: "19384720" },
      { name: "Totalkredit", regNo: "3745", accNo: "58203917" },
      { name: "Ejendomsskat", regNo: "3756", accNo: "41720938" },
      { name: "Vand", regNo: "3767", accNo: "69031427" },
      { name: "Varme", regNo: "3778", accNo: "35281904" },
      { name: "El", regNo: "3789", accNo: "98041273" },
      { name: "Internet", regNo: "3796", accNo: "27039481" },
      { name: "TDC", regNo: "3804", accNo: "61327849" },
      { name: "Fibia", regNo: "3813", accNo: "94201736" },
      { name: "Stofa", regNo: "3822", accNo: "31749208" },
      { name: "EWII", regNo: "3831", accNo: "58017329" },
      { name: "Norlys", regNo: "3840", accNo: "72910384" },
      { name: "Andel Energi", regNo: "3859", accNo: "40692817" }
    ]
  },

  "Forsikringer": {
    priority: 4,
    companies: [
      { name: "Tryg", regNo: "3901", accNo: "82103947" },
      { name: "Topdanmark", regNo: "3912", accNo: "30491827" },
      { name: "GF Forsikring", regNo: "3923", accNo: "71928304" },
      { name: "Alm. Brand", regNo: "3934", accNo: "50291378" },
      { name: "If", regNo: "3945", accNo: "61920375" },
      { name: "Codan", regNo: "3956", accNo: "23740189" },
      { name: "Gjensidige", regNo: "3967", accNo: "48392017" },
      { name: "Bauta", regNo: "3978", accNo: "15029483" },
      { name: "Lærerstandens Brandforsikring", regNo: "3989", accNo: "92047361" },
      { name: "PenSam", regNo: "3996", accNo: "37481920" },
      { name: "Sygeforsikringen danmark", regNo: "3307", accNo: "64120938" }
    ]
  },

  "Sundhed & Medicin": {
    priority: 5,
    companies: [
      { name: "Apotek", regNo: "3401", accNo: "21904837" },
      { name: "Matas", regNo: "3412", accNo: "73029418" },
      { name: "Apopro", regNo: "3423", accNo: "49287013" },
      { name: "Sundhed", regNo: "3434", accNo: "81023947" },
      { name: "Læge", regNo: "3445", accNo: "30597182" },
      { name: "Tandlæge", regNo: "3456", accNo: "47819230" },
      { name: "Fysioterapi", regNo: "3467", accNo: "26389017" },
      { name: "Optiker", regNo: "3478", accNo: "59401283" },
      { name: "Synoptik", regNo: "3489", accNo: "13094728" },
      { name: "Louis Nielsen", regNo: "3496", accNo: "78209143" }
    ]
  },

  "Børn & Familie": {
    priority: 6,
    companies: [
      { name: "LEGO", regNo: "3601", accNo: "49170382" },
      { name: "BabySam", regNo: "3614", accNo: "30721948" },
      { name: "Name It", regNo: "3625", accNo: "57821904" },
      { name: "Kids-world", regNo: "3636", accNo: "92038471" },
      { name: "Børnetøj", regNo: "3647", accNo: "21483970" },
      { name: "Babysam", regNo: "3658", accNo: "64127039" },
      { name: "ToysRUs", regNo: "3669", accNo: "37290418" },
      { name: "Bog & Idé", regNo: "3672", accNo: "58923104" }
    ]
  },

  "Shopping & Tøj": {
    priority: 7,
    companies: [
      { name: "Zalando", regNo: "3702", accNo: "90417235" },
      { name: "Boozt", regNo: "3713", accNo: "61820394" },
      { name: "H&M", regNo: "3724", accNo: "27381904" },
      { name: "Magasin", regNo: "3735", accNo: "50219378" },
      { name: "Matas", regNo: "3746", accNo: "71920438" },
      { name: "Sportmaster", regNo: "3757", accNo: "38491027" },
      { name: "Nike", regNo: "3768", accNo: "82914036" },
      { name: "Adidas", regNo: "3779", accNo: "54029183" },
      { name: "Vero Moda", regNo: "3782", accNo: "61382749" },
      { name: "Only", regNo: "3793", accNo: "29471830" },
      { name: "Jack & Jones", regNo: "3806", accNo: "84720319" },
      { name: "Elgiganten", regNo: "3817", accNo: "93047218" },
      { name: "Power", regNo: "3828", accNo: "61239047" }
    ]
  },

  "Restaurant & Café": {
    priority: 8,
    companies: [
      { name: "McDonald's", regNo: "3902", accNo: "48120379" },
      { name: "Burger King", regNo: "3913", accNo: "70219438" },
      { name: "Sunset Boulevard", regNo: "3924", accNo: "31902748" },
      { name: "Joe & The Juice", regNo: "3935", accNo: "58027914" },
      { name: "Starbucks", regNo: "3946", accNo: "27190384" },
      { name: "Espresso House", regNo: "3957", accNo: "69042381" },
      { name: "Just Eat", regNo: "3968", accNo: "43019728" },
      { name: "Wolt", regNo: "3979", accNo: "81230947" },
      { name: "Hungry", regNo: "3982", accNo: "52917483" },
      { name: "Domino's", regNo: "3993", accNo: "70412938" },
      { name: "Café", regNo: "3304", accNo: "39027184" },
      { name: "Restaurant", regNo: "3315", accNo: "58120394" }
    ]
  },

  "Fritid & Underholdning": {
    priority: 9,
    companies: [
      { name: "Cinemaxx", regNo: "3403", accNo: "49271380" },
      { name: "Nordisk Film", regNo: "3416", accNo: "70319284" },
      { name: "Biograf", regNo: "3427", accNo: "21839470" },
      { name: "Fitness World", regNo: "3438", accNo: "67421903" },
      { name: "SATs", regNo: "3449", accNo: "39027418" },
      { name: "Loop Fitness", regNo: "3450", accNo: "58219307" },
      { name: "Museum", regNo: "3461", accNo: "71920384" },
      { name: "Teater", regNo: "3472", accNo: "23849017" },
      { name: "Eventim", regNo: "3483", accNo: "60917234" },
      { name: "Ticketmaster", regNo: "3494", accNo: "47019283" },
      { name: "GameStop", regNo: "3505", accNo: "83120947" }
    ]
  },

  "Rejser & Ferie": {
    priority: 10,
    companies: [
      { name: "Booking.com", regNo: "3602", accNo: "90217438" },
      { name: "Airbnb", regNo: "3615", accNo: "47129038" },
      { name: "Hotels.com", regNo: "3626", accNo: "38471290" },
      { name: "Expedia", regNo: "3637", accNo: "72019384" },
      { name: "Momondo", regNo: "3648", accNo: "21039487" },
      { name: "Travel", regNo: "3659", accNo: "59827103" },
      { name: "TUI", regNo: "3660", accNo: "37481902" },
      { name: "Apollo", regNo: "3671", accNo: "81923047" },
      { name: "Sunweb", regNo: "3682", accNo: "64729103" },
      { name: "SAS", regNo: "3693", accNo: "29104738" },
      { name: "Norwegian", regNo: "3704", accNo: "50318294" },
      { name: "FDM travel", regNo: "3715", accNo: "68290713" }
    ]
  },

  "Gaver & Donationer": {
    priority: 11,
    companies: [
      { name: "Gave", regNo: "3801", accNo: "71203948" },
      { name: "Donation", regNo: "3812", accNo: "42901387" },
      { name: "Røde Kors", regNo: "3823", accNo: "90317428" },
      { name: "UNICEF", regNo: "3834", accNo: "27190384" },
      { name: "WWF", regNo: "3845", accNo: "61420937" },
      { name: "Kræftens Bekæmpelse", regNo: "3856", accNo: "39827104" },
      { name: "Folkekirkens Nødhjælp", regNo: "3867", accNo: "57019238" },
      { name: "Unicef", regNo: "3878", accNo: "24930718" },
      { name: "Care Danmark", regNo: "3889", accNo: "80319247" }
    ]
  },

  "Uforudsete Udgifter": {
    priority: 12,
    companies: [
      { name: "Reparation", regNo: "3904", accNo: "61720394" },
      { name: "Værksted", regNo: "3915", accNo: "29481703" },
      { name: "Skade", regNo: "3926", accNo: "80312749" },
      { name: "Autohjælp", regNo: "3937", accNo: "57921034" },
      { name: "Tømrer", regNo: "3948", accNo: "21039458" },
      { name: "VVS", regNo: "3959", accNo: "47290318" },
      { name: "Elektriker", regNo: "3960", accNo: "63927104" },
      { name: "Låsesmed", regNo: "3971", accNo: "82130947" }
    ]
  },

  "Opsparing & Investering": {
    priority: 13,
    companies: [
      { name: "Nordnet", regNo: "4001", accNo: "90371248" },
      { name: "Saxo Investor", regNo: "4012", accNo: "49123708" },
      { name: "Lunar", regNo: "4023", accNo: "27481930" },
      { name: "Danske Invest", regNo: "4034", accNo: "61829304" },
      { name: "Aktie", regNo: "4045", accNo: "30721948" },
      { name: "Pension", regNo: "4056", accNo: "58921703" },
      { name: "Opsparing", regNo: "4067", accNo: "73048219" },
      { name: "Invester", regNo: "4078", accNo: "49283107" },
      { name: "ETF", regNo: "4089", accNo: "21690437" },
      { name: "BankInvest", regNo: "4096", accNo: "37492810" }
    ]
  },

  "Bonus & Provision": {
    priority: 14,
    companies: [
      { name: "Bonus", regNo: "4101", accNo: "82910473" },
      { name: "Cashback", regNo: "4112", accNo: "49027183" },
      { name: "Refusion", regNo: "4123", accNo: "71320948" },
      { name: "Lønbonus", regNo: "4134", accNo: "29017483" },
      { name: "Provision", regNo: "4145", accNo: "58120937" }
    ]
  },

  "SKAT & Afgifter": {
    priority: 15,
    companies: [
      { name: "SKAT", regNo: "4201", accNo: "90713240" },
      { name: "Told", regNo: "4212", accNo: "31827490" },
      { name: "Afgift", regNo: "4223", accNo: "62419038" },
      { name: "Bøde", regNo: "4234", accNo: "29108374" },
      { name: "Kommuneskat", regNo: "4245", accNo: "43019287" }
    ]
  },

  "Personlig pleje": {
    priority: 16,
    companies: [
      { name: "Frisør", regNo: "4302", accNo: "71920384" },
      { name: "Barber", regNo: "4313", accNo: "50817293" },
      { name: "Kosmetolog", regNo: "4324", accNo: "39027184" },
      { name: "Negle", regNo: "4335", accNo: "61429037" },
      { name: "Massage", regNo: "4346", accNo: "82719034" },
      { name: "Wellness", regNo: "4357", accNo: "20194738" },
      { name: "Hudpleje", regNo: "4368", accNo: "59203714" }
    ]
  },

  "Uddannelse & Kurser": {
    priority: 17,
    companies: [
      { name: "Kursus", regNo: "4401", accNo: "90327184" },
      { name: "Efteruddannelse", regNo: "4412", accNo: "47201938" },
      { name: "E-learning", regNo: "4423", accNo: "31827459" },
      { name: "Udannelse", regNo: "4434", accNo: "62918307" },
      { name: "MOOC", regNo: "4445", accNo: "74019238" },
      { name: "Coursera", regNo: "4456", accNo: "21904837" },
      { name: "edX", regNo: "4467", accNo: "58120943" },
      { name: "Studieskolen", regNo: "4478", accNo: "30721984" },
      { name: "UCplus", regNo: "4489", accNo: "49281703" }
    ]
  },

  "Løn og Indkomst": {
    priority: 18,
    companies: [
      { name: "Løn", regNo: "4501", accNo: "90127384" },
      { name: "SU", regNo: "4512", accNo: "47238109" },
      { name: "Kontanthjælp", regNo: "4523", accNo: "31827490" },
      { name: "Pension", regNo: "4534", accNo: "62419082" },
      { name: "Folkepension", regNo: "4545", accNo: "29108395" },
      { name: "Førtidspension", regNo: "4556", accNo: "43019265" },
      { name: "Dagpenge", regNo: "4567", accNo: "71920358" },
      { name: "Sygedagpenge", regNo: "4578", accNo: "50817294" }
    ]
  },
};

function normalize(text) {
  return text.toLowerCase();
}

function directMatch(description) {
    let matches = [];
    for (const [category, { companies, priority }] of Object.entries(categories)) {
        for (const company of companies) {
            if (description.includes(company.name.toLowerCase())) {
                matches.push({ category, priority });
                break;
            }
        }
    }
    if (matches.length === 0) return null;
    matches.sort((a, b) => a.priority - b.priority);
    return matches[0].category;
}

export function fuzzyMatch(description) {
    const desc = description.toLowerCase().replace(/[.,']/g, '');
    const words = desc.split(/\s+/);

    let bestCategory = null;
    let bestScore = 0;

    for (const [category, { companies }] of Object.entries(categories)) {
        const companyNames = companies.map(c => c.name.toLowerCase());
        for (let word of words) {
            const match = stringSimilarity.findBestMatch(word, companyNames);
            if (match.bestMatch.rating > bestScore) {
                bestScore = match.bestMatch.rating;
                bestCategory = category;
            }
        }
    }

    if (bestScore >= 0.45) return bestCategory;

    return null;
}

export function categorizeTransaction(description) {
    const descNorm = normalize(description);

    let category = directMatch(descNorm);
    if (category) return category;

    category = fuzzyMatch(descNorm);
    if (category) return category;

    return "Ukendt kategori";
}

export function findCompanyByAccount(regNo, accNo, description = "") {
    for (const [category, { companies }] of Object.entries(categories)) {
        const company = companies.find(c => c.regNo === regNo && c.accNo === accNo);
        if (company) {
            return {
                name: company.name,
                category,
                regNo,
                accNo,
                comment: description // <-- her bruger vi description som comment
            };
        }
    }

    const category = categorizeTransaction(description);

    return {
        name: description || "Ukendt firma",
        category,
        regNo,
        accNo,
        comment: description // <-- her også
    };
}