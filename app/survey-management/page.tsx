import SurveyBuilder from './components/SurveyBuilder';

export default function SurveyManagement() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Survey Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <SurveyBuilder />
      </div>
    </div>
  )
}
