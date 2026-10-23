import type { ReactNode } from "react";

export type SponsorCard = { name: string; phone: string; facebook: string; whatsapp: string };

export function whatsappHref(value: string) {
  if (value.startsWith("http")) return value;
  return `https://wa.me/${value.replace(/\D/g, "")}`;
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.58 1 1 0 0 1-.25 1.02z"
      />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.16h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 14.15c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.41-.14-.95-.31-1.64-.61-2.89-1.25-4.77-4.16-4.91-4.35-.14-.19-1.17-1.55-1.17-2.96s.74-2.1 1-2.39c.26-.28.57-.35.76-.35h.55c.17 0 .41-.07.64.49.24.57.81 1.97.88 2.11.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.28-.12.55.16.26.71 1.17 1.52 1.89 1.05.93 1.93 1.22 2.2 1.36.26.14.42.12.58-.07.16-.19.66-.77.84-1.03.17-.26.35-.22.58-.13.24.09 1.49.7 1.75.83.26.12.43.19.49.29.07.1.07.6-.17 1.28z"
      />
    </svg>
  );
}

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="currentColor"
        d="M14.5 8.5V6.7c0-.7.5-1 1.2-1H17V3h-2.1C12.2 3 11 4.4 11 6.5v2H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7z"
      />
    </svg>
  );
}

export function SponsorContacts({ card }: { card: SponsorCard }) {
  const items = [
    card.phone
      ? { href: `tel:${card.phone}`, label: `Call ${card.name}`, icon: <PhoneIcon />, className: "bg-[#34C759] text-white" }
      : null,
    card.whatsapp
      ? {
          href: whatsappHref(card.whatsapp),
          label: `WhatsApp ${card.name}`,
          icon: <WhatsAppIcon />,
          className: "bg-[#25D366] text-white",
          external: true,
        }
      : null,
    card.facebook
      ? {
          href: card.facebook,
          label: `Facebook profile of ${card.name}`,
          icon: <FacebookIcon />,
          className: "bg-[#1877F2] text-white",
          external: true,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="border-t border-line bg-raise px-4 py-3">
      <p className="text-sm text-muted">
        Your sponsor <span className="font-medium text-fg">{card.name}</span>
      </p>
      {items.length > 0 ? (
        <div className="mt-3 flex gap-3">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              target={"external" in item && item.external ? "_blank" : undefined}
              rel={"external" in item && item.external ? "noreferrer" : undefined}
              className={`grid size-12 shrink-0 place-items-center overflow-hidden rounded-full ${item.className}`}
            >
              {item.icon}
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-sm text-muted">No number yet. It appears here when they add one.</p>
      )}
    </div>
  );
}

export function SponsorDetails({ card }: { card: SponsorCard }) {
  const rows = [
    {
      key: "phone",
      label: "Phone",
      value: card.phone,
      href: card.phone ? `tel:${card.phone}` : "",
      icon: <PhoneIcon />,
      tone: "text-[#34C759]",
      empty: "Not added yet",
    },
    {
      key: "facebook",
      label: "Facebook",
      value: card.facebook,
      href: card.facebook,
      icon: <FacebookIcon />,
      tone: "text-[#1877F2]",
      empty: "Not added yet",
      external: true,
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      value: card.whatsapp,
      href: card.whatsapp ? whatsappHref(card.whatsapp) : "",
      icon: <WhatsAppIcon />,
      tone: "text-[#25D366]",
      empty: "Not added yet",
      external: true,
    },
  ];

  return (
    <section className="border-b border-line bg-raise">
      <div className="mx-auto max-w-lg px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Your sponsor</p>
        <p className="mt-1 text-lg font-medium text-fg">{card.name}</p>
        <ul className="mt-3 space-y-2">
          {rows.map((row) => (
            <li key={row.key}>
              {row.href ? (
                <a
                  href={row.href}
                  target={row.external ? "_blank" : undefined}
                  rel={row.external ? "noreferrer" : undefined}
                  className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-3"
                >
                  <span className={`grid size-10 shrink-0 place-items-center rounded-full bg-raise ${row.tone}`}>{row.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{row.label}</span>
                    <span className="block break-all text-sm text-fg">{row.value}</span>
                  </span>
                </a>
              ) : (
                <div className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-raise text-muted">{row.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{row.label}</span>
                    <span className="block text-sm text-muted">{row.empty}</span>
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FieldIcon({ children }: { children: ReactNode }) {
  return <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-fg">{children}</span>;
}
