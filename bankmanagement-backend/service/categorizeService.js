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
    priority: "1",
    companies: [
      { name: "Netto", creditorNo: "28745193", referenceNo: "153984726051487", fikNo: "06217451", debGrNr: "00001", pbsCode: "+71" },
      { name: "Bilka", creditorNo: "39584716", referenceNo: "264593817260498", fikNo: "06217452", debGrNr: "00001", pbsCode: "+71" },
      { name: "Føtex", creditorNo: "47291835", referenceNo: "379561084273619", fikNo: "06217453", debGrNr: "00001", pbsCode: "+71" },
      { name: "Rema 1000", creditorNo: "58301746", referenceNo: "481729605948372", fikNo: "28145632", debGrNr: "00002", pbsCode: "+71" },
      { name: "Lidl", creditorNo: "61829473", referenceNo: "594837160495829", fikNo: "31567234", debGrNr: "00003", pbsCode: "+71" },
      { name: "Meny", creditorNo: "73298415", referenceNo: "607491382715069", fikNo: "15632891", debGrNr: "00004", pbsCode: "+71" },
      { name: "Kvickly", creditorNo: "84930517", referenceNo: "716504938271072", fikNo: "08891234", debGrNr: "00005", pbsCode: "+71" },
      { name: "Salling", creditorNo: "95172638", referenceNo: "825916037284158", fikNo: "06217454", debGrNr: "00001", pbsCode: "+71" },
      { name: "SuperBrugsen", creditorNo: "06372849", referenceNo: "938172650493861", fikNo: "08891235", debGrNr: "00005", pbsCode: "+71" },
      { name: "Dagli'Brugsen", creditorNo: "17839405", referenceNo: "049382716594027", fikNo: "08891236", debGrNr: "00005", pbsCode: "+71" },
      { name: "Coop365", creditorNo: "74295061", referenceNo: "153948726105489", fikNo: "08891237", debGrNr: "00005", pbsCode: "+71" },
      { name: "7-Eleven", creditorNo: "86739512", referenceNo: "267594831726520", fikNo: "15632892", debGrNr: "00004", pbsCode: "+71" },
      { name: "Aldi", creditorNo: "95831724", referenceNo: "371605984273618", fikNo: "31567235", debGrNr: "00003", pbsCode: "+71" }
    ]
  },

  "Transport": {
    priority: "2",
    companies: [
      { name: "DSB", creditorNo: "13947285", referenceNo: "124895760238471", fikNo: "12567890", debGrNr: "00101", pbsCode: "+71" },
      { name: "Movia", creditorNo: "24861537", referenceNo: "235716904382659", fikNo: "12567891", debGrNr: "00101", pbsCode: "+71" },
      { name: "Flixbus", creditorNo: "35792841", referenceNo: "348192675430981", fikNo: "12567892", debGrNr: "00101", pbsCode: "+71" },
      { name: "Shell", creditorNo: "46921583", referenceNo: "457039281746205", fikNo: "07891234", debGrNr: "00102", pbsCode: "+71" },
      { name: "Circle K", creditorNo: "57103826", referenceNo: "568471920385174", fikNo: "07891235", debGrNr: "00102", pbsCode: "+71" },
      { name: "OK", creditorNo: "68294715", referenceNo: "679204813657492", fikNo: "07891236", debGrNr: "00102", pbsCode: "+71" },
      { name: "Uno-X", creditorNo: "79351048", referenceNo: "781492630517849", fikNo: "07891237", debGrNr: "00102", pbsCode: "+71" },
      { name: "Q8", creditorNo: "80426391", referenceNo: "892017463285017", fikNo: "07891238", debGrNr: "00102", pbsCode: "+71" },
      { name: "SAS", creditorNo: "91573826", referenceNo: "902384716502839", fikNo: "23456789", debGrNr: "00103", pbsCode: "+71" },
      { name: "Norwegian", creditorNo: "02741639", referenceNo: "013257849603281", fikNo: "23456790", debGrNr: "00103", pbsCode: "+71" },
      { name: "Parkering", creditorNo: "13859427", referenceNo: "125847930261475", fikNo: "45678901", debGrNr: "00104", pbsCode: "+71" },
      { name: "BroBizz", creditorNo: "24973618", referenceNo: "236185947302619", fikNo: "45678902", debGrNr: "00104", pbsCode: "+71" },
      { name: "Taxa", creditorNo: "35791846", referenceNo: "349217560384195", fikNo: "12567893", debGrNr: "00101", pbsCode: "+71" },
      { name: "Letbanen", creditorNo: "46823579", referenceNo: "457302918461072", fikNo: "12567894", debGrNr: "00101", pbsCode: "+71" },
      { name: "Metroselskabet", creditorNo: "57913462", referenceNo: "568491703284615", fikNo: "12567895", debGrNr: "00101", pbsCode: "+71" },
      { name: "FDM", creditorNo: "68102947", referenceNo: "671938245076192", fikNo: "07891239", debGrNr: "00102", pbsCode: "+71" }
    ]
  },

  "Streaming & Abonnementer": {
    priority: "3",
    companies: [
      { name: "Netflix", creditorNo: "23958471", referenceNo: "147392658120473", fikNo: "55123456", debGrNr: "00201", pbsCode: "+71" },
      { name: "Spotify", creditorNo: "29485713", referenceNo: "289736415208649", fikNo: "56789012", debGrNr: "00202", pbsCode: "+71" },
      { name: "HBO", creditorNo: "31594728", referenceNo: "484629173504682", fikNo: "55123457", debGrNr: "00201", pbsCode: "+71" },
      { name: "Max", creditorNo: "37419382", referenceNo: "729784841900961", fikNo: "55123458", debGrNr: "00201", pbsCode: "+71" },
      { name: "Disney+", creditorNo: "41428395", referenceNo: "102411561441600", fikNo: "55123459", debGrNr: "00201", pbsCode: "+71" },
      { name: "Viaplay", creditorNo: "43475921", referenceNo: "142415841962025", fikNo: "55123460", debGrNr: "00201", pbsCode: "+71" },
      { name: "TV2 Play", creditorNo: "47536137", referenceNo: "182420122482450", fikNo: "55123461", debGrNr: "00201", pbsCode: "+71" },
      { name: "YouSee", creditorNo: "53596742", referenceNo: "222424403002875", fikNo: "55123462", debGrNr: "00201", pbsCode: "+71" },
      { name: "Tidal", creditorNo: "59617358", referenceNo: "262428683523300", fikNo: "56789013", debGrNr: "00202", pbsCode: "+71" },
      { name: "Apple Music", creditorNo: "61677914", referenceNo: "302432964043725", fikNo: "56789014", debGrNr: "00202", pbsCode: "+71" },
      { name: "Storytel", creditorNo: "67717931", referenceNo: "342437244564150", fikNo: "57891234", debGrNr: "00203", pbsCode: "+71" },
      { name: "Podimo", creditorNo: "71738547", referenceNo: "382441525084575", fikNo: "57891235", debGrNr: "00203", pbsCode: "+71" },
      { name: "Audible", creditorNo: "73798563", referenceNo: "422445805605000", fikNo: "57891236", debGrNr: "00203", pbsCode: "+71" },
      { name: "C More", creditorNo: "79839179", referenceNo: "462450086125425", fikNo: "55123463", debGrNr: "00201", pbsCode: "+71" }
    ]
  },

  "Bolig": {
    priority: "4",
    companies: [
      { name: "Husleje", creditorNo: "11235813", referenceNo: "136915253645872", fikNo: "42123456", debGrNr: "00301", pbsCode: "+71" },
      { name: "Leje", creditorNo: "21358132", referenceNo: "153060666171934", fikNo: "42123457", debGrNr: "00301", pbsCode: "+71" },
      { name: "Andelsbolig", creditorNo: "34591321", referenceNo: "171153060666218", fikNo: "42123458", debGrNr: "00301", pbsCode: "+71" },
      { name: "Realkredit Danmark", creditorNo: "55949453", referenceNo: "190210435136579", fikNo: "43234567", debGrNr: "00302", pbsCode: "+71" },
      { name: "Totalkredit", creditorNo: "90540774", referenceNo: "210231780561843", fikNo: "43234568", debGrNr: "00302", pbsCode: "+71" },
      { name: "Ejendomsskat", creditorNo: "14649022", referenceNo: "231253095953102", fikNo: "43234569", debGrNr: "00302", pbsCode: "+71" },
      { name: "Vand", creditorNo: "23718964", referenceNo: "253274381276418", fikNo: "44345678", debGrNr: "00303", pbsCode: "+71" },
      { name: "Varme", creditorNo: "38367986", referenceNo: "276295636528731", fikNo: "44345679", debGrNr: "00303", pbsCode: "+71" },
      { name: "El", creditorNo: "62086950", referenceNo: "300316861711954", fikNo: "44345680", debGrNr: "00303", pbsCode: "+71" },
      { name: "Internet", creditorNo: "10045493", referenceNo: "325338056828067", fikNo: "45456789", debGrNr: "00304", pbsCode: "+71" },
      { name: "TDC", creditorNo: "16254188", referenceNo: "351359221878491", fikNo: "45456790", debGrNr: "00304", pbsCode: "+71" },
      { name: "Fibia", creditorNo: "26299681", referenceNo: "378380356861723", fikNo: "45456791", debGrNr: "00304", pbsCode: "+71" },
      { name: "Stofa", creditorNo: "42553869", referenceNo: "406401461778056", fikNo: "45456792", debGrNr: "00304", pbsCode: "+71" },
      { name: "EWII", creditorNo: "68853550", referenceNo: "435422536628309", fikNo: "44345681", debGrNr: "00303", pbsCode: "+71" },
      { name: "Norlys", creditorNo: "11140741", referenceNo: "465443581411562", fikNo: "44345682", debGrNr: "00303", pbsCode: "+71" },
      { name: "Andel Energi", creditorNo: "17994291", referenceNo: "496464596128874", fikNo: "44345683", debGrNr: "00303", pbsCode: "+71" }
    ]
  },

  "Forsikringer": {
    priority: "4",
    companies: [
      { name: "Tryg", creditorNo: "28123456", referenceNo: "142857142857361", fikNo: "82345678", debGrNr: "00401", pbsCode: "+71" },
      { name: "Topdanmark", creditorNo: "49612345", referenceNo: "285714285714472", fikNo: "82345679", debGrNr: "00401", pbsCode: "+71" },
      { name: "GF Forsikring", creditorNo: "81961234", referenceNo: "428571428571583", fikNo: "82345680", debGrNr: "00401", pbsCode: "+71" },
      { name: "Alm. Brand", creditorNo: "33550336", referenceNo: "571428571428694", fikNo: "82345681", debGrNr: "00401", pbsCode: "+71" },
      { name: "If", creditorNo: "54748365", referenceNo: "714285714285805", fikNo: "82345682", debGrNr: "00401", pbsCode: "+71" },
      { name: "Codan", creditorNo: "88842123", referenceNo: "857142857142916", fikNo: "82345683", debGrNr: "00401", pbsCode: "+71" },
      { name: "Gjensidige", creditorNo: "14282116", referenceNo: "979153862471935", fikNo: "82345684", debGrNr: "00401", pbsCode: "+71" },
      { name: "Bauta", creditorNo: "25852925", referenceNo: "123456789123867", fikNo: "83456789", debGrNr: "00402", pbsCode: "+71" },
      { name: "Lærerstandens Brandforsikring", creditorNo: "37633487", referenceNo: "246913578246984", fikNo: "83456790", debGrNr: "00402", pbsCode: "+71" },
      { name: "PenSam", creditorNo: "45937425", referenceNo: "369258147369105", fikNo: "84567890", debGrNr: "00403", pbsCode: "+71" },
      { name: "Sygeforsikringen danmark", creditorNo: "67458321", referenceNo: "481516239481627", fikNo: "85678901", debGrNr: "00404", pbsCode: "+71" }
    ]
  },

  "Bank & Økonomi": {
    priority: "5",
    companies: [
      { name: "Danske Bank", creditorNo: "12344321", referenceNo: "248163264128257", fikNo: "91234567", debGrNr: "00501", pbsCode: "+71" },
      { name: "Nordea", creditorNo: "45677654", referenceNo: "481632964258369", fikNo: "91234568", debGrNr: "00501", pbsCode: "+71" },
      { name: "Nykredit Bank", creditorNo: "78899887", referenceNo: "625163264388471", fikNo: "91234569", debGrNr: "00501", pbsCode: "+71" },
      { name: "Sydbank", creditorNo: "32177123", referenceNo: "729163264458583", fikNo: "91234570", debGrNr: "00501", pbsCode: "+71" },
      { name: "Jyske Bank", creditorNo: "65288256", referenceNo: "843163264528695", fikNo: "91234571", debGrNr: "00501", pbsCode: "+71" },
      { name: "Arbejdernes Landsbank", creditorNo: "98399389", referenceNo: "927163264598807", fikNo: "91234572", debGrNr: "00501", pbsCode: "+71" },
      { name: "Lunar", creditorNo: "10577501", referenceNo: "102416326466836", fikNo: "92345678", debGrNr: "00502", pbsCode: "+71" },
      { name: "Revolut", creditorNo: "15666651", referenceNo: "115216326473847", fikNo: "92345679", debGrNr: "00502", pbsCode: "+71" },
      { name: "N26", creditorNo: "17855871", referenceNo: "128116326480858", fikNo: "92345680", debGrNr: "00502", pbsCode: "+71" },
      { name: "Sparekassen Kronjylland", creditorNo: "19744791", referenceNo: "141116326487869", fikNo: "91234573", debGrNr: "00501", pbsCode: "+71" }
    ]
  },

  "Sundhed": {
    priority: "6",
    companies: [
      { name: "Apoteket", creditorNo: "10375829", referenceNo: "115273849162534", fikNo: "61234567", debGrNr: "00601", pbsCode: "+71" },
      { name: "Region Hovedstaden", creditorNo: "15749382", referenceNo: "130547698325068", fikNo: "62345678", debGrNr: "00602", pbsCode: "+71" },
      { name: "Region Midtjylland", creditorNo: "17268439", referenceNo: "145821547487602", fikNo: "62345679", debGrNr: "00602", pbsCode: "+71" },
      { name: "Region Syddanmark", creditorNo: "19628347", referenceNo: "161095396650136", fikNo: "62345680", debGrNr: "00602", pbsCode: "+71" },
      { name: "Region Nordjylland", creditorNo: "20495731", referenceNo: "176369245812670", fikNo: "62345681", debGrNr: "00602", pbsCode: "+71" },
      { name: "Region Sjælland", creditorNo: "21863597", referenceNo: "191643094975204", fikNo: "62345682", debGrNr: "00602", pbsCode: "+71" },
      { name: "Læge", creditorNo: "22419857", referenceNo: "206916944137738", fikNo: "63456789", debGrNr: "00603", pbsCode: "+71" },
      { name: "Tandlæge", creditorNo: "22763418", referenceNo: "222190793300272", fikNo: "63456790", debGrNr: "00603", pbsCode: "+71" },
      { name: "Psykolog", creditorNo: "23175984", referenceNo: "237464642462806", fikNo: "63456791", debGrNr: "00603", pbsCode: "+71" },
      { name: "Optiker", creditorNo: "23648129", referenceNo: "252738491625340", fikNo: "63456792", debGrNr: "00603", pbsCode: "+71" },
      { name: "Fitness World", creditorNo: "23982475", referenceNo: "268012340787874", fikNo: "64567890", debGrNr: "00604", pbsCode: "+71" },
      { name: "SATS", creditorNo: "24319568", referenceNo: "283286189950408", fikNo: "64567891", debGrNr: "00604", pbsCode: "+71" },
      { name: "Loop Fitness", creditorNo: "24638751", referenceNo: "298560039112942", fikNo: "64567892", debGrNr: "00604", pbsCode: "+71" },
      { name: "PureGym", creditorNo: "24897623", referenceNo: "313833888275476", fikNo: "64567893", debGrNr: "00604", pbsCode: "+71" },
      { name: "Det Sunde Valg", creditorNo: "25138479", referenceNo: "329107737438010", fikNo: "64567894", debGrNr: "00604", pbsCode: "+71" }
    ]
  },

  "Uddannelse": {
    priority: "7",
    companies: [
      { name: "Aarhus Universitet", creditorNo: "31347289", referenceNo: "158273946152837", fikNo: "71234567", debGrNr: "00701", pbsCode: "+71" },
      { name: "Københavns Universitet", creditorNo: "31485721", referenceNo: "263847591028374", fikNo: "71234568", debGrNr: "00701", pbsCode: "+71" },
      { name: "SDU", creditorNo: "31726439", referenceNo: "374918265037591", fikNo: "71234569", debGrNr: "00701", pbsCode: "+71" },
      { name: "AAU", creditorNo: "31897542", referenceNo: "485729103746182", fikNo: "71234570", debGrNr: "00701", pbsCode: "+71" },
      { name: "RUC", creditorNo: "31958376", referenceNo: "596138274950263", fikNo: "71234571", debGrNr: "00701", pbsCode: "+71" },
      { name: "CBS", creditorNo: "32049715", referenceNo: "607294851362748", fikNo: "71234572", debGrNr: "00701", pbsCode: "+71" },
      { name: "Professionshøjskolen Absalon", creditorNo: "32176584", referenceNo: "718365294817305", fikNo: "72345678", debGrNr: "00702", pbsCode: "+71" },
      { name: "KEA", creditorNo: "32281497", referenceNo: "829471635092816", fikNo: "72345679", debGrNr: "00702", pbsCode: "+71" },
      { name: "Aalborg Handelsskole", creditorNo: "32359718", referenceNo: "934586217403927", fikNo: "73456789", debGrNr: "00703", pbsCode: "+71" },
      { name: "ZBC", creditorNo: "32471659", referenceNo: "104729583614092", fikNo: "73456790", debGrNr: "00703", pbsCode: "+71" }
    ]
  },

  "Underholdning": {
    priority: "8",
    companies: [
      { name: "Tivoli", creditorNo: "21123595", referenceNo: "157284916325748", fikNo: "51234567", debGrNr: "00801", pbsCode: "+71" },
      { name: "Bakken", creditorNo: "34178117", referenceNo: "263947158302615", fikNo: "51234568", debGrNr: "00801", pbsCode: "+71" },
      { name: "Cinemaxx", creditorNo: "55301712", referenceNo: "374829516047382", fikNo: "52345678", debGrNr: "00802", pbsCode: "+71" },
      { name: "Nordisk Film", creditorNo: "89479829", referenceNo: "485716203948517", fikNo: "52345679", debGrNr: "00802", pbsCode: "+71" },
      { name: "Musikhuset Aarhus", creditorNo: "14478154", referenceNo: "596831479205634", fikNo: "53456789", debGrNr: "00803", pbsCode: "+71" },
      { name: "DR Koncerthuset", creditorNo: "23657983", referenceNo: "617495831472056", fikNo: "53456790", debGrNr: "00803", pbsCode: "+71" },
      { name: "Ticketmaster", creditorNo: "38136137", referenceNo: "738260194583127", fikNo: "54567890", debGrNr: "00804", pbsCode: "+71" },
      { name: "Eventim", creditorNo: "61794120", referenceNo: "849371025694238", fikNo: "54567891", debGrNr: "00804", pbsCode: "+71" },
      { name: "Det Kongelige Teater", creditorNo: "99930257", referenceNo: "960482736105349", fikNo: "53456791", debGrNr: "00803", pbsCode: "+71" }
    ]
  },

  "Børn & Familie": {
    priority: 9,
    companies: [
      { name: "LEGO", creditorNo: "40719283", referenceNo: "121935487261548", fikNo: "21234567", debGrNr: "00901", pbsCode: "+71" },
      { name: "BabySam", creditorNo: "20471836", referenceNo: "358172649103725", fikNo: "22345678", debGrNr: "00902", pbsCode: "+71" },
      { name: "Matas", creditorNo: "10253749", referenceNo: "712584396271945", fikNo: "22345679", debGrNr: "00902", pbsCode: "+71" },
      { name: "BR", creditorNo: "50937416", referenceNo: "123985476192837", fikNo: "21234568", debGrNr: "00901", pbsCode: "+71" },
      { name: "H&M Kids", creditorNo: "25561387", referenceNo: "178492635710284", fikNo: "23456789", debGrNr: "00903", pbsCode: "+71" },
      { name: "Name It", creditorNo: "12843716", referenceNo: "239584761203957", fikNo: "23456790", debGrNr: "00903", pbsCode: "+71" },
      { name: "Zara Kids", creditorNo: "63748192", referenceNo: "304918273645182", fikNo: "23456791", debGrNr: "00903", pbsCode: "+71" },
      { name: "Babysam Outlet", creditorNo: "31927548", referenceNo: "387105924618372", fikNo: "22345680", debGrNr: "00902", pbsCode: "+71" },
      { name: "Pixizoo", creditorNo: "15938472", referenceNo: "476182395047261", fikNo: "22345681", debGrNr: "00902", pbsCode: "+71" },
      { name: "Børnebasen", creditorNo: "79502641", referenceNo: "578294163058471", fikNo: "22345682", debGrNr: "00902", pbsCode: "+71" }
    ]
  },

  "Mode & Tøj": {
    priority: 10,
    companies: [
      { name: "Zara", creditorNo: "12485736", referenceNo: "167483920571283", fikNo: "11234567", debGrNr: "01001", pbsCode: "+71" },
      { name: "H&M", creditorNo: "16739285", referenceNo: "268395174092684", fikNo: "11234568", debGrNr: "01001", pbsCode: "+71" },
      { name: "Boozt", creditorNo: "21238497", referenceNo: "369284715093875", fikNo: "12345678", debGrNr: "01002", pbsCode: "+71" },
      { name: "Asos", creditorNo: "27958146", referenceNo: "470395826104986", fikNo: "12345679", debGrNr: "01002", pbsCode: "+71" },
      { name: "Nike", creditorNo: "38029754", referenceNo: "571406937215097", fikNo: "13456789", debGrNr: "01003", pbsCode: "+71" },
      { name: "Adidas", creditorNo: "49038471", referenceNo: "672517048326108", fikNo: "13456790", debGrNr: "01003", pbsCode: "+71" },
      { name: "Only", creditorNo: "65829743", referenceNo: "773628159437219", fikNo: "11234569", debGrNr: "01001", pbsCode: "+71" },
      { name: "Jack & Jones", creditorNo: "86947231", referenceNo: "874739260548320", fikNo: "11234570", debGrNr: "01001", pbsCode: "+71" },
      { name: "Vero Moda", creditorNo: "11583942", referenceNo: "975840371659431", fikNo: "11234571", debGrNr: "01001", pbsCode: "+71" },
      { name: "Magasin", creditorNo: "15372648", referenceNo: "107951482760542", fikNo: "14567890", debGrNr: "01004", pbsCode: "+71" }
    ]
  },

  "Elektronik": {
    priority: 11,
    companies: [
      { name: "Elgiganten", creditorNo: "30572941", referenceNo: "181624937485617", fikNo: "35123456", debGrNr: "01101", pbsCode: "+71" },
      { name: "Power", creditorNo: "41738425", referenceNo: "242432918576903", fikNo: "35123457", debGrNr: "01101", pbsCode: "+71" },
      { name: "Proshop", creditorNo: "52918463", referenceNo: "323241057684912", fikNo: "36234567", debGrNr: "01102", pbsCode: "+71" },
      { name: "Computersalg", creditorNo: "64107258", referenceNo: "424048793215034", fikNo: "36234568", debGrNr: "01102", pbsCode: "+71" },
      { name: "AV-Cables", creditorNo: "75386140", referenceNo: "544857064329156", fikNo: "36234569", debGrNr: "01102", pbsCode: "+71" },
      { name: "Wupti", creditorNo: "86419527", referenceNo: "685664203487218", fikNo: "35123458", debGrNr: "01101", pbsCode: "+71" },
      { name: "Apple", creditorNo: "97648291", referenceNo: "846473915372993", fikNo: "37345678", debGrNr: "01103", pbsCode: "+71" },
      { name: "Samsung", creditorNo: "10928374", referenceNo: "102728491056324", fikNo: "37345679", debGrNr: "01103", pbsCode: "+71" },
      { name: "OnePlus", creditorNo: "12394857", referenceNo: "122808374156435", fikNo: "37345680", debGrNr: "01103", pbsCode: "+71" },
      { name: "CDON", creditorNo: "13857429", referenceNo: "144889562317654", fikNo: "36234570", debGrNr: "01102", pbsCode: "+71" }
    ]
  },

  "Mad & Takeaway": {
    priority: 12,
    companies: [
      { name: "Just Eat", creditorNo: "10143829", referenceNo: "191827946152734", fikNo: "25123456", debGrNr: "01201", pbsCode: "+71" },
      { name: "Wolt", creditorNo: "20275658", referenceNo: "283654819237461", fikNo: "25123457", debGrNr: "01201", pbsCode: "+71" },
      { name: "Too Good To Go", creditorNo: "30396787", referenceNo: "375482907316582", fikNo: "25123458", debGrNr: "01201", pbsCode: "+71" },
      { name: "McDonald's", creditorNo: "40537816", referenceNo: "467309581427693", fikNo: "26234567", debGrNr: "01202", pbsCode: "+71" },
      { name: "Burger King", creditorNo: "50679445", referenceNo: "559136942738465", fikNo: "26234568", debGrNr: "01202", pbsCode: "+71" },
      { name: "Domino's", creditorNo: "60821074", referenceNo: "650964218349038", fikNo: "26234569", debGrNr: "01202", pbsCode: "+71" },
      { name: "Sunset Boulevard", creditorNo: "70962703", referenceNo: "742791583260711", fikNo: "26234570", debGrNr: "01202", pbsCode: "+71" },
      { name: "Starbucks", creditorNo: "81104332", referenceNo: "834618947371384", fikNo: "27345678", debGrNr: "01203", pbsCode: "+71" },
      { name: "Joe & The Juice", creditorNo: "91245961", referenceNo: "926446319182057", fikNo: "27345679", debGrNr: "01203", pbsCode: "+71" },
      { name: "Lagkagehuset", creditorNo: "10228790", referenceNo: "101827946152739", fikNo: "27345680", debGrNr: "01203", pbsCode: "+71" }
    ]
  },

  "Rejser & Ferie": {
    priority: 13,
    companies: [
      { name: "TUI", creditorNo: "49281736", referenceNo: "203984751628493", fikNo: "41234567", debGrNr: "01301", pbsCode: "+71" },
      { name: "Spies", creditorNo: "13849257", referenceNo: "594172836105928", fikNo: "41234568", debGrNr: "01301", pbsCode: "+71" },
      { name: "Apollo", creditorNo: "48719325", referenceNo: "817395024618273", fikNo: "41234569", debGrNr: "01301", pbsCode: "+71" },
      { name: "Momondo", creditorNo: "16758392", referenceNo: "902748163527491", fikNo: "42345678", debGrNr: "01302", pbsCode: "+71" },
      { name: "Booking.com", creditorNo: "58391247", referenceNo: "475918362047195", fikNo: "43456789", debGrNr: "01303", pbsCode: "+71" },
      { name: "Airbnb", creditorNo: "20847136", referenceNo: "316495827104938", fikNo: "43456790", debGrNr: "01303", pbsCode: "+71" },
      { name: "Hotels.com", creditorNo: "72948361", referenceNo: "584710293846571", fikNo: "43456791", debGrNr: "01303", pbsCode: "+71" },
      { name: "Expedia", creditorNo: "25837194", referenceNo: "629571483026495", fikNo: "42345679", debGrNr: "01302", pbsCode: "+71" },
      { name: "SAS Holidays", creditorNo: "92381475", referenceNo: "748192635074819", fikNo: "41234570", debGrNr: "01301", pbsCode: "+71" },
      { name: "Norwegian Holidays", creditorNo: "32159748", referenceNo: "903481726590271", fikNo: "41234571", debGrNr: "01301", pbsCode: "+71" }
    ]
  },

  "Dyrehold": {
    priority: 14,
    companies: [
      { name: "Maxi Zoo", creditorNo: "15938472", referenceNo: "928374615029384", fikNo: "81234567", debGrNr: "01401", pbsCode: "+71" },
      { name: "Petworld", creditorNo: "95172834", referenceNo: "817293645028193", fikNo: "81234568", debGrNr: "01401", pbsCode: "+71" },
      { name: "Zooplus", creditorNo: "75391826", referenceNo: "374819265071928", fikNo: "82345678", debGrNr: "01402", pbsCode: "+71" },
      { name: "Dyrenes Butik", creditorNo: "35719284", referenceNo: "918273645091827", fikNo: "81234569", debGrNr: "01401", pbsCode: "+71" },
      { name: "Plantorama", creditorNo: "15928473", referenceNo: "472918364075291", fikNo: "81234570", debGrNr: "01401", pbsCode: "+71" },
      { name: "Agria Dyreforsikring", creditorNo: "95138476", referenceNo: "281736495072918", fikNo: "83456789", debGrNr: "01403", pbsCode: "+71" },
      { name: "Dyrlæge", creditorNo: "75329481", referenceNo: "564738291057192", fikNo: "84567890", debGrNr: "01404", pbsCode: "+71" },
      { name: "Foderbixen", creditorNo: "35748192", referenceNo: "739182645072918", fikNo: "82345679", debGrNr: "01402", pbsCode: "+71" },
      { name: "Petlux", creditorNo: "15937482", referenceNo: "817293846507192", fikNo: "82345680", debGrNr: "01402", pbsCode: "+71" },
      { name: "Hundeglad", creditorNo: "95147382", referenceNo: "928374650192837", fikNo: "81234571", debGrNr: "01401", pbsCode: "+71" }
    ]
  },

  "Fritid & Sport": {
    priority: 15,
    companies: [
      { name: "Sportmaster", creditorNo: "19284736", referenceNo: "584739201657384", fikNo: "33123456", debGrNr: "01501", pbsCode: "+71" },
      { name: "INTERSPORT", creditorNo: "92847561", referenceNo: "927384615029384", fikNo: "33123457", debGrNr: "01501", pbsCode: "+71" },
      { name: "Eventyrsport", creditorNo: "28374659", referenceNo: "715839264102938", fikNo: "34234567", debGrNr: "01502", pbsCode: "+71" },
      { name: "Spejdersport", creditorNo: "83746528", referenceNo: "928374615203847", fikNo: "34234568", debGrNr: "01502", pbsCode: "+71" },
      { name: "Decathlon", creditorNo: "37465197", referenceNo: "617283940576182", fikNo: "33123458", debGrNr: "01501", pbsCode: "+71" },
      { name: "FitnessX", creditorNo: "74651938", referenceNo: "382947561029384", fikNo: "35345678", debGrNr: "01503", pbsCode: "+71" },
      { name: "Cykelpartner", creditorNo: "46519287", referenceNo: "920384716582937", fikNo: "36456789", debGrNr: "01504", pbsCode: "+71" },
      { name: "Løberen", creditorNo: "65192839", referenceNo: "374819205738291", fikNo: "33123459", debGrNr: "01501", pbsCode: "+71" },
      { name: "Friluftsland", creditorNo: "51928376", referenceNo: "582739401657293", fikNo: "34234569", debGrNr: "01502", pbsCode: "+71" },
      { name: "Bikezilla", creditorNo: "19283749", referenceNo: "938475610293847", fikNo: "36456790", debGrNr: "01504", pbsCode: "+71" }
    ]
  },

  "Velgørenhed": {
    priority: 16,
    companies: [
      { name: "Røde Kors", creditorNo: "19283745", referenceNo: "583920174658291", fikNo: "16123456", debGrNr: "01601", pbsCode: "+71" },
      { name: "UNICEF", creditorNo: "28475619", referenceNo: "192847365029384", fikNo: "16123457", debGrNr: "01601", pbsCode: "+71" },
      { name: "Læger uden Grænser", creditorNo: "37591824", referenceNo: "827364510293847", fikNo: "16123458", debGrNr: "01601", pbsCode: "+71" },
      { name: "WWF", creditorNo: "46827139", referenceNo: "384756192847561", fikNo: "17234567", debGrNr: "01602", pbsCode: "+71" },
      { name: "Børns Vilkår", creditorNo: "57938416", referenceNo: "948271635092847", fikNo: "18345678", debGrNr: "01603", pbsCode: "+71" },
      { name: "Kræftens Bekæmpelse", creditorNo: "68394712", referenceNo: "572839461029384", fikNo: "19456789", debGrNr: "01604", pbsCode: "+71" },
      { name: "Folkekirkens Nødhjælp", creditorNo: "79461823", referenceNo: "384756192847392", fikNo: "16123459", debGrNr: "01601", pbsCode: "+71" },
      { name: "PlanBørnefonden", creditorNo: "89573914", referenceNo: "192847563829104", fikNo: "18345679", debGrNr: "01603", pbsCode: "+71" },
      { name: "Red Barnet", creditorNo: "96748321", referenceNo: "475920384756192", fikNo: "18345680", debGrNr: "01603", pbsCode: "+71" },
      { name: "Dyrenes Beskyttelse", creditorNo: "10394857", referenceNo: "928374615203947", fikNo: "17234568", debGrNr: "01602", pbsCode: "+71" }
    ]
  },

  "Offentlige Betalinger": {
    priority: 17,
    companies: [
      { name: "Skat", creditorNo: "19384756", referenceNo: "582947361028473", fikNo: "05123456", debGrNr: "01701", pbsCode: "+71" },
      { name: "SU", creditorNo: "48592017", referenceNo: "947182635091847", fikNo: "06234567", debGrNr: "01702", pbsCode: "+71" },
      { name: "Udbetaling Danmark", creditorNo: "72938415", referenceNo: "384756192847501", fikNo: "05123457", debGrNr: "01701", pbsCode: "+71" },
      { name: "Kommune", creditorNo: "61928374", referenceNo: "572938461029384", fikNo: "05123458", debGrNr: "01701", pbsCode: "+71" },
      { name: "NemKonto", creditorNo: "83746529", referenceNo: "928374615203847", fikNo: "05123459", debGrNr: "01701", pbsCode: "+71" },
      { name: "ATP", creditorNo: "29485716", referenceNo: "384756192847362", fikNo: "07345678", debGrNr: "01703", pbsCode: "+71" },
      { name: "PensionDanmark", creditorNo: "57649283", referenceNo: "102938475619283", fikNo: "07345679", debGrNr: "01703", pbsCode: "+71" },
      { name: "A-kasse", creditorNo: "84937561", referenceNo: "384756192847501", fikNo: "08456789", debGrNr: "01704", pbsCode: "+71" },
      { name: "Jobcenter", creditorNo: "67283914", referenceNo: "928374615029384", fikNo: "08456790", debGrNr: "01704", pbsCode: "+71" },
      { name: "Borger.dk", creditorNo: "38591724", referenceNo: "192847365029384", fikNo: "05123460", debGrNr: "01701", pbsCode: "+71" }
    ]
  },

  "Hobby & Kreativ": {
    priority: 18,
    companies: [
      { name: "Panduro Hobby", creditorNo: "19283741", referenceNo: "384756192847561", fikNo: "95123456", debGrNr: "01801", pbsCode: "+71" },
      { name: "Stof & Stil", creditorNo: "48392015", referenceNo: "928374615203948", fikNo: "95123457", debGrNr: "01801", pbsCode: "+71" },
      { name: "Bog & Idé", creditorNo: "75918246", referenceNo: "572839461029384", fikNo: "96234567", debGrNr: "01802", pbsCode: "+71" },
      { name: "Arnold Busck", creditorNo: "68457391", referenceNo: "384756192847592", fikNo: "96234568", debGrNr: "01802", pbsCode: "+71" },
      { name: "Stof 2000", creditorNo: "92738415", referenceNo: "192847365029384", fikNo: "95123458", debGrNr: "01801", pbsCode: "+71" },
      { name: "Søstrene Grene", creditorNo: "37591824", referenceNo: "847362915384729", fikNo: "97345678", debGrNr: "01803", pbsCode: "+71" },
      { name: "Flying Tiger", creditorNo: "58472916", referenceNo: "938475610294857", fikNo: "97345679", debGrNr: "01803", pbsCode: "+71" },
      { name: "Sketcher", creditorNo: "72938451", referenceNo: "384756192847395", fikNo: "98456789", debGrNr: "01804", pbsCode: "+71" },
      { name: "Papirmuseet", creditorNo: "49182736", referenceNo: "928374615203946", fikNo: "98456790", debGrNr: "01804", pbsCode: "+71" },
      { name: "Hobbii", creditorNo: "83746512", referenceNo: "192847365029481", fikNo: "95123459", debGrNr: "01801", pbsCode: "+71" }
    ]
  }
  };

  return categories;
}

export function findCompanyByAccount(creditorNo, referenceNo, description = "") {
  creditorNo = String(creditorNo).trim();
  referenceNo = String(referenceNo).trim();

  const usersData = loadUsersData();
  const categories = buildCategories(usersData);

  for (const [category, { companies }] of Object.entries(categories)) {
    const company = companies.find(
      c => String(c.creditorNo).trim() === creditorNo && String(c.referenceNo).trim() === referenceNo
    );
    if (company) {
        return {
          name: company.name,
          category,
          creditorNo,
          referenceNo,
          matchType: "Direct match (Company)",
        };
      }
    }

  const allCompanies = Object.entries(categories)
    .filter(([category]) => category !== "Ukendt kategori")
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
        creditorNo,
        referenceNo,
        matchWord: word,
        matchType: "Fuzzy match (word)",
      };
    }
  }

  return {
    name: "Ukendt virksomhed",
    category: "Ukendt kategori",
    creditorNo,
    referenceNo,
    comment: description,
    matchType: "None",
  };
}

export function getCategories() {
  const usersData = loadUsersData();
  return buildCategories(usersData);
}