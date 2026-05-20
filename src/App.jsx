import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Gamepad2,
  GraduationCap,
  Lightbulb,
  Play,
  School,
  Sparkles,
  Target,
  Waves,
} from "lucide-react";

const ITCH_URL = "https://artusamakgames.itch.io/palavra-de-praia";
const FEEDBACK_FORM_URL = "https://forms.gle/uxCbew1nfQZ1mVRZ9";
const HERO_IMAGE = "/assets/screenshot-jogo.png";
const GAMEPLAY_IMAGE = "/assets/gameplay-dois-erros.png";
const FIRST_HINT_IMAGE = "/assets/gameplay-um-erro.png";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const mechanicCards = [
  {
    icon: Gamepad2,
    title: "Anagramas em inglês",
    text: "Palavras embaralhadas para o jogador descobrir.",
  },
  {
    icon: Target,
    title: "3 chances",
    text: "O desafio cria foco e sensação de jogo.",
  },
  {
    icon: Lightbulb,
    title: "Pistas progressivas",
    text: "A cada erro, o jogo ajuda o usuário a continuar tentando.",
  },
  {
    icon: Waves,
    title: "Tema praia",
    text: "Vocabulário contextualizado e fácil de associar.",
  },
];

const businessCards = [
  {
    number: "1",
    title: "MVP gratuito",
    text: "O jogo pode ser acessado livremente para alcançar mais usuários, coletar feedbacks e validar a experiência.",
  },
  {
    number: "2",
    title: "Pague quanto quiser",
    text: "Quem quiser apoiar o projeto pode contribuir voluntariamente pelo Itch.io, ajudando na evolução do jogo.",
  },
  {
    number: "3",
    title: "Freemium no futuro",
    text: "Após a validação, o jogo pode evoluir com novos temas, fases e pacotes de conteúdo pagos.",
  },
  {
    number: "4",
    title: "Versão educacional",
    text: "No médio prazo, o projeto pode oferecer recursos para professores, escolas e cursos de inglês.",
  },
];

const validationItems = [
  "Se o jogo é fácil de entender.",
  "Se a dinâmica é divertida.",
  "Se as pistas ajudam.",
  "Se o usuário jogaria novamente.",
  "Se existe interesse em novos temas.",
  "Se as pessoas apoiariam ou pagariam por uma versão expandida.",
  "Se professores ou escolas usariam como apoio educacional.",
];

const nextSteps = [
  "Novos temas de vocabulário.",
  "Mais fases.",
  "Tradução das palavras.",
  "Pontuação e ranking.",
  "Recursos para professores.",
  "Teste de monetização com apoio voluntário e versões pagas.",
];

function ButtonLink({ href, children, variant = "primary", icon: Icon = ArrowRight }) {
  const base =
    "group inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-6 py-4 text-base font-extrabold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-sand/60 sm:text-lg";
  const variants = {
    primary:
      "bg-reef text-white shadow-[0_14px_0_#9f361e,0_24px_42px_rgba(255,107,53,.38)] hover:-translate-y-1 hover:shadow-[0_18px_0_#9f361e,0_30px_46px_rgba(255,107,53,.42)]",
    secondary:
      "border-2 border-sand bg-ocean/60 text-foam shadow-[0_12px_0_rgba(245,199,107,.45)] hover:-translate-y-1 hover:bg-ocean",
    support:
      "bg-sand text-ink shadow-[0_14px_0_rgba(121,84,22,.55),0_24px_42px_rgba(245,199,107,.28)] hover:-translate-y-1 hover:bg-[#ffd777]",
  };

  return (
    <a
      className={`${base} ${variants[variant] ?? variants.primary}`}
      href={href}
      target={href === "#" ? undefined : "_blank"}
      rel={href === "#" ? undefined : "noreferrer"}
    >
      <Icon className="h-5 w-5 transition duration-300 group-hover:translate-x-1" />
      {children}
    </a>
  );
}

function Section({ id, children, className = "" }) {
  return (
    <motion.section
      id={id}
      className={`relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-24 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sand/40 bg-foam/10 px-4 py-2 text-sm font-black uppercase text-sand shadow-inner shadow-white/10">
      <Sparkles className="h-4 w-4" />
      {children}
    </div>
  );
}

function FloatingLetters() {
  const letters = ["B", "E", "A", "C", "H", "S", "E", "A", "S", "U", "N"];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className="floating-letter absolute grid h-10 w-10 place-items-center rounded-lg border border-foam/20 bg-foam/10 font-display text-xl font-black text-foam/35 shadow-lg backdrop-blur-sm"
          style={{
            left: `${6 + ((index * 17) % 88)}%`,
            top: `${8 + ((index * 23) % 82)}%`,
          }}
          animate={{ y: [-10, 14, -10], rotate: [-5, 6, -5] }}
          transition={{
            duration: 5 + (index % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.25,
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
}

function HeroVisual() {
  const [hasImage, setHasImage] = useState(true);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-2xl"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute -left-4 top-8 h-16 w-16 rounded-lg border-4 border-sand bg-reef/90 rotate-[-12deg] shadow-game" />
      <div className="absolute -right-4 bottom-12 h-20 w-20 rounded-full border-4 border-foam bg-lagoon/90 shadow-glow" />

      <div className="relative overflow-hidden rounded-[2rem] border-[10px] border-ink bg-ink shadow-game">
        <div className="flex items-center justify-between border-b-4 border-sand/80 bg-ocean px-5 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-reef" />
            <span className="h-3 w-3 rounded-full bg-sand" />
            <span className="h-3 w-3 rounded-full bg-lagoon" />
          </div>
          <span className="font-display text-sm font-black uppercase text-sand">MVP jogável</span>
        </div>

        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-ocean via-lagoon to-sand">
          {hasImage ? (
            <img
              src={HERO_IMAGE}
              alt="Screenshot real da tela inicial do MVP Palavra de Praia."
              className="h-full w-full object-cover"
              onError={() => setHasImage(false)}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center bg-sand-noise p-8 text-center text-ink">
              <div className="mb-5 flex gap-2">
                {["S", "E", "A"].map((letter) => (
                  <span
                    key={letter}
                    className="grid h-14 w-14 place-items-center rounded-lg border-4 border-ink bg-foam font-display text-3xl font-black shadow-[0_8px_0_rgba(5,46,58,.25)]"
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <p className="max-w-sm font-display text-2xl font-black">
                Screenshot do jogo entra aqui quando o arquivo estiver em assets.
              </p>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,.22)_38%,transparent_55%)] mix-blend-screen shimmer" />
        </div>

        <div className="flex items-center justify-between gap-3 bg-ink px-5 py-4 text-sm font-black text-foam">
          <span className="rounded-full bg-lagoon px-3 py-1 text-ink">anagrama</span>
          <span>3 chances</span>
          <span className="rounded-full bg-sand px-3 py-1 text-ink">pistas</span>
        </div>
      </div>
    </motion.div>
  );
}

function ScreenshotPanel({ src, alt, label, caption, className = "" }) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <motion.figure
      className={`relative overflow-hidden rounded-[1.5rem] border-[8px] border-ink bg-ink shadow-game ${className}`}
      whileHover={{ y: -6, rotate: 0.25 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="flex items-center justify-between border-b-4 border-sand/80 bg-ocean px-4 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-reef" />
          <span className="h-3 w-3 rounded-full bg-sand" />
          <span className="h-3 w-3 rounded-full bg-lagoon" />
        </div>
        <span className="font-display text-xs font-black uppercase text-sand sm:text-sm">{label}</span>
      </div>

      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-ocean via-lagoon to-sand">
        {hasImage ? (
          <img src={src} alt={alt} className="h-full w-full object-cover" onError={() => setHasImage(false)} />
        ) : (
          <div className="flex h-full items-center justify-center bg-sand-noise p-6 text-center font-display text-2xl font-black text-ink">
            Screenshot do MVP
          </div>
        )}
      </div>

      {caption ? (
        <figcaption className="bg-ink px-4 py-3 text-sm font-extrabold leading-6 text-foam/82">
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}

function InfoCard({ icon: Icon, title, text }) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-lg border-2 border-foam/15 bg-foam/[0.08] p-6 shadow-xl backdrop-blur-md"
      whileHover={{ y: -8, rotate: -0.4 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <div className="absolute right-4 top-4 font-display text-5xl font-black text-foam/5">ABC</div>
      <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-sand text-ink shadow-[0_8px_0_rgba(5,46,58,.25)]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 font-display text-2xl font-black text-foam">{title}</h3>
      <p className="text-base leading-relaxed text-foam/78">{text}</p>
    </motion.article>
  );
}

function BusinessCard({ number, title, text }) {
  return (
    <motion.article
      className="relative rounded-lg border-2 border-ocean/20 bg-foam p-6 text-ink shadow-[0_16px_0_rgba(5,46,58,.12)]"
      whileHover={{ y: -7 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <span className="mb-5 grid h-12 w-12 place-items-center rounded-lg bg-ocean font-display text-2xl font-black text-sand">
        {number}
      </span>
      <h3 className="mb-2 font-display text-2xl font-black">{title}</h3>
      <p className="leading-relaxed text-ink/75">{text}</p>
    </motion.article>
  );
}

function WaveBand() {
  return (
    <div className="wave-band pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden" aria-hidden="true">
      <div className="wave wave-one" />
      <div className="wave wave-two" />
    </div>
  );
}

export default function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ocean text-foam">
      <FloatingLetters />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_8%,rgba(0,184,200,.38),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(255,199,107,.26),transparent_24%),linear-gradient(180deg,#052e3a_0%,#063b4f_42%,#08788a_100%)]" />
      <div className="absolute inset-0 z-0 bg-sand-noise opacity-80" />

      <div className="relative z-10">
        <section className="relative min-h-screen px-5 pb-24 pt-8 sm:px-8 lg:pb-32">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
            <a href="#top" className="font-display text-2xl font-black text-sand">
              Palavra de Praia
            </a>
            <a
              href={ITCH_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-foam/25 bg-foam/10 px-4 py-2 text-sm font-extrabold text-foam transition hover:bg-foam/18"
            >
              <Play className="h-4 w-4 fill-current" />
              Jogar
            </a>
          </div>

          <div id="top" className="mx-auto grid max-w-7xl items-center gap-12 pt-16 lg:grid-cols-[1.03fr_.97fr] lg:pt-24">
            <motion.div initial="hidden" animate="visible" transition={{ duration: 0.7 }} variants={fadeUp}>
              <Eyebrow>MVP em validação</Eyebrow>
              <h1 className="max-w-4xl font-display text-6xl font-black leading-none text-foam sm:text-7xl lg:text-8xl">
                Palavra de Praia
              </h1>
              <p className="mt-7 max-w-2xl text-2xl font-extrabold leading-snug text-sand sm:text-3xl">
                Um jogo educativo de anagramas para praticar vocabulário em inglês de forma leve, rápida e divertida.
              </p>
              <ScreenshotPanel
                src={GAMEPLAY_IMAGE}
                alt="Exemplo real de rodada do Palavra de Praia com anagrama, campo de resposta e pistas reveladas."
                label="Exemplo de rodada"
                caption="Uma rodada real do MVP: palavra embaralhada, resposta digitada e pistas depois dos erros."
                className="mt-7 lg:hidden"
              />
              <p className="mt-6 max-w-2xl text-lg leading-8 text-foam/78">
                Criado como MVP para validar se adolescentes se engajam mais no estudo de inglês quando a memorização vira desafio.
              </p>
              <p className="mt-4 max-w-2xl rounded-lg border border-sand/35 bg-sand/12 px-5 py-4 text-base font-extrabold leading-7 text-foam">
                O jogo é gratuito, mas quem quiser apoiar o desenvolvimento pode contribuir pelo Itch.io no modelo “pague quanto quiser”.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href={ITCH_URL} icon={Play}>
                  Jogar MVP
                </ButtonLink>
                <ButtonLink href={FEEDBACK_FORM_URL} variant="secondary" icon={ClipboardCheck}>
                  Responder feedback
                </ButtonLink>
              </div>
            </motion.div>

            <div className="hidden lg:block">
              <HeroVisual />
            </div>
          </div>
          <WaveBand />
        </section>

        <Section id="problema-solucao">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg border-2 border-reef/50 bg-ink/55 p-7 shadow-game backdrop-blur">
              <Eyebrow>O problema</Eyebrow>
              <h2 className="font-display text-4xl font-black text-sand sm:text-5xl">O problema</h2>
              <div className="mt-5 space-y-4 text-lg leading-8 text-foam/82">
                <p>
                  Muitos adolescentes tentam estudar inglês sozinhos, mas acabam desistindo quando o aprendizado vira apenas repetição, lista de palavras e memorização sem contexto.
                </p>
                <p>
                  O problema não está só em aprender novas palavras. O desafio está em manter motivação suficiente para praticar, errar, tentar de novo e reter o vocabulário.
                </p>
              </div>
            </div>
            <div className="rounded-lg border-2 border-lagoon/50 bg-ink/55 p-7 shadow-game backdrop-blur">
              <Eyebrow>Nossa solução</Eyebrow>
              <h2 className="font-display text-4xl font-black text-lagoon sm:text-5xl">Nossa solução</h2>
              <p className="mt-5 text-lg leading-8 text-foam/82">
                O Palavra de Praia transforma vocabulário em desafio: o jogador resolve anagramas em inglês com tema de praia, recebe pistas ao errar e aprende por tentativa e repetição.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mechanicCards.map((card) => (
              <InfoCard key={card.title} {...card} />
            ))}
          </div>
        </Section>

        <Section id="como-funciona" className="lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr]">
            <div>
              <Eyebrow>Gameplay atual</Eyebrow>
              <h2 className="font-display text-5xl font-black leading-tight text-sand sm:text-6xl">
                Como funciona o MVP
              </h2>
              <p className="mt-6 rounded-lg border-2 border-sand/35 bg-sand/15 p-5 font-display text-3xl font-black leading-tight text-foam">
                No Palavra de Praia, errar não encerra o jogo: errar libera pistas.
              </p>
            </div>

            <div className="relative rounded-lg border-2 border-foam/20 bg-ink/65 p-6 shadow-game backdrop-blur">
              <div className="absolute -right-3 -top-3 rounded-lg bg-reef px-4 py-2 font-display text-xl font-black text-white shadow-[0_8px_0_#9f361e]">
                3 chances
              </div>
              <ol className="space-y-4 pt-6">
                {[
                  "Uma palavra em inglês aparece embaralhada.",
                  "O jogador digita a resposta correta.",
                  "Ele tem até 3 chances.",
                  "No primeiro erro, a primeira letra é revelada.",
                  "No segundo erro, a última letra é revelada.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-lagoon font-display text-xl font-black text-ink">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-lg leading-7 text-foam/84">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <ScreenshotPanel
              src={FIRST_HINT_IMAGE}
              alt="Exemplo real do Palavra de Praia após o primeiro erro, com a primeira letra revelada como pista."
              label="Primeiro erro"
              caption="No primeiro erro, o jogo revela a primeira letra para reduzir frustração e manter a tentativa ativa."
            />
            <ScreenshotPanel
              src={GAMEPLAY_IMAGE}
              alt="Exemplo real do Palavra de Praia após dois erros, com primeira e última letras reveladas."
              label="Segundo erro"
              caption="No segundo erro, a última letra também aparece. O erro vira orientação, não só punição."
            />
          </div>
        </Section>

        <Section id="modelo-negocio" className="bg-sand/95 text-ink">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ocean/20 bg-ocean px-4 py-2 text-sm font-black uppercase text-sand">
              <GraduationCap className="h-4 w-4" />
              Pague quanto quiser
            </div>
            <h2 className="font-display text-5xl font-black leading-tight sm:text-6xl">Modelo de negócio</h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-ink/72">
              <p>
                O Palavra de Praia está em fase de MVP e pode ser jogado gratuitamente. Nesta etapa, nosso objetivo principal é validar a proposta, coletar feedbacks e entender se existe interesse real na solução.
              </p>
              <p>
                Mesmo assim, já iniciamos um primeiro teste de monetização usando o modelo “pague quanto quiser” no Itch.io. Assim, qualquer pessoa joga sem barreira de entrada e, caso queira apoiar o desenvolvimento, contribui com qualquer valor.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {businessCards.map((card) => (
              <BusinessCard key={card.title} {...card} />
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-4xl rounded-lg border-2 border-ocean/20 bg-ocean p-6 text-center font-display text-2xl font-black leading-tight text-foam shadow-[0_14px_0_rgba(5,46,58,.2)]">
            A estratégia atual é manter o acesso aberto, validar o interesse dos usuários e testar apoio financeiro voluntário antes de transformar o MVP em um produto pago.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href={ITCH_URL} variant="support" icon={Sparkles}>
              Apoiar no Itch.io
            </ButtonLink>
          </div>
        </Section>

        <Section id="validacao">
          <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
            <div>
              <Eyebrow>Pesquisa com usuários</Eyebrow>
              <h2 className="font-display text-5xl font-black leading-tight text-sand sm:text-6xl">
                O que estamos validando
              </h2>
              <p className="mt-5 text-xl font-bold text-foam/80">Queremos descobrir:</p>
              <div className="mt-8">
                <ButtonLink href={FEEDBACK_FORM_URL} icon={ClipboardCheck}>
                  Responder feedback
                </ButtonLink>
              </div>
              <ScreenshotPanel
                src={HERO_IMAGE}
                alt="Tela inicial real do MVP Palavra de Praia."
                label="Tela inicial"
                caption="A validação parte do que já existe hoje: um MVP gratuito, jogável, aberto para feedback e com apoio voluntário no Itch.io."
                className="mt-8"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {validationItems.map((item) => (
                <motion.div
                  key={item}
                  className="flex min-h-24 items-start gap-4 rounded-lg border-2 border-foam/14 bg-foam/[0.08] p-5 backdrop-blur"
                  whileHover={{ x: 6 }}
                >
                  <BadgeCheck className="mt-1 h-6 w-6 shrink-0 text-sand" />
                  <p className="text-lg font-bold leading-7 text-foam/84">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="proximos-passos" className="pb-8">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Depois da validação</Eyebrow>
            <h2 className="font-display text-5xl font-black leading-tight text-sand sm:text-6xl">Próximos passos</h2>
            <p className="mt-5 text-lg leading-8 text-foam/78">
              Com base nos feedbacks, vamos decidir quais caminhos priorizar:
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nextSteps.map((step) => (
              <motion.div
                key={step}
                className="rounded-lg border-2 border-sand/25 bg-ink/50 p-5 text-center font-display text-2xl font-black text-foam shadow-[0_12px_0_rgba(245,199,107,.16)]"
                whileHover={{ y: -6, rotate: 0.5 }}
              >
                {step}
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="cta-final" className="pt-12">
          <div className="relative overflow-hidden rounded-lg border-4 border-sand bg-ink p-8 text-center shadow-game sm:p-12">
            <div className="absolute inset-x-0 top-0 h-3 bg-[repeating-linear-gradient(90deg,#ff6b35_0_28px,#f5c76b_28px_56px,#00b8c8_56px_84px)]" />
            <h2 className="mx-auto max-w-4xl font-display text-5xl font-black leading-tight text-foam sm:text-6xl">
              Jogue, responda e apoie a próxima fase
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-foam/78">
              Cada partida, resposta e contribuição ajuda a transformar o Palavra de Praia em uma solução melhor para praticar vocabulário em inglês.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-extrabold leading-8 text-sand">
              O jogo é gratuito, mas você pode apoiar o projeto pelo sistema “pague quanto quiser” no Itch.io.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
              <ButtonLink href={ITCH_URL} icon={Play}>
                Jogar MVP
              </ButtonLink>
              <ButtonLink href={FEEDBACK_FORM_URL} variant="secondary" icon={ClipboardCheck}>
                Responder feedback
              </ButtonLink>
              <ButtonLink href={ITCH_URL} variant="support" icon={Sparkles}>
                Apoiar no Itch.io
              </ButtonLink>
            </div>
          </div>
        </Section>

        <footer className="relative z-10 border-t border-foam/12 bg-ink/70 px-5 py-10 backdrop-blur">
          <div className="mx-auto grid max-w-7xl gap-6 text-sm text-foam/72 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-display text-2xl font-black text-sand">Palavra de Praia</p>
              <p className="mt-2">
                Projeto acadêmico de Empreendedorismo - Engenharia de Computação - UFAL
              </p>
              <p className="mt-1 font-bold text-lagoon">MVP em validação</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="rounded-full bg-foam/10 px-4 py-2 font-bold text-foam transition hover:bg-foam/18" href={ITCH_URL} target="_blank" rel="noreferrer">
                Link do Itch.io
              </a>
              <a className="rounded-full bg-sand px-4 py-2 font-bold text-ink transition hover:bg-[#ffd777]" href={ITCH_URL} target="_blank" rel="noreferrer">
                Apoiar no Itch.io
              </a>
              <a className="rounded-full bg-foam/10 px-4 py-2 font-bold text-foam transition hover:bg-foam/18" href={FEEDBACK_FORM_URL}>
                Link de feedback
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
