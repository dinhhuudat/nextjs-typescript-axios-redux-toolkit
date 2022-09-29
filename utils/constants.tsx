// APP TEXT
export const APP_TITLE = "Welcome, Developer";
export const FOOTER_TEXT = `${new Date().getFullYear()} Built with ♡ by Welcome, Developer`;
// UI CONSTANTS
export const FOOTER_HEIGHT = 30;
export const HEADER_HEIGHT = 60;
export const DRAWER_WIDTH = 0;

export function formatMoney(number: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}
