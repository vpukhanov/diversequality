import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Diversequality";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  const georgia400 = await fetch(
    new URL("../components/fonts/georgia-400.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const georgia700 = await fetch(
    new URL("../components/fonts/georgia-700.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFF8F0",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Georgia",
          gap: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 80,
            fontWeight: 700,
            color: "#4A4E69",
          }}
        >
          Diversequality
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 42,
            color: "#4B5563",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: "1.5",
          }}
        >
          Look at the global events through the lens of diversity and inclusion
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Georgia",
          data: georgia400,
          weight: 400,
        },
        {
          name: "Georgia",
          data: georgia700,
          weight: 700,
        },
      ],
    },
  );
}
