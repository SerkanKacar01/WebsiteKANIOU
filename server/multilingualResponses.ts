/**
 * Comprehensive Multilingual Response System
 * Provides accurate translations for all chatbot responses and system messages
 */

export interface MultilingualResponse {
  nl: string;
  fr: string;
  en: string;
  tr: string;
}

export interface SystemMessages {
  welcome: MultilingualResponse;
  businessHoursClosed: MultilingualResponse;
  pricingResponse: MultilingualResponse;
  errorFallback: MultilingualResponse;
  typing: MultilingualResponse;
  connectionError: MultilingualResponse;
  generalHelp: MultilingualResponse;
  productInformation: MultilingualResponse;
  installationInfo: MultilingualResponse;
  maintenanceInfo: MultilingualResponse;
  warrantyInfo: MultilingualResponse;
  measurementInfo: MultilingualResponse;
}

/**
 * Professional system messages in all supported languages
 */
export const SYSTEM_MESSAGES: SystemMessages = {
  welcome: {
    nl: "Welkom bij KANIOU! Ik ben uw persoonlijke assistent voor premium raamdecoratie. Ik help u graag met vragen over onze gordijnen, zonwering, jaloezieën en meer. Waarmee kan ik u vandaag van dienst zijn?",
    fr: "Bienvenue chez KANIOU ! Je suis votre assistant personnel pour les décorations de fenêtres premium. Je suis ravi de vous aider avec toutes vos questions sur nos rideaux, stores, volets et plus encore. Comment puis-je vous aider aujourd'hui ?",
    en: "Welcome to KANIOU! I'm your personal assistant for premium window treatments. I'm happy to help you with any questions about our curtains, blinds, shutters and more. How can I assist you today?",
    tr: "KANIOU'ya hoş geldiniz! Premium pencere dekorasyonları için kişisel asistanınızım. Perdelerimiz, güneşliklerimiz, jaluzilerimiz ve daha fazlası hakkındaki sorularınızda size yardımcı olmaktan mutluluk duyarım. Bugün size nasıl yardımcı olabilirim?"
  },

  businessHoursClosed: {
    nl: "We zijn momenteel gesloten. Ons team is beschikbaar van maandag tot zaterdag tussen 10:00 en 18:00. Laat uw bericht achter en wij nemen zo spoedig mogelijk contact met u op tijdens onze openingstijden.",
    fr: "Nous sommes actuellement fermés. Notre équipe est disponible du lundi au samedi entre 10h00 et 18h00. Laissez votre message et nous vous recontacterons dès que possible pendant nos heures d'ouverture.",
    en: "We are currently closed. Our team is available Monday to Saturday between 10:00 and 18:00. Please leave your message and we will contact you as soon as possible during our business hours.",
    tr: "Şu anda kapalıyız. Ekibimiz Pazartesi'den Cumartesi'ye 10:00-18:00 saatleri arasında hizmetinizdedir. Lütfen mesajınızı bırakın, çalışma saatlerimizde en kısa sürede size geri döneceğiz."
  },

  pricingResponse: {
    nl: "Voor een nauwkeurige prijsopgave plannen we graag een gratis thuismeting in. Onze specialist kan u dan exact adviseren en een maatwerkofferte opstellen. Prijzen zijn afhankelijk van afmetingen, gekozen materialen en installatiemogelijkheden. Mag ik uw contactgegevens om een afspraak in te plannen?",
    fr: "Pour un devis précis, nous aimerions planifier une prise de mesures gratuite à domicile. Notre spécialiste pourra alors vous conseiller exactement et établir un devis sur mesure. Les prix dépendent des dimensions, des matériaux choisis et des options d'installation. Puis-je avoir vos coordonnées pour planifier un rendez-vous ?",
    en: "For an accurate quote, we'd like to schedule a free home measurement. Our specialist can then provide exact advice and create a custom quote. Prices depend on dimensions, chosen materials and installation options. May I have your contact details to schedule an appointment?",
    tr: "Doğru bir fiyat teklifi için ücretsiz bir ev ölçümü planlamak istiyoruz. Uzmanımız size tam olarak tavsiyelerde bulunabilir ve özel bir teklif oluşturabilir. Fiyatlar boyutlara, seçilen malzemelere ve kurulum seçeneklerine bağlıdır. Bir randevu planlamak için iletişim bilgilerinizi alabilir miyim?"
  },

  errorFallback: {
    nl: "Excuses, ik ondervind momenteel technische problemen. Onze specialisten helpen u graag persoonlijk verder. Kunt u contact opnemen via telefoon of uw vraag per e-mail stellen?",
    fr: "Excusez-moi, je rencontre actuellement des problèmes techniques. Nos spécialistes seront ravis de vous aider personnellement. Pouvez-vous nous contacter par téléphone ou poser votre question par e-mail ?",
    en: "I apologize, I'm currently experiencing technical issues. Our specialists would be happy to help you personally. Could you contact us by phone or email your question?",
    tr: "Özür dilerim, şu anda teknik sorunlar yaşıyorum. Uzmanlarımız size kişisel olarak yardımcı olmaktan mutluluk duyar. Bizi telefon ile arayabilir veya sorunuzu e-posta ile gönderebilir misiniz?"
  },

  typing: {
    nl: "Aan het typen...",
    fr: "En train d'écrire...",
    en: "Typing...",
    tr: "Yazıyor..."
  },

  connectionError: {
    nl: "Verbindingsprobleem. Probeer het opnieuw.",
    fr: "Problème de connexion. Veuillez réessayer.",
    en: "Connection problem. Please try again.",
    tr: "Bağlantı problemi. Lütfen tekrar deneyin."
  },

  generalHelp: {
    nl: "Ik kan u helpen met informatie over onze producten, installatie, onderhoud, garantie en prijzen. Stel gerust uw vraag!",
    fr: "Je peux vous aider avec des informations sur nos produits, l'installation, l'entretien, la garantie et les prix. N'hésitez pas à poser votre question !",
    en: "I can help you with information about our products, installation, maintenance, warranty and pricing. Feel free to ask your question!",
    tr: "Ürünlerimiz, kurulum, bakım, garanti ve fiyatlar hakkında bilgi ile size yardımcı olabilirim. Sorunuzu sormaktan çekinmeyin!"
  },

  productInformation: {
    nl: "KANIOU biedt een uitgebreide collectie premium raamdecoratie: overgordijnen, vitrage, jaloezieën, rolgordijnen, vouwgordijnen en zonwering. Alle producten zijn maatwerk en worden professioneel geïnstalleerd.",
    fr: "KANIOU propose une vaste collection de décorations de fenêtres premium : rideaux, voilages, stores vénitiens, stores enrouleurs, stores plissés et protection solaire. Tous les produits sont sur mesure et installés professionnellement.",
    en: "KANIOU offers an extensive collection of premium window treatments: curtains, sheers, venetian blinds, roller blinds, pleated blinds and sun protection. All products are custom-made and professionally installed.",
    tr: "KANIOU, geniş bir premium pencere dekorasyonu koleksiyonu sunar: perdeler, tüller, jaluzi, stor perdeler, plise perdeler ve güneş koruması. Tüm ürünler özel yapım ve profesyonel kurulumludur."
  },

  installationInfo: {
    nl: "Onze gecertificeerde monteurs zorgen voor professionele installatie. We plannen een afspraak die u uitkomt en zorgen voor een nette, vakkundige montage zonder rommel.",
    fr: "Nos installateurs certifiés assurent une installation professionnelle. Nous planifions un rendez-vous qui vous convient et garantissons un montage propre et professionnel sans désordre.",
    en: "Our certified installers ensure professional installation. We schedule an appointment that suits you and guarantee clean, expert installation without mess.",
    tr: "Sertifikalı kurulum teknisyenlerimiz profesyonel kurulum sağlar. Size uygun bir randevu planlıyoruz ve dağınıklık olmadan temiz, uzman kurulum garantisi veriyoruz."
  },

  maintenanceInfo: {
    nl: "We bieden uitgebreide onderhoudsadvies en service. De meeste producten zijn eenvoudig schoon te maken met een vochtige doek. Voor specifieke materialen geven we gedetailleerde verzorgingsinstructies.",
    fr: "Nous offrons des conseils d'entretien complets et un service. La plupart des produits sont faciles à nettoyer avec un chiffon humide. Pour des matériaux spécifiques, nous donnons des instructions d'entretien détaillées.",
    en: "We provide comprehensive maintenance advice and service. Most products are easy to clean with a damp cloth. For specific materials, we provide detailed care instructions.",
    tr: "Kapsamlı bakım tavsiyesi ve hizmet sağlıyoruz. Çoğu ürün nemli bir bezle kolayca temizlenebilir. Özel malzemeler için detaylı bakım talimatları veriyoruz."
  },

  warrantyInfo: {
    nl: "Al onze producten komen met uitgebreide garantie. Maatwerk gordijnen en zonwering hebben 2 jaar garantie op materiaal en vakmanschap. Motorisatie heeft 5 jaar garantie.",
    fr: "Tous nos produits sont accompagnés d'une garantie complète. Les rideaux sur mesure et la protection solaire ont 2 ans de garantie sur les matériaux et la fabrication. La motorisation a 5 ans de garantie.",
    en: "All our products come with comprehensive warranty. Custom curtains and sun protection have 2 years warranty on materials and workmanship. Motorization has 5 years warranty.",
    tr: "Tüm ürünlerimiz kapsamlı garanti ile gelir. Özel perdeler ve güneş koruması malzeme ve işçilik için 2 yıl garantiye sahiptir. Motorlu sistemler 5 yıl garantili."
  },

  measurementInfo: {
    nl: "We bieden gratis en vrijblijvende thuismeting. Onze specialist meet nauwkeurig op en adviseert over de beste oplossing voor uw situatie. De meting duurt ongeveer 30-45 minuten.",
    fr: "Nous offrons une prise de mesures gratuite et sans engagement à domicile. Notre spécialiste mesure avec précision et conseille sur la meilleure solution pour votre situation. La mesure dure environ 30-45 minutes.",
    en: "We offer free and non-binding home measurement. Our specialist measures accurately and advises on the best solution for your situation. The measurement takes about 30-45 minutes.",
    tr: "Ücretsiz ve bağlayıcı olmayan ev ölçümü sunuyoruz. Uzmanımız doğru şekilde ölçer ve durumunuz için en iyi çözümü tavsiye eder. Ölçüm yaklaşık 30-45 dakika sürer."
  }
};

/**
 * Get system message in specified language
 */
export function getSystemMessage(key: keyof SystemMessages, language: string): string {
  const message = SYSTEM_MESSAGES[key];
  return message[language as keyof MultilingualResponse] || message.nl;
}

/**
 * Professional product knowledge in multiple languages
 */
export const MULTILINGUAL_PRODUCT_KNOWLEDGE = {
  curtains: {
    nl: "Gordijnen zijn de klassieke keuze voor raamdecoratie. Ze bieden privacy, warmte-isolatie en sfeer. KANIOU heeft een uitgebreide collectie stoffen: van lichte linens tot luxe velvets. Alle gordijnen worden op maat gemaakt en professioneel opgehangen.",
    fr: "Les rideaux sont le choix classique pour la décoration de fenêtres. Ils offrent intimité, isolation thermique et ambiance. KANIOU dispose d'une vaste collection de tissus : des lins légers aux velours luxueux. Tous les rideaux sont faits sur mesure et accrochés professionnellement.",
    en: "Curtains are the classic choice for window decoration. They provide privacy, thermal insulation and ambiance. KANIOU has an extensive fabric collection: from light linens to luxury velvets. All curtains are custom-made and professionally hung.",
    tr: "Perdeler, pencere dekorasyonu için klasik seçenektir. Gizlilik, termal izolasyon ve ambiyans sağlar. KANIOU'da geniş kumaş koleksiyonu bulunur: hafif ketenden lüks kadife dokular. Tüm perdeler özel yapım ve profesyonel olarak asılır."
  },

  blinds: {
    nl: "Jaloezieën bieden uitstekende lichtregeling en privacy. Beschikbaar in hout, aluminium en PVC. Ideaal voor moderne interieus. Alle jaloezieën zijn op maat en kunnen handmatig of elektrisch bediend worden.",
    fr: "Les stores vénitiens offrent un excellent contrôle de la lumière et de l'intimité. Disponibles en bois, aluminium et PVC. Idéaux pour les intérieurs modernes. Tous les stores sont sur mesure et peuvent être actionnés manuellement ou électriquement.",
    en: "Venetian blinds offer excellent light control and privacy. Available in wood, aluminum and PVC. Ideal for modern interiors. All blinds are custom-made and can be operated manually or electrically.",
    tr: "Jaluzi mükemmel ışık kontrolü ve gizlilik sunar. Ahşap, alüminyum ve PVC olarak mevcuttur. Modern iç mekanlar için idealdir. Tüm jaluziler özel yapım ve manuel veya elektrikli olarak çalıştırılabilir."
  },

  sunProtection: {
    nl: "Zonwering beschermt tegen felle zon en warmte. Markiezen, screens en luifels houden uw terras en interieur koel. Verkrijgbaar in vele kleuren en met wind- en zonnesensoren.",
    fr: "La protection solaire protège contre le soleil intense et la chaleur. Stores bannes, screens et auvents gardent votre terrasse et intérieur frais. Disponible en plusieurs couleurs et avec capteurs de vent et de soleil.",
    en: "Sun protection shields against intense sun and heat. Awnings, screens and canopies keep your terrace and interior cool. Available in many colors and with wind and sun sensors.",
    tr: "Güneş koruması yoğun güneş ve sıcağa karşı korur. Tenteler, ekranlar ve gölgelikler terasınızı ve iç mekanınızı serin tutar. Birçok renkte ve rüzgar ve güneş sensörleri ile mevcuttur."
  }
};

/**
 * Get product information in specified language
 */
export function getProductInfo(productType: string, language: string): string {
  const info = MULTILINGUAL_PRODUCT_KNOWLEDGE[productType as keyof typeof MULTILINGUAL_PRODUCT_KNOWLEDGE];
  if (!info) return "";
  return info[language as keyof MultilingualResponse] || info.nl;
}