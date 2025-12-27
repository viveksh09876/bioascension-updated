import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import path from "path";
import { CanvasRenderingContext2D } from "canvas";
import puppeteer from 'puppeteer';

interface FancyPngOptions {
  text: string;
  outputPath?: string; // Made optional for serverless environments
  subheading?: string;
  logoPath?: string; // Path to a logo for even more branding
  userName?: string; // Add user name for personalization
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, fontSize: number): string[] {
  ctx.font = `${fontSize}px Arial, sans-serif`;
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line.length ? line + " " + words[n] : words[n];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      lines.push(line);
      line = words[n];
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  return lines;
}

function extractKeyInfo(analysis: string): { title: string; keyPoints: string[]; emojis: string[] } {
  const lines = analysis.split('\n');
  const keyPoints: string[] = [];
  const emojis: string[] = [];
  let title = "Heightmax Analysis Report";

  // Extract actual data from the analysis
  let currentSection = '';
  let heightPredictions: string[] = [];
  let growthPlateStatus = '';
  let pubertyStage = '';
  let facialMaturity = '';
  let hormoneTrajectory = '';
  let ethnicPattern = '';

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Detect sections
    if (trimmedLine.includes('📏') && trimmedLine.includes('Height Prediction')) {
      currentSection = 'height';
      title = "Height Prediction Analysis";
      emojis.push('📏');
    } else if (trimmedLine.includes('🦴') && trimmedLine.includes('Growth Plate')) {
      currentSection = 'growthPlate';
      emojis.push('🦴');
    } else if (trimmedLine.includes('🧬') && trimmedLine.includes('Puberty')) {
      currentSection = 'puberty';
      emojis.push('🧬');
    } else if (trimmedLine.includes('💀') && trimmedLine.includes('Facial Maturity')) {
      currentSection = 'facial';
      emojis.push('💀');
    } else if (trimmedLine.includes('📈') && trimmedLine.includes('Hormone')) {
      currentSection = 'hormone';
      emojis.push('📈');
    } else if (trimmedLine.includes('🌍') && trimmedLine.includes('Ethnic')) {
      currentSection = 'ethnic';
      emojis.push('🌍');
    } else if (trimmedLine.includes('✅') && trimmedLine.includes('Recommendations')) {
      currentSection = 'recommendations';
      emojis.push('✅');
    }

    // Extract specific data based on current section
    if (currentSection === 'height') {
      // Look for height predictions with percentages
      if (trimmedLine.includes('%') && (trimmedLine.includes("'") || trimmedLine.includes('cm'))) {
        heightPredictions.push(trimmedLine);
      }
      // Also look for lines with height predictions without percentages
      if ((trimmedLine.includes("'") || trimmedLine.includes('cm')) &&
        (trimmedLine.includes('Height') || trimmedLine.includes('height'))) {
        heightPredictions.push(trimmedLine);
      }
    } else if (currentSection === 'growthPlate') {
      // Extract growth plate status
      if (trimmedLine.includes('%') && (trimmedLine.includes('open') || trimmedLine.includes('closed'))) {
        growthPlateStatus = trimmedLine;
      } else if (trimmedLine.includes('Open') || trimmedLine.includes('Narrowing') || trimmedLine.includes('Nearly Fused')) {
        growthPlateStatus = trimmedLine;
      } else if (trimmedLine.includes('Growth Plate Status:')) {
        // Extract the status from the header line
        const statusMatch = trimmedLine.match(/Growth Plate Status:\s*(.+)/);
        if (statusMatch) {
          growthPlateStatus = statusMatch[1];
        }
      }
    } else if (currentSection === 'puberty') {
      // Extract puberty stage
      if (trimmedLine.includes('%') && trimmedLine.includes('puberty')) {
        pubertyStage = trimmedLine;
      } else if (trimmedLine.includes('Early') || trimmedLine.includes('Mid') || trimmedLine.includes('Late')) {
        pubertyStage = trimmedLine;
      } else if (trimmedLine.includes('Puberty Stage')) {
        // Extract the stage from the header line
        const stageMatch = trimmedLine.match(/Puberty Stage\s*(.+)/);
        if (stageMatch) {
          pubertyStage = stageMatch[1];
        }
      }
    } else if (currentSection === 'facial') {
      // Extract facial maturity
      if (trimmedLine.includes('%') && trimmedLine.includes('mature')) {
        facialMaturity = trimmedLine;
      } else if (trimmedLine.includes('Facial Maturity')) {
        // Extract the maturity from the header line
        const maturityMatch = trimmedLine.match(/Facial Maturity\s*(.+)/);
        if (maturityMatch) {
          facialMaturity = maturityMatch[1];
        }
      }
    } else if (currentSection === 'hormone') {
      // Extract hormone trajectory
      if (trimmedLine.includes('Rising') || trimmedLine.includes('Peaking') || trimmedLine.includes('Stabilizing')) {
        hormoneTrajectory = trimmedLine;
      } else if (trimmedLine.includes('Hormone Trajectory')) {
        // Extract the trajectory from the header line
        const trajectoryMatch = trimmedLine.match(/Hormone Trajectory\s*(.+)/);
        if (trajectoryMatch) {
          hormoneTrajectory = trajectoryMatch[1];
        }
      }
    } else if (currentSection === 'ethnic') {
      // Extract ethnic pattern info
      if (trimmedLine.includes('Growth') || trimmedLine.includes('pattern')) {
        ethnicPattern = trimmedLine;
      } else if (trimmedLine.includes('Ethnic Growth Pattern')) {
        // Extract the pattern from the header line
        const patternMatch = trimmedLine.match(/Ethnic Growth Pattern\s*(.+)/);
        if (patternMatch) {
          ethnicPattern = patternMatch[1];
        }
      }
    }
  }

  // Build key points from extracted data
  if (heightPredictions.length > 0) {
    // Take the first 2-3 most relevant height predictions
    const topPredictions = heightPredictions.slice(0, 3);
    const predictionText = topPredictions.map(pred => {
      // Clean up the prediction text
      return pred.replace(/^[-•*]\s*/, '').trim();
    }).join(', ');
    keyPoints.push(`Height Prediction: ${predictionText}`);
  }

  if (growthPlateStatus) {
    const cleanStatus = growthPlateStatus.replace(/^[-•*]\s*/, '').trim();
    keyPoints.push(`Growth Plates: ${cleanStatus}`);
  }

  if (pubertyStage) {
    const cleanStage = pubertyStage.replace(/^[-•*]\s*/, '').trim();
    keyPoints.push(`Puberty Stage: ${cleanStage}`);
  }

  if (facialMaturity) {
    const cleanMaturity = facialMaturity.replace(/^[-•*]\s*/, '').trim();
    keyPoints.push(`Facial Maturity: ${cleanMaturity}`);
  }

  if (hormoneTrajectory) {
    const cleanTrajectory = hormoneTrajectory.replace(/^[-•*]\s*/, '').trim();
    keyPoints.push(`Hormone Trend: ${cleanTrajectory}`);
  }

  if (ethnicPattern) {
    const cleanPattern = ethnicPattern.replace(/^[-•*]\s*/, '').trim();
    keyPoints.push(`Ethnic Pattern: ${cleanPattern}`);
  }

  // Add recommendations if available
  if (analysis.includes('✅') && analysis.includes('Recommendations')) {
    keyPoints.push("Growth Optimization Tips Included");
  }

  // Add photo analysis if available
  if (analysis.includes('📷') && analysis.includes('Photo Analysis')) {
    keyPoints.push("Photo Analysis Included");
  }

  // If no key points found, add some default ones based on what sections were detected
  if (keyPoints.length === 0) {
    if (emojis.includes('📏')) keyPoints.push("Personalized Height Prediction");
    if (emojis.includes('🦴')) keyPoints.push("Growth Plate Analysis");
    if (emojis.includes('🧬')) keyPoints.push("Puberty Development Assessment");
    if (emojis.includes('💀')) keyPoints.push("Facial Maturity Timeline");
    if (emojis.includes('📈')) keyPoints.push("Hormone Trajectory Analysis");
    if (emojis.includes('🌍')) keyPoints.push("Ethnic Growth Pattern Analysis");
    if (emojis.includes('✅')) keyPoints.push("Growth Optimization Recommendations");
    if (emojis.includes('📷')) keyPoints.push("Photo Analysis Included");
  }

  return { title, keyPoints, emojis };
}

function getRandomEmoji(): string {
  const emojis = ['✨', '🌟', '💫', '⭐', '🎯', '🎉', '🎊', '💎', '🔥', '💪', '🚀', '🎨', '🌈', '🎭', '🎪'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export async function generateFancyPng(opts: FancyPngOptions): Promise<Buffer> {
  const { title, keyPoints, emojis } = extractKeyInfo(opts.text);
  const maxPoints = Math.min(keyPoints.length, 6);
  const pointsToShow = keyPoints.slice(0, maxPoints);
  const emojiBullets = emojis.length > 0 ? emojis : ['✨', '🌟', '💫', '⭐', '🎯', '🎉', '🎊', '💎', '🔥', '💪', '🚀', '🎨', '🌈', '🎭', '🎪'];

  // Dynamic height calculation
  const baseHeight = 600; // px, minimum height
  const perPointHeight = 70; // px per key point
  const minHeight = 600; // px
  const maxHeight = 1200; // px
  const dynamicHeight = Math.max(minHeight, Math.min(baseHeight + pointsToShow.length * perPointHeight, maxHeight));

  // HTML template with dynamic height
  const html = `
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          margin: 0;
          padding: 0;
          width: 1200px;
          height: ${dynamicHeight}px;
          background: linear-gradient(135deg, #0a2540 0%, #14b8a6 100%);
          font-family: 'Inter', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif;
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: ${dynamicHeight}px;
          width: 100vw;
          background: none;
        }
        .card {
          position: relative;
          margin: 0 auto;
          width: 1020px;
          height: ${dynamicHeight - 120}px;
          background: rgba(255,255,255,0.85);
          border-radius: 36px;
          box-shadow: 0 8px 48px 0 rgba(20, 184, 166, 0.18), 0 1.5px 8px 0 #0a254044;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          padding: 56px 48px 0 48px;
          border: 4px solid;
          border-image: linear-gradient(120deg, #0a2540 0%, #14b8a6 100%) 1;
          overflow: hidden;
        }
        .greeting {
          font-size: 30px;
          font-weight: bold;
          color: #0a2540;
          margin-top: 0;
          margin-bottom: 12px;
        }
        .title {
          font-size: 48px;
          font-weight: bold;
          background: linear-gradient(90deg, #0a2540, #14b8a6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 0;
          margin-bottom: 8px;
        }
        .subheading {
          font-size: 22px;
          color: #14b8a6;
          margin-top: 0;
          margin-bottom: 24px;
        }
        .points {
          margin-top: 24px;
          width: 90%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          text-align: left;
        }
        .point {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          font-size: 20px;
          color: #0a2540;
          margin-bottom: 18px;
          text-align: left;
        }
        .point-emoji {
          font-size: 28px;
          margin-right: 18px;
          min-width: 32px;
        }
        .footer {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 32px 0 24px 0;
          background: linear-gradient(0deg, rgba(20,184,166,0.08) 0%, rgba(255,255,255,0.0) 100%);
          border-top: 1.5px solid #14b8a633;
          box-shadow: 0 -2px 16px 0 #0a254022;
        }
        .footer-brand {
          font-size: 30px;
          font-weight: bold;
          color: #0a2540;
        }
        .footer-desc {
          font-size: 18px;
          color: #14b8a6;
        }
        .footer-link {
          font-size: 16px;
          color: #2563eb;
          margin-top: 4px;
        }
        .footer-date {
          font-size: 14px;
          color: #9ca3af;
          margin-top: 2px;
        }
      </style>
    </head>
    <body>
    <div class="container">
      <div class="card">
        ${opts.userName ? `<div class="greeting">Analysis Report for ${opts.userName}</div>` : ''}
        <div class="title">${title}</div>
        ${opts.subheading ? `<div class="subheading">${opts.subheading}</div>` : ''}
        <div class="points">
          ${pointsToShow.map((point, i) => `
            <div class="point">
              <span class="point-emoji">${emojiBullets[i % emojiBullets.length]}</span>
              <span>${point}</span>
            </div>
          `).join('')}
        </div>
        <div class="footer">
          <div class="footer-desc">Advanced Growth Analysis & Prediction</div>
          <div class="footer-link">www.heightmax.ai</div>
        </div>
      </div>
      </div>
    </body>
  </html>
  `;

  // Launch Puppeteer and render HTML to PNG
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: dynamicHeight, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const buffer = Buffer.isBuffer(await page.screenshot({ type: 'png' }))
    ? await page.screenshot({ type: 'png' }) as Buffer
    : Buffer.from(await page.screenshot({ type: 'png' }) as Uint8Array);
  await browser.close();

  if (opts.outputPath && process.env.NODE_ENV !== 'production') {
    try {
      fs.writeFileSync(opts.outputPath, buffer);
    } catch (error) {
      console.error('Failed to write PNG to file:', error);
    }
  }
  return buffer;
}
