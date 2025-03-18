const { clerkMiddleware, createRouteMatcher, redirectToSignIn } = require('@clerk/nextjs/server');

const isProtectedRoute = createRouteMatcher([
  // Protect everything except API routes
  "/((?!api|trpc).*)",
]);

export default clerkMiddleware(async (auth, req) => {
  console.log("MIDDLEWARE IS RUNNING");
  
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
