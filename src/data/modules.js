// Modules data structure - easy to edit manually
// Each module has: { name: string, coef: number, wCC: number, wExam: number }

export const MODULES = {
  Engineer: {
    1: {
      1: [
        { name: "Algorithmique et structure de données 1", coef:5, wCC: 0.4, wExam: 0.6 },
        { name: "Structure machine", coef: 4, wCC: 0.4, wExam: 0.6 },
        { name: "Introduction aux systèmes d’exploitation 1", coef: 3, wCC: 0.6, wExam: 0.4 },
        { name: "Analyse mathématique 1", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Algèbre 1", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Electronique fondamentale", coef: 1, wCC: 0, wExam: 1 },
        { name: "Techniques d’expression écrite et bureautique", coef: 1, wCC: 0.5, wExam: 0.5 },
      ],
      2: [
        { name: "Algorithmique et structure de données 2", coef:4, wCC: 0.4, wExam: 0.6 },
        { name: "Architecture des ordinateurs", coef: 4, wCC: 0.4, wExam: 0.6 },
        { name: "Logique mathématique", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Analyse mathématique 2", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Algèbre 2", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Probabilités et statistique 1", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Techniques d’expression orale", coef: 1, wCC: 0, wExam: 1 },
      ],
    },
    2: {
      1: [
        { name: "Algorithmique et structure de données 3", coef:4, wCC: 0.4, wExam: 0.6 },
        { name: "Programmation orientée objet 1", coef: 4, wCC: 0.4, wExam: 0.6 },
        { name: "Introduction aux Systèmes d’information", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Analyse mathématique 3", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Algèbre 3", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Probabilités et statistique 2", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Entreprenariat", coef: 1, wCC: 0, wExam: 1 },
      ],
      2: [
        { name: "Programmation orientée objet 2", coef:4, wCC: 0.4, wExam: 0.6 },
        { name: "Introduction aux systèmes d’exploitation 2", coef: 4, wCC: 0.4, wExam: 0.6 },
        { name: "Introduction aux réseaux informatiques", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Introduction aux bases de données", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Théorie des langages", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Théorie des graphes", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Déontologie de l’informatique", coef: 1, wCC: 0, wExam: 1 },
      ],
    },
    // Year 3: speciality → { 1: [...], 2: [...] } (Engineer only)
    3: {
      "Software Engineering": {
        1: [
          { name: "Algorithmique et Complexité Avancées", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Génie logiciel", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "BDD : Administration et Architecture", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Système d’Exploitation : Synchronisation et Communication", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Techniques d’Optimisation", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Fondements de l’IA ", coef: 2, wCC: 0.4, wExam: 0.6 }
        ],
        2: [
          { name: "Conception de logiciels", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Programmation WEB", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "BDD : Optimisation et gestion des accès concurrents", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Compilation 1 ", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Analyse numérique", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Introduction à la sécurité Informatique ", coef: 2, wCC: 0.4, wExam: 0.6 }
        ],
      },
      "Intelligence Artificielle": {
        1: [
          { name: "Architecture et administration des BDD", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Compilation", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Programmation Linéaire et Dynamique", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Analyse numérique 1", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Génie logiciel", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Fondements de l'IA", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Conception de jeux vidéo", coef: 2, wCC: 0.4, wExam: 0.6 }
        ],
        2: [
          { name: "Gestion des bases de données réparties", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Système d’Exploitation : Synchronisation et Communication", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Gestion de projets", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Programmation WEB", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Analyse numérique 2", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Introduction à la sécurité Informatique", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Ethique de l'IA", coef: 2, wCC: 0.4, wExam: 0.6 }
        ],
      },
      "Réseaux": {
        1: [
          { name: "Système d’exploitation : Synchronisation et communication", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Réseaux avancés 1", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Bases de données avancées", coef: 6, wCC: 0.4, wExam: 0.6 },
          { name: "Compilation", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "IHM", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Modélisation des systèmes d’information", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Technologie Web", coef: 1, wCC: 0.4, wExam: 0.6 }
        ],
        2: [
          { name: "Systèmes distribués", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Réseaux avancés 2", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Algorithmique et complexité avancées", coef: 6, wCC: 0.4, wExam: 0.6 },
          { name: "Génie logiciel", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Introduction à l’IA", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Analyse numérique", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Économie numérique et veille stratégique", coef: 1, wCC: 0, wExam: 1 }
        ],
      },
      "Science des données": {
        1: [
          { name: "Système d’exploitation : Synchronisation et communication", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Réseaux avancés 1", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Programmation avancée", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Les fondements de l'IA", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Analyse des données", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Génie logiciel", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Fondement des sciences des données", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Modélisation des systèmes d'information", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Technologie Web", coef: 1, wCC: 0.4, wExam: 0.6 },
          { name: "Management de l'innovation", coef: 1, wCC: 0.4, wExam: 0.6 }
        ],
        2: [
          { name: "Bases de données avancées", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Programmation Web Avancée", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Sécurité des données", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Machine Learning 1", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Analyse de données avancée", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Méthodes Numériques", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Cyber sécurité", coef: 1, wCC: 0.4, wExam: 0.6 }
        ],
      },
      "Computer Security": {
        1: [
          { name: "Mathematics Tools for Cryptography", coef: 4, wCC: 0.5, wExam: 0.5 },
          { name: "Operational Research", coef: 4, wCC: 0.5, wExam: 0.5 },
          { name: "Compilation", coef: 5, wCC: 0.5, wExam: 0.5 },
          { name: "Software Engineering", coef: 5, wCC: 0.4, wExam: 0.6 },
          { name: "Advanced Programming", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Web Development", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Theory of Information and Coding", coef: 1, wCC: 0, wExam: 1 },
          { name: "Business Intelligence", coef: 1, wCC: 0, wExam: 1 },
        ],
        2: [
          { name: "Advanced Cryptography", coef: 7, wCC: 0.5, wExam: 0.5 },
          { name: "Modeling and Simulation", coef: 4, wCC: 0.5, wExam: 0.5 },
          { name: "Cloud Computing", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Advanced Databases", coef: 2, wCC: 0.5, wExam: 0.5 },
          { name: "Mobile Development", coef: 4,wCC: 0.4, wExam: 0.6},
          { name: "Digital Signal Processing", coef: 2, wCC: 0.5, wExam: 0.5 },
          { name: "AI Notions and Principles", coef: 1, wCC: 0.4, wExam: 0.6 },
          { name: "Startup and Professional Development", coef: 1, wCC: 0, wExam: 1 }
        ],
      },
      "Systèmes d'information": {
        1: [
          { name: "Bases de données avancées", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Génie logiciel", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Systèmes d’information avancés 1", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "Compilation", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Réseaux et protocoles", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Représentation des connaissances et raisonnement", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Recherche opérationnelle", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Recherche d’information", coef: 2, wCC: 0.4, wExam: 0.6 }
        ],
        2: [
          { name: "Bases de données NoSQL", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Conception de logiciels", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Systèmes d’information avancés 2", coef: 4, wCC: 0.4, wExam: 0.6 },
          { name: "La transformation digitale", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Réseaux avancés", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Web sémantique", coef: 3, wCC: 0.4, wExam: 0.6 },
          { name: "Analyse de Données", coef: 2, wCC: 0.4, wExam: 0.6 },
          { name: "Systèmes de recommandation", coef: 2, wCC: 0.4, wExam: 0.6 }
        ],
      },
    },
  },
  LMD: {
    1: {
      1: [
        { name: "Analyse 1", coef: 4, wCC: 0.4, wExam: 0.6 },
        { name: "Algèbre 1", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Initiation à l’algorithmique", coef: 4, wCC: 0.4, wExam: 0.6 },
        { name: "Terminologie scientifique et expression écrite et orale", coef: 1, wCC: 0.4, wExam: 0.6 },
        { name: "TP Bureautique", coef: 1, wCC: 0.4, wExam: 0.6 },
        { name: "Physique 1 (mécanique du point)", coef: 2, wCC: 0.4, wExam: 0.6},
        { name: "Électronique – composants des systèmes", coef: 1, wCC: 0.4, wExam: 0.6 },
        { name: "Langue anglaise", coef: 1, wCC: 0.4, wExam: 0.6 }
      ],
      2: [
        { name: "Analyse 2", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Algèbre 2", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Introduction aux probabilités et statistique descriptive", coef: 1, wCC: 0.4, wExam: 0.6 },
        { name: "Programmation et structure de données", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Structure machine", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Techniques de l’information et de la communication", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Introduction à la programmation orientée objet", coef: 1, wCC: 0.4, wExam: 0.6 },
        { name: "Physique 2 (électricité générale)", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Histoire des sciences", coef: 1, wCC: 0.4, wExam: 0.6}
      ],
    },
    2: {
      1: [
        { name: "Architecture des ordinateurs", coef: 2, wCC: 0.4, wExam: 0.6  },
        { name: "Algorithmique et structures de données", coef: 3, wCC: 0.4, wExam: 0.6  },
        { name: "Logique mathématique", coef: 2, wCC: 0.4, wExam: 0.6  },
        { name: "Programmation orientée objet", coef: 3, wCC: 0.4, wExam: 0.6  },
        { name: "Systèmes d’information", coef: 3, wCC: 0.4, wExam: 0.6  },
        { name: "Théorie des langages", coef: 2, wCC: 0.4, wExam: 0.6  },
        { name: "Langue étrangère 2", coef: 1, wCC: 0.4, wExam: 0.6 }
      ],
      2: [
        { name: "Bases de données", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Systèmes d’exploitation 1", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Génie logiciel 1", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Théorie des graphes", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Réseaux de communication", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Développement d’applications Web", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Aspects juridiques et économiques des logiciels", coef: 1, wCC: 0.4, wExam: 0.6 },
        { name: "Langue étrangère 3", coef: 1, wCC: 0.4, wExam: 0.6 }
      ],
    },
    3: {
      1: [
        { name: "Systèmes d’exploitation 2", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Compilation", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Programmation logique", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Génie logiciel 2", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Interface Homme-Machine (IHM)", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Probabilités et statistiques", coef: 2, wCC: 0.4, wExam: 0.6},
        { name: "Programmation linéaire", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Intelligence artificielle", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Anglais", coef: 2, wCC: 0.4, wExam: 0.6 }
      ],
      2: [
        { name: "Applications mobiles", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Sécurité informatique", coef: 3, wCC: 0.4, wExam: 0.6 },
        { name: "Administration des bases de données", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Cryptographie", coef: 2, wCC: 0.4, wExam: 0.6 },
        { name: "Projet", coef: 4, wCC: 0.4, wExam: 0.6 },
        { name: "Rédaction scientifique", coef: 2, wCC: 0.4, wExam: 0.6 }
      ],
    },

  },
};
