import { ExamType } from '@/types/quiz';

export const EXAM_INFO: Record<ExamType, { title: string; description: string; shortName: string }> = {
  'takken': {
    title: '宅建試験対策クイズ',
    description: '宅地建物取引士試験の学習用アプリです。',
    shortName: '宅建試験'
  },
  'land-surveyor': {
    title: '土地家屋調査士試験対策クイズ',
    description: '土地家屋調査士試験の学習用アプリです。',
    shortName: '土地家屋調査士'
  },
  'real-estate-appraiser': {
    title: '不動産鑑定士試験対策クイズ',
    description: '不動産鑑定士試験の学習用アプリです。',
    shortName: '不動産鑑定士'
  },
  'rental-property-manager': {
    title: '賃貸不動産経営管理士試験対策クイズ',
    description: '賃貸不動産経営管理士試験の学習用アプリです。',
    shortName: '賃貸不動産経営管理士'
  },
  'condominium-manager': {
    title: 'マンション管理士試験対策クイズ',
    description: 'マンション管理士試験の学習用アプリです。',
    shortName: 'マンション管理士'
  },
  'web-design-3': {
    title: 'Webデザイン技能検定3級対策クイズ',
    description: 'Webデザイン技能検定3級試験の学習用アプリです。',
    shortName: 'Webデザイン技能検定3級'
  },
  'go': {
    title: 'Go文法クイズ',
    description: 'Go言語の文法を4択で学べるクイズです。',
    shortName: 'Go文法'
  },
  'python': {
    title: 'Python3エンジニア認定試験クイズ',
    description: 'Python3エンジニア認定試験対策の学習用アプリです。',
    shortName: 'Python3認定試験'
  },
  'python-data-analysis': {
    title: 'Pythonデータ分析試験クイズ',
    description: 'Pythonデータ分析試験対策の学習用アプリです。',
    shortName: 'Pythonデータ分析'
  },
  'statistics-grade2': {
    title: '統計検定2級対策クイズ',
    description: '統計検定2級試験の学習用アプリです。',
    shortName: '統計検定2級'
  },
  'rest-api': {
    title: 'REST API設計クイズ',
    description: 'REST API設計のベストプラクティスを学べるクイズです。',
    shortName: 'REST API設計'
  },
  'ccna': {
    title: 'CCNA対策クイズ',
    description: 'Cisco CCNA相当のネットワーク知識を学べるクイズです。',
    shortName: 'CCNA'
  },
  'aws-saa': {
    title: 'AWS認定SAA対策クイズ',
    description: 'AWS認定ソリューションアーキテクト アソシエイトの学習用アプリです。',
    shortName: 'AWS SAA'
  },
  'aws-clf': {
    title: 'AWS認定CLF対策クイズ',
    description: 'AWS認定クラウドプラクティショナーの学習用アプリです。',
    shortName: 'AWS CLF'
  },
  'aws-sap': {
    title: 'AWS認定SAP対策クイズ',
    description: 'AWS認定ソリューションアーキテクト プロフェッショナルの学習用アプリです。',
    shortName: 'AWS SAP'
  },
  'aws-dop': {
    title: 'AWS認定DOP対策クイズ',
    description: 'AWS認定DevOpsエンジニア プロフェッショナルの学習用アプリです。',
    shortName: 'AWS DOP'
  },
  'gcp-pca': {
    title: 'Google Cloud PCA対策クイズ',
    description: 'Google Cloud Professional Cloud Architectの学習用アプリです。',
    shortName: 'GCP PCA'
  },
  'azure-az305': {
    title: 'Azure AZ-305対策クイズ',
    description: 'Microsoft Azure Solutions Architect Expert (AZ-305) の学習用アプリです。',
    shortName: 'Azure AZ-305'
  }
};

export function getExamTypeFromSlug(slug: string): ExamType | null {
  // Since slug and examType are the same, just validate
  if (slug === 'takken' || slug === 'land-surveyor' || slug === 'real-estate-appraiser' || slug === 'rental-property-manager' || slug === 'condominium-manager' || slug === 'web-design-3' || slug === 'go' || slug === 'python' || slug === 'python-data-analysis' || slug === 'statistics-grade2' || slug === 'rest-api' || slug === 'ccna' || slug === 'aws-saa' || slug === 'aws-clf' || slug === 'aws-sap' || slug === 'aws-dop' || slug === 'gcp-pca' || slug === 'azure-az305') {
    return slug as ExamType;
  }
  return null;
}

export function getSlugFromExamType(examType: ExamType): string {
  // Since slug and examType are the same, just return it
  return examType;
}
