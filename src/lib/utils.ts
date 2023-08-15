export const sleep = (miliseconds: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, miliseconds));
}