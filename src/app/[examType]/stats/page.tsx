import StatsPageClient from './StatsPageClient';

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
    { examType: 'statistics-grade2' },
    { examType: 'rest-api' },
    { examType: 'ccna' },
    { examType: 'aws-saa' },
    { examType: 'aws-clf' },
    { examType: 'aws-sap' },
    { examType: 'aws-dop' },
    { examType: 'gcp-pca' },
    { examType: 'azure-az305' }
  ];
}

export default function StatsPage() {
  return <StatsPageClient />;
}
