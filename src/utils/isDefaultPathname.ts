import { GITHUB_PAGES_PATHNAME } from "../constants";

export const isDefaultPathname = (pathname: string): boolean =>
  pathname === "/" || pathname === GITHUB_PAGES_PATHNAME;
