"use client";

import { Icon } from "./Icon";

type Props = {
  message: React.ReactNode;
  /** Changes whenever a new confirmation should replay its entrance. */
  messageKey?: string;
  actionLabel: string;
  onAction: () => void;
};

/** Add-to-cart confirmation that never steals focus. */
export function Toast({ message, messageKey, actionLabel, onAction }: Props) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      {message && (
        <div
          key={messageKey}
          className="enter pointer-events-auto flex max-w-md items-center gap-3 rounded-[var(--radius-card)] bg-ink py-2.5 ps-4 pe-2.5 text-surface shadow-[var(--shadow-raised)]"
        >
          <Icon name="check" className="size-5 shrink-0 text-accent-soft" />
          <span className="line-clamp-2 min-w-0 text-sm leading-snug">{message}</span>
          <button
            type="button"
            onClick={onAction}
            className="press shrink-0 rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-surface underline underline-offset-4 hover:bg-white/10"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}
