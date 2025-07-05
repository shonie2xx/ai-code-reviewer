import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

export const trpc = createTRPCProxyClient<any>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/trpc` || 'http://localhost:3001/trpc',
    }),
  ],
});
