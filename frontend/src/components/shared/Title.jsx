import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "GOKUL AI",
  description = "Modern AI-powered real-time chat application built with React, Node.js, Socket.IO and Gemini AI.",
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      <meta
        name="theme-color"
        content="#0F172A"
      />

      <meta
        name="keywords"
        content="AI Chat, Messenger, React, MERN, Gemini AI, Socket.io"
      />

      <meta
        name="author"
        content="Gokul"
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <link
        rel="icon"
        href="/favicon.ico"
      />

      <link
        rel="manifest"
        href="/manifest.json"
      />
    </Helmet>
  );
};

export default Title;