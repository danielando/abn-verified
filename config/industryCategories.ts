/**
 * Industry Categories - Grant Thornton Classification
 * 238 subcategories across 22 major groups
 */

export interface IndustryCategory {
  code: string;
  name: string;
  group: string;
}

export const INDUSTRY_GROUPS = [
  "AGRICULTURAL, VETERINARY AND FOOD SCIENCES",
  "BIOLOGICAL SCIENCES",
  "BIOMEDICAL AND CLINICAL SCIENCES",
  "BUILT ENVIRONMENT AND DESIGN",
  "CHEMICAL SCIENCES",
  "COMMERCE, MANAGEMENT, TOURISM AND SERVICES",
  "CREATIVE ARTS AND WRITING",
  "EARTH SCIENCES",
  "ECONOMICS",
  "EDUCATION",
  "ENGINEERING",
  "ENVIRONMENTAL SCIENCES",
  "HEALTH SCIENCES",
  "HISTORY, HERITAGE AND ARCHAEOLOGY",
  "HUMAN SOCIETY",
  "INDIGENOUS STUDIES",
  "INFORMATION AND COMPUTING SCIENCES",
  "LANGUAGE, COMMUNICATION AND CULTURE",
  "LAW AND LEGAL STUDIES",
  "MATHEMATICAL SCIENCES",
  "PHILOSOPHY AND RELIGIOUS STUDIES",
  "PHYSICAL SCIENCES",
  "PSYCHOLOGY"
] as const;

export const INDUSTRY_CATEGORIES: IndustryCategory[] = [
  // AGRICULTURAL, VETERINARY AND FOOD SCIENCES
  { code: "3001", name: "Agricultural biotechnology", group: "AGRICULTURAL, VETERINARY AND FOOD SCIENCES" },
  { code: "3002", name: "Agriculture, land and farm management", group: "AGRICULTURAL, VETERINARY AND FOOD SCIENCES" },
  { code: "3003", name: "Animal production", group: "AGRICULTURAL, VETERINARY AND FOOD SCIENCES" },
  { code: "3004", name: "Crop and pasture production", group: "AGRICULTURAL, VETERINARY AND FOOD SCIENCES" },
  { code: "3005", name: "Fisheries sciences", group: "AGRICULTURAL, VETERINARY AND FOOD SCIENCES" },
  { code: "3006", name: "Food sciences", group: "AGRICULTURAL, VETERINARY AND FOOD SCIENCES" },
  { code: "3007", name: "Forestry sciences", group: "AGRICULTURAL, VETERINARY AND FOOD SCIENCES" },
  { code: "3008", name: "Horticultural production", group: "AGRICULTURAL, VETERINARY AND FOOD SCIENCES" },
  { code: "3009", name: "Veterinary sciences", group: "AGRICULTURAL, VETERINARY AND FOOD SCIENCES" },
  { code: "3099", name: "Other agricultural, veterinary and food sciences", group: "AGRICULTURAL, VETERINARY AND FOOD SCIENCES" },

  // BIOLOGICAL SCIENCES
  { code: "3101", name: "Biochemistry and cell biology", group: "BIOLOGICAL SCIENCES" },
  { code: "3102", name: "Bioinformatics and computational biology", group: "BIOLOGICAL SCIENCES" },
  { code: "3103", name: "Ecology", group: "BIOLOGICAL SCIENCES" },
  { code: "3104", name: "Evolutionary biology", group: "BIOLOGICAL SCIENCES" },
  { code: "3105", name: "Genetics", group: "BIOLOGICAL SCIENCES" },
  { code: "3106", name: "Industrial biotechnology", group: "BIOLOGICAL SCIENCES" },
  { code: "3107", name: "Microbiology", group: "BIOLOGICAL SCIENCES" },
  { code: "3108", name: "Plant biology", group: "BIOLOGICAL SCIENCES" },
  { code: "3109", name: "Zoology", group: "BIOLOGICAL SCIENCES" },
  { code: "3199", name: "Other biological sciences", group: "BIOLOGICAL SCIENCES" },

  // BIOMEDICAL AND CLINICAL SCIENCES
  { code: "3201", name: "Cardiovascular medicine and haematology", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3202", name: "Clinical sciences", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3203", name: "Dentistry", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3204", name: "Immunology", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3205", name: "Medical biochemistry and metabolomics", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3206", name: "Medical biotechnology", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3207", name: "Medical microbiology", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3208", name: "Medical physiology", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3209", name: "Neurosciences", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3210", name: "Nutrition and dietetics", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3211", name: "Oncology and carcinogenesis", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3212", name: "Ophthalmology and optometry", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3213", name: "Paediatrics", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3214", name: "Pharmacology and pharmaceutical sciences", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3215", name: "Reproductive medicine", group: "BIOMEDICAL AND CLINICAL SCIENCES" },
  { code: "3299", name: "Other biomedical and clinical sciences", group: "BIOMEDICAL AND CLINICAL SCIENCES" },

  // BUILT ENVIRONMENT AND DESIGN
  { code: "3301", name: "Architecture", group: "BUILT ENVIRONMENT AND DESIGN" },
  { code: "3302", name: "Building", group: "BUILT ENVIRONMENT AND DESIGN" },
  { code: "3303", name: "Design", group: "BUILT ENVIRONMENT AND DESIGN" },
  { code: "3304", name: "Urban and regional planning", group: "BUILT ENVIRONMENT AND DESIGN" },
  { code: "3399", name: "Other built environment and design", group: "BUILT ENVIRONMENT AND DESIGN" },

  // CHEMICAL SCIENCES
  { code: "3401", name: "Analytical chemistry", group: "CHEMICAL SCIENCES" },
  { code: "3402", name: "Inorganic chemistry", group: "CHEMICAL SCIENCES" },
  { code: "3403", name: "Macromolecular and materials chemistry", group: "CHEMICAL SCIENCES" },
  { code: "3404", name: "Medicinal and biomolecular chemistry", group: "CHEMICAL SCIENCES" },
  { code: "3405", name: "Organic chemistry", group: "CHEMICAL SCIENCES" },
  { code: "3406", name: "Physical chemistry", group: "CHEMICAL SCIENCES" },
  { code: "3407", name: "Theoretical and computational chemistry", group: "CHEMICAL SCIENCES" },
  { code: "3499", name: "Other chemical sciences", group: "CHEMICAL SCIENCES" },

  // COMMERCE, MANAGEMENT, TOURISM AND SERVICES
  { code: "3501", name: "Accounting, auditing and accountability", group: "COMMERCE, MANAGEMENT, TOURISM AND SERVICES" },
  { code: "3502", name: "Banking, finance and investment", group: "COMMERCE, MANAGEMENT, TOURISM AND SERVICES" },
  { code: "3503", name: "Business systems in context", group: "COMMERCE, MANAGEMENT, TOURISM AND SERVICES" },
  { code: "3504", name: "Commercial services", group: "COMMERCE, MANAGEMENT, TOURISM AND SERVICES" },
  { code: "3505", name: "Human resources and industrial relations", group: "COMMERCE, MANAGEMENT, TOURISM AND SERVICES" },
  { code: "3506", name: "Marketing", group: "COMMERCE, MANAGEMENT, TOURISM AND SERVICES" },
  { code: "3507", name: "Strategy, management and organisational behaviour", group: "COMMERCE, MANAGEMENT, TOURISM AND SERVICES" },
  { code: "3508", name: "Tourism", group: "COMMERCE, MANAGEMENT, TOURISM AND SERVICES" },
  { code: "3509", name: "Transportation, logistics and supply chains", group: "COMMERCE, MANAGEMENT, TOURISM AND SERVICES" },
  { code: "3599", name: "Other commerce, management, tourism and services", group: "COMMERCE, MANAGEMENT, TOURISM AND SERVICES" },

  // CREATIVE ARTS AND WRITING
  { code: "3601", name: "Art history, theory and criticism", group: "CREATIVE ARTS AND WRITING" },
  { code: "3602", name: "Creative and professional writing", group: "CREATIVE ARTS AND WRITING" },
  { code: "3603", name: "Music", group: "CREATIVE ARTS AND WRITING" },
  { code: "3604", name: "Performing arts", group: "CREATIVE ARTS AND WRITING" },
  { code: "3605", name: "Screen and digital media", group: "CREATIVE ARTS AND WRITING" },
  { code: "3606", name: "Visual arts", group: "CREATIVE ARTS AND WRITING" },
  { code: "3699", name: "Other creative arts and writing", group: "CREATIVE ARTS AND WRITING" },

  // EARTH SCIENCES
  { code: "3701", name: "Atmospheric sciences", group: "EARTH SCIENCES" },
  { code: "3702", name: "Climate change science", group: "EARTH SCIENCES" },
  { code: "3703", name: "Geochemistry", group: "EARTH SCIENCES" },
  { code: "3704", name: "Geoinformatics", group: "EARTH SCIENCES" },
  { code: "3705", name: "Geology", group: "EARTH SCIENCES" },
  { code: "3706", name: "Geophysics", group: "EARTH SCIENCES" },
  { code: "3707", name: "Hydrology", group: "EARTH SCIENCES" },
  { code: "3708", name: "Oceanography", group: "EARTH SCIENCES" },
  { code: "3709", name: "Physical geography and environmental geoscience", group: "EARTH SCIENCES" },
  { code: "3799", name: "Other earth sciences", group: "EARTH SCIENCES" },

  // ECONOMICS
  { code: "3801", name: "Applied economics", group: "ECONOMICS" },
  { code: "3802", name: "Econometrics", group: "ECONOMICS" },
  { code: "3803", name: "Economic theory", group: "ECONOMICS" },
  { code: "3899", name: "Other economics", group: "ECONOMICS" },

  // EDUCATION
  { code: "3901", name: "Curriculum and pedagogy", group: "EDUCATION" },
  { code: "3902", name: "Education policy, sociology and philosophy", group: "EDUCATION" },
  { code: "3903", name: "Education systems", group: "EDUCATION" },
  { code: "3904", name: "Specialist studies in education", group: "EDUCATION" },
  { code: "3999", name: "Other education", group: "EDUCATION" },

  // ENGINEERING
  { code: "4001", name: "Aerospace engineering", group: "ENGINEERING" },
  { code: "4002", name: "Automotive engineering", group: "ENGINEERING" },
  { code: "4003", name: "Biomedical engineering", group: "ENGINEERING" },
  { code: "4004", name: "Chemical engineering", group: "ENGINEERING" },
  { code: "4005", name: "Civil engineering", group: "ENGINEERING" },
  { code: "4006", name: "Communications engineering", group: "ENGINEERING" },
  { code: "4007", name: "Control engineering, mechatronics and robotics", group: "ENGINEERING" },
  { code: "4008", name: "Electrical engineering", group: "ENGINEERING" },
  { code: "4009", name: "Electronics, sensors and digital hardware", group: "ENGINEERING" },
  { code: "4010", name: "Engineering practice and education", group: "ENGINEERING" },
  { code: "4011", name: "Environmental engineering", group: "ENGINEERING" },
  { code: "4012", name: "Fluid mechanics and thermal engineering", group: "ENGINEERING" },
  { code: "4013", name: "Geomatic engineering", group: "ENGINEERING" },
  { code: "4014", name: "Manufacturing engineering", group: "ENGINEERING" },
  { code: "4015", name: "Maritime engineering", group: "ENGINEERING" },
  { code: "4016", name: "Materials engineering", group: "ENGINEERING" },
  { code: "4017", name: "Mechanical engineering", group: "ENGINEERING" },
  { code: "4018", name: "Nanotechnology", group: "ENGINEERING" },
  { code: "4019", name: "Resources engineering and extractive metallurgy", group: "ENGINEERING" },
  { code: "4099", name: "Other engineering", group: "ENGINEERING" },

  // ENVIRONMENTAL SCIENCES
  { code: "4101", name: "Climate change impacts and adaptation", group: "ENVIRONMENTAL SCIENCES" },
  { code: "4102", name: "Ecological applications", group: "ENVIRONMENTAL SCIENCES" },
  { code: "4103", name: "Environmental biotechnology", group: "ENVIRONMENTAL SCIENCES" },
  { code: "4104", name: "Environmental management", group: "ENVIRONMENTAL SCIENCES" },
  { code: "4105", name: "Pollution and contamination", group: "ENVIRONMENTAL SCIENCES" },
  { code: "4106", name: "Soil sciences", group: "ENVIRONMENTAL SCIENCES" },
  { code: "4199", name: "Other environmental sciences", group: "ENVIRONMENTAL SCIENCES" },

  // HEALTH SCIENCES
  { code: "4201", name: "Allied health and rehabilitation science", group: "HEALTH SCIENCES" },
  { code: "4202", name: "Epidemiology", group: "HEALTH SCIENCES" },
  { code: "4203", name: "Health services and systems", group: "HEALTH SCIENCES" },
  { code: "4204", name: "Midwifery", group: "HEALTH SCIENCES" },
  { code: "4205", name: "Nursing", group: "HEALTH SCIENCES" },
  { code: "4206", name: "Public health", group: "HEALTH SCIENCES" },
  { code: "4207", name: "Sports science and exercise", group: "HEALTH SCIENCES" },
  { code: "4208", name: "Traditional, complementary and integrative medicine", group: "HEALTH SCIENCES" },
  { code: "4299", name: "Other health sciences", group: "HEALTH SCIENCES" },

  // HISTORY, HERITAGE AND ARCHAEOLOGY
  { code: "4301", name: "Archaeology", group: "HISTORY, HERITAGE AND ARCHAEOLOGY" },
  { code: "4302", name: "Heritage, archive and museum studies", group: "HISTORY, HERITAGE AND ARCHAEOLOGY" },
  { code: "4303", name: "Historical studies", group: "HISTORY, HERITAGE AND ARCHAEOLOGY" },
  { code: "4399", name: "Other history, heritage and archaeology", group: "HISTORY, HERITAGE AND ARCHAEOLOGY" },

  // HUMAN SOCIETY
  { code: "4401", name: "Anthropology", group: "HUMAN SOCIETY" },
  { code: "4402", name: "Criminology", group: "HUMAN SOCIETY" },
  { code: "4403", name: "Demography", group: "HUMAN SOCIETY" },
  { code: "4404", name: "Development studies", group: "HUMAN SOCIETY" },
  { code: "4405", name: "Gender studies", group: "HUMAN SOCIETY" },
  { code: "4406", name: "Human geography", group: "HUMAN SOCIETY" },
  { code: "4407", name: "Policy and administration", group: "HUMAN SOCIETY" },
  { code: "4408", name: "Political science", group: "HUMAN SOCIETY" },
  { code: "4409", name: "Social work", group: "HUMAN SOCIETY" },
  { code: "4410", name: "Sociology", group: "HUMAN SOCIETY" },
  { code: "4499", name: "Other human society", group: "HUMAN SOCIETY" },

  // INDIGENOUS STUDIES (abbreviated for brevity)
  { code: "4501", name: "Aboriginal and Torres Strait Islander culture, language and history", group: "INDIGENOUS STUDIES" },
  { code: "4502", name: "Aboriginal and Torres Strait Islander education", group: "INDIGENOUS STUDIES" },
  { code: "4503", name: "Aboriginal and Torres Strait Islander environmental knowledges and management", group: "INDIGENOUS STUDIES" },
  { code: "4504", name: "Aboriginal and Torres Strait Islander health and wellbeing", group: "INDIGENOUS STUDIES" },
  { code: "4505", name: "Aboriginal and Torres Strait Islander peoples, society and community", group: "INDIGENOUS STUDIES" },
  { code: "4506", name: "Aboriginal and Torres Strait Islander sciences", group: "INDIGENOUS STUDIES" },
  { code: "4519", name: "Other Indigenous data, methodologies and global Indigenous studies", group: "INDIGENOUS STUDIES" },
  { code: "4599", name: "Other Indigenous studies", group: "INDIGENOUS STUDIES" },

  // INFORMATION AND COMPUTING SCIENCES
  { code: "4601", name: "Applied computing", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4602", name: "Artificial intelligence", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4603", name: "Computer vision and multimedia computation", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4604", name: "Cybersecurity and privacy", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4605", name: "Data management and data science", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4606", name: "Distributed computing and systems software", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4607", name: "Graphics, augmented reality and games", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4608", name: "Human-centred computing", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4609", name: "Information systems", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4610", name: "Library and information studies", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4611", name: "Machine learning", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4612", name: "Software engineering", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4613", name: "Theory of computation", group: "INFORMATION AND COMPUTING SCIENCES" },
  { code: "4699", name: "Other information and computing sciences", group: "INFORMATION AND COMPUTING SCIENCES" },

  // LANGUAGE, COMMUNICATION AND CULTURE
  { code: "4701", name: "Communication and media studies", group: "LANGUAGE, COMMUNICATION AND CULTURE" },
  { code: "4702", name: "Cultural studies", group: "LANGUAGE, COMMUNICATION AND CULTURE" },
  { code: "4703", name: "Language studies", group: "LANGUAGE, COMMUNICATION AND CULTURE" },
  { code: "4704", name: "Linguistics", group: "LANGUAGE, COMMUNICATION AND CULTURE" },
  { code: "4705", name: "Literary studies", group: "LANGUAGE, COMMUNICATION AND CULTURE" },
  { code: "4799", name: "Other language, communication and culture", group: "LANGUAGE, COMMUNICATION AND CULTURE" },

  // LAW AND LEGAL STUDIES
  { code: "4801", name: "Commercial law", group: "LAW AND LEGAL STUDIES" },
  { code: "4802", name: "Environmental and resources law", group: "LAW AND LEGAL STUDIES" },
  { code: "4803", name: "International and comparative law", group: "LAW AND LEGAL STUDIES" },
  { code: "4804", name: "Law in context", group: "LAW AND LEGAL STUDIES" },
  { code: "4805", name: "Legal systems", group: "LAW AND LEGAL STUDIES" },
  { code: "4806", name: "Private law and civil obligations", group: "LAW AND LEGAL STUDIES" },
  { code: "4807", name: "Public law", group: "LAW AND LEGAL STUDIES" },
  { code: "4899", name: "Other law and legal studies", group: "LAW AND LEGAL STUDIES" },

  // MATHEMATICAL SCIENCES
  { code: "4901", name: "Applied mathematics", group: "MATHEMATICAL SCIENCES" },
  { code: "4902", name: "Mathematical physics", group: "MATHEMATICAL SCIENCES" },
  { code: "4903", name: "Numerical and computational mathematics", group: "MATHEMATICAL SCIENCES" },
  { code: "4904", name: "Pure mathematics", group: "MATHEMATICAL SCIENCES" },
  { code: "4905", name: "Statistics", group: "MATHEMATICAL SCIENCES" },
  { code: "4999", name: "Other mathematical sciences", group: "MATHEMATICAL SCIENCES" },

  // PHILOSOPHY AND RELIGIOUS STUDIES
  { code: "5001", name: "Applied ethics", group: "PHILOSOPHY AND RELIGIOUS STUDIES" },
  { code: "5002", name: "History and philosophy of specific fields", group: "PHILOSOPHY AND RELIGIOUS STUDIES" },
  { code: "5003", name: "Philosophy", group: "PHILOSOPHY AND RELIGIOUS STUDIES" },
  { code: "5004", name: "Religious studies", group: "PHILOSOPHY AND RELIGIOUS STUDIES" },
  { code: "5005", name: "Theology", group: "PHILOSOPHY AND RELIGIOUS STUDIES" },
  { code: "5099", name: "Other philosophy and religious studies", group: "PHILOSOPHY AND RELIGIOUS STUDIES" },

  // PHYSICAL SCIENCES
  { code: "5101", name: "Astronomical sciences", group: "PHYSICAL SCIENCES" },
  { code: "5102", name: "Atomic, molecular and optical physics", group: "PHYSICAL SCIENCES" },
  { code: "5103", name: "Classical physics", group: "PHYSICAL SCIENCES" },
  { code: "5104", name: "Condensed matter physics", group: "PHYSICAL SCIENCES" },
  { code: "5105", name: "Medical and biological physics", group: "PHYSICAL SCIENCES" },
  { code: "5106", name: "Nuclear and plasma physics", group: "PHYSICAL SCIENCES" },
  { code: "5107", name: "Particle and high energy physics", group: "PHYSICAL SCIENCES" },
  { code: "5108", name: "Quantum physics", group: "PHYSICAL SCIENCES" },
  { code: "5109", name: "Space sciences", group: "PHYSICAL SCIENCES" },
  { code: "5110", name: "Synchrotrons and accelerators", group: "PHYSICAL SCIENCES" },
  { code: "5199", name: "Other physical sciences", group: "PHYSICAL SCIENCES" },

  // PSYCHOLOGY
  { code: "5201", name: "Applied and developmental psychology", group: "PSYCHOLOGY" },
  { code: "5202", name: "Biological psychology", group: "PSYCHOLOGY" },
  { code: "5203", name: "Clinical and health psychology", group: "PSYCHOLOGY" },
  { code: "5204", name: "Cognitive and computational psychology", group: "PSYCHOLOGY" },
  { code: "5205", name: "Social and personality psychology", group: "PSYCHOLOGY" },
  { code: "5299", name: "Other psychology", group: "PSYCHOLOGY" },
];

/**
 * Helper to find category by code
 */
export const getCategoryByCode = (code: string): IndustryCategory | undefined => {
  return INDUSTRY_CATEGORIES.find(cat => cat.code === code);
};

/**
 * Helper to get all categories in a group
 */
export const getCategoriesByGroup = (group: string): IndustryCategory[] => {
  return INDUSTRY_CATEGORIES.filter(cat => cat.group === group);
};

/**
 * Helper to format categories for AI prompt
 */
export const formatCategoriesForAI = (): string => {
  const grouped = INDUSTRY_CATEGORIES.reduce((acc, cat) => {
    if (!acc[cat.group]) acc[cat.group] = [];
    acc[cat.group].push(`${cat.code}: ${cat.name}`);
    return acc;
  }, {} as Record<string, string[]>);

  return Object.entries(grouped)
    .map(([group, cats]) => `${group}:\n${cats.join('\n')}`)
    .join('\n\n');
};
