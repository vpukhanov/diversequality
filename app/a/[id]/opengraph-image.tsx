import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { getAnalysis, Props } from "./analysis";

export const runtime = "edge";

export const alt = "Diversequality Analysis Result";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage({ params }: Props) {
  const analysis = await getAnalysis(params);
  if (!analysis) {
    return notFound();
  }

  const georgia400 = await fetch(
    new URL("../../../components/fonts/georgia-400.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const georgia700 = await fetch(
    new URL("../../../components/fonts/georgia-700.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  // Every single div NEEDS to have display: flex, or the rendering will break
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFF8F0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          fontFamily: "Georgia",
          gap: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: "0.8",
          }}
        >
          <h1
            style={{
              display: "flex",
              fontSize: 54,
              fontWeight: 700,
              color: "#4A4E69",
              marginBottom: "0px",
            }}
          >
            Diversequality
          </h1>
          <div
            style={{
              display: "flex",
              position: "relative",
              width: "333px",
              height: "250px",
            }}
          >
            <svg width="333" height="200" viewBox="0 0 200 120">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
              />
              <circle cx="100" cy="100" r="4" fill="#4A4E69" />
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="30"
                stroke="#4A4E69"
                strokeWidth="3"
                transform={`rotate(${(analysis.score / 100) * 90}, 100, 100)`}
              />
              <defs>
                <linearGradient
                  id="scoreGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#E9A69C" />
                  <stop offset="50%" stopColor="#F5D5D5" />
                  <stop offset="100%" stopColor="#A8C7A3" />
                </linearGradient>
              </defs>
            </svg>
            <div
              style={{
                display: "flex",
                position: "absolute",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "42px",
                fontWeight: 700,
                color: "#4A4E69",
              }}
            >
              {analysis.score}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "white",
            borderRadius: "16px",
            padding: "48px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            flex: "1.2",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {analysis.impact.slice(0, 2).map((point, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                fontSize: 30,
                fontWeight: 400,
                color: "#4B5563",
                lineHeight: "1.5",
              }}
            >
              • {point}
            </div>
          ))}
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
