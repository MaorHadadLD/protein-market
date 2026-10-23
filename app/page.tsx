import { CartProvider } from "@/components/cart/CartProvider";
import { Storefront } from "@/components/store/Storefront";

export default function Home() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}
