export function getRoleHomePath(role) {
  switch (role) {
    case "admin":
      return "/admin_module";
    case "hotel":
      return "/hotel_module";
    case "user":
    default:
      return "/";
  }
}
