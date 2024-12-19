'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getAllRatingIcons } from '@/lib/svg-to-base64';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  position: string;
  headshotUrl: string;
  location: string;
}

interface Survey {
  id: string;
  name: string;
  description: string;
  questions: any[];
}

export default function SignatureGenerator() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedSurvey, setSelectedSurvey] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const ratingIcons = getAllRatingIcons();

  useEffect(() => {
    // Fetch users and surveys when component mounts
    fetchUsers();
    fetchSurveys();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    }
  };

  const fetchSurveys = async () => {
    try {
      const response = await fetch('/api/surveys');
      const data = await response.json();
      setSurveys(data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
      toast({
        title: "Error",
        description: "Failed to load surveys",
        variant: "destructive",
      });
    }
  };

  const generateSignature = () => {
    const user = users.find(u => u.id === selectedUser);
    const survey = surveys.find(s => s.id === selectedSurvey);
    
    if (!user || !survey) return '';

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          ${user.headshotUrl ? `<img src="${user.headshotUrl}" alt="${user.name}" style="width: 80px; height: 80px; border-radius: 50%; margin-right: 15px;">` : ''}
          <div>
            <h2 style="margin: 0; color: #333;">${user.name}</h2>
            <p style="margin: 5px 0; color: #666;">${user.position}</p>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <p style="font-size: 16px; margin-bottom: 15px;">Please rate your experience:</p>
          <div style="display: flex; justify-content: space-between; max-width: 400px;">
            ${Object.entries(ratingIcons).map(([rating, icon]) => `
              <a href="/feedback/${survey.id}/${user.id}/${rating}" style="text-decoration: none; text-align: center;">
                <img src="data:image/svg+xml;base64,${icon}" alt="${rating}" style="width: 50px; height: 50px;">
                <p style="margin: 5px 0; color: #666;">${rating}</p>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  };

  const handleGenerateAndCopy = async () => {
    if (!selectedUser || !selectedSurvey) {
      toast({
        title: "Error",
        description: "Please select both a user and a survey",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const signature = generateSignature();
      await navigator.clipboard.writeText(signature);
      toast({
        title: "Success!",
        description: "Signature HTML has been copied to your clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy signature",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Signature Generator</CardTitle>
          <CardDescription>Generate an email signature with feedback survey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select User</label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Survey</label>
              <Select value={selectedSurvey} onValueChange={setSelectedSurvey}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a survey" />
                </SelectTrigger>
                <SelectContent>
                  {surveys.map((survey) => (
                    <SelectItem key={survey.id} value={survey.id}>
                      {survey.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleGenerateAndCopy} 
              className="w-full"
              disabled={loading || !selectedUser || !selectedSurvey}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate and Copy Signature'
              )}
            </Button>
          </div>

          {selectedUser && selectedSurvey && (
            <div className="mt-6 border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Preview:</h3>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: generateSignature() }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}