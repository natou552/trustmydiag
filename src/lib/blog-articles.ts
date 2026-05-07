export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  dateISO: string;
  category: string;
  readingTime: number;
  excerpt: string;
  author: string;
  authorRole: string;
  content: Section[];
};

export type Section = {
  type: "h2" | "h3" | "p" | "ul" | "cta";
  text?: string;
  items?: string[];
};

export const articles: Article[] = [
  {
    slug: "second-avis-dentaire",
    title: "Pourquoi demander un second avis dentaire ?",
    metaTitle: "Second avis dentaire : quand et pourquoi le demander ? | TrustMyDiag",
    metaDescription:
      "Implants, couronnes, prothèses : avant d'accepter un devis dentaire élevé, un second avis de spécialiste peut vous éviter des traitements inutiles et vous faire économiser des centaines d'euros. Guide complet.",
    date: "12 avril 2025",
    dateISO: "2025-04-12",
    category: "Dentaire",
    readingTime: 6,
    excerpt:
      "Avant d'accepter un devis pour des implants ou une couronne, un second regard de spécialiste peut vous éviter des traitements inutiles et vous faire économiser plusieurs centaines d'euros.",
    author: "Dr. Robert Benguigui",
    authorRole: "Chirurgien-dentiste — N° RPPS 10000111715",
    content: [
      {
        type: "p",
        text: "Vous venez de recevoir un devis dentaire à quatre chiffres pour des implants, des couronnes ou une prothèse complète. Votre premier réflexe est peut-être de faire confiance à votre dentiste habituel. Mais saviez-vous que les plans de traitement dentaire varient considérablement d'un praticien à l'autre, et que certains traitements proposés ne sont pas toujours les plus adaptés à votre situation ?",
      },
      {
        type: "h2",
        text: "Dans quels cas demander un second avis dentaire ?",
      },
      {
        type: "p",
        text: "Il existe des situations précises où consulter un autre chirurgien-dentiste avant de commencer un traitement est non seulement recommandé, mais peut s'avérer essentiel pour votre santé et votre portefeuille.",
      },
      {
        type: "ul",
        items: [
          "Devis supérieur à 500 € pour des couronnes, bridges ou prothèses",
          "Proposition d'extraction d'une dent sans alternative conservatrice clairement expliquée",
          "Plan d'implants multiples sans examen radiologique (panoramique ou cone beam) récent",
          "Traitement parodontal (chirurgie des gencives) sans bilan préalable complet",
          "Doute sur la nécessité d'un traitement canalaire (dévitalisation)",
          "Proposition de chirurgie orthognatique ou de redressement de mâchoire",
        ],
      },
      {
        type: "h2",
        text: "Les écarts de devis : une réalité documentée",
      },
      {
        type: "p",
        text: "Une étude de la DGCCRF (Direction générale de la concurrence, de la consommation et de la répression des fraudes) a révélé des écarts de devis allant de 1 à 4 pour un même implant dentaire selon les cabinets consultés. Pour une couronne céramique, le tarif peut varier de 400 € à plus de 1 200 € en France.",
      },
      {
        type: "p",
        text: "Ces écarts ne reflètent pas toujours une différence de qualité. Ils tiennent souvent au matériau choisi, au laboratoire de prothèse utilisé, et à la stratégie commerciale du cabinet. Un second avis vous permet de comprendre si le plan de traitement est médicalement justifié et si le tarif est cohérent.",
      },
      {
        type: "h2",
        text: "Ce qu'un second avis dentaire peut révéler",
      },
      {
        type: "p",
        text: "Dans notre expérience, un second avis dentaire permet souvent de :",
      },
      {
        type: "ul",
        items: [
          "Confirmer que le traitement proposé est bien le plus adapté à votre cas",
          "Identifier une alternative moins invasive (ex. : inlay-core plutôt que couronne complète)",
          "Éviter une extraction en proposant un traitement conservateur",
          "Vérifier que les matériaux proposés correspondent aux dernières recommandations",
          "Détecter un sur-traitement ou une surfacturation par rapport aux actes réellement nécessaires",
        ],
      },
      {
        type: "h2",
        text: "Quels documents préparer pour votre second avis dentaire ?",
      },
      {
        type: "p",
        text: "Pour obtenir un avis précis et fiable, rassemblez les éléments suivants avant votre consultation :",
      },
      {
        type: "ul",
        items: [
          "Le devis détaillé de votre dentiste (avec les codes des actes NGAP/CCAM)",
          "Les radiographies panoramiques ou rétro-alvéolaires récentes (moins d'un an)",
          "Le compte rendu de la dernière consultation ou bilan dentaire",
          "Vos antécédents médicaux pertinents (diabète, traitement anticoagulant, etc.)",
          "Toute ordonnance ou prescription en cours",
        ],
      },
      {
        type: "h2",
        text: "Votre droit au second avis : ce que dit la loi",
      },
      {
        type: "p",
        text: "En France, la loi du 4 mars 2002 relative aux droits des malades (dite loi Kouchner) garantit à tout patient le droit à l'information et au consentement éclairé. Cela inclut explicitement le droit de consulter un autre professionnel de santé avant d'accepter un traitement. Votre dentiste ne peut pas s'y opposer et est tenu de vous remettre une copie de votre dossier sur demande.",
      },
      {
        type: "h2",
        text: "TrustMyDiag : un second avis dentaire en 48h",
      },
      {
        type: "p",
        text: "Chez TrustMyDiag, nos chirurgiens-dentistes partenaires analysent votre dossier et vous transmettent un avis écrit détaillé en moins de 48 heures. Sans déplacement, sans attente, et en toute confidentialité. Notre objectif n'est pas de vous détourner de votre praticien habituel, mais de vous donner les informations nécessaires pour prendre une décision éclairée.",
      },
      {
        type: "cta",
        text: "Demander un second avis dentaire",
      },
    ],
  },
  {
    slug: "bilan-gynecologique",
    title: "Comprendre votre bilan gynécologique",
    metaTitle: "Comprendre son bilan gynécologique : frottis, échographie, hormones | TrustMyDiag",
    metaDescription:
      "Frottis cervical, échographie pelvienne, bilan hormonal… Nos gynécologues experts vous expliquent comment interpréter les résultats de votre suivi gynécologique et quand demander un second avis.",
    date: "28 mars 2025",
    dateISO: "2025-03-28",
    category: "Gynécologie",
    readingTime: 7,
    excerpt:
      "Résultats de frottis, échographie pelvienne, bilan hormonal… Les comptes rendus médicaux sont souvent difficiles à déchiffrer. Nos experts gynécologues vous expliquent comment interpréter les termes clés de votre dossier.",
    author: "Dr. Yohan Benchimol",
    authorRole: "Gynécologue obstétricien — N° RPPS 10102162764",
    content: [
      {
        type: "p",
        text: "Chaque année, des millions de femmes reçoivent des résultats d'examens gynécologiques sans toujours comprendre ce qu'ils signifient réellement. Un compte rendu d'échographie pelvienne, un résultat de frottis cervico-utérin ou un bilan hormonal peuvent contenir des termes techniques qui génèrent inquiétude ou confusion. Voici un guide pour décrypter les principaux éléments de votre bilan gynécologique.",
      },
      {
        type: "h2",
        text: "Le frottis cervico-utérin (FCU) : comprendre les résultats",
      },
      {
        type: "p",
        text: "Le frottis cervical, aussi appelé test de Papanicolaou ou Pap smear, est l'examen de dépistage du cancer du col de l'utérus. Réalisé tous les 3 ans chez les femmes de 25 à 65 ans (après deux frottis normaux à un an d'intervalle), il analyse les cellules du col pour détecter d'éventuelles anomalies.",
      },
      {
        type: "h3",
        text: "Les classifications à connaître",
      },
      {
        type: "ul",
        items: [
          "Normal (ou négatif) : aucune anomalie cellulaire détectée, continuer le suivi habituel",
          "ASC-US : cellules malpighiennes atypiques de signification indéterminée — souvent bénin mais nécessite un test HPV de contrôle",
          "LSIL : lésion malpighienne intraépithéliale de bas grade — surveillance rapprochée recommandée",
          "HSIL : lésion de haut grade — une colposcopie est généralement indiquée",
          "Insatisfaisant : prélèvement insuffisant, nécessite un nouveau frottis",
        ],
      },
      {
        type: "p",
        text: "Un résultat anormal ne signifie pas systématiquement la présence d'un cancer. Dans la grande majorité des cas, il s'agit de modifications cellulaires liées au virus HPV (papillomavirus humain) qui régressent spontanément. Cependant, une surveillance adaptée est indispensable.",
      },
      {
        type: "h2",
        text: "L'échographie pelvienne : ce que les images révèlent",
      },
      {
        type: "p",
        text: "L'échographie pelvienne (par voie abdominale ou endovaginale) est l'examen d'imagerie de référence en gynécologie. Elle permet de visualiser l'utérus, les ovaires et les trompes de Fallope.",
      },
      {
        type: "h3",
        text: "Termes fréquemment rencontrés dans les comptes rendus",
      },
      {
        type: "ul",
        items: [
          "Utérus normopositionné en antéversion : position normale de l'utérus, aucune inquiétude",
          "Endomètre fin / épais : l'endomètre (muqueuse utérine) varie selon le cycle menstruel ; une épaisseur anormale hors grossesse mérite une investigation",
          "Kyste ovarien fonctionnel : lié au cycle, disparaît souvent spontanément en 1-3 cycles",
          "Myome (fibrome) utérin : tumeur bénigne très fréquente, souvent asymptomatique",
          "Image annexielle : toute anomalie au niveau des ovaires ou des trompes — son caractère bénin ou non doit être précisé",
          "Épanchement dans le Douglas : présence de liquide dans le cul-de-sac de Douglas, normal après l'ovulation, anormal dans d'autres contextes",
        ],
      },
      {
        type: "h2",
        text: "Le bilan hormonal : interpréter vos résultats",
      },
      {
        type: "p",
        text: "Le bilan hormonal gynécologique peut inclure plusieurs dosages selon le contexte clinique (troubles du cycle, infertilité, ménopause, etc.).",
      },
      {
        type: "ul",
        items: [
          "FSH (hormone folliculo-stimulante) : évalue la réserve ovarienne. Une FSH élevée en début de cycle peut signaler une diminution de la fertilité",
          "LH (hormone lutéinisante) : un pic de LH déclenche l'ovulation. Un rapport LH/FSH > 2 peut évoquer un syndrome des ovaires polykystiques (SOPK)",
          "Estradiol (E2) : principale hormone féminine, ses taux varient selon le cycle et la phase de vie",
          "AMH (hormone anti-müllérienne) : marqueur de la réserve ovarienne, utile en bilan de fertilité",
          "Progestérone : dosée en 2e partie de cycle pour confirmer l'ovulation",
          "Prolactine : une hyperprolactinémie peut perturber le cycle et la fertilité",
          "TSH : le bilan thyroïdien est souvent intégré car les dysthyroïdies impactent le cycle féminin",
        ],
      },
      {
        type: "h2",
        text: "Quand demander un second avis gynécologique ?",
      },
      {
        type: "p",
        text: "Certaines situations méritent un éclairage complémentaire d'un spécialiste :",
      },
      {
        type: "ul",
        items: [
          "Résultat de frottis anormal (ASC-US, LSIL, HSIL) et doute sur la conduite à tenir",
          "Découverte d'une image ovarienne dont la nature bénigne ou maligne n'est pas certaine",
          "Fibromes symptomatiques et hésitation entre traitement médical, chirurgie conservatrice ou hystérectomie",
          "Bilan d'infertilité : confirmer le diagnostic et les options thérapeutiques (FIV, insémination, etc.)",
          "Ménopause précoce ou troubles hormonaux complexes",
          "Suspicion d'endométriose : pathologie souvent sous-diagnostiquée ou mal prise en charge",
        ],
      },
      {
        type: "h2",
        text: "Obtenir un second avis gynécologique avec TrustMyDiag",
      },
      {
        type: "p",
        text: "Nos gynécologues-obstétriciens partenaires analysent l'ensemble de votre dossier médical et vous apportent un avis écrit clair et détaillé en moins de 48 heures. Que vous souhaitiez confirmer un diagnostic, comprendre un résultat ou évaluer les options thérapeutiques qui s'offrent à vous, nous sommes là pour vous accompagner.",
      },
      {
        type: "cta",
        text: "Demander un second avis gynécologique",
      },
    ],
  },
  {
    slug: "droits-second-avis-medical",
    title: "Second avis médical : vos droits en France",
    metaTitle: "Second avis médical : vos droits légaux en France | TrustMyDiag",
    metaDescription:
      "La loi Kouchner de 2002 vous garantit le droit au second avis médical avant tout acte invasif. Découvrez vos droits, comment les exercer et pourquoi ce recours est souvent essentiel.",
    date: "5 mars 2025",
    dateISO: "2025-03-05",
    category: "Droits des patients",
    readingTime: 5,
    excerpt:
      "La loi Kouchner de 2002 consacre le droit à l'information et au consentement éclairé. Mais saviez-vous que vous avez aussi le droit légal de consulter un autre médecin avant tout acte invasif ?",
    author: "Dr. Robert Benguigui",
    authorRole: "Chirurgien-dentiste — N° RPPS 10000111715",
    content: [
      {
        type: "p",
        text: "En France, le droit à un second avis médical est un droit fondamental des patients, consacré par la loi. Pourtant, moins de 15 % des patients y recourent, souvent par méconnaissance de leurs droits ou par crainte de froisser leur médecin traitant. Voici tout ce que vous devez savoir.",
      },
      {
        type: "h2",
        text: "Le cadre légal : la loi Kouchner du 4 mars 2002",
      },
      {
        type: "p",
        text: "La loi n° 2002-303 du 4 mars 2002 relative aux droits des malades et à la qualité du système de santé, dite loi Kouchner, a profondément modifié la relation médecin-patient en France. Elle consacre plusieurs droits fondamentaux :",
      },
      {
        type: "ul",
        items: [
          "Le droit à l'information : tout patient doit recevoir une information claire, loyale et adaptée sur son état de santé, les traitements proposés, leurs bénéfices, risques et alternatives",
          "Le droit au consentement éclairé : aucun acte médical ne peut être réalisé sans le consentement libre et éclairé du patient",
          "Le droit d'accès au dossier médical : toute personne peut demander communication de l'intégralité de son dossier médical",
          "Le droit au second avis : découlant directement du droit à l'information, il permet à tout patient de consulter un autre professionnel de santé",
        ],
      },
      {
        type: "h2",
        text: "Ce que dit précisément la loi sur le second avis",
      },
      {
        type: "p",
        text: "L'article L.1111-4 du Code de la santé publique stipule que « toute personne prend, avec le professionnel de santé et compte tenu des informations et des préconisations qu'il lui fournit, les décisions concernant sa santé ». Cette disposition implique que le patient est co-décideur de son traitement, et donc libre de solliciter un avis complémentaire.",
      },
      {
        type: "p",
        text: "Par ailleurs, le Code de déontologie médicale (article R.4127-68) interdit à tout médecin de s'opposer à la consultation d'un confrère par son patient. Un refus de communication du dossier médical ou une obstruction à un second avis constituerait une faute déontologique.",
      },
      {
        type: "h2",
        text: "Dans quelles situations exercer ce droit ?",
      },
      {
        type: "p",
        text: "Le second avis médical est particulièrement précieux dans les situations suivantes :",
      },
      {
        type: "ul",
        items: [
          "Avant toute chirurgie élective (non urgente) : ablation de la thyroïde, prothèse de genou ou hanche, chirurgie bariatrique, etc.",
          "Après un diagnostic de maladie grave : cancer, sclérose en plaques, maladie rare",
          "Avant un traitement lourd : chimiothérapie, radiothérapie, immunosuppresseurs",
          "En cas de doute sur un traitement prescrit au long cours",
          "Quand le diagnostic vous paraît incertain ou incomplet",
          "Avant tout acte dentaire invasif ou coûteux (implants, chirurgie parodontale)",
          "En cas de résultats d'examens contradictoires ou difficiles à interpréter",
        ],
      },
      {
        type: "h2",
        text: "Comment accéder à son dossier médical ?",
      },
      {
        type: "p",
        text: "Pour exercer votre droit au second avis, vous devez d'abord obtenir votre dossier médical. Voici la marche à suivre :",
      },
      {
        type: "ul",
        items: [
          "Formulez une demande écrite auprès de votre médecin ou de l'établissement de santé",
          "Le délai de communication est de 8 jours maximum (48h si l'hospitalisation date de moins de 5 ans)",
          "Les frais de copie et d'envoi peuvent être facturés à votre charge",
          "Pour un dossier hospitalier, adressez-vous au DIM (Département d'Information Médicale) ou à la direction de l'établissement",
          "En cas de refus ou de délai non respecté, vous pouvez saisir la CNAM ou la Commission d'accès aux documents administratifs (CADA)",
        ],
      },
      {
        type: "h2",
        text: "Second avis et remboursement : qu'en est-il ?",
      },
      {
        type: "p",
        text: "La consultation pour un second avis est remboursée par l'Assurance Maladie dans les conditions habituelles, à condition que le médecin consulté soit conventionné. Le tarif de secteur 1 (sans dépassement d'honoraires) est de 26,50 € pour une consultation chez un généraliste, et de 30 € à 60 € chez un spécialiste selon la nature de la consultation.",
      },
      {
        type: "p",
        text: "Certaines mutuelles prévoient également une prise en charge spécifique du second avis médical. Renseignez-vous auprès de votre complémentaire santé.",
      },
      {
        type: "h2",
        text: "TrustMyDiag : votre second avis en toute sérénité",
      },
      {
        type: "p",
        text: "TrustMyDiag vous permet d'exercer votre droit au second avis de façon simple, rapide et 100 % en ligne. Nos médecins partenaires, tous inscrits au Conseil National de l'Ordre des Médecins et identifiables via le RPPS, analysent votre dossier et vous transmettent un avis écrit détaillé en moins de 48 heures.",
      },
      {
        type: "cta",
        text: "Obtenir mon second avis médical",
      },
    ],
  },
  {
    slug: "preparer-dossier-medical",
    title: "Comment préparer votre dossier médical pour un second avis",
    metaTitle: "Comment préparer son dossier médical pour un second avis ? | TrustMyDiag",
    metaDescription:
      "Ordonnances, radios, comptes rendus d'opération, résultats d'analyse… Découvrez la liste complète des documents à rassembler pour obtenir un second avis médical précis et rapide.",
    date: "18 février 2025",
    dateISO: "2025-02-18",
    category: "Conseils pratiques",
    readingTime: 5,
    excerpt:
      "Un second avis de qualité repose sur des documents complets. Voici la liste exhaustive des pièces à rassembler pour obtenir une réponse précise et rapide.",
    author: "Dr. Robert Benguigui",
    authorRole: "Chirurgien-dentiste — N° RPPS 10000111715",
    content: [
      {
        type: "p",
        text: "La qualité d'un second avis médical dépend directement de la complétude du dossier transmis. Un médecin qui dispose de tous les éléments pertinents pourra formuler un avis précis et actionnable. À l'inverse, un dossier lacunaire peut conduire à des conclusions trop générales, voire à des demandes d'examens complémentaires évitables. Voici comment constituer un dossier optimal.",
      },
      {
        type: "h2",
        text: "Les documents indispensables pour tout second avis",
      },
      {
        type: "ul",
        items: [
          "Le compte rendu de la dernière consultation spécialisée (diagnostic posé, traitement proposé)",
          "Les comptes rendus des examens d'imagerie récents : radiographies, IRM, scanner, échographie (avec les images si possible)",
          "Les résultats biologiques récents (moins de 6 mois) : NFS, bilan hépatique, marqueurs tumoraux selon le cas",
          "Les ordonnances et traitements en cours",
          "Le courrier adressé par votre spécialiste à votre médecin traitant",
          "Les antécédents médicaux et chirurgicaux pertinents",
          "Les comptes rendus opératoires en cas d'interventions passées",
        ],
      },
      {
        type: "h2",
        text: "Documents spécifiques selon la spécialité",
      },
      {
        type: "h3",
        text: "Pour un second avis dentaire",
      },
      {
        type: "ul",
        items: [
          "Le devis détaillé avec les codes des actes (nomenclature NGAP/CCAM)",
          "La radiographie panoramique dentaire (OPT) ou le cone beam CT de moins d'un an",
          "Les radiographies rétro-alvéolaires ciblées",
          "Le bilan parodontal si disponible",
          "Les photos intra-orales si réalisées",
        ],
      },
      {
        type: "h3",
        text: "Pour un second avis gynécologique",
      },
      {
        type: "ul",
        items: [
          "Le compte rendu d'échographie pelvienne avec les mesures utérines et ovariennes",
          "Le résultat de frottis cervico-utérin (avec le rapport de cytologie)",
          "Le bilan hormonal complet si disponible (FSH, LH, estradiol, AMH, prolactine, TSH)",
          "Le résultat d'un test HPV si réalisé",
          "L'historique des cycles menstruels et des grossesses (parité, antécédents obstétricaux)",
          "Les comptes rendus de coelioscopie ou d'hystéroscopie si réalisées",
        ],
      },
      {
        type: "h3",
        text: "Pour un second avis oncologique",
      },
      {
        type: "ul",
        items: [
          "Le compte rendu anatomopathologique (biopsie ou pièce opératoire) avec classification TNM",
          "L'ensemble des examens d'imagerie avec les images CD/DICOM si possible",
          "Le compte rendu de la réunion de concertation pluridisciplinaire (RCP)",
          "Le protocole de traitement proposé",
          "Les bilans biologiques incluant les marqueurs tumoraux",
          "Les résultats des tests moléculaires ou génétiques si réalisés",
        ],
      },
      {
        type: "h2",
        text: "Comment récupérer vos documents médicaux ?",
      },
      {
        type: "p",
        text: "La loi vous garantit un accès complet à votre dossier médical. Voici les démarches pratiques :",
      },
      {
        type: "ul",
        items: [
          "Auprès de votre médecin ou spécialiste : demandez une copie lors de votre prochain rendez-vous ou par courrier",
          "Auprès d'un hôpital ou clinique : contactez le service des archives médicales ou le DIM — délai légal de 8 jours",
          "Les examens d'imagerie : récupérez le CD avec les images DICOM au service de radiologie",
          "Mon Espace Santé : la plateforme nationale concentre progressivement vos documents de santé",
          "Via votre médecin traitant : il peut centraliser et transmettre les éléments en sa possession",
        ],
      },
      {
        type: "h2",
        text: "Conseils pour numériser et transmettre vos documents",
      },
      {
        type: "p",
        text: "Une fois vos documents rassemblés, voici comment les préparer pour une transmission numérique :",
      },
      {
        type: "ul",
        items: [
          "Scannez ou photographiez chaque document en bonne résolution (minimum 300 DPI pour les résultats d'analyse)",
          "Vérifiez que les images sont lisibles : texte net, pas de reflet, document entier visible",
          "Nommez vos fichiers de façon explicite : « frottis_mars2025.pdf », « panoramique_dentaire.jpg »",
          "Pour les IRM et scanners, transmettez si possible le CD avec les images DICOM — bien plus informatif qu'une simple impression papier",
          "Regroupez les documents par ordre chronologique",
        ],
      },
      {
        type: "h2",
        text: "Ce qu'il faut inclure dans votre message au médecin",
      },
      {
        type: "p",
        text: "Au-delà des documents, votre message d'accompagnement est précieux. Précisez :",
      },
      {
        type: "ul",
        items: [
          "La question précise à laquelle vous souhaitez une réponse",
          "Le traitement ou acte proposé sur lequel vous souhaitez un avis",
          "Vos symptômes actuels et leur évolution",
          "Vos allergies et contre-indications connues",
          "Vos préférences ou contraintes (par exemple : refus de la chirurgie si une alternative existe)",
        ],
      },
      {
        type: "h2",
        text: "TrustMyDiag simplifie la transmission de votre dossier",
      },
      {
        type: "p",
        text: "Notre plateforme vous guide étape par étape dans la constitution de votre dossier. Une fois vos documents déposés, notre équipe médicale vérifie leur complétude avant de les soumettre au médecin spécialiste. Si un élément manque, nous vous contactons pour compléter votre dossier — aucun temps perdu.",
      },
      {
        type: "cta",
        text: "Déposer mon dossier médical",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
