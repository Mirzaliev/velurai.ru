import { Github, Linkedin, MessagesSquare, Sparkles, Twitter } from "lucide-react";

const cols = [
  { title: "Продукт", links: ["Возможности", "Тарифы", "VPN", "AI-агенты"] },
  { title: "Ресурсы", links: ["Документация", "Блог", "Гайды", "API"] },
  { title: "Компания", links: ["О нас", "Контакты", "Карьера", "Партнёры"] },
  { title: "Правовое", links: ["Конфиденциальность", "Условия", "Cookies", "Безопасность"] },
];

const socialIcons = [Twitter, Github, Linkedin, MessagesSquare];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-4 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-6">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-semibold">Nebula AI</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/50">
            Единая AI-платформа для преподавателей, бизнеса и частных пользователей.
          </p>
          <div className="mt-6 flex gap-3">
            {socialIcons.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="glass grid h-9 w-9 place-items-center rounded-xl transition-colors hover:bg-white/10"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              {c.title}
            </div>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/60 transition-colors hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
        <div className="text-xs text-white/40">© 2026 Nebula AI. Все права защищены.</div>
        <div className="text-xs text-white/40">Создано с любовью и вниманием к деталям.</div>
      </div>
    </footer>
  );
}
