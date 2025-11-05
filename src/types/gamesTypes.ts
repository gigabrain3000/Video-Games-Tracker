export interface gamePreviewCard {
  title: string,
  platforms: string[],
  addedBy: number,
  backgroundImage: string,
  released: string,
  fullData: any,
}

export function createGamePreviewCardData(name: string, platformsArray: string[], addsCount: number, image: string, releaseDate: string, fullData: object): gamePreviewCard {
  return {
    title: name,
    platforms: platformsArray,
    addedBy: addsCount,
    backgroundImage: image,
    released: releaseDate,
    fullData: fullData,
  }
}