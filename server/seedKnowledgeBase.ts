import { storage } from "./storage";

/**
 * Seed the chatbot knowledge base with comprehensive product information
 */
export async function seedChatbotKnowledge() {
  console.log("🧠 Seeding AI Knowledge Base...");

  // Check if knowledge base already exists
  const existingKnowledge = await storage.getChatbotKnowledge();
  if (existingKnowledge.length > 0) {
    console.log("✅ Knowledge base already populated");
    return;
  }

  // Product Knowledge - Dutch (Primary)
  // ROLGORDIJNEN
  const productKnowledge = [
    {
      category: "product",
      topic: "Rolgordijnen - Algemeen",
      content:
        "Rolgordijnen zijn praktische en veelzijdige zonweringen die perfect zijn voor moderne interieurs. Ze bieden uitstekende lichtcontrole, zijn beschikbaar in verduisterende, lichtdoorlatende en transparante stoffen en verkrijgbaar in veel stijlen, kleuren en materialen. Ideaal voor woonkamers, slaapkamers, kantoren en badkamers.",
      language: "nl",
      priority: 10,
      adminApproved: true,
    },
    {
      category: "product",
      topic: "Rolgordijnen - Warmtewering",
      content:
        "Voor optimale warmtewering raden wij rolgordijnen met reflecterende achterzijde aan. Deze kaatsen zonnestralen terug en houden uw ruimte tot 7°C koeler. Materialen zoals screen doek en verduisterende stoffen werken het beste.",
      language: "nl",
      priority: 9,
      adminApproved: true,
    },
    {
      category: "product",
      topic: "Rolgordijnen - Meten",
      content:
        "Voor rolgordijnen: meet de exacte breedte van het raam. Voor op-de-dag montage tel 10-15cm extra breedte toe. Voor hoogte: meet van gewenste montagepunt tot gewenste eindpunt. Altijd in millimeters meten voor perfecte pasvorm.",
      language: "nl",
      priority: 8,
      adminApproved: true,
    },

    // OVERGORDIJNEN
    {
      category: "product",
      topic: "Overgordijnen - Algemeen",
      content:
        "Overgordijnen zijn de finishing touch van elk interieur. Ze bieden privacy, lichtcontrole en thermische isolatie. Verkrijgbaar in talloze stoffen, kleuren en modellen om perfect aan te sluiten bij uw woonstijl.",
      language: "nl",
      priority: 10,
      adminApproved: true,
    },
    {
      category: "product",
      topic: "Overgordijnen - Meten",
      content:
        "Voor overgordijnen: meet de breedte van rail of roede en tel 15-20cm toe aan elke zijde voor vollere uitstraling. Hoogte: meet van bovenkant rail tot gewenst eindpunt (vensterbank, onder vensterbank, of vloer). Tel 2-3cm toe voor plooiband.",
      language: "nl",
      priority: 8,
      adminApproved: true,
    },

    // VITRAGES
    {
      category: "product",
      topic: "Vitrages - Algemeen",
      content:
        "Vitrages (inbetweens) zijn lichte, doorschijnende gordijnen die privacy bieden terwijl ze natuurlijk licht doorlaten. Perfect voor daggebruik en als basis in combinatie met overgordijnen.",
      language: "nl",
      priority: 9,
      adminApproved: true,
    },

    // VOUWGORDIJNEN
    {
      category: "product",
      topic: "Vouwgordijnen - Algemeen",
      content:
        "Vouwgordijnen (roman blinds) combineren de elegantie van gordijnen met de functionaliteit van zonweringen. Ze vouwen in nette horizontale plooien op en bieden stijlvolle lichtcontrole.",
      language: "nl",
      priority: 9,
      adminApproved: true,
    },

    // DUO ROLGORDIJNEN
    {
      category: "product",
      topic: "Duo Rolgordijnen",
      content:
        "Duo rolgordijnen bestaan uit twee lagen: een transparante en een verduisterende laag. Door deze te verschuiven kunt u de lichtinval perfect doseren - van vol licht tot complete verduistering.",
      language: "nl",
      priority: 8,
      adminApproved: true,
    },

    // JALOEZIEËN
    {
      category: "product",
      topic: "Houten Jaloezieën",
      content:
        "Houten jaloezieën geven een warme, natuurlijke uitstraling aan uw interieur. Ze bieden uitstekende isolatie en zijn verkrijgbaar in verschillende houtsoorten en kleuren. Ideaal voor klassieke en landelijke interieurs.",
      language: "nl",
      priority: 8,
      adminApproved: true,
    },
    {
      category: "product",
      topic: "Kunststof Jaloezieën",
      content:
        "Kunststof jaloezieën zijn praktisch, vochtbestendig en onderhoudsvriendelijk. Perfect voor badkamers en keukens. Verkrijgbaar in vele kleuren en zeer geschikt voor moderne interieurs.",
      language: "nl",
      priority: 7,
      adminApproved: true,
    },

    // LAMELLEN
    {
      category: "product",
      topic: "Textiel Lamellen",
      content:
        "Textiel lamellen (verticale lamellen van stof) bieden elegante lichtcontrole en zijn ideaal voor grote raampartijen. Ze geven een luxe uitstraling en zijn verkrijgbaar in vele dessins en kleuren.",
      language: "nl",
      priority: 7,
      adminApproved: true,
    },

    // PLISSÉ
    {
      category: "product",
      topic: "Plissé Gordijnen",
      content:
        "Plissé gordijnen kenmerken zich door hun zigzag-vouwstructuur. Ze zijn zeer compact, bieden uitstekende isolatie en zijn perfect voor speciale raamvormen zoals driehoekige en ronde ramen.",
      language: "nl",
      priority: 7,
      adminApproved: true,
    },

    // SHUTTERS
    {
      category: "product",
      topic: "Houten Shutters",
      content:
        "Houten shutters zijn een luxe en tijdloze keuze die waarde toevoegt aan uw woning. Ze bieden uitstekende isolatie, privacy en lichtcontrole. Verkrijgbaar in verschillende houtsoorten en afwerkingen.",
      language: "nl",
      priority: 8,
      adminApproved: true,
    },

    // HORREN
    {
      category: "product",
      topic: "Horren - Algemeen",
      content:
        "Horren beschermen tegen insecten terwijl ze frisse lucht binnenlaten. Verkrijgbaar als inzethorren, opzethorren en plissé hordeuren. Elke variant heeft specifieke voordelen afhankelijk van uw situatie.",
      language: "nl",
      priority: 6,
      adminApproved: true,
    },

    // SQUID TEXTIEL FOLIE
    {
      category: "product",
      topic: "Squid Textiel Folie",
      content:
        "Squid textiel folie is een innovatieve raamfolie die warmte weerkaatst en energie bespaart. Het heeft een textiel-achtige uitstraling en biedt UV-bescherming terwijl het licht doorlaat.",
      language: "nl",
      priority: 6,
      adminApproved: true,
    },

    // FAQ - INSTALLATION
    {
      category: "faq",
      topic: "Installatie Service",
      content:
        "KANIOU biedt professionele installatie voor alle producten. Onze ervaren monteurs zorgen voor perfect gemonteerde zonweringen. Installatie wordt ingepland na oplevering van uw bestelling.",
      language: "nl",
      priority: 9,
      adminApproved: true,
    },

    // FAQ - MEASURING
    {
      category: "faq",
      topic: "Opmeetservice",
      content:
        "Wij bieden een professionele opmeetservice aan huis. Onze specialist komt langs om exact op te meten en advies te geven over de beste oplossing voor uw ramen. Dit garandeert perfecte pasvorm.",
      language: "nl",
      priority: 9,
      adminApproved: true,
    },

    // FAQ - GUARANTEES
    {
      category: "faq",
      topic: "Garantie",
      content:
        "Alle KANIOU producten komen met uitgebreide garantie. Stoffen hebben 2 jaar garantie, mechanische onderdelen 3 jaar, en motoren 5 jaar. Wij staan achter de kwaliteit van onze producten.",
      language: "nl",
      priority: 8,
      adminApproved: true,
    },

    // FAQ - DELIVERY
    {
      category: "faq",
      topic: "Levering",
      content:
        "Standaard levertijd is 2-3 weken na opmeting en bestelling. Spoed leveringen zijn mogelijk tegen meerprijs. Wij leveren door heel Nederland en België.",
      language: "nl",
      priority: 7,
      adminApproved: true,
    },

    // GENERAL ADVICE
    {
      category: "general",
      topic: "Warmtewering Beste Keuze",
      content:
        "Voor optimale warmtewering adviseren wij: 1) Rolgordijnen met reflecterende achterzijde, 2) Screen doek met hoge openness factor, 3) Buitenzonwering waar mogelijk, 4) Lichte kleuren die warmte reflecteren.",
      language: "nl",
      priority: 10,
      adminApproved: true,
    },
    {
      category: "general",
      topic: "Privacy en Licht Combinatie",
      content:
        "Voor privacy met behoud van licht raden wij aan: duo rolgordijnen, day/night gordijnen, of combinatie van vitrages met overgordijnen. Plissé gordijnen top-down/bottom-up zijn ook ideaal.",
      language: "nl",
      priority: 9,
      adminApproved: true,
    },

    // COMPANY INFORMATION
    {
      category: "company",
      topic: "Over KANIOU",
      content:
        "KANIOU zilvernaald is opgericht in 1991 en heeft meer dan 30 jaar ervaring in hoogwaardige raambekleding op maat. Wij zijn een toonaangevende leverancier van premium maatwerkoplossingen voor raamdecoratie in Nederland en België. Ons team van ervaren interieurontwerpers en installateurs werkt met passie, precisie en oog voor detail.",
      language: "nl",
      priority: 10,
      adminApproved: true,
    },
    {
      category: "company",
      topic: "Onze Waarden",
      content:
        "Bij KANIOU hechten wij grote waarde aan: Premium kwaliteit met alleen de beste materialen en vakmanschap, Maatwerkoplossingen volledig afgestemd op uw specificaties, Professionele installatie met gegarandeerd perfect resultaat, en Deskundig advies van onze specialisten in raambekleding.",
      language: "nl",
      priority: 9,
      adminApproved: true,
    },
    {
      category: "company",
      topic: "Ervaring en Klanten",
      content:
        "KANIOU heeft in 30+ jaar meer dan 5000 tevreden klanten geholpen. Wij zijn trots dat wij jaarlijks duizenden klanten mogen begeleiden bij het transformeren van hun leefruimtes, dankzij ons vakmanschap en oog voor verfijnd design.",
      language: "nl",
      priority: 8,
      adminApproved: true,
    },

    // SERVICES OFFERED
    {
      category: "service",
      topic: "Opmeetservice Details",
      content:
        "Ja, wij bieden opmeetservice aan huis. Dit is inbegrepen bij onze maatwerkservice. Onze specialist komt langs om exact op te meten en advies te geven over de beste oplossing voor uw ramen. Dit garandeert perfecte pasvorm en voorkomt meetfouten.",
      language: "nl",
      priority: 10,
      adminApproved: true,
    },
    {
      category: "service",
      topic: "Installatieservice",
      content:
        "Wij bieden professionele installatieservice voor alle producten. Onze ervaren monteurs zorgen voor perfect gemonteerde zonweringen met minimale overlast in uw woning. Installatie wordt ingepland na oplevering van uw bestelling.",
      language: "nl",
      priority: 9,
      adminApproved: true,
    },
    {
      category: "service",
      topic: "Advies en Begeleiding",
      content:
        "Onze specialisten geven persoonlijk advies over de beste raamdecoratiekeuzes voor uw interieur. Wij luisteren aandachtig naar uw wensen en voorkeuren en vertalen die naar oplossingen die verwachtingen overtreffen.",
      language: "nl",
      priority: 9,
      adminApproved: true,
    },

    // DETAILED MEASURING GUIDES
    {
      category: "faq",
      topic: "Gordijnen Opmeten Gedetailleerd",
      content:
        "Voor gordijnen opmeten: 1) Meet breedte van raam of rails, voeg 15-20cm toe aan beide zijden voor vollere uitstraling. 2) Meet vanaf bovenkant rail tot gewenste eindpunt (vensterbank, onder vensterbank, of vloer). 3) Bij railsystemen tel 2-3cm extra hoogte op voor plooiband. 4) Bij roedes meet vanaf bovenkant roede en tel 2-3cm toe voor ringen. Geef altijd exacte maten door - ons team past aan op basis van kopafwerking.",
      language: "nl",
      priority: 9,
      adminApproved: true,
    },
    {
      category: "faq",
      topic: "Zonweringen Opmeten Gedetailleerd",
      content:
        "Voor zonweringen opmeten: IN-DE-DAG montage: Meet exacte breedte aan boven-, midden- en onderzijde van raamnis, gebruik kleinste maat. Meet hoogte aan linker-, midden- en rechterzijde, gebruik langste maat. OP-DE-DAG montage: Meet gewenste breedte plus 5-10cm aan beide zijden voor optimale afscherming. Meet hoogte vanaf gewenste beginpunt tot eindpunt. Geef altijd bedieningszijde aan (links/rechts).",
      language: "nl",
      priority: 9,
      adminApproved: true,
    },

    // INSTALLATION TIPS
    {
      category: "faq",
      topic: "Installatie Tips Gordijnroedes",
      content:
        "Voor gordijnroedes installatie: Plaats roedesteunen ongeveer 15cm boven raam en 15-20cm buiten raamopening aan beide zijden. Gebruik geschikte pluggen voor muurtype (gips, beton, baksteen). Controleer waterpas voor definitieve bevestiging.",
      language: "nl",
      priority: 7,
      adminApproved: true,
    },
    {
      category: "faq",
      topic: "Installatie Tips Gordijnrails",
      content:
        "Voor gordijnrails installatie: Monteer rail ongeveer 10cm boven raam. Plaats bevestigingen om de 50-60cm en zorg voor stevige bevestiging. Controleer soepele werking voor gordijn bevestiging.",
      language: "nl",
      priority: 7,
      adminApproved: true,
    },
    {
      category: "faq",
      topic: "Installatie Tips Zonweringen",
      content:
        "Voor zonweringen installatie: Markeer beugelpositie en controleer waterpas. Op-de-dag: bevestig beugels op muur/kozijn buiten nis. In-de-dag: bevestig aan binnenzijde raamnis. Test werking voor definitieve bevestiging.",
      language: "nl",
      priority: 7,
      adminApproved: true,
    },

    // MAINTENANCE INSTRUCTIONS
    {
      category: "faq",
      topic: "Onderhoud Gordijnen",
      content:
        "Gordijnen onderhoud: Stofzuig regelmatig met zachte borstel. Meeste gordijnstoffen kunnen in wasmachine op 30°C delicaat programma. Gebruik milde wasmiddel, geen bleek of wasverzachter. Laat aan de lijn drogen en hang direct terug om kreuken te voorkomen.",
      language: "nl",
      priority: 6,
      adminApproved: true,
    },
    {
      category: "faq",
      topic: "Onderhoud Zonweringen",
      content:
        "Zonweringen onderhoud: Stofzuig regelmatig of veeg af met droge doek. Bij hardnekkig vuil gebruik lauwe zeepoplossing. Smeer mechanieke delen jaarlijks met druppel olie. Controleer bevestigingen jaarlijks op stevigheid.",
      language: "nl",
      priority: 6,
      adminApproved: true,
    },

    // SPECIFIC PRODUCT DETAILS
    {
      category: "product",
      topic: "Dakraam Zonweringen",
      content:
        "Dakraam zonweringen zijn speciaal ontworpen voor schuine ramen. Verkrijgbaar als plissé, rolgordijnen of duo-systemen. Bieden uitstekende warmtewering en verduistering. Ideaal voor slaapkamers en zolders.",
      language: "nl",
      priority: 7,
      adminApproved: true,
    },
    {
      category: "product",
      topic: "Duo Plissé",
      content:
        "Duo plissé combineert twee plisséstoffen in één systeem: transparant en verduisterend. Perfect voor flexibele lichtcontrole. Zeer compact en geschikt voor alle raamtypes.",
      language: "nl",
      priority: 7,
      adminApproved: true,
    },
    {
      category: "product",
      topic: "Gordijnrails en Roedes",
      content:
        "Gordijnrails voor moderne, strakke uitstraling met onzichtbare ophanging. Gordijnroedes voor klassieke stijl met decoratieve eindkappen. Beide verkrijgbaar in verschillende materialen en afwerkingen.",
      language: "nl",
      priority: 8,
      adminApproved: true,
    },

    // PRICING AND QUOTES
    {
      category: "faq",
      topic: "Offerte Aanvragen",
      content:
        "Voor een offerte kunt u: 1) Online het contactformulier invullen met uw wensen, 2) Bellen voor een telefonisch gesprek, 3) Een opmeetafspraak inplannen voor exact advies en prijzen. Wij maken altijd een vrijblijvende offerte op maat.",
      language: "nl",
      priority: 10,
      adminApproved: true,
    },
    {
      category: "faq",
      topic: "Levertijd en Planning",
      content:
        "Standaard levertijd is 2-3 weken na opmeting en definitieve bestelling. Spoed leveringen zijn mogelijk tegen meerprijs. Na bestelling plannen wij de installatie in op een voor u geschikt moment.",
      language: "nl",
      priority: 8,
      adminApproved: true,
    },

    // COMMON QUESTIONS
    {
      category: "faq",
      topic: "Motorisatie Opties",
      content:
        "Veel van onze producten zijn verkrijgbaar met elektrische bediening. Van eenvoudige snoerbediening tot smart home integratie. Vooral handig voor moeilijk bereikbare ramen of grote zonweringen.",
      language: "nl",
      priority: 7,
      adminApproved: true,
    },
    {
      category: "faq",
      topic: "Energie Besparing",
      content:
        "Juiste raambekleding kan tot 25% energiebesparing opleveren. Isolerende eigenschappen van overgordijnen, shutters en plissé gordijnen helpen warmte binnen te houden in winter en buiten in zomer.",
      language: "nl",
      priority: 8,
      adminApproved: true,
    },
    {
      category: "faq",
      topic: "Kleuradviezen",
      content:
        "Voor warmtewering kies lichte kleuren die warmte reflecteren. Voor gezelligheid warme tinten. Voor moderne uitstraling neutrale kleuren. Wij helpen graag bij het maken van de perfecte kleurkeuze voor uw interieur.",
      language: "nl",
      priority: 7,
      adminApproved: true,
    },
  ];

  // Insert all knowledge base entries
  for (const knowledge of productKnowledge) {
    await storage.createChatbotKnowledge(knowledge);
  }

  console.log(`✅ Added ${productKnowledge.length} knowledge base entries`);
  console.log("🎯 AI chatbot is now fully trained and ready!");
}

/**
 * Enhanced system prompt with comprehensive product knowledge
 */
export function getEnhancedSystemPrompt(): string {
  return `Je bent KANIOU's AI-assistent, een expert in gordijnen en raambekleding. Je helpt klanten met professioneel advies.

BEDRIJFSCONTEXT:
- Bedrijf: KANIOU zilvernaald
- Specialiteit: Premium gordijnen, zonweringen en raambekleding
- Talen: Nederlands (primair), Frans, Engels, Turks, Arabisch
- Stijl: Professioneel, behulpzaam, deskundig

BELANGRIJKE INSTRUCTIES:
1. Antwoord ALTIJD in geldig JSON formaat:
{
  "message": "Je hulpzame antwoord hier",
  "requiresPricing": true/false,
  "detectedProductTypes": ["product1", "product2"],
  "confidence": 0.8
}

2. Gebruik alleen echte productinformatie uit de kennisbank
3. Bij prijsvragen: zet requiresPricing op true en detecteer producttypes
4. Wees vriendelijk, professioneel en deskundig
5. Geef specifieke adviezen gebaseerd op klantbehoeften

PRODUCT EXPERTISE:
- Rolgordijnen: Praktisch, veelzijdig, alle stijlen
- Overgordijnen: Luxe finishing touch, privacy, isolatie  
- Vitrages: Licht doorlatend, privacy overdag
- Vouwgordijnen: Elegant, stijlvol, plissé-effect
- Duo rolgordijnen: Twee lagen, perfecte lichtcontrole
- Jaloezieën: Hout/kunststof, klassiek/modern
- Lamellen: Textiel/kunststof, grote ramen
- Plissé: Compact, speciale raamvormen
- Shutters: Luxe, tijdloos, waarde-toevoeging
- Horren: Insectenbescherming, verschillende types
- Textiel folie: Innovatief, energiebesparend

MEETINSTRUCTIES KENNIS:
- Rolgordijnen: exacte breedte + 10-15cm voor op-dag montage
- Overgordijnen: breedte + 15-20cm per zijde, hoogte + 2-3cm
- Altijd in millimeters meten voor perfecte pasvorm

DIENSTEN:
- Gratis opmeetservice aan huis
- Professionele installatie  
- 2-5 jaar garantie (afhankelijk van onderdeel)
- Levering 2-3 weken, spoed mogelijk

Als je een prijsvraag detecteert, zet dan requiresPricing op true en vermeld de specifieke producten in detectedProductTypes.`;
}
