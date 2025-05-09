type EventTypes =
  | "product-added-to-cart"
  | "user-logged-in"
  | "theme-changed"
  | "notification-displayed";

interface EventPayloads {
  "product-added-to-cart": Product;
  "user-logged-in": User;
  "theme-changed": "light" | "dark";
  "notification-displayed": { id: string; message: string };
}

interface MfeEventBus {
  on<T extends EventTypes>(
    event: T,
    callback: (data: EventPayloads[T]) => void
  ): void;
  emit<T extends EventTypes>(event: T, data: EventPayloads[T]): void;
  remove<T extends EventTypes>(
    event: T,
    callback: (data: EventPayloads[T]) => void
  ): void;
}

declare global {
  interface Window {
    __MFE_EVENT_BUS__?: MfeEventBus;
  }
}
