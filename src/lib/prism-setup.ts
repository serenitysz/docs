import { Prism } from "prism-react-renderer";

declare global {
  interface Window {
    Prism: typeof Prism;
  }
}

if (typeof window !== "undefined") {
  window.Prism = Prism;
}
