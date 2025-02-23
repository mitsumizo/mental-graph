'use client';

import { MentalGraph } from '@/components/MentalGraph';
import { yearlyMentalData } from '@/data/mentalData';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-white to-indigo-50">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">メンタルヘルスの推移</h1>
        <MentalGraph data={yearlyMentalData} />
      </div>
    </main>
  );
}