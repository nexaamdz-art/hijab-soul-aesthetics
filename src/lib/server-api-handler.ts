import { handleAuthApi } from "./server-auth-handler";
import { handleStoreApi } from "./server-store-handler";

/**
 * Master server-side API request handler.
 * Handles both authentication routes (/api/auth/*) and store persistence routes
 * (/api/products*, /api/categories*, /api/orders*, /api/conversations*, /api/settings*, /api/upload*).
 */
export async function handleCombinedApi(request: Request): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/auth")) {
    return await handleAuthApi(request);
  }

  if (
    url.pathname.startsWith("/api/products") ||
    url.pathname.startsWith("/api/categories") ||
    url.pathname.startsWith("/api/orders") ||
    url.pathname.startsWith("/api/conversations") ||
    url.pathname.startsWith("/api/settings") ||
    url.pathname.startsWith("/api/upload")
  ) {
    return await handleStoreApi(request);
  }

  return null;
}
