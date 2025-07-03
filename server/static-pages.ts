// Static HTML pages for product categories to ensure immediate visibility
export const productPageHTML = (productName: string) => `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName} - KANIOU</title>
    <meta name="description" content="Premium ${productName} van KANIOU. Professioneel advies, op maat gemaakt en vakkundige montage.">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .breadcrumb { background: #f8f9fa; border-bottom: 1px solid #e9ecef; padding: 1rem 0; }
        .breadcrumb nav { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; }
        .breadcrumb a { color: #6c757d; text-decoration: none; }
        .breadcrumb a:hover { color: #495057; }
        .hero { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 4rem 0; text-align: center; }
        .hero h1 { font-size: 3rem; font-weight: bold; margin-bottom: 1.5rem; }
        .hero p { font-size: 1.25rem; margin-bottom: 2rem; max-width: 800px; margin-left: auto; margin-right: auto; }
        .hero button { background: #eab308; color: #000; font-weight: 600; padding: 0.75rem 2rem; border: none; border-radius: 0.5rem; cursor: pointer; font-size: 1rem; transition: background 0.3s; }
        .hero button:hover { background: #ca8a04; }
        .content { padding: 4rem 0; background: #f8f9fa; }
        .content h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #1f2937; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem; }
        .card { background: white; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); padding: 1.5rem; }
        .card h3 { color: #1e3a8a; font-size: 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; }
        .card h3::before { content: "✓"; color: #16a34a; margin-right: 0.5rem; }
        .card ul { list-style: none; }
        .card li { color: #6b7280; margin-bottom: 0.5rem; display: flex; align-items: center; }
        .card li::before { content: "✓"; color: #16a34a; margin-right: 0.5rem; }
        .cta { text-align: center; padding: 2rem; background: white; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .cta h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #1f2937; }
        .cta p { color: #6b7280; margin-bottom: 2rem; }
        .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .cta-primary { background: #2563eb; color: white; padding: 0.75rem 2rem; border: none; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: background 0.3s; }
        .cta-primary:hover { background: #1d4ed8; }
        .cta-secondary { border: 2px solid #2563eb; color: #2563eb; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; transition: all 0.3s; }
        .cta-secondary:hover { background: #2563eb; color: white; }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .hero p { font-size: 1rem; }
            .content h2 { font-size: 2rem; }
            .cta-buttons { flex-direction: column; align-items: center; }
        }
    </style>
</head>
<body>
    <!-- Breadcrumb -->
    <div class="breadcrumb">
        <div class="container">
            <nav>
                <a href="/">Home</a>
                <span>/</span>
                <a href="/producten">Producten</a>
                <span>/</span>
                <span style="color: #1f2937; font-weight: 500;">${productName}</span>
            </nav>
        </div>
    </div>

    <!-- Hero Section -->
    <div class="hero">
        <div class="container">
            <h1>${productName}</h1>
            <p>Ontdek onze uitgebreide collectie ${productName.toLowerCase()} van premium kwaliteit. Professioneel advies, op maat gemaakt en vakkundige montage.</p>
            <button onclick="window.location.href='/contact'">Bekijk Collectie</button>
        </div>
    </div>

    <!-- Content Section -->
    <div class="content">
        <div class="container">
            <h2>Onze ${productName} Collectie</h2>

            <!-- Information Cards -->
            <div class="cards">
                <div class="card">
                    <h3>Toepassingen</h3>
                    <ul>
                        <li>Woonkamer</li>
                        <li>Slaapkamer</li>
                        <li>Kantoor</li>
                        <li>Badkamer</li>
                        <li>Keuken</li>
                    </ul>
                </div>

                <div class="card">
                    <h3>Voordelen</h3>
                    <ul>
                        <li>Premium kwaliteit</li>
                        <li>Op maat gemaakt</li>
                        <li>Professionele montage</li>
                        <li>Uitstekende service</li>
                        <li>Garantie inbegrepen</li>
                    </ul>
                </div>

                <div class="card">
                    <h3>Kenmerken</h3>
                    <ul>
                        <li>Diverse kleuren</li>
                        <li>Hoogwaardige materialen</li>
                        <li>Eenvoudige bediening</li>
                        <li>Onderhoudsarm</li>
                        <li>Duurzaam</li>
                    </ul>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="cta">
                <h3>Interesse in ${productName}?</h3>
                <p>Neem contact met ons op voor een vrijblijvende offerte of kom langs in onze showroom voor persoonlijk advies.</p>
                <div class="cta-buttons">
                    <a href="/offerte" class="cta-primary">Vraag Offerte Aan</a>
                    <a href="/contact" class="cta-secondary">Neem Contact Op</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

// Product categories mapping
export const productCategories = [
  { label: "Overgordijnen", urlPath: "overgordijnen" },
  { label: "Vitrages", urlPath: "vitrages" },
  { label: "Rolgordijnen", urlPath: "rolgordijnen" },
  { label: "Duo rolgordijnen", urlPath: "duo-rolgordijnen" },
  { label: "Textiel lamellen", urlPath: "textiel-lamellen" },
  { label: "Kunststof lamellen", urlPath: "kunststof-lamellen" },
  { label: "Houten jaloezieën", urlPath: "houten-jaloezieen" },
  { label: "Kunststof jaloezieën", urlPath: "kunststof-jaloezieen" },
  { label: "Textiel raamfolie", urlPath: "textiel-raamfolie" },
  { label: "Houten shutters", urlPath: "houten-shutters" },
  { label: "Inzethorren", urlPath: "inzethorren" },
  { label: "Opzethorren", urlPath: "opzethorren" },
  { label: "Plissé hordeuren", urlPath: "plisse-hordeuren" },
  { label: "Plissé", urlPath: "plisse" },
  { label: "Duo plissé", urlPath: "duo-plisse" },
  { label: "Dakraam zonweringen", urlPath: "dakraam-zonweringen" },
  { label: "Gordijnrails", urlPath: "gordijnrails" },
  { label: "Gordijnroedes", urlPath: "gordijnroedes" },
  { label: "SQUID textile folie", urlPath: "squid-textile-foil" },
];