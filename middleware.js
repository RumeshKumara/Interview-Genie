import { clerkMiddleware } from "@clerk/nextjs/server";

// Helper function to create route matcher
const createRouteMatcher = (patterns) => {
  return (request) => {
    const url = new URL(request.url);
    return patterns.some(pattern => {
      if (pattern instanceof RegExp) {
        return pattern.test(url.pathname);
      }
      return url.pathname.startsWith(pattern);
    });
  };
};

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)']);

export const onRequest = clerkMiddleware((auth, context) => {
  const { redirectToSignIn, userId } = auth();

  if (!userId && isProtectedRoute(context.request)) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};