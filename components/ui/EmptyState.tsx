import { Icon, type IconName } from "./Icon";

type Props = {
  icon: IconName;
  title: string;
  body: React.ReactNode;
  action?: React.ReactNode;
};

export function EmptyState({ icon, title, body, action }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-subtle text-ink-2">
        <Icon name={icon} className="size-6" />
      </span>
      <p className="text-lg font-semibold">{title}</p>
      <div className="max-w-[40ch] text-base text-ink-2">{body}</div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
