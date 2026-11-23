const roles = new Set(["admin", "hotel", "user"]);

export function getUserFromAccessToken(accessToken) {
  try {
    const encodedPayload = accessToken.split(".")[1];
    if (!encodedPayload) return null;

    const base64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(
      window.atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")),
    );

    if (!payload.userId || !roles.has(payload.role)) return null;

    return {
      id: payload.userId,
      role: payload.role,
    };
  } catch {
    return null;
  }
}
