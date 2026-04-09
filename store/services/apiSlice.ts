import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Tariff {
  id: string;
  period: string;
  price: number;
  full_price: number;
  is_best: boolean;
  text: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://t-core.fit-hub.pro/Test' }),
  endpoints: (builder) => ({
    getTariffs: builder.query<Tariff[], void>({
      query: () => '/GetTariffs',
      transformResponse: (response: unknown) => {
        if (typeof response === 'string') {
          try {
            const parsed = JSON.parse(response);
            return Array.isArray(parsed) ? (parsed as Tariff[]) : [];
          } catch (e) {
            console.error('Failed to parse tariffs string:', e);
            return [];
          }
        }
        if (Array.isArray(response)) return response as Tariff[];

        return [];
      },
    }),
  }),
});

export const { useGetTariffsQuery } = apiSlice;
