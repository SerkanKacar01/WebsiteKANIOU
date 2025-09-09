import { Helmet } from "react-helmet-async";

const BestelOnlinePage = () => {
  return (
    <>
      <Helmet>
        <title>Bestel Online – Kaniou Zilvernaald</title>
        <meta
          name="description"
          content="Bestel exclusieve raamdecoratie online bij Kaniou Zilvernaald."
        />
      </Helmet>

      {/* Volledig lege pagina voor redesign */}
      <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        <div style={{ padding: "50px", textAlign: "center" }}>
          <h1 style={{ color: "#2C3E50", fontSize: "2rem" }}>LEGE PAGINA</h1>
          <p style={{ color: "#666", marginTop: "20px" }}>
            Deze pagina is volledig leeggemaakt voor redesign
          </p>
        </div>
      </div>
    </>
  );
};

export default BestelOnlinePage;