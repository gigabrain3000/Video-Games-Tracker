export interface gamePreviewCard {
  title: string,
  platforms: string[],
  addedBy: number,
  backgroundImage: string,
}

export function createGamePreviewCardData(name: string, platformsArray: string[], addsCount: number, image: string): gamePreviewCard {
  return {
    title: name,
    platforms: platformsArray,
    addedBy: addsCount,
    backgroundImage: image,
  }
}