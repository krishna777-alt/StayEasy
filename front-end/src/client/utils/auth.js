const USERS_KEY = "stayeasy-users";
const SESSION_KEY = "stayeasy-session";

const isBrowser = typeof window !== "undefined";

const readUsers = () => {
  if (!isBrowser) return [];

  try {
    const storedUsers = localStorage.getItem(USERS_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  if (!isBrowser) return;

  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
};

const normalizeEmail = (email) => email.trim().toLowerCase();

const notifyAuthChange = () => {
  if (!isBrowser) return;
  window.dispatchEvent(new Event("stayeasy-auth-change"));
};

const saveSession = (user) => {
  if (!isBrowser) return;

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    notifyAuthChange();
  } catch {
    // ignore
  }
};

const clearSession = () => {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(SESSION_KEY);
    notifyAuthChange();
  } catch {
    // ignore
  }
};

const getSessionUser = () => {
  if (!isBrowser) return null;

  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
};

const loginUser = ({ email, password }) => {
  const normalizedEmail = normalizeEmail(email);
  const users = readUsers();
  const existingUser = users.find(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  );

  if (!existingUser) {
    return {
      success: false,
      error:
        "No account found for that email. Please create a VIP account first.",
    };
  }

  if (existingUser.password !== password) {
    return {
      success: false,
      error: "That password does not match the email on file.",
    };
  }

  const sessionUser = {
    fullName: existingUser.fullName,
    email: existingUser.email,
  };
  saveSession(sessionUser);
  return { success: true, user: sessionUser };
};

const signupUser = ({ fullName, email, password, agreeTerms }) => {
  if (!fullName.trim()) {
    return {
      success: false,
      error: "Please provide your full name.",
    };
  }

  if (!agreeTerms) {
    return {
      success: false,
      error: "Please accept the terms to create your membership.",
    };
  }

  const normalizedEmail = normalizeEmail(email);
  const users = readUsers();
  const existingUser = users.find(
    (user) => normalizeEmail(user.email) === normalizedEmail,
  );

  if (existingUser) {
    return {
      success: false,
      error:
        "An account with that email already exists. Please sign in instead.",
    };
  }

  const newUser = {
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
  };
  writeUsers([...users, newUser]);

  const sessionUser = {
    fullName: newUser.fullName,
    email: newUser.email,
  };
  saveSession(sessionUser);

  return { success: true, user: sessionUser };
};

export { readUsers, getSessionUser, loginUser, signupUser, clearSession };
