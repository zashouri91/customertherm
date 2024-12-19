import { useState, useEffect } from 'react';
import { getFeedbackData } from '@/lib/utils';

export interface FeedbackData {
  date: string;
  rating: number;
  userId: string;
  location: string;
}

export function useFeedback(timeRange: string, location: string) {
  const [data, setData] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const feedbackData = await getFeedbackData(timeRange, location);
        setData(feedbackData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch feedback data'));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [timeRange, location]);

  const stats = {
    averageRating: data.length
      ? (data.reduce((acc, curr) => acc + curr.rating, 0) / data.length).toFixed(1)
      : '0.0',
    totalResponses: data.length,
    responseRate: '78%', // TODO: Calculate this based on actual data
  };

  const aggregatedData = data.reduce((acc, curr) => {
    const existing = acc.find(item => item.date === curr.date);
    if (existing) {
      existing.avgRating = (existing.avgRating * existing.count + curr.rating) / (existing.count + 1);
      existing.count += 1;
    } else {
      acc.push({
        date: curr.date,
        avgRating: curr.rating,
        count: 1,
      });
    }
    return acc;
  }, [] as Array<{ date: string; avgRating: number; count: number }>);

  return {
    data,
    loading,
    error,
    stats,
    aggregatedData,
  };
}
