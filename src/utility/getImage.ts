import { APIData, RecommendationsEntry } from "../types/APIData";

export enum ImageSize {
    lg = "lg",
    md = "md",
    sm = "sm"
}

export const getImage = (anime: APIData | RecommendationsEntry, size: ImageSize): string | undefined => {
    if (!anime) {
        return;
    }

    const { webp, jpg } = anime.images || {};

    if (!webp && !jpg) {
        return;
    }

    if (size === ImageSize.lg) {
        return webp.large_image_url || jpg.large_image_url
    }

    if (size === ImageSize.md) {
        return webp.image_url || jpg.image_url
    }

    if (size === ImageSize.sm) {
        return webp.small_image_url || jpg.small_image_url
    }
}