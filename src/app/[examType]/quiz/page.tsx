import QuizContentWrapper from './QuizContentWrapper';

export function generateStaticParams() {
  return [
    { examType: 'takken' },
    { examType: 'land-surveyor' },
    { examType: 'real-estate-appraiser' },
    { examType: 'rental-property-manager' },
    { examType: 'condominium-manager' },
    { examType: 'web-design-3' },
    { examType: 'go' },
    { examType: 'python' },
    { examType: 'python-data-analysis' },
    { examType: 'statistics-grade2' }
  ];
}

export default function QuizPage() {
  return <QuizContentWrapper />;
}
