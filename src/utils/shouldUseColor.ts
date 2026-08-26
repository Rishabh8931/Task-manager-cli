export function shouldUseColor(): boolean {
  if (process.env.NO_COLOR != undefined) {
    return false;
  }
  return process.stdout.isTTY === true;
}
