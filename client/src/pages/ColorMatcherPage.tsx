import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import ColorMatcher from "@/components/colorMatcher/ColorMatcher";

const ColorMatcherPage = () => {
  return (
    <>
      <Helmet>
        <title>Kleur Matcher - KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Upload een foto van uw kamer en ontdek welke kleuren rolgordijnen, venetiaanse lamellen en gordijnen het beste bij uw interieur passen."
        />
      </Helmet>

      <div className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-primary font-semibold mb-4">
              Interactieve Kleur Matcher
            </h1>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Upload een foto van uw kamer en ontdek met AI-technologie welke kleuren 
              rolgordijnen, venetiaanse lamellen en gordijnen perfect bij uw interieur passen.
            </p>
          </div>

          <ColorMatcher />
        </Container>
      </div>
    </>
  );
};

export default ColorMatcherPage;