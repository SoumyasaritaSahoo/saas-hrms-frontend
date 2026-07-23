export const errMsg = (res: any, fallback: string): string =>
  typeof res?.message === "string"
    ? res.message
    : res?.message?.message || fallback;
