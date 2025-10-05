// src/sanity/client.ts

import { createClient } from 'next-sanity';

// ------------------------------------
// 1. Get environment variables
// ------------------------------------
// The variables below are typically set in your .env.local file.
// The Sanity CLI should have added them for you.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = '2025-10-05'; // Use a recent date for API versioning

// ------------------------------------
// 2. Configure and export the client
// ------------------------------------
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Set to `true` to use the CDN for faster static fetching,
  // set to `false` if you need to fetch the absolute freshest data (e.g., in ISR/getStaticProps)
  useCdn: true, 
});