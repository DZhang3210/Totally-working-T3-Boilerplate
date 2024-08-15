/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      process.env.S3_BUCKET_NAME + ".s3.amazonaws.com",
    ], // Add your image domain here
    // Add your image domain here
  },
};

export default nextConfig;
