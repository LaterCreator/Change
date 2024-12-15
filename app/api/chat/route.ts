import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { fetchPubMedData, fetchOWIDData } from '@/lib/api-utils';
import { classifyQuery } from '@/lib/nlp';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  // Apply rate limiting
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  const { message } = await request.json();

  // Classify the query
  const source = classifyQuery(message);

  try {
    // Fetch data based on classification
    if (source === 'pubmed') {
      const data = await fetchPubMedData(message);
      return NextResponse.json({ response: `PubMed result: ${JSON.stringify(data)}` });
    }

    if (source === 'owid') {
      const data = await fetchOWIDData('vaccinations');
      return NextResponse.json({ response: `OWID result: ${JSON.stringify(data)}` });
    }

    // Default response for unclassified queries
    return NextResponse.json({ response: 'I could not classify your query.' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process the request' },
      { status: 500 }
    );
  }
}
