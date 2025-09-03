import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>KANIOU | Website in ontwikkeling</title>
        <meta
          name="description"
          content="KANIOU website wordt volledig vernieuwd. Binnenkort beschikbaar met een geheel nieuwe ervaring."
        />
      </Helmet>
      
      {/* Clean foundation for redesign */}
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              KANIOU
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Website wordt volledig vernieuwd
            </p>
            <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
