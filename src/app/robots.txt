export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/account',
        '/cart',
        '/login',
        '/signup',
        '/otp-verify',
      ],
    },
  };
}