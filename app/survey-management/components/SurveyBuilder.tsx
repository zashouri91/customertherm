'use client';

import { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

type QuestionType = 'NPS_EMOJI' | 'NPS_STAR' | 'NPS_NUMBER' | 'DRIVER' | 'OPEN_ENDED';

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  order: number;
  options?: any;
  logicRules?: any;
}

export default function SurveyBuilder() {
  const [surveyName, setSurveyName] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      text: '',
      required: true,
      order: questions.length,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Survey Name"
          className="w-full p-2 border rounded"
          value={surveyName}
          onChange={(e) => setSurveyName(e.target.value)}
        />
        <textarea
          placeholder="Survey Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="p-4 border rounded space-y-3">
            <div className="flex justify-between items-center">
              <select
                value={question.type}
                onChange={(e) => updateQuestion(question.id, { type: e.target.value as QuestionType })}
                className="p-2 border rounded"
              >
                <option value="NPS_EMOJI">Emoji Rating</option>
                <option value="NPS_STAR">Star Rating</option>
                <option value="NPS_NUMBER">Number Rating</option>
                <option value="DRIVER">Response Driver</option>
                <option value="OPEN_ENDED">Open Ended</option>
              </select>
              <button
                onClick={() => removeQuestion(question.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Question Text"
              className="w-full p-2 border rounded"
              value={question.text}
              onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={question.required}
                onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                className="mr-2"
              />
              <span>Required</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => addQuestion('NPS_EMOJI')}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Question
        </button>
      </div>

      <button
        onClick={() => {
          // TODO: Save survey
          console.log({ surveyName, description, questions });
        }}
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save Survey
      </button>
    </div>
  );
}
