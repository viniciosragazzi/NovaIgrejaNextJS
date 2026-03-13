import fs from "node:fs";
import path from "node:path";

const outputPath = path.resolve("output/pdf/novaigreja-resumo-ptbr.pdf");

const page = {
  width: 595,
  height: 842,
  margin: 42,
};

const colors = {
  ink: "0.13 0.14 0.16",
  muted: "0.36 0.40 0.45",
  accent: "0.74 0.56 0.16",
  line: "0.87 0.89 0.91",
  panel: "0.97 0.97 0.96",
};

function esc(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function pdfText(text, x, y, size = 10, font = "F1", color = colors.ink) {
  return `BT /${font} ${size} Tf ${color} rg 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(
    2
  )} Tm (${esc(text)}) Tj ET`;
}

function pdfLine(x1, y1, x2, y2, width = 1, color = colors.line) {
  return `${width} w ${color} RG ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(
    2
  )} ${y2.toFixed(2)} l S`;
}

function pdfRect(x, y, w, h, strokeColor = colors.line, fillColor = null) {
  const stroke = `${strokeColor} RG`;
  const fill = fillColor ? `${fillColor} rg` : "";
  const op = fillColor ? "B" : "S";
  return `${stroke} ${fill} ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(
    2
  )} ${h.toFixed(2)} re ${op}`;
}

function wrapText(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function drawParagraph(commands, text, x, y, options = {}) {
  const size = options.size ?? 10;
  const leading = options.leading ?? size + 3;
  const maxChars = options.maxChars ?? 52;
  const color = options.color ?? colors.ink;
  const font = options.font ?? "F1";
  const lines = wrapText(text, maxChars);

  let cursorY = y;
  for (const line of lines) {
    commands.push(pdfText(line, x, cursorY, size, font, color));
    cursorY -= leading;
  }

  return cursorY;
}

function drawBullets(commands, bullets, x, y, options = {}) {
  const size = options.size ?? 9.3;
  const leading = options.leading ?? 13;
  const maxChars = options.maxChars ?? 34;
  let cursorY = y;

  for (const bullet of bullets) {
    const lines = wrapText(bullet, maxChars);
    commands.push(pdfText("-", x, cursorY, size, "F1", colors.accent));
    commands.push(pdfText(lines[0], x + 10, cursorY, size, "F1", colors.ink));
    cursorY -= leading;

    for (let i = 1; i < lines.length; i += 1) {
      commands.push(pdfText(lines[i], x + 10, cursorY, size, "F1", colors.ink));
      cursorY -= leading;
    }

    cursorY -= 1;
  }

  return cursorY;
}

function drawSectionTitle(commands, title, x, y) {
  commands.push(pdfText(title, x, y, 11, "F2", colors.ink));
  commands.push(pdfLine(x, y - 4, x + 98, y - 4, 1.2, colors.line));
  return y - 18;
}

const leftX = page.margin;
const rightX = 316;
const columnWidth = 237;

const content = {
  whatIs:
    "NovaIgreja e um app web multi-tenant para igrejas, construido com Next.js, Prisma e Better Auth. O fluxo encontrado no repo cobre cadastro administrativo, onboarding da igreja, pagina publica por label e painel interno de gestao.",
  whoFor:
    "Usuario principal: staff/administrador da igreja responsavel por configurar a igreja, operar o dashboard e acompanhar membros, ministerios e financeiro.",
  features: [
    "Cadastro e login com Better Auth, incluindo onboarding para criar a igreja.",
    "URLs por igreja com churchLabel e area publica para a comunidade.",
    "Dashboard interno por igreja com isolamento entre tenants.",
    "Gestao de membros, visitantes e voluntarios com formularios e filtros.",
    "Ministerios e escalas de voluntarios com confirmacao de participacao.",
    "Financeiro com configuracao PIX e registro manual de entradas.",
    "Perfil da igreja e links publicos editaveis para a pagina da igreja.",
  ],
  architecture: [
    "UI: Next.js App Router em src/app, com paginas globais e rotas dinamicas /[churchLabel].",
    "Auth: Better Auth exposto em src/app/api/auth/[...all]/route.ts e consumido por server actions.",
    "Dados: Prisma Client em src/lib/prisma.ts conectado a PostgreSQL; schema em prisma/schema.prisma.",
    "Seguranca: proxy.ts valida labels, redireciona auth e bloqueia acesso cruzado entre igrejas.",
    "Fluxo: paginas chamam server actions -> actions validam sessao -> Prisma le/escreve no banco -> revalidatePath atualiza a UI.",
  ],
  run: [
    "Instalar dependencias: npm install",
    "Subir o PostgreSQL local: docker compose -f docker-compose.postgres.yml up -d",
    "Configurar .env com DATABASE_URL, BETTER_AUTH_SECRET e BETTER_AUTH_URL",
    "Aplicar schema/migrations do Prisma: npx prisma migrate deploy",
    "Iniciar o app: npm run dev",
  ],
  notes: [
    "Seed de dados: Not found in repo.",
    "Comando documentado oficial de setup: Not found in repo.",
  ],
};

const commands = [];

commands.push(pdfRect(32, 739, 531, 71, colors.line, colors.panel));
commands.push(pdfText("NovaIgreja", 44, 786, 24, "F2", colors.ink));
commands.push(
  pdfText("Resumo do app baseado apenas em evidencias do repositorio", 44, 768, 10, "F1", colors.muted)
);
commands.push(pdfText("pt-BR | 1 pagina", 457, 786, 9, "F2", colors.accent));
commands.push(pdfLine(297.5, 90, 297.5, 728, 1, colors.line));

let yLeft = 724;
let yRight = 724;

yLeft = drawSectionTitle(commands, "O que e", leftX, yLeft);
yLeft = drawParagraph(commands, content.whatIs, leftX, yLeft, {
  size: 9.8,
  leading: 13,
  maxChars: 56,
});

yLeft -= 8;
yLeft = drawSectionTitle(commands, "Para quem", leftX, yLeft);
yLeft = drawParagraph(commands, content.whoFor, leftX, yLeft, {
  size: 9.8,
  leading: 13,
  maxChars: 56,
});

yLeft -= 8;
yLeft = drawSectionTitle(commands, "O que faz", leftX, yLeft);
yLeft = drawBullets(commands, content.features, leftX, yLeft, {
  size: 9.1,
  leading: 12.2,
  maxChars: 36,
});

yRight = drawSectionTitle(commands, "Como funciona", rightX, yRight);
yRight = drawBullets(commands, content.architecture, rightX, yRight, {
  size: 9.1,
  leading: 12.4,
  maxChars: 34,
});

yRight -= 8;
yRight = drawSectionTitle(commands, "Como rodar", rightX, yRight);
yRight = drawBullets(commands, content.run, rightX, yRight, {
  size: 9.1,
  leading: 12.4,
  maxChars: 34,
});

yRight -= 4;
yRight = drawSectionTitle(commands, "Lacunas", rightX, yRight);
yRight = drawBullets(commands, content.notes, rightX, yRight, {
  size: 9,
  leading: 12,
  maxChars: 34,
});

commands.push(pdfLine(42, 70, 553, 70, 1, colors.line));
commands.push(
  pdfText(
    "Fontes inspecionadas: package.json, prisma/schema.prisma, proxy.ts, src/app, src/actions, src/lib.",
    42,
    54,
    8.5,
    "F1",
    colors.muted
  )
);

const stream = commands.join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [0];

for (let i = 0; i < objects.length; i += 1) {
  offsets.push(Buffer.byteLength(pdf, "utf8"));
  pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
}

const xrefOffset = Buffer.byteLength(pdf, "utf8");
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";

for (let i = 1; i < offsets.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}

pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

fs.writeFileSync(outputPath, pdf, "binary");
console.log(outputPath);
