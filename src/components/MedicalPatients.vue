<script setup lang="ts">
import { ref, computed } from "vue";
import BoundingBoxViewer from "@/components/BoundingBoxViewer.vue";

interface BoundingBoxCoordinates {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  category: string;
}

interface MammographyImage {
  imagePath: string;
  coordinates: BoundingBoxCoordinates[];
  description: string;
}

interface Mammography {
  id: number;
  date: string;
  images: MammographyImage[];
}

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  lastVisit: string;
  mammographies: Mammography[];
}

const mam = [
  {
    id: 1,
    date: "2024-03-15",
    images: [
      {
        imagePath: "/images/20_L_CC.jpg",
        coordinates: [
          {
            xmin: 65.87,
            xmax: 112.85,
            ymin: 178.37,
            ymax: 230.65,
            category: "Mass",
          },
          {
            xmin: 85.3,
            xmax: 101.96,
            ymin: 183.7,
            ymax: 197.64,
            category: "Suspicious_Calcification",
          },
        ],
        description:
          "MediSense model detektirao je  <strong> dvije </strong> radiološki značajne promjene na mamografskoj slici  <strong> lijeve </strong> dojke (projekcija kraniokaudalna – CC).\n\n" +
          "Prva lezija: <strong> masa </strong> u <strong> gornjem unutarnjem kvadrantu </strong>(projekcija: CC), dimenzija približno <strong> 29 mm × 34 mm </strong>, s nepravilnim rubovima i izraženom denzitetnom strukturom. Morfološke karakteristike ukazuju na visoku sumnju na malignitet (<strong> BI-RADS 5 </strong>).\n\n" +
          "Druga lezija: <strong> suspektne mikrokalcifikacije </strong> u središnjoj regiji dojke, u grupiranom rasporedu, dimenzija približno <strong> 10 mm × 9 mm </strong>. Vizualna raspodjela i gustoća odgovaraju kategoriji povećanog rizika <strong> (BI-RADS 4–5) </strong>.\n\n" +
          "Cjelokupan nalaz klasificiran je kao <strong> BI-RADS 5 </strong>, što indicira <strong>visoku vjerojatnost maligniteta </strong>. Preporučuje se <strong> hitna dodatna dijagnostička obrada </strong>:\n" +
          "- Ciljana <strong> ultrazvučna evaluacija obje lezije </strong>.\n" +
          "- <strong> Perkutana biopsija </strong> (core needle ili vakuumska, ovisno o dostupnosti) radi patohistološke verifikacije.\n" +
          "- U slučaju potvrde maligniteta, preporučuje se upućivanje na onkološki konzilij te multidisciplinarno planiranje liječenja.",
      },
      {
        imagePath: "/images/20_L_MLO.jpg",
        coordinates: [
          {
            xmin: 115.41,
            xmax: 170.5,
            ymin: 252.58,
            ymax: 302.6,
            category: "Mass",
          },
          {
            xmin: 103.34,
            xmax: 121.45,
            ymin: 296.71,
            ymax: 307.95,
            category: "Suspicious_Calcification",
          },
        ],
        description:
          "MediSense model detektirao je dvije sumnjive promjene na mamografskoj slici lijeve dojke (mediolateralna koso – MLO projekcija):\n\n" +
          "- Masa lokalizirana u gornjem vanjskom kvadrantu, dimenzija približno 34 mm × 33 mm, s nepravilnim konturama i heterogenom unutarnjom strukturom, radiološki kompatibilna s BI-RADS 5 klasifikacijom.\n" +
          "- Skupina suspektnih mikrokalcifikacija u donjoj regiji dojke, raspoređenih linearnim uzorkom unutar područja od približno 11 mm × 7 mm, što dodatno povećava stupanj sumnje.\n\n" +
          "Ukupna BI-RADS procjena: BI-RADS 5. S obzirom na visoku vjerojatnost maligniteta, preporučuje se:\n" +
          "- Ciljana ultrazvučna obrada obje promjene.\n" +
          "- Histološka verifikacija putem biopsije (core/vacuum-assisted).\n" +
          "- Upućivanje na onkološki konzilij radi daljnje evaluacije i planiranja liječenja.",
      },
      {
        imagePath: "/images/20_R_CC.jpg",
        coordinates: [],
        category: "No_Finding",
        description:
          "MediSense analiza mamografske slike desne dojke (kraniokaudalna – CC projekcija) nije identificirala značajne radiološke abnormalnosti.\n\n" +
          "Nalaz odgovara BI-RADS 2 – benigno. Nisu vidljive mase, mikrokalcifikacije ni arhitektonske distorzije.\n\n" +
          "Preporuka: nastavak redovitog probira sukladno kliničkom kontekstu i dobi pacijentice. Nije potrebna dodatna obrada u ovom trenutku.",
      },
      {
        imagePath: "/images/20_R_MLO.jpg",
        coordinates: [],
        category: "No_Finding",
        description:
          "Na mamografskoj slici desne dojke (MLO projekcija) MediSense model nije detektirao patološke promjene.\n\n" +
          "Nalaz je klasificiran kao BI-RADS 2, bez prisutnih masa, mikrokalcifikacija ni znakova maligniteta.\n\n" +
          "Preporuka: redoviti kontrolni pregledi, u skladu s preporukama za mamografski probir.",
      },
    ],
  },
  {
    id: 2,
    date: "2024-06-15",
    images: [
      {
        imagePath: "/images/11_L_CC.jpg",
        coordinates: [],
        category: "No_Finding",
        description:
          "MediSense analiza kraniokaudalne (CC) projekcije lijeve dojke nije otkrila nikakve radiološki značajne promjene. Nema vidljivih masa, kalcifikacija, asimetrija ni arhitektonske distorzije.\n\n" +
          "Nalaz klasificiran kao BI-RADS 1 – negativan (uredan nalaz).\n\n" +
          "Preporuka: redovito mamografsko praćenje i nastavak probira prema dobi i individualnom riziku.",
      },
      {
        imagePath: "/images/11_L_MLO.jpg",
        coordinates: [],
        category: "No_Finding",
        description:
          "Na mediolateralno-kosoj (MLO) projekciji lijeve dojke MediSense model nije identificirao nikakve sumnjive promjene. Parenhim homogen, bez fokalnih lezija ili mikrokalcifikacija.\n\n" +
          "Klasifikacija: BI-RADS 1 – uredan nalaz.\n\n" +
          "Preporuka: nastavak probira prema standardnim smjernicama.",
      },
      {
        imagePath: "/images/11_R_CC.jpg",
        coordinates: [],
        category: "No_Finding",
        description:
          "MediSense analiza kraniokaudalne (CC) projekcije desne dojke nije pokazala postojanje značajnih patoloških nalaza. Dojka je morfološki uredna, bez detektiranih abnormalnosti.\n\n" +
          "Klasifikacija: BI-RADS 1.\n\n" +
          "Preporuka: nastavak rutinskog probira.",
      },
      {
        imagePath: "/images/11_R_MLO.jpg",
        coordinates: [],
        category: "No_Finding",
        description:
          "Na MLO projekciji desne dojke nalaz je uredan – bez fokalnih asimetrija, masa ni mikrokalcifikacija. Nema indikacija za dodatnu dijagnostiku.\n\n" +
          "Klasifikacija: BI-RADS 1 – negativan nalaz.\n\n" +
          "Preporuka: redovito praćenje i nastavak probira sukladno dobi i individualnom riziku.",
      },
    ],
  },
  {
    id: 3,
    date: "2025-01-15",
    images: [
      {
        imagePath: "/images/43_L_CC.jpg",
        coordinates: [
          {
            xmin: 16.16,
            xmax: 59.01,
            ymin: 266.91,
            ymax: 316.0,
            category: "Focal_Asymmetry",
          },
        ],
      },
      {
        imagePath: "/images/43_L_MLO.jpg",
        coordinates: [
          {
            xmin: 23.89,
            xmax: 58.12,
            ymin: 253.16,
            ymax: 287.91,
            category: "Focal_Asymmetry",
          },
        ],
      },
      {
        imagePath: "/images/43_R_CC.jpg",
        coordinates: [],
        category: "No_Finding",
      },
      {
        imagePath: "/images/43_R_MLO.jpg",
        coordinates: [],
        category: "No_Finding",
      },
    ],
  },
];

const generateMammographies = () => mam;

const patients = ref<Patient[]>([
  {
    id: 1,
    firstName: "Ivana",
    lastName: "Ivandić",
    age: 45,
    lastVisit: "2024-03-15",
    mammographies: generateMammographies(),
  },
  {
    id: 2,
    firstName: "Doris",
    lastName: "Dorotić",
    age: 52,
    lastVisit: "2024-02-28",
    mammographies: generateMammographies(),
  },
  {
    id: 3,
    firstName: "Monika",
    lastName: "Jurić",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 4,
    firstName: "Katarina",
    lastName: "Pašalić",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 5,
    firstName: "Josipa",
    lastName: "Kavez",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 6,
    firstName: "Dorotea",
    lastName: "Lukić",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 7,
    firstName: "Hana",
    lastName: "Žunar",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 8,
    firstName: "Klara",
    lastName: "Smolčić",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 9,
    firstName: "Veronika",
    lastName: "Bunar",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 10,
    firstName: "Andrea",
    lastName: "Kovač",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 11,
    firstName: "Mirna",
    lastName: "Rokvić",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 12,
    firstName: "Klara",
    lastName: "Mileusnić Grgurić",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 13,
    firstName: "Antea",
    lastName: "Ljubičić",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 14,
    firstName: "Petra",
    lastName: "Zvonar",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 15,
    firstName: "Lucija",
    lastName: "Brnabić",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 16,
    firstName: "Marta",
    lastName: "Fulj",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 17,
    firstName: "Tea",
    lastName: "Bakić",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 18,
    firstName: "Hrvojka",
    lastName: "Hrast",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 19,
    firstName: "Cvita",
    lastName: "Cikotić",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 20,
    firstName: "Katarina",
    lastName: "Hrkać",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 21,
    firstName: "Vera",
    lastName: "Zorić",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 22,
    firstName: "Klara",
    lastName: "Blažević",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
  {
    id: 23,
    firstName: "Željka",
    lastName: "Marasović",
    age: 37,
    lastVisit: "2024-01-20",
    mammographies: generateMammographies(),
  },
]);

const sortedPatients = computed(() => {
  return [...patients.value].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );
});

const selectedPatient = ref<Patient | null>(null);
const selectedImages = ref<MammographyImage[] | []>([]);
const selectedImage = ref<MammographyImage | null>(null);
const searchQuery = ref("");

const selectPatient = (patient: Patient) => {
  selectedPatient.value = patient;
  selectedImages.value =
    patient.mammographies.length > 0 ? patient.mammographies[0].images : [];
  selectedImage.value = selectedImages.value[0];
};

const selectMammography = (mammography: Mammography) => {
  selectedImages.value = mammography.images;
  selectedImage.value = mammography.images[0];
};

const filteredPatients = computed(() => {
  return sortedPatients.value.filter((patient) => {
    const fullName = `${patient.firstName.toLowerCase()} ${patient.lastName.toLowerCase()}`;
    return fullName.includes(searchQuery.value.toLowerCase());
  });
});
</script>

<template>
  <div class="container">
    <!-- Left Panel: Patient List -->
    <div class="patients-list">
      <h2>Moji pacijenti</h2>
      <input
        v-model="searchQuery"
        type="text"
        class="search-bar"
        placeholder="Pretraži pacijente..."
      />

      <div class="patient-list-scrollable">
        <div
          v-for="patient in filteredPatients"
          :key="patient.id"
          class="patient-card"
          :class="{ 'selected-patient': patient.id === selectedPatient?.id }"
          @click="selectPatient(patient)"
        >
          <p class="patient-name">
            {{ patient.lastName }} {{ patient.firstName }}
          </p>
        </div>
      </div>
    </div>

    <!-- Right Panel: Patient Details -->
    <div class="patient-details">
      <div v-if="selectedPatient" class="details-container">
        <!-- Left Section: Patient Info & Mammography List -->
        <div class="left-section">
          <div class="patient-info">
            <h3>
              {{ selectedPatient.firstName }} {{ selectedPatient.lastName }}
            </h3>
            <p><strong>Dob:</strong> {{ selectedPatient.age }}</p>
            <p>
              <strong>Zadnja posjeta:</strong> {{ selectedPatient.lastVisit }}
            </p>
          </div>

          <div class="mammography-list">
            <h3>Mamografije</h3>
            <ul>
              <li
                v-for="mammography in selectedPatient.mammographies"
                :key="mammography.id"
                :class="{ selected: selectedImages === mammography.images }"
                @click="selectMammography(mammography)"
              >
                {{ mammography.date }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Section: Image Display -->
        <div class="right-section">
          <!-- Image Gallery (Grid) -->
          <div v-if="selectedImages.length" class="image-gallery">
            <div
              v-for="image in selectedImages"
              :key="image.imagePath"
              class="image-container"
              :class="{ 'image-selected': image === selectedImage }"
              @click="selectedImage = image"
            >
              <img
                :src="image.imagePath"
                alt="Mammography Image"
                class="logo"
              />
            </div>
          </div>
          <p v-else class="placeholder">Nema odabrane slike</p>

          <!-- Enlarged Image with Multiple Bounding Boxes -->
          <div v-if="selectedImage">
            <BoundingBoxViewer :image="selectedImage" />
          </div>
        </div>
      </div>

      <div v-else class="placeholder">
        <p>Odaberite pacijenta za pregled detalja</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Main Layout */
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 10px;
  background: #f8f9fa;
  overflow: hidden;
}

/* Patients List */
.patients-list {
  width: 20%;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 95%;
}

.patients-list h2 {
  text-align: center;
  margin-bottom: 10px;
  position: sticky;
  top: 0;
  background: white;
  padding: 10px 0;
  z-index: 10;
  border-bottom: 2px solid #ddd;
}

.patient-list-scrollable {
  flex-grow: 1;
  overflow-y: auto;
  max-height: calc(100vh - 80px);
  padding-right: 5px;
}

.patient-card {
  padding: 20px;
  margin: 5px 0;
  border-radius: 5px;
  background: #e8b4a3;
  color: black;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  font-size: 20px;
}

.selected-patient {
  background-color: #bd7158;
  color: white;
  font-weight: bold;
}

.patient-card:hover {
  background: #b78270;
}

/* Patient Details */
.patient-details {
  display: flex;
  gap: 20px;
  padding: 20px;
  width: 80%;
}

.details-container {
  display: flex;
  width: 100%;
}

.left-section {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.mammography-list {
  background: #e8e8e8;
  padding: 10px;
  border-radius: 8px;
}

.mammography-list ul {
  list-style: none;
  padding: 0;
}

.mammography-list li {
  cursor: pointer;
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 5px;
  transition: background 0.3s, color 0.3s;
}

.mammography-list li.selected {
  background: #bd7158;
  color: white;
  font-weight: bold;
}

.mammography-list li:hover {
  background: #d0d0d0;
}

.right-section {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  padding: 10px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;
  padding: 5px;
  border-radius: 8px;
}

.image-container img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.placeholder {
  text-align: center;
  font-style: bold;
  font-size: 25px;
}

/* Search Bar */
.search-bar {
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border 0.2s ease-in-out;
}

.search-bar:focus {
  border-color: #c43c5e;
}

.image-selected {
  border: 3px solid #bd7158;
  border-radius: 8px;
  padding: 2px;
}
</style>
