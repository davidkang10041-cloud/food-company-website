import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/images';

type Job = { file: string; prompt: string; size: string };

const STYLE = 'professional commercial photography, high quality, detailed, sharp focus';

const jobs: Job[] = [
  {
    file: 'hero.png',
    size: '1344x768',
    prompt:
      'Overhead cinematic food photography of a premium fresh salad and meal prep spread on dark slate stone table: glass meal prep containers with colorful salads, salmon fillet, roasted vegetables, fresh greens, cherry tomatoes, herbs, wooden utensils, scattered peppercorns, moody dramatic side lighting, deep shadows, dark background, ' +
      STYLE,
  },
  {
    file: 'about.png',
    size: '1152x864',
    prompt:
      'Bright premium flat lay of fresh organic vegetables and fruits, leafy greens, cherry tomatoes on vine, bell peppers, broccoli, grains in wooden bowls on warm cream linen tablecloth, soft natural window light, minimalist Korean premium food brand aesthetic, ' +
      STYLE,
  },
  {
    file: 'biz-b2b.png',
    size: '1344x768',
    prompt:
      'Elegant airline catering tray meal service, gourmet inflight meal with fresh salad served on tray table by airplane window, soft daylight through window, premium hospitality photography, ' +
      STYLE,
  },
  {
    file: 'biz-mfg.png',
    size: '1344x768',
    prompt:
      'Modern food factory production line, workers in white hygiene uniforms and hairnets carefully packing fresh salad containers in HACCP certified clean facility, stainless steel equipment, bright clean lighting, ' +
      STYLE,
  },
  {
    file: 'biz-kit.png',
    size: '1344x768',
    prompt:
      'Fresh meal kit presentation, colorful prepared salad bowls and fresh vegetables arranged on light wooden table, minimal premium Korean meal kit brand styling, soft daylight, ' +
      STYLE,
  },
  {
    file: 'biz-online.png',
    size: '1344x768',
    prompt:
      'Modern food distribution center, neatly organized fresh produce boxes and cold chain delivery crates, clean bright warehouse logistics with subtle green accents, ' +
      STYLE,
  },
  {
    file: 'value-1.png',
    size: '1152x864',
    prompt:
      'Professional food consultant in bright modern kitchen discussing customized meal solution with a client, fresh ingredients and tablet on table, warm trustworthy tones, ' +
      STYLE,
  },
  {
    file: 'value-2.png',
    size: '1152x864',
    prompt:
      'Fresh salad bowls and packaged meal kits arranged in ascending steps on clean light background symbolizing business growth, creative food commercial photography, green fresh tones, ' +
      STYLE,
  },
  {
    file: 'value-3.png',
    size: '1152x864',
    prompt:
      'Digital food commerce concept, hand holding smartphone with online grocery shopping app beside fresh vegetables and fruits on clean white desk, modern minimalist, ' +
      STYLE,
  },
  {
    file: 'value-4.png',
    size: '1152x864',
    prompt:
      'Volunteers packing fresh vegetable donation boxes together in warm bright light, heartwarming social enterprise community concept, documentary photography style, ' +
      STYLE,
  },
  {
    file: 'prod-1.png',
    size: '1024x1024',
    prompt:
      'Top-down product photography of a fresh ricotta cheese salad in a clear round plastic container: creamy white ricotta cheese balls, fusilli pasta, black olives, sweet corn, cherry tomatoes on fresh green lettuce, pure white studio background, ' +
      STYLE,
  },
  {
    file: 'prod-2.png',
    size: '1024x1024',
    prompt:
      'Top-down product photography of a crispy chicken tender salad in a clear round plastic container: golden crispy chicken tenders, black olives, sweet corn, cherry tomatoes, boiled egg on fresh green lettuce, pure white studio background, ' +
      STYLE,
  },
  {
    file: 'prod-3.png',
    size: '1024x1024',
    prompt:
      'Top-down product photography of a bacon and potato salad in a clear round plastic container: roasted bacon bits, golden potato chunks, sweet corn, black olives, cherry tomatoes, purple cabbage on fresh green lettuce, pure white studio background, ' +
      STYLE,
  },
  {
    file: 'prod-4.png',
    size: '1024x1024',
    prompt:
      'Top-down product photography of a grilled chicken breast salad in a clear round plastic container: sliced grilled chicken breast, black olives, sweet corn, boiled egg, cherry tomatoes on fresh green lettuce, pure white studio background, ' +
      STYLE,
  },
  {
    file: 'prod-5.png',
    size: '1024x1024',
    prompt:
      'Top-down product photography of a smoked chicken breast salad in a clear round plastic container: pink smoked chicken breast slices, sweet corn, black olives, cherry tomatoes on fresh green lettuce, pure white studio background, ' +
      STYLE,
  },
  {
    file: 'facility-1.png',
    size: '1152x864',
    prompt:
      'Automatic thermoforming vacuum packaging machine, large stainless steel industrial food packaging equipment in clean bright modern food factory, professional industrial photography, ' +
      STYLE,
  },
  {
    file: 'facility-2.png',
    size: '1152x864',
    prompt:
      'Large industrial multi-stage bubble washing machine line for fresh vegetables, stainless steel washer conveyor equipment in clean food processing facility, bright hygienic environment, ' +
      STYLE,
  },
];

async function generateOne(zai: Awaited<ReturnType<typeof ZAI.create>>, job: Job) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const response = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size,
      });
      const base64 = response?.data?.[0]?.base64;
      if (!base64) throw new Error('empty base64 response');
      const buffer = Buffer.from(base64, 'base64');
      const outPath = path.join(OUT_DIR, job.file);
      fs.writeFileSync(outPath, buffer);
      console.log(`OK  ${job.file} (${Math.round(buffer.length / 1024)} KB)`);
      return true;
    } catch (err) {
      console.error(`ERR ${job.file} attempt ${attempt}: ${(err as Error).message}`);
      if (attempt < 5) await new Promise((r) => setTimeout(r, 4000 * attempt));
    }
  }
  return false;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Skip jobs whose output already exists (allows resuming)
  const pending = jobs.filter((j) => {
    const p = path.join(OUT_DIR, j.file);
    if (fs.existsSync(p)) {
      console.log(`SKIP ${j.file} (exists)`);
      return false;
    }
    return true;
  });
  const zai = await ZAI.create();
  let index = 0;
  const results: boolean[] = [];

  async function worker() {
    while (index < pending.length) {
      const current = pending[index++];
      results.push(await generateOne(zai, current));
      // small gap between requests to avoid rate limiting
      await new Promise((r) => setTimeout(r, 2500));
    }
  }

  // sequential execution to avoid 429 rate limits
  await worker();
  const failed = results.filter((r) => !r).length;
  console.log(`DONE success=${results.length - failed} failed=${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

main();
