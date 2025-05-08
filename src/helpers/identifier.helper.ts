// Helper: Get IP address of client
export const getClientIp = (req: any): string => {
  const xfwd = req.headers["x-forwarded-for"];
  return (
    (Array.isArray(xfwd) ? xfwd[0] : xfwd) ||
    req.socket?.remoteAddress ||
    "unknown"
  );
};
