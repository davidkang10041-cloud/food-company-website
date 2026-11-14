import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/home/z/my-project/public/images';

type Job = { file: string; prompt: string; size: string };

/* 대기업 식품사 톤: 밝고 신선한 에디토리얼 푸드 포토그래피 */
const STYLE =
  'bright airy premium editorial food photography, soft natural daylight, light neutral background, clean minimal composition, appetizing fresh mood, high quality, detailed, sharp focus';

const jobs: Job[] = [
  {
    file: 'hero.png',
    size: '1344x768',
    prompt:
      'Wide cinematic overhead view of a premium healthy Korean food spread: fresh green salads in white ceramic bowls, colorful banchan side dishes, grains, grilled chicken, herbs, arranged on bright white marble table, soft daylight from the left, generous negative space on the right side for text, bright appetizing mood, ' +
      STYLE,
  },
  {
    file: 'hero-airline.png',
    size: '1344x768',
    prompt:
      'Premium airline business class meal service: elegant tray with fresh salad and Korean cuisine on wooden tray table by airplane window, soft bright daylight through window with clouds, luxury hospitality photography, negative space on the left side, ' +
      STYLE,
  },
  {
    file: 'hero-mealkit.png',
    size: '1344x768',
    prompt:
      'Fresh premium meal kit ingredients neatly arranged: kraft paper boxes, clear containers with green leafy vegetables, cherry tomatoes, sauce packets on light wooden kitchen counter, bright clean morning light, negative space on the right for text, premium Korean meal kit brand aesthetic, ' +
      STYLE,
  },
  {
    file: 'about.png',
    size: '1152x864',
    prompt:
      'Bright flat lay of fresh organic produce: leafy greens, cherry tomatoes on vine, broccoli, carrots, lemons arranged in white ceramic bowls on warm cream linen tablecloth, soft natural window light, premium Korean food brand aesthetic, airy and clean, ' +
      STYLE,
  },
  {
    file: 'biz-b2b.png',
    size: '1344x768',
    prompt:
      'Modern bright food distribution warehouse: neatly organized fresh produce crates with vegetables and greens, logistics worker in clean uniform checking quality on tablet, cold chain facility with white and green tones, organized professional atmosphere, ' +
      STYLE,
  },
  {
    file: 'biz-mfg.png',
    size: '1344x768',
    prompt:
      'Bright modern HACCP certified food factory: workers in white hygienic uniforms and hairnets carefully packing fresh salad containers along stainless steel production line, clean white facility with soft green accents, professional industrial photography, ' +
      STYLE,
  },
  {
    file: 'biz-kit.png',
    size: '1344x768',
    prompt:
      'Premium meal kit presentation: fresh vegetables, salad base, dressing bottles and recipe card arranged neatly in kraft paper box on light wooden table, bright kitchen softly blurred in background, appetizing and clean, ' +
      STYLE,
  },
  {
    file: 'biz-online.png',
    size: '1344x768',
    prompt:
      'Fresh grocery delivery scene: courier handing over fresh produce box with green vegetables and ice pack at bright modern doorstep, warm daylight, online food shopping e-commerce concept, clean bright tones, ' +
      STYLE,
  },
  {
    file: 'quality-1.png',
    size: '1344x768',
    prompt:
      'Quality control inspector in white lab coat and gloves examining fresh green vegetables with digital tablet in bright modern food facility, stainless steel surfaces, HACCP hygiene standards, bright clean professional lighting, ' +
      STYLE,
  },
  {
    file: 'quality-2.png',
    size: '1344x768',
    prompt:
      'Automatic thermoforming vacuum packaging machine with fresh salad trays moving along stainless steel conveyor in bright modern white food factory, precision industrial equipment, clean hygienic environment, ' +
      STYLE,
  },
  {
    file: 'prod-1.png',
    size: '1024x1024',
    prompt:
      'Premium top-down product photography of fresh ricotta cheese salad in a clear round container: creamy white ricotta cheese balls, fusilli pasta, black olives, sweet corn, cherry tomatoes on crisp green lettuce, pure white studio background, soft even lighting, ' +
      STYLE,
  },
  {
    file: 'prod-2.png',
    size: '1024x1024',
    prompt:
      'Premium top-down product photography of a crispy chicken tender salad in a clear round container: golden crispy chicken tenders, black olives, sweet corn, cherry tomatoes, boiled egg on fresh green lettuce, pure white studio background, soft even lighting, ' +
      STYLE,
  },
  {
    file: 'prod-3.png',
    size: '1024x1024',
    prompt:
      'Premium top-down product photography of a bacon and potato salad in a clear round container: roasted bacon bits, golden potato chunks, sweet corn, black olives, cherry tomatoes, purple cabbage on fresh green lettuce, pure white studio background, soft even lighting, ' +
      STYLE,
  },
  {
    file: 'prod-4.png',
    size: '1024x1024',
    prompt:
      'Premium top-down product photography of a grilled chicken breast salad in a clear round container: sliced grilled chicken breast, black olives, sweet corn, boiled egg, cherry tomatoes on fresh green lettuce, pure white studio background, soft even lighting, ' +
      STYLE,
  },
  {
    file: 'prod-5.png',
    size: '1024x1024',
    prompt:
      'Premium top-down product photography of a smoked chicken breast salad in a clear round container: pink smoked chicken breast slices, red paprika, sweet corn, black olives, cherry tomatoes on fresh green lettuce, pure white studio background, soft even lighting, ' +
      STYLE,
  },
  {
    file: 'value-1.png',
    size: '1152x864',
    prompt:
      'Professional food consultant in bright modern kitchen discussing customized meal solution with a client, fresh ingredients and tablet on wooden table, warm trustworthy tones, natural light, ' +
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
      'Hand holding smartphone with online grocery shopping app beside fresh vegetables and fruits on clean white desk, bright modern minimalist food e-commerce concept, ' +
      STYLE,
  },
  {
    file: 'value-4.png',
    size: '1152x864',
    prompt:
      'Volunteers packing fresh vegetable donation boxes together in warm bright light, heartwarming social enterprise community concept, documentary photography style, ' +
      STYLE,
  },
];

async function generateOne(
  zai: Awaited<ReturnType<typeof ZAI.create>>,
  job: Job
) {
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

  async function worker(id: number) {
    while (index < pending.length) {
      const current = pending[index++];
      results.push(await generateOne(zai, current));
      await new Promise((r) => setTimeout(r, 3000 + id * 1200));
    }
  }

  await Promise.all([worker(0), worker(1)]);
  const failed = results.filter((r) => !r).length;
  console.log(`DONE success=${results.length - failed} failed=${failed}`);
  process.exit(failed > 0 ? 1 : 0);
}

main();
