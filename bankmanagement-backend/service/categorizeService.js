import fs from "fs";
import path from "path";
import stringSimilarity from "string-similarity";

const filePath = path.join(process.cwd(), "data", "users.json");

function loadUsersData() {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("Fejl ved læsning af users.json:", err);
    return {};
  }
}

function buildCategories(usersData) {
  const categories = {
  "Dagligvarer": {
    priority: 1,
    companies: [
      { name: "Netto", regNo: "3348", accNo: "7192048341", pbsNo: "06217451", debGrNr: "00001", customerNr: "000000000194454" },
      { name: "Bilka", regNo: "3356", accNo: "4829103726", pbsNo: "06217452", debGrNr: "00001", customerNr: "000000000194455" },
      { name: "Føtex", regNo: "3362", accNo: "9034712549", pbsNo: "06217453", debGrNr: "00001", customerNr: "000000000194456" },
      { name: "Rema 1000", regNo: "3371", accNo: "1203948763", pbsNo: "28145632", debGrNr: "00002", customerNr: "000000D12345678" },
      { name: "Lidl", regNo: "3380", accNo: "5647381930", pbsNo: "31567234", debGrNr: "00003", customerNr: "000000L98765432" },
      { name: "Meny", regNo: "3394", accNo: "8274619092", pbsNo: "15632891", debGrNr: "00004", customerNr: "000000M12345678" },
      { name: "Kvickly", regNo: "3402", accNo: "6758290147", pbsNo: "08891234", debGrNr: "00005", customerNr: "000000K45678901" },
      { name: "Salling", regNo: "3410", accNo: "2387194668", pbsNo: "06217454", debGrNr: "00001", customerNr: "000000000194457" },
      { name: "SuperBrugsen", regNo: "3427", accNo: "4981720593", pbsNo: "08891235", debGrNr: "00005", customerNr: "000000S56789012" },
      { name: "Dagli'Brugsen", regNo: "3433", accNo: "7619032485", pbsNo: "08891236", debGrNr: "00005", customerNr: "000000B67890123" },
      { name: "Coop365", regNo: "3441", accNo: "3829056134", pbsNo: "08891237", debGrNr: "00005", customerNr: "000000C78901234" },
      { name: "7-Eleven", regNo: "3458", accNo: "5910378462", pbsNo: "15632892", debGrNr: "00004", customerNr: "000000789012345" },
      { name: "Aldi", regNo: "3466", accNo: "7041289548", pbsNo: "31567235", debGrNr: "00003", customerNr: "000000A87654321" }
    ]
  },

  "Transport": {
    priority: 2,
    companies: [
      { name: "DSB", regNo: "3301", accNo: "4123790538", pbsNo: "12567890", debGrNr: "00101", customerNr: "000000T98765432" },
      { name: "Movia", regNo: "3312", accNo: "9804123621", pbsNo: "12567891", debGrNr: "00101", customerNr: "000000T23456789" },
      { name: "Flixbus", regNo: "3324", accNo: "2309874139", pbsNo: "12567892", debGrNr: "00101", customerNr: "000000T34567890" },
      { name: "Shell", regNo: "3335", accNo: "5642901814", pbsNo: "07891234", debGrNr: "00102", customerNr: "000000F12345678" },
      { name: "Circle K", regNo: "3340", accNo: "7182934065", pbsNo: "07891235", debGrNr: "00102", customerNr: "000000F23456789" },
      { name: "OK", regNo: "3345", accNo: "6051938273", pbsNo: "07891236", debGrNr: "00102", customerNr: "000000F34567890" },
      { name: "Uno-X", regNo: "3350", accNo: "4918203745", pbsNo: "07891237", debGrNr: "00102", customerNr: "000000F45678901" },
      { name: "Q8", regNo: "3358", accNo: "8732194027", pbsNo: "07891238", debGrNr: "00102", customerNr: "000000F56789012" },
      { name: "SAS", regNo: "3368", accNo: "2093847120", pbsNo: "23456789", debGrNr: "00103", customerNr: "000000A12345678" },
      { name: "Norwegian", regNo: "3374", accNo: "6549031248", pbsNo: "23456790", debGrNr: "00103", customerNr: "000000A23456789" },
      { name: "Parkering", regNo: "3382", accNo: "3204985639", pbsNo: "45678901", debGrNr: "00104", customerNr: "000000P12345678" },
      { name: "BroBizz", regNo: "3389", accNo: "4971203852", pbsNo: "45678902", debGrNr: "00104", customerNr: "000000P23456789" },
      { name: "Taxa", regNo: "3398", accNo: "5810392781", pbsNo: "12567893", debGrNr: "00101", customerNr: "000000T45678901" },
      { name: "Letbanen", regNo: "3405", accNo: "7642901330", pbsNo: "12567894", debGrNr: "00101", customerNr: "000000T56789012" },
      { name: "Metroselskabet", regNo: "3414", accNo: "2958174049", pbsNo: "12567895", debGrNr: "00101", customerNr: "000000T67890123" },
      { name: "FDM", regNo: "3420", accNo: "0128374596", pbsNo: "07891239", debGrNr: "00102", customerNr: "000000F67890123" }
    ]
  },

  "Streaming & Abonnementer": {
    priority: 3,
    companies: [
      { name: "Netflix", regNo: "3501", accNo: "9038142720", pbsNo: "55123456", debGrNr: "00201", customerNr: "000000V98765432" },
      { name: "Spotify", regNo: "3512", accNo: "4723901834", pbsNo: "56789012", debGrNr: "00202", customerNr: "000000M23456789" },
      { name: "HBO", regNo: "3523", accNo: "5619203175", pbsNo: "55123457", debGrNr: "00201", customerNr: "000000V34567890" },
      { name: "Max", regNo: "3534", accNo: "2083749146", pbsNo: "55123458", debGrNr: "00201", customerNr: "000000V45678901" },
      { name: "Disney+", regNo: "3545", accNo: "6749230138", pbsNo: "55123459", debGrNr: "00201", customerNr: "000000V56789012" },
      { name: "Viaplay", regNo: "3556", accNo: "3918274052", pbsNo: "55123460", debGrNr: "00201", customerNr: "000000V67890123" },
      { name: "TV2 Play", regNo: "3567", accNo: "8203947351", pbsNo: "55123461", debGrNr: "00201", customerNr: "000000V78901234" },
      { name: "YouSee", regNo: "3578", accNo: "4901726379", pbsNo: "55123462", debGrNr: "00201", customerNr: "000000V89012345" },
      { name: "Tidal", regNo: "3589", accNo: "2173940823", pbsNo: "56789013", debGrNr: "00202", customerNr: "000000M34567890" },
      { name: "Apple Music", regNo: "3596", accNo: "7350391284", pbsNo: "56789014", debGrNr: "00202", customerNr: "000000M45678901" },
      { name: "Storytel", regNo: "3604", accNo: "6482035917", pbsNo: "57891234", debGrNr: "00203", customerNr: "000000B12345678" },
      { name: "Podimo", regNo: "3613", accNo: "5192804730", pbsNo: "57891235", debGrNr: "00203", customerNr: "000000B23456789" },
      { name: "Audible", regNo: "3622", accNo: "2841937028", pbsNo: "57891236", debGrNr: "00203", customerNr: "000000B34567890" },
      { name: "C More", regNo: "3631", accNo: "9071324519", pbsNo: "55123463", debGrNr: "00201", customerNr: "000000V90123456" }
    ]
  },

  "Bolig": {
    priority: 4,
    companies: [
      { name: "Husleje", regNo: "3701", accNo: "6192038347", pbsNo: "42123456", debGrNr: "00301", customerNr: "000000H12345678" },
      { name: "Leje", regNo: "3712", accNo: "2837190531", pbsNo: "42123457", debGrNr: "00301", customerNr: "000000H23456789" },
      { name: "Andelsbolig", regNo: "3723", accNo: "7402912839", pbsNo: "42123458", debGrNr: "00301", customerNr: "000000H34567890" },
      { name: "Realkredit Danmark", regNo: "3734", accNo: "1938472506", pbsNo: "43234567", debGrNr: "00302", customerNr: "000000R12345678" },
      { name: "Totalkredit", regNo: "3745", accNo: "5820239173", pbsNo: "43234568", debGrNr: "00302", customerNr: "000000R23456789" },
      { name: "Ejendomsskat", regNo: "3756", accNo: "4172093804", pbsNo: "43234569", debGrNr: "00302", customerNr: "000000R34567890" },
      { name: "Vand", regNo: "3767", accNo: "6903142709", pbsNo: "44345678", debGrNr: "00303", customerNr: "000000U12345678" },
      { name: "Varme", regNo: "3778", accNo: "3528190473", pbsNo: "44345679", debGrNr: "00303", customerNr: "000000U23456789" },
      { name: "El", regNo: "3789", accNo: "9804127382", pbsNo: "44345680", debGrNr: "00303", customerNr: "000000U34567890" },
      { name: "Internet", regNo: "3796", accNo: "2703948127", pbsNo: "45456789", debGrNr: "00304", customerNr: "000000N12345678" },
      { name: "TDC", regNo: "3804", accNo: "6132784921", pbsNo: "45456790", debGrNr: "00304", customerNr: "000000N23456789" },
      { name: "Fibia", regNo: "3813", accNo: "9420173640", pbsNo: "45456791", debGrNr: "00304", customerNr: "000000N34567890" },
      { name: "Stofa", regNo: "3822", accNo: "3174920893", pbsNo: "45456792", debGrNr: "00304", customerNr: "000000N45678901" },
      { name: "EWII", regNo: "3831", accNo: "5801732945", pbsNo: "44345681", debGrNr: "00303", customerNr: "000000U45678901" },
      { name: "Norlys", regNo: "3840", accNo: "7291038462", pbsNo: "44345682", debGrNr: "00303", customerNr: "000000U56789012" },
      { name: "Andel Energi", regNo: "3859", accNo: "4069281745", pbsNo: "44345683", debGrNr: "00303", customerNr: "000000U67890123" }
    ]
  },

  "Forsikringer": {
    priority: 4,
    companies: [
      { name: "Tryg", regNo: "3901", accNo: "82103947", pbsNo: "82345678", debGrNr: "00401", customerNr: "000000I12345678" },
      { name: "Topdanmark", regNo: "3912", accNo: "30491827", pbsNo: "82345679", debGrNr: "00401", customerNr: "000000I23456789" },
      { name: "GF Forsikring", regNo: "3923", accNo: "71928304", pbsNo: "82345680", debGrNr: "00401", customerNr: "000000I34567890" },
      { name: "Alm. Brand", regNo: "3934", accNo: "50291378", pbsNo: "82345681", debGrNr: "00401", customerNr: "000000I45678901" },
      { name: "If", regNo: "3945", accNo: "61920375", pbsNo: "82345682", debGrNr: "00401", customerNr: "000000I56789012" },
      { name: "Codan", regNo: "3956", accNo: "23740189", pbsNo: "82345683", debGrNr: "00401", customerNr: "000000I67890123" },
      { name: "Gjensidige", regNo: "3967", accNo: "48392017", pbsNo: "82345684", debGrNr: "00401", customerNr: "000000I78901234" },
      { name: "Bauta", regNo: "3978", accNo: "15029483", pbsNo: "83456789", debGrNr: "00402", customerNr: "000000S12345678" },
      { name: "Lærerstandens Brandforsikring", regNo: "3989", accNo: "92047361", pbsNo: "83456790", debGrNr: "00402", customerNr: "000000S23456789" },
      { name: "PenSam", regNo: "3996", accNo: "37481920", pbsNo: "84567890", debGrNr: "00403", customerNr: "000000P12345678" },
      { name: "Sygeforsikringen danmark", regNo: "3307", accNo: "64120938", pbsNo: "85678901", debGrNr: "00404", customerNr: "000000H12345678" }
    ]
  },

  "Bank & Økonomi": {
    priority: 5,
    companies: [
      { name: "Danske Bank", regNo: "3925", accNo: "9012345678", pbsNo: "91234567", debGrNr: "00501", customerNr: "000000B12345678" },
      { name: "Nordea", regNo: "3930", accNo: "8729134650", pbsNo: "91234568", debGrNr: "00501", customerNr: "000000B23456789" },
      { name: "Nykredit Bank", regNo: "3935", accNo: "6134975201", pbsNo: "91234569", debGrNr: "00501", customerNr: "000000B34567890" },
      { name: "Sydbank", regNo: "3940", accNo: "2874916350", pbsNo: "91234570", debGrNr: "00501", customerNr: "000000B45678901" },
      { name: "Jyske Bank", regNo: "3945", accNo: "4701836927", pbsNo: "91234571", debGrNr: "00501", customerNr: "000000B56789012" },
      { name: "Arbejdernes Landsbank", regNo: "3950", accNo: "9201834765", pbsNo: "91234572", debGrNr: "00501", customerNr: "000000B67890123" },
      { name: "Lunar", regNo: "3955", accNo: "3820491576", pbsNo: "92345678", debGrNr: "00502", customerNr: "000000D12345678" },
      { name: "Revolut", regNo: "3960", accNo: "6592830471", pbsNo: "92345679", debGrNr: "00502", customerNr: "000000D23456789" },
      { name: "N26", regNo: "3965", accNo: "7219034862", pbsNo: "92345680", debGrNr: "00502", customerNr: "000000D34567890" },
      { name: "Sparekassen Kronjylland", regNo: "3970", accNo: "8031729460", pbsNo: "91234573", debGrNr: "00501", customerNr: "000000B78901234" }
    ]
  },

  "Sundhed": {
    priority: 6,
    companies: [
      { name: "Apoteket", regNo: "3975", accNo: "4029381762", pbsNo: "61234567", debGrNr: "00601", customerNr: "000000P12345678" },
      { name: "Region Hovedstaden", regNo: "3980", accNo: "8201937462", pbsNo: "62345678", debGrNr: "00602", customerNr: "000000R23456789" },
      { name: "Region Midtjylland", regNo: "3985", accNo: "1938472056", pbsNo: "62345679", debGrNr: "00602", customerNr: "000000R34567890" },
      { name: "Region Syddanmark", regNo: "3990", accNo: "7592038146", pbsNo: "62345680", debGrNr: "00602", customerNr: "000000R45678901" },
      { name: "Region Nordjylland", regNo: "3995", accNo: "2837469153", pbsNo: "62345681", debGrNr: "00602", customerNr: "000000R56789012" },
      { name: "Region Sjælland", regNo: "4000", accNo: "9140283756", pbsNo: "62345682", debGrNr: "00602", customerNr: "000000R67890123" },
      { name: "Læge", regNo: "4005", accNo: "8372914057", pbsNo: "63456789", debGrNr: "00603", customerNr: "000000M12345678" },
      { name: "Tandlæge", regNo: "4010", accNo: "1029384756", pbsNo: "63456790", debGrNr: "00603", customerNr: "000000M23456789" },
      { name: "Psykolog", regNo: "4015", accNo: "3948571029", pbsNo: "63456791", debGrNr: "00603", customerNr: "000000M34567890" },
      { name: "Optiker", regNo: "4020", accNo: "8129304751", pbsNo: "63456792", debGrNr: "00603", customerNr: "000000M45678901" },
      { name: "Fitness World", regNo: "4025", accNo: "6251837492", pbsNo: "64567890", debGrNr: "00604", customerNr: "000000F12345678" },
      { name: "SATS", regNo: "4030", accNo: "9581730426", pbsNo: "64567891", debGrNr: "00604", customerNr: "000000F23456789" },
      { name: "Loop Fitness", regNo: "4035", accNo: "4738291056", pbsNo: "64567892", debGrNr: "00604", customerNr: "000000F34567890" },
      { name: "PureGym", regNo: "4040", accNo: "6129384705", pbsNo: "64567893", debGrNr: "00604", customerNr: "000000F45678901" },
      { name: "Det Sunde Valg", regNo: "4045", accNo: "8041937562", pbsNo: "64567894", debGrNr: "00604", customerNr: "000000F56789012" }
    ]
  },

    "Uddannelse": {
    priority: 7,
    companies: [
      { name: "Aarhus Universitet", regNo: "4050", accNo: "8192730465", pbsNo: "71234567", debGrNr: "00701", customerNr: "000000U12345678" },
      { name: "Københavns Universitet", regNo: "4055", accNo: "2738491057", pbsNo: "71234568", debGrNr: "00701", customerNr: "000000U23456789" },
      { name: "SDU", regNo: "4060", accNo: "5091837426", pbsNo: "71234569", debGrNr: "00701", customerNr: "000000U34567890" },
      { name: "AAU", regNo: "4065", accNo: "3820471592", pbsNo: "71234570", debGrNr: "00701", customerNr: "000000U45678901" },
      { name: "RUC", regNo: "4070", accNo: "7049182360", pbsNo: "71234571", debGrNr: "00701", customerNr: "000000U56789012" },
      { name: "CBS", regNo: "4075", accNo: "9238170462", pbsNo: "71234572", debGrNr: "00701", customerNr: "000000U67890123" },
      { name: "Professionshøjskolen Absalon", regNo: "4080", accNo: "6172304892", pbsNo: "72345678", debGrNr: "00702", customerNr: "000000P12345678" },
      { name: "KEA", regNo: "4085", accNo: "2903817456", pbsNo: "72345679", debGrNr: "00702", customerNr: "000000P23456789" },
      { name: "Aalborg Handelsskole", regNo: "4090", accNo: "1402958376", pbsNo: "73456789", debGrNr: "00703", customerNr: "000000V12345678" },
      { name: "ZBC", regNo: "4095", accNo: "9348170256", pbsNo: "73456790", debGrNr: "00703", customerNr: "000000V23456789" }
    ]
  },

  "Underholdning": {
    priority: 8,
    companies: [
      { name: "Tivoli", regNo: "4100", accNo: "8903142756", pbsNo: "51234567", debGrNr: "00801", customerNr: "000000A12345678" },
      { name: "Bakken", regNo: "4105", accNo: "2309485713", pbsNo: "51234568", debGrNr: "00801", customerNr: "000000A23456789" },
      { name: "Cinemaxx", regNo: "4110", accNo: "4918273056", pbsNo: "52345678", debGrNr: "00802", customerNr: "000000C12345678" },
      { name: "Nordisk Film", regNo: "4115", accNo: "8031749206", pbsNo: "52345679", debGrNr: "00802", customerNr: "000000C23456789" },
      { name: "Musikhuset Aarhus", regNo: "4120", accNo: "5938172406", pbsNo: "53456789", debGrNr: "00803", customerNr: "000000M12345678" },
      { name: "DR Koncerthuset", regNo: "4125", accNo: "9128473605", pbsNo: "53456790", debGrNr: "00803", customerNr: "000000M23456789" },
      { name: "Ticketmaster", regNo: "4130", accNo: "1039847265", pbsNo: "54567890", debGrNr: "00804", customerNr: "000000T12345678" },
      { name: "Eventim", regNo: "4135", accNo: "7203948156", pbsNo: "54567891", debGrNr: "00804", customerNr: "000000T23456789" },
      { name: "Det Kongelige Teater", regNo: "4140", accNo: "3829405716", pbsNo: "53456791", debGrNr: "00803", customerNr: "000000M34567890" }
    ]
  },

  "Børn & Familie": {
    priority: 9,
    companies: [
      { name: "LEGO", regNo: "4145", accNo: "1938472056", pbsNo: "21234567", debGrNr: "00901", customerNr: "000000T12345678" },
      { name: "BabySam", regNo: "4150", accNo: "5720391845", pbsNo: "22345678", debGrNr: "00902", customerNr: "000000B12345678" },
      { name: "Matas", regNo: "4155", accNo: "9481203756", pbsNo: "22345679", debGrNr: "00902", customerNr: "000000B23456789" },
      { name: "BR", regNo: "4160", accNo: "7093841256", pbsNo: "21234568", debGrNr: "00901", customerNr: "000000T23456789" },
      { name: "H&M Kids", regNo: "4165", accNo: "4928371056", pbsNo: "23456789", debGrNr: "00903", customerNr: "000000K12345678" },
      { name: "Name It", regNo: "4170", accNo: "6281947035", pbsNo: "23456790", debGrNr: "00903", customerNr: "000000K23456789" },
      { name: "Zara Kids", regNo: "4175", accNo: "5819204736", pbsNo: "23456791", debGrNr: "00903", customerNr: "000000K34567890" },
      { name: "Babysam Outlet", regNo: "4180", accNo: "7392841056", pbsNo: "22345680", debGrNr: "00902", customerNr: "000000B34567890" },
      { name: "Pixizoo", regNo: "4185", accNo: "2803941756", pbsNo: "22345681", debGrNr: "00902", customerNr: "000000B45678901" },
      { name: "Børnebasen", regNo: "4190", accNo: "6102938471", pbsNo: "22345682", debGrNr: "00902", customerNr: "000000B56789012" }
    ]
  },

    "Mode & Tøj": {
    priority: 10,
    companies: [
      { name: "Zara", regNo: "4200", accNo: "7182936405", pbsNo: "11234567", debGrNr: "01001", customerNr: "000000F12345678" },
      { name: "H&M", regNo: "4205", accNo: "5928374016", pbsNo: "11234568", debGrNr: "01001", customerNr: "000000F23456789" },
      { name: "Boozt", regNo: "4210", accNo: "4309182756", pbsNo: "12345678", debGrNr: "01002", customerNr: "000000E12345678" },
      { name: "Asos", regNo: "4215", accNo: "1039482756", pbsNo: "12345679", debGrNr: "01002", customerNr: "000000E23456789" },
      { name: "Nike", regNo: "4220", accNo: "8291037465", pbsNo: "13456789", debGrNr: "01003", customerNr: "000000S12345678" },
      { name: "Adidas", regNo: "4225", accNo: "2749103856", pbsNo: "13456790", debGrNr: "01003", customerNr: "000000S23456789" },
      { name: "Only", regNo: "4230", accNo: "8192740356", pbsNo: "11234569", debGrNr: "01001", customerNr: "000000F34567890" },
      { name: "Jack & Jones", regNo: "4235", accNo: "3029481756", pbsNo: "11234570", debGrNr: "01001", customerNr: "000000F45678901" },
      { name: "Vero Moda", regNo: "4240", accNo: "6901834725", pbsNo: "11234571", debGrNr: "01001", customerNr: "000000F56789012" },
      { name: "Magasin", regNo: "4245", accNo: "4389102756", pbsNo: "14567890", debGrNr: "01004", customerNr: "000000D12345678" }
    ]
  },

  "Elektronik": {
    priority: 11,
    companies: [
      { name: "Elgiganten", regNo: "4250", accNo: "8203917462", pbsNo: "35123456", debGrNr: "01101", customerNr: "000000R12345678" },
      { name: "Power", regNo: "4255", accNo: "5938102746", pbsNo: "35123457", debGrNr: "01101", customerNr: "000000R23456789" },
      { name: "Proshop", regNo: "4260", accNo: "7319284056", pbsNo: "36234567", debGrNr: "01102", customerNr: "000000E12345678" },
      { name: "Computersalg", regNo: "4265", accNo: "2948170365", pbsNo: "36234568", debGrNr: "01102", customerNr: "000000E23456789" },
      { name: "AV-Cables", regNo: "4270", accNo: "3849102756", pbsNo: "36234569", debGrNr: "01102", customerNr: "000000E34567890" },
      { name: "Wupti", regNo: "4275", accNo: "6158204739", pbsNo: "35123458", debGrNr: "01101", customerNr: "000000R34567890" },
      { name: "Apple", regNo: "4280", accNo: "1083947256", pbsNo: "37345678", debGrNr: "01103", customerNr: "000000M12345678" },
      { name: "Samsung", regNo: "4285", accNo: "7938102645", pbsNo: "37345679", debGrNr: "01103", customerNr: "000000M23456789" },
      { name: "OnePlus", regNo: "4290", accNo: "2059183746", pbsNo: "37345680", debGrNr: "01103", customerNr: "000000M34567890" },
      { name: "CDON", regNo: "4295", accNo: "9203851746", pbsNo: "36234570", debGrNr: "01102", customerNr: "000000E45678901" }
    ]
  },

  "Mad & Takeaway": {
    priority: 12,
    companies: [
      { name: "Just Eat", regNo: "4300", accNo: "3849102756", pbsNo: "25123456", debGrNr: "01201", customerNr: "000000D12345678" },
      { name: "Wolt", regNo: "4305", accNo: "7158392046", pbsNo: "25123457", debGrNr: "01201", customerNr: "000000D23456789" },
      { name: "Too Good To Go", regNo: "4310", accNo: "9203847561", pbsNo: "25123458", debGrNr: "01201", customerNr: "000000D34567890" },
      { name: "McDonald's", regNo: "4315", accNo: "5719382046", pbsNo: "26234567", debGrNr: "01202", customerNr: "000000F12345678" },
      { name: "Burger King", regNo: "4320", accNo: "8391047256", pbsNo: "26234568", debGrNr: "01202", customerNr: "000000F23456789" },
      { name: "Domino's", regNo: "4325", accNo: "1049382756", pbsNo: "26234569", debGrNr: "01202", customerNr: "000000F34567890" },
      { name: "Sunset Boulevard", regNo: "4330", accNo: "8291047365", pbsNo: "26234570", debGrNr: "01202", customerNr: "000000F45678901" },
      { name: "Starbucks", regNo: "4335", accNo: "3029481756", pbsNo: "27345678", debGrNr: "01203", customerNr: "000000C12345678" },
      { name: "Joe & The Juice", regNo: "4340", accNo: "5901823746", pbsNo: "27345679", debGrNr: "01203", customerNr: "000000C23456789" },
      { name: "Lagkagehuset", regNo: "4345", accNo: "8719204356", pbsNo: "27345680", debGrNr: "01203", customerNr: "000000C34567890" }
    ]
  },

  "Rejser & Ferie": {
    priority: 13,
    companies: [
      { name: "TUI", regNo: "4350", accNo: "9018273456", pbsNo: "41234567", debGrNr: "01301", customerNr: "000000T12345678" },
      { name: "Spies", regNo: "4355", accNo: "2839104756", pbsNo: "41234568", debGrNr: "01301", customerNr: "000000T23456789" },
      { name: "Apollo", regNo: "4360", accNo: "8391027465", pbsNo: "41234569", debGrNr: "01301", customerNr: "000000T34567890" },
      { name: "Momondo", regNo: "4365", accNo: "1049382756", pbsNo: "42345678", debGrNr: "01302", customerNr: "000000S12345678" },
      { name: "Booking.com", regNo: "4370", accNo: "7938102645", pbsNo: "43456789", debGrNr: "01303", customerNr: "000000H12345678" },
      { name: "Airbnb", regNo: "4375", accNo: "2958103746", pbsNo: "43456790", debGrNr: "01303", customerNr: "000000H23456789" },
      { name: "Hotels.com", regNo: "4380", accNo: "3849102756", pbsNo: "43456791", debGrNr: "01303", customerNr: "000000H34567890" },
      { name: "Expedia", regNo: "4385", accNo: "6102938475", pbsNo: "42345679", debGrNr: "01302", customerNr: "000000S23456789" },
      { name: "SAS Holidays", regNo: "4390", accNo: "8291037465", pbsNo: "41234570", debGrNr: "01301", customerNr: "000000T45678901" },
      { name: "Norwegian Holidays", regNo: "4395", accNo: "2039481756", pbsNo: "41234571", debGrNr: "01301", customerNr: "000000T56789012" }
    ]
  },

  "Dyrehold": {
    priority: 14,
    companies: [
      { name: "Maxi Zoo", regNo: "4400", accNo: "8192730465", pbsNo: "81234567", debGrNr: "01401", customerNr: "000000P12345678" },
      { name: "Petworld", regNo: "4405", accNo: "2839104756", pbsNo: "81234568", debGrNr: "01401", customerNr: "000000P23456789" },
      { name: "Zooplus", regNo: "4410", accNo: "4928173056", pbsNo: "82345678", debGrNr: "01402", customerNr: "000000E12345678" },
      { name: "Dyrenes Butik", regNo: "4415", accNo: "7391048256", pbsNo: "81234569", debGrNr: "01401", customerNr: "000000P34567890" },
      { name: "Plantorama", regNo: "4420", accNo: "9102834756", pbsNo: "81234570", debGrNr: "01401", customerNr: "000000P45678901" },
      { name: "Agria Dyreforsikring", regNo: "4425", accNo: "6829304751", pbsNo: "83456789", debGrNr: "01403", customerNr: "000000I12345678" },
      { name: "Dyrlæge", regNo: "4430", accNo: "3849102756", pbsNo: "84567890", debGrNr: "01404", customerNr: "000000V12345678" },
      { name: "Foderbixen", regNo: "4435", accNo: "5129380746", pbsNo: "82345679", debGrNr: "01402", customerNr: "000000E23456789" },
      { name: "Petlux", regNo: "4440", accNo: "7192830465", pbsNo: "82345680", debGrNr: "01402", customerNr: "000000E34567890" },
      { name: "Hundeglad", regNo: "4445", accNo: "1049382756", pbsNo: "81234571", debGrNr: "01401", customerNr: "000000P56789012" }
    ]
  },

  "Fritid & Sport": {
    priority: 15,
    companies: [
      { name: "Sportmaster", regNo: "4450", accNo: "8391047256", pbsNo: "33123456", debGrNr: "01501", customerNr: "000000S12345678" },
      { name: "INTERSPORT", regNo: "4455", accNo: "2039481756", pbsNo: "33123457", debGrNr: "01501", customerNr: "000000S23456789" },
      { name: "Eventyrsport", regNo: "4460", accNo: "5901823746", pbsNo: "34234567", debGrNr: "01502", customerNr: "000000O12345678" },
      { name: "Spejdersport", regNo: "4465", accNo: "7158392046", pbsNo: "34234568", debGrNr: "01502", customerNr: "000000O23456789" },
      { name: "Decathlon", regNo: "4470", accNo: "3849102756", pbsNo: "33123458", debGrNr: "01501", customerNr: "000000S34567890" },
      { name: "FitnessX", regNo: "4475", accNo: "8391027465", pbsNo: "35345678", debGrNr: "01503", customerNr: "000000F12345678" },
      { name: "Cykelpartner", regNo: "4480", accNo: "1049382756", pbsNo: "36456789", debGrNr: "01504", customerNr: "000000B12345678" },
      { name: "Løberen", regNo: "4485", accNo: "9023847165", pbsNo: "33123459", debGrNr: "01501", customerNr: "000000S45678901" },
      { name: "Friluftsland", regNo: "4490", accNo: "8192730465", pbsNo: "34234569", debGrNr: "01502", customerNr: "000000O34567890" },
      { name: "Bikezilla", regNo: "4495", accNo: "2839104756", pbsNo: "36456790", debGrNr: "01504", customerNr: "000000B23456789" }
    ]
  },

  "Velgørenhed": {
    priority: 16,
    companies: [
      { name: "Røde Kors", regNo: "4500", accNo: "7391820456", pbsNo: "16123456", debGrNr: "01601", customerNr: "000000H12345678" },
      { name: "UNICEF", regNo: "4505", accNo: "8192730465", pbsNo: "16123457", debGrNr: "01601", customerNr: "000000H23456789" },
      { name: "Læger uden Grænser", regNo: "4510", accNo: "1049382756", pbsNo: "16123458", debGrNr: "01601", customerNr: "000000H34567890" },
      { name: "WWF", regNo: "4515", accNo: "2039481756", pbsNo: "17234567", debGrNr: "01602", customerNr: "000000E12345678" },
      { name: "Børns Vilkår", regNo: "4520", accNo: "8391047256", pbsNo: "18345678", debGrNr: "01603", customerNr: "000000C12345678" },
      { name: "Kræftens Bekæmpelse", regNo: "4525", accNo: "5901823746", pbsNo: "19456789", debGrNr: "01604", customerNr: "000000M12345678" },
      { name: "Folkekirkens Nødhjælp", regNo: "4530", accNo: "3849102756", pbsNo: "16123459", debGrNr: "01601", customerNr: "000000H45678901" },
      { name: "PlanBørnefonden", regNo: "4535", accNo: "7158392046", pbsNo: "18345679", debGrNr: "01603", customerNr: "000000C23456789" },
      { name: "Red Barnet", regNo: "4540", accNo: "8291037465", pbsNo: "18345680", debGrNr: "01603", customerNr: "000000C34567890" },
      { name: "Dyrenes Beskyttelse", regNo: "4545", accNo: "9203847561", pbsNo: "17234568", debGrNr: "01602", customerNr: "000000E23456789" }
    ]
  },

  "Offentlige Betalinger": {
    priority: 17,
    companies: [
      { name: "Skat", regNo: "4550", accNo: "3948571029", pbsNo: "05123456", debGrNr: "01701", customerNr: "000000T12345678" },
      { name: "SU", regNo: "4555", accNo: "1029384756", pbsNo: "06234567", debGrNr: "01702", customerNr: "000000E12345678" },
      { name: "Udbetaling Danmark", regNo: "4560", accNo: "9581730426", pbsNo: "05123457", debGrNr: "01701", customerNr: "000000T23456789" },
      { name: "Kommune", regNo: "4565", accNo: "4738291056", pbsNo: "05123458", debGrNr: "01701", customerNr: "000000T34567890" },
      { name: "NemKonto", regNo: "4570", accNo: "6129384705", pbsNo: "05123459", debGrNr: "01701", customerNr: "000000T45678901" },
      { name: "ATP", regNo: "4575", accNo: "8041937562", pbsNo: "07345678", debGrNr: "01703", customerNr: "000000P12345678" },
      { name: "PensionDanmark", regNo: "4580", accNo: "6251837492", pbsNo: "07345679", debGrNr: "01703", customerNr: "000000P23456789" },
      { name: "A-kasse", regNo: "4585", accNo: "3948571029", pbsNo: "08456789", debGrNr: "01704", customerNr: "000000U12345678" },
      { name: "Jobcenter", regNo: "4590", accNo: "8172039456", pbsNo: "08456790", debGrNr: "01704", customerNr: "000000U23456789" },
      { name: "Borger.dk", regNo: "4595", accNo: "9203847561", pbsNo: "05123460", debGrNr: "01701", customerNr: "000000T56789012" }
    ]
  },
  
  "Hobby & Kreativ": {
    priority: 18,
    companies: [
      { name: "Panduro Hobby", regNo: "3861", accNo: "4382901746", pbsNo: "95123456", debGrNr: "01801", customerNr: "000000A12345678" },
      { name: "Stof & Stil", regNo: "3868", accNo: "9203847152", pbsNo: "95123457", debGrNr: "01801", customerNr: "000000A23456789" },
      { name: "Bog & Idé", regNo: "3874", accNo: "1538290473", pbsNo: "96234567", debGrNr: "01802", customerNr: "000000B12345678" },
      { name: "Arnold Busck", regNo: "3880", accNo: "6032917480", pbsNo: "96234568", debGrNr: "01802", customerNr: "000000B23456789" },
      { name: "Stof 2000", regNo: "3886", accNo: "8910372645", pbsNo: "95123458", debGrNr: "01801", customerNr: "000000A34567890" },
      { name: "Søstrene Grene", regNo: "3893", accNo: "2304981759", pbsNo: "97345678", debGrNr: "01803", customerNr: "000000D12345678" },
      { name: "Flying Tiger", regNo: "3899", accNo: "7162093485", pbsNo: "97345679", debGrNr: "01803", customerNr: "000000D23456789" },
      { name: "Sketcher", regNo: "3905", accNo: "3417809623", pbsNo: "98456789", debGrNr: "01804", customerNr: "000000A45678901" },
      { name: "Papirmuseet", regNo: "3912", accNo: "5802394718", pbsNo: "98456790", debGrNr: "01804", customerNr: "000000A56789012" },
      { name: "Hobbii", regNo: "3919", accNo: "9041276350", pbsNo: "95123459", debGrNr: "01801", customerNr: "000000A67890123" }
    ]
  }
  };

  categories["Kunde"] = {
    priority: 0,
    companies: Object.values(usersData).flatMap(userArr =>
      userArr.map(u => ({ name: "Kunde", regNo: u.regNo, accNo: u.accNo }))
    )
  };

  return categories;
}

export function findCompanyByAccount(regNo, accNo, description = "") {
  regNo = String(regNo).trim();
  accNo = String(accNo).trim();

  const usersData = loadUsersData();
  const categories = buildCategories(usersData);

  for (const [category, { companies }] of Object.entries(categories)) {
    const company = companies.find(
      c => String(c.regNo).trim() === regNo && String(c.accNo).trim() === accNo
    );
    if (company) {
      if (category === "Kunde") {
        return {
          name: "Kunde",
          category: "Kunde",
          regNo: company.regNo,
          accNo: company.accNo,
          comment: description,
          matchType: "Direct match (Kunde)",
        };
      } else {
        return {
          name: company.name,
          category,
          regNo,
          accNo,
          matchType: "Direct match (Company)",
        };
      }
    }
  }

  const allCompanies = Object.entries(categories)
    .filter(([category]) => category !== "Kunde")
    .flatMap(([category, { companies }]) => companies.map(c => ({ ...c, category })));

  const names = allCompanies.map(c => c.name);

  const words = description.split(/\s+/);

  for (const word of words) {
    const { bestMatch, bestMatchIndex } = stringSimilarity.findBestMatch(word, names);

    if (bestMatch.rating > 0.8) {
      const bestCompany = allCompanies[bestMatchIndex];
      return {
        name: "Ukendt virksomhed",
        category: bestCompany.category,
        regNo,
        accNo,
        matchWord: word,
        matchType: "Fuzzy match (word)",
      };
    }
  }

  return {
    name: "Ukendt virksomhed",
    category: "Ukendt kategori",
    regNo,
    accNo,
    comment: description,
    matchType: "None",
  };
}

export function getCategories() {
  const usersData = loadUsersData();
  return buildCategories(usersData);
}