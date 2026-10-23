"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";
import { CartLine } from "./CartLine";

type DemoOrder = { id: string; total: number; count: number };

export function CartDrawer() {
  const { isOpen, close, items, count, total, setQty, remove, clear } = useCart();
  const ref = useRef<HTMLDialogElement>(null);
  const [order, setOrder] = useState<DemoOrder | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  function handleClose() {
    close();
    setOrder(null);
  }

  function placeDemoOrder() {
    const id = `DEMO-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrder({ id, total, count });
    clear();
  }

  function backToProducts() {
    handleClose();
    document.getElementById("products")?.scrollIntoView();
  }

  return (
    <dialog
      ref={ref}
      className="drawer"
      aria-labelledby="cart-title"
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Opening the cart focuses the panel itself, so no control shows a focus ring until the keyboard moves. */}
      <div className="flex h-full flex-col outline-none" tabIndex={-1} autoFocus>
        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <h2 id="cart-title" className="text-lg font-semibold">
            {order ? "אישור הזמנת דוגמה" : "סל הקניות"}
            {!order && count > 0 && (
              <span className="num ms-2 text-sm font-normal text-ink-2">({count} פריטים)</span>
            )}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="press grid size-11 place-items-center rounded-[var(--radius-control)] text-ink-2 hover:bg-subtle hover:text-ink"
            aria-label="סגירת הסל"
          >
            <Icon name="close" className="size-5" />
          </button>
        </header>

        {order ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-10 text-center" role="status">
            <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-accent">
              <Icon name="check" className="size-7" />
            </span>
            <p className="text-xl font-semibold">הזמנת הדוגמה התקבלה</p>
            <p className="-mt-2 max-w-[34ch] text-base text-ink-2">לא בוצע חיוב ולא יישלח דבר. זו הזמנה בחנות הדגמה.</p>
            <dl className="w-full max-w-xs divide-y divide-line rounded-[var(--radius-card)] border border-line text-start text-sm">
              <div className="flex justify-between px-4 py-2.5">
                <dt className="text-ink-2">מספר הזמנה</dt>
                <dd dir="ltr" className="num font-medium">{order.id}</dd>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <dt className="text-ink-2">פריטים</dt>
                <dd className="num font-medium">{order.count}</dd>
              </div>
              <div className="flex justify-between px-4 py-2.5">
                <dt className="text-ink-2">סכום (לדוגמה)</dt>
                <dd className="num font-medium">{formatPrice(order.total)}</dd>
              </div>
            </dl>
            <Button variant="secondary" onClick={backToProducts} className="mt-2">
              חזרה לחנות
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center pb-10">
            <EmptyState
              icon="cart"
              title="הסל ריק"
              body={<p>עדיין לא נוספו מוצרים לסל.</p>}
              action={<Button onClick={backToProducts}>לכל המוצרים</Button>}
            />
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-5">
              {items.map((item, i) => (
                <CartLine
                  index={i}
                  key={item.product.id}
                  item={item}
                  onQty={(n) => setQty(item.product.id, n)}
                  onRemove={() => remove(item.product.id)}
                />
              ))}
            </ul>
            <footer className="border-t border-line px-5 pt-4 pb-5">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">סה״כ</span>
                <span className="display num text-sign-sm">{formatPrice(total)}</span>
              </div>
              <p className="mt-0.5 text-xs text-ink-2">מחירי דוגמה. ללא משלוח וללא חיוב.</p>
              <Button onClick={placeDemoOrder} size="lg" className="mt-4 w-full">
                סיום הזמנת דוגמה
              </Button>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}
