import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rating, uid } = body;

    // Validate the input
    if (typeof rating !== 'number' || rating < 0 || rating > 7) {
      return NextResponse.json(
        { error: 'Invalid rating value' },
        { status: 400 }
      );
    }

    if (!uid || typeof uid !== 'string') {
      return NextResponse.json(
        { error: 'Invalid UID' },
        { status: 400 }
      );
    }

    // TODO: Store the feedback in your database
    // For now, we'll just log it
    console.log('Received feedback:', { rating, uid, timestamp: new Date() });

    return NextResponse.json(
      { message: 'Feedback received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '7d';
    const location = searchParams.get('location') || 'all';

    // TODO: Fetch actual feedback data from your database
    // For now, return mock data
    const mockData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      rating: Math.floor(Math.random() * 8),
      userId: `user${i % 5}`,
      location: ['NYC', 'LA', 'Chicago', 'Miami'][i % 4],
    }));

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
