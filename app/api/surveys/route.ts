import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, questions } = body;

    const survey = await prisma.survey.create({
      data: {
        name,
        description,
        questions: {
          create: questions.map((q: any) => ({
            type: q.type,
            text: q.text,
            required: q.required,
            order: q.order,
            options: q.options,
            logicRules: q.logicRules,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return NextResponse.json(survey);
  } catch (error) {
    console.error('Failed to create survey:', error);
    return NextResponse.json(
      { error: 'Failed to create survey' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const surveys = await prisma.survey.findMany({
      include: {
        questions: true,
      },
    });

    return NextResponse.json(surveys);
  } catch (error) {
    console.error('Failed to fetch surveys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch surveys' },
      { status: 500 }
    );
  }
}
