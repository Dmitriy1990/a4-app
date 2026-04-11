import type { Metadata } from 'next';
import { Montserrat, Raleway } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/store/provider';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
});

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'Выбери подходящий тариф | A-Four App',
  description: 'Профессиональные планы тренировок для достижения ваших целей. Выберите подходящий тариф и начните заниматься уже сегодня.',
  keywords: ['фитнес', 'тренировки', 'тарифы', 'здоровье', 'спорт'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${raleway.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
