export function normalizeAspectRatio({width, height} : {width: number | undefined, height: number | undefined}){
  if(!width || !height){
    return {
      width: 1,
      height: 1
    }
  }
  return {
    width: width / width,
    height: height / width
  };
}

export function getAspectRatio({width, height} : {width: number | undefined, height: number | undefined}){
  const aspectRatio = normalizeAspectRatio({width, height});
  return `aspect-[${aspectRatio.width}/${aspectRatio.height}]`;
}

export function calculateHeight({targetWidth, width, height} : {
  targetWidth: number,
  width: number | undefined,
  height: number | undefined
}) : number{
  const aspectRatio = normalizeAspectRatio({width, height});
  const targetHeight = targetWidth * aspectRatio.height;
  console.log({
    targetWidth,
    width,
    height,
    aspectRatio,
    targetHeight
  })
  return targetHeight;
}