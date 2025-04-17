'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockData = [
  { week: 'Semana 1', value: 1000 },
  { week: 'Semana 2', value: 3500 },
  { week: 'Semana 3', value: 4800 },
  { week: 'Semana 4', value: 6000 },
  { week: 'Semana 5', value: 9200 },
  { week: 'Semana 6', value: 11500 },
];

export default function PortfolioChart() {
  return (
    <section className="w-full bg-[var(--gray-900)] rounded-xl shadow-md p-6 border border-[var(--gray-800)]">
      <h2 className="text-lg font-medium text-[var(--gray-300)] mb-4 text-center">
        Evolução do Patrimônio
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-800)" />
            <XAxis dataKey="week" stroke="var(--gray-400)" />
            <YAxis stroke="var(--gray-400)" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
              contentStyle={{ backgroundColor: '#1f1f1f', border: 'none' }}
              itemStyle={{ color: '#a3e635' }}
            />
            <Bar dataKey="value" fill="var(--green-300)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
