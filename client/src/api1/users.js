import { api } from "./client";

export const getUserById = (userId) =>
  api.get(`/users/${encodeURIComponent(userId)}`);

export const getUserLastSeen = (userId) =>
  api.get(`/users/${encodeURIComponent(userId)}/last-seen`);
