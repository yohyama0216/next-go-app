'use client';

import Link from 'next/link';
import { EXAM_INFO, getSlugFromExamType } from '@/utils/examMapping';
import { ExamType } from '@/types/quiz';
import { withBase } from '@/utils/links';

export default function Home() {
  const courses: Array<{ name: string; exams: ExamType[] }> = [
    {
      name: '不動産コース',
      exams: [
        'takken',
        'land-surveyor',
        'real-estate-appraiser',
        'rental-property-manager',
        'condominium-manager'
      ]
    },
    {
      name: 'プログラミングコース',
      exams: ['go', 'rest-api']
    },
    {
      name: '統計・データサイエンスコース',
      exams: ['statistics-grade2', 'python', 'python-data-analysis']
    },
    {
      name: 'ネットワークコース',
      exams: ['ccna']
    }
  ];

  return (
    <main>
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">資格試験対策クイズ</h1>
          <p className="lead mb-5">
            学習したい試験を選択してください。
          </p>
        </div>
      </div>

      {courses.map((course) => (
        <section key={course.name} className="mb-4">
          <div className="row">
            <div className="col-12">
              <h2 className="h4 mb-3">{course.name}</h2>
            </div>
          </div>
          <div className="row">
            {course.exams.map((examType) => {
              const info = EXAM_INFO[examType];
              const slug = getSlugFromExamType(examType);
              
              return (
                <div key={examType} className="col-md-6 col-lg-4 mb-4">
                  <Link 
                    href={withBase(`/${slug}`)} 
                    className="card h-100 border-primary text-decoration-none exam-card"
                  >
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title h4 mb-3 text-primary">
                        {info.shortName}
                      </h3>
                      <p className="card-text text-dark flex-grow-1">
                        {info.description}
                      </p>
                      <div className="mt-3">
                        <span className="btn btn-primary w-100">
                          学習を開始 →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <style jsx>{`
        .exam-card {
          transition: transform 0.2s;
        }
        .exam-card:hover {
          transform: scale(1.05);
        }
        .exam-card:focus {
          transform: scale(1.05);
          outline: 2px solid #0d6efd;
          outline-offset: 2px;
        }
      `}</style>
    </main>
  );
}
