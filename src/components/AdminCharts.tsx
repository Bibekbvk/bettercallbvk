'use client';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

const salesData = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 2100 },
  { name: 'Wed', sales: 1800 },
  { name: 'Thu', sales: 3400 },
  { name: 'Fri', sales: 2900 },
  { name: 'Sat', sales: 4200 },
  { name: 'Sun', sales: 5100 },
];

const categoryData = [
  { name: 'AI Licenses', qty: 240 },
  { name: 'Cloud Space', qty: 150 },
  { name: 'Security Mod', qty: 85 },
  { name: 'Templates', qty: 320 },
];

export default function AdminCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 1. Area Chart: Sales Trend */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div>
          <h3 className="font-display font-semibold text-white text-base">Weekly Revenue</h3>
          <p className="text-xs text-foreground/45">Sales numbers tracked over Stripe integrations</p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#60718F" fontSize={10} tickLine={false} />
              <YAxis stroke="#60718F" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#0A0E17', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px' }}
                labelStyle={{ color: '#00E5FF', fontWeight: 'bold' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#00E5FF" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Bar Chart: Category Volume */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div>
          <h3 className="font-display font-semibold text-white text-base">Units Sold By Category</h3>
          <p className="text-xs text-foreground/45">Distribution of marketplace digital fulfillment</p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#60718F" fontSize={10} tickLine={false} />
              <YAxis stroke="#60718F" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#0A0E17', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '8px' }}
                labelStyle={{ color: '#7C5CFF', fontWeight: 'bold' }}
              />
              <Bar dataKey="qty" fill="#7C5CFF" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
