'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useFeedback } from '@/hooks/use-feedback';
import { formatDateRange } from '@/lib/utils';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });

  const { stats, aggregatedData, loading, error } = useFeedback(timeRange, selectedLocation);

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading feedback data: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <DateRangePicker
            onSelect={({ from, to }) => setDateRange({ from, to })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
            <CardDescription>Overall customer satisfaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {loading ? '...' : stats.averageRating}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Responses</CardTitle>
            <CardDescription>Number of ratings received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {loading ? '...' : stats.totalResponses}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Response Rate</CardTitle>
            <CardDescription>Percentage of customers who responded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {loading ? '...' : stats.responseRate}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rating Trends</CardTitle>
          <CardDescription>
            Average ratings for {timeRange === 'custom' 
              ? formatDateRange(dateRange.from, dateRange.to)
              : `the last ${timeRange === '7d' ? 'week' : timeRange === '30d' ? 'month' : '3 months'}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              Loading...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={aggregatedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 8]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgRating"
                  stroke="#2563eb"
                  strokeWidth={2}
                  name="Average Rating"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
