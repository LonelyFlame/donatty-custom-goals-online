import { cookies } from 'next/headers';

export const GET = async () => {
  const c = await cookies();

  c.set('forge-vtt.com.sid', 's%3AxxwvZ-4vIkijijiB7xYj0P5nLrvH1yx7.smHVD%2FIs27P5e5UbydhIrdMYgqXTePCOEAb%2Fj3ulFMo', {
    domain: '.forge-vtt.com', // Set for parent domain
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax', // or 'None' if truly cross-origin with secure
  });
  c.set('ForgeVTT-AccessKey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjVkYTgzZTkyM2IwZWE0M2QzYjllMSIsInNlY3JldCI6Ijk1M2Y0YWQxLWMwN2YtNDJjYy05YWYyLWM3NGE1MGM0YTdhNyIsInBlcm1pc3Npb25zIjpbInJlYWQtYXNzZXRzIiwid3JpdGUtYXNzZXRzIiwibWFuYWdlLWdhbWVzIl0sImV4cCI6MTc1MDk1OTQzMCwiaWF0IjoxNzUwOTU4NTMwfQ.uAE3TNhb-cQ-RIvb-FU07BsHv9zIDNXZa1oDAuniFf0', {
    domain: 'nate_rr-vchp.eu.forge-vtt.com', // Set for parent domain
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax', // or 'None' if truly cross-origin with secure
  });

  c.set('forge-vtt.com.sid', 's%3AxxwvZ-4vIkijijiB7xYj0P5nLrvH1yx7.smHVD%2FIs27P5e5UbydhIrdMYgqXTePCOEAb%2Fj3ulFMo', {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax', // or 'None' if truly cross-origin with secure
  });
  c.set('ForgeVTT-AccessKey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjVkYTgzZTkyM2IwZWE0M2QzYjllMSIsInNlY3JldCI6Ijk1M2Y0YWQxLWMwN2YtNDJjYy05YWYyLWM3NGE1MGM0YTdhNyIsInBlcm1pc3Npb25zIjpbInJlYWQtYXNzZXRzIiwid3JpdGUtYXNzZXRzIiwibWFuYWdlLWdhbWVzIl0sImV4cCI6MTc1MDk1OTQzMCwiaWF0IjoxNzUwOTU4NTMwfQ.uAE3TNhb-cQ-RIvb-FU07BsHv9zIDNXZa1oDAuniFf0', {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax', // or 'None' if truly cross-origin with secure
  });

  return Response.json('ok');
};
