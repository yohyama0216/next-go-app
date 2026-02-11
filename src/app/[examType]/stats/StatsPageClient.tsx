'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { QuestionProgress, DailyStats, Badge, ExamType } from '@/types/quiz';
import { getAllProgress, clearAllProgress, getDailyStatsHistory } from '@/utils/storageDB';
import { getAllBadges } from '@/utils/badges';
import { EXAM_INFO, getExamTypeFromSlug } from '@/utils/examMapping';
import { getQuestionsByExamType } from '@/utils/questionLoader';
import { withBase } from '@/utils/links';

export default function StatsPage() {
  const params = useParams();
  const examSlug = params.examType as string;
  const examType = getExamTypeFromSlug(examSlug);

  const [progress, setProgress] = useState<Record<number, QuestionProgress>>({});
  const [statsHistory, setStatsHistory] = useState<DailyStats[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const data = await getAllProgress();
    setProgress(data);
    const history = await getDailyStatsHistory();
    setStatsHistory(history);
    
    // Load badges
    const totalAnswered = Object.keys(data).length;
    const totalMastered = Object.values(data).filter(p => p.correctCount >= 4).length;
    const allBadges = getAllBadges(totalAnswered, totalMastered, history);
    setBadges(allBadges);
  };

  const handleClearProgress = async () => {
    if (confirm('すべての学習進捗を削除してもよろしいですか？')) {
      await clearAllProgress();
      await loadProgress();
    }
  };

  if (!examType) {
    return (
      <main>
        <div className="alert alert-danger">
          <h4>エラー</h4>
          <p>指定された試験が見つかりません。</p>
        </div>
      </main>
    );
  }

  if (!mounted) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">読み込み中...</span>
        </div>
      </div>
    );
  }

  // Get questions for this exam type
  const examQuestions = getQuestionsByExamType(examType);

  const totalAnswered = examQuestions.filter(q => progress[q.id]).length;

  // Get questions with incorrect answers (filtered by exam type)
  const incorrectQuestions = examQuestions
    .filter(q => progress[q.id] && progress[q.id].incorrectCount > 0)
    .map(q => ({
      question: q,
      progress: progress[q.id],
    }))
    .sort((a, b) => b.progress.incorrectCount - a.progress.incorrectCount);

  // Get mastered questions (4+ correct, filtered by exam type)
  const masteredQuestions = examQuestions
    .filter(q => progress[q.id] && progress[q.id].correctCount >= 4)
    .length;

  const totalQuestions = examQuestions.length;
  const answeredNotMastered = Math.max(totalAnswered - masteredQuestions, 0);
  const unansweredQuestions = Math.max(totalQuestions - totalAnswered, 0);
  const progressRate = totalQuestions > 0 ? ((totalAnswered / totalQuestions) * 100).toFixed(1) : '0';

  // Category statistics (filtered by exam type)
  const categories = Array.from(new Set(examQuestions.map(q => q.category)));
  const categoryStats = categories.map(category => {
    const categoryQuestions = examQuestions.filter(q => q.category === category);
    const categoryAnswered = categoryQuestions.filter(q => progress[q.id]).length;
    const categoryCorrect = categoryQuestions.reduce(
      (sum, q) => sum + (progress[q.id]?.correctCount || 0),
      0
    );
    const categoryIncorrect = categoryQuestions.reduce(
      (sum, q) => sum + (progress[q.id]?.incorrectCount || 0),
      0
    );
    const categoryTotal = categoryCorrect + categoryIncorrect;
    const categoryAccuracy = categoryTotal > 0 ? ((categoryCorrect / categoryTotal) * 100).toFixed(1) : '0';

    return {
      category,
      totalQuestions: categoryQuestions.length,
      answered: categoryAnswered,
      correct: categoryCorrect,
      incorrect: categoryIncorrect,
      accuracy: categoryAccuracy,
    };
  });

  // Helper function to get difficulty label
  const getDifficultyLabel = (difficulty: string): string => {
    if (difficulty === 'basic') return '基礎レベル';
    if (difficulty === 'exam') return '試験レベル';
    if (difficulty === 'comparison') return '比較問題';
    if (difficulty === 'terminology') return '用語定義';
    return difficulty;
  };

  // Difficulty level statistics (filtered by exam type)
  const difficulties = Array.from(new Set(examQuestions.map(q => q.difficulty).filter((d): d is NonNullable<typeof d> => d !== undefined)));
  const difficultyStats = difficulties.map(difficulty => {
    const difficultyQuestions = examQuestions.filter(q => q.difficulty === difficulty);
    const difficultyAnswered = difficultyQuestions.filter(q => progress[q.id]).length;
    const difficultyCorrect = difficultyQuestions.reduce(
      (sum, q) => sum + (progress[q.id]?.correctCount || 0),
      0
    );
    const difficultyIncorrect = difficultyQuestions.reduce(
      (sum, q) => sum + (progress[q.id]?.incorrectCount || 0),
      0
    );
    const difficultyTotal = difficultyCorrect + difficultyIncorrect;
    const difficultyAccuracy = difficultyTotal > 0 ? ((difficultyCorrect / difficultyTotal) * 100).toFixed(1) : '0';

    return {
      difficulty,
      totalQuestions: difficultyQuestions.length,
      answered: difficultyAnswered,
      correct: difficultyCorrect,
      incorrect: difficultyIncorrect,
      accuracy: difficultyAccuracy,
    };
  });

  // Get exam name for display
  const getExamName = (type: ExamType): string => {
    switch (type) {
      case 'takken': return '宅建試験';
      case 'land-surveyor': return '土地家屋調査士';
      case 'real-estate-appraiser': return '不動産鑑定士';
      case 'rental-property-manager': return '賃貸不動産経営管理士';
      case 'condominium-manager': return 'マンション管理士';
      default: return '';
    }
  };

  return (
    <main className="stats-page">
      <div className="stats-container">
        <h1 className="stats-title">📊 {getExamName(examType)} 学習統計</h1>

        <div className="stats-tabs">
          <Link href={withBase('/stats')} className="stats-tab">全体</Link>
          {Object.entries(EXAM_INFO).map(([slug, info]) => (
            <Link
              key={slug}
              href={withBase(`/${slug}/stats`)}
              className={`stats-tab ${slug === examSlug ? 'active' : ''}`}
            >
              {info.shortName}
            </Link>
          ))}
        </div>

        <div className="stats-summary-grid">
          <div className="stat-card stat-card--unanswered">
            <div className="stat-number">{unansweredQuestions}</div>
            <div className="stat-label">未回答</div>
          </div>
          <div className="stat-card stat-card--answered">
            <div className="stat-number">{answeredNotMastered}</div>
            <div className="stat-label">回答済</div>
          </div>
          <div className="stat-card stat-card--completed">
            <div className="stat-number">{masteredQuestions}</div>
            <div className="stat-label">完了 (4回正解)</div>
          </div>
          <div className="stat-card stat-card--progressed">
            <div className="stat-number">{progressRate}%</div>
            <div className="stat-label">進捗率 ({totalAnswered}/{totalQuestions})</div>
          </div>
        </div>

        <div className="stats-progress">
          <div className="stats-progress-bar">
            <div
              className="stats-progress-segment stats-progress-segment--unanswered"
              style={{ width: `${totalQuestions ? (unansweredQuestions / totalQuestions) * 100 : 0}%` }}
            >
              {unansweredQuestions}
            </div>
            <div
              className="stats-progress-segment stats-progress-segment--answered"
              style={{ width: `${totalQuestions ? (answeredNotMastered / totalQuestions) * 100 : 0}%` }}
            >
              {answeredNotMastered}
            </div>
            <div
              className="stats-progress-segment stats-progress-segment--completed"
              style={{ width: `${totalQuestions ? (masteredQuestions / totalQuestions) * 100 : 0}%` }}
            >
              {masteredQuestions}
            </div>
          </div>
        </div>

        {/* Mastered Questions */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-info">
              <h5 className="alert-heading">マスター済み問題</h5>
              <p className="mb-0">
                4回以上正解した問題：<strong>{masteredQuestions}</strong>問
                {masteredQuestions > 0 && '（これらの問題は今後表示されません）'}
              </p>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="stats-section-title">バッジ</h2>
            <div className="card chart-card">
              <div className="card-body">
                <div className="row g-2">
                  {badges.map(badge => (
                    <div key={badge.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
                      <div 
                        className={`card h-100 ${badge.achieved ? 'border-success' : 'border-secondary'}`}
                        style={{ opacity: badge.achieved ? 1 : 0.5 }}
                      >
                        <div className="card-body text-center p-2">
                          <div style={{ fontSize: '1.5rem' }}>{badge.icon}</div>
                          <div className="small fw-bold mt-1">{badge.name}</div>
                          <div className="text-muted" style={{ fontSize: '0.7rem' }}>{badge.description}</div>
                          {badge.achieved && (
                            <span className="badge bg-success mt-1" style={{ fontSize: '0.65rem' }}>達成済み</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <small className="text-muted">
                    獲得バッジ数：<strong>{badges.filter(b => b.achieved).length}</strong> / {badges.length}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Trend Chart */}
        {statsHistory.length > 0 && (
          <div className="row mb-4">
            <div className="col-12">
              <div className="card chart-card">
                <div className="card-body">
                  <h2 className="stats-section-title">学習の推移</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={statsHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => {
                          const d = new Date(date);
                          return `${d.getMonth() + 1}/${d.getDate()}`;
                        }}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(date) => {
                          const d = new Date(date);
                          return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="answeredCount" 
                        stroke="#0d6efd" 
                        name="回答済み問題数" 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="masteredCount" 
                        stroke="#198754" 
                        name="達成済み問題数" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Difficulty Level Statistics */}
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="stats-section-title">レベル別統計</h2>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>レベル</th>
                    <th className="text-center">回答済み</th>
                    <th className="text-center">正解数</th>
                    <th className="text-center">不正解数</th>
                    <th className="text-center">正答率</th>
                  </tr>
                </thead>
                <tbody>
                  {difficultyStats.map(stat => (
                    <tr key={stat.difficulty}>
                      <td>{getDifficultyLabel(stat.difficulty)}</td>
                      <td className="text-center">
                        {stat.answered} / {stat.totalQuestions}
                      </td>
                      <td className="text-center text-success">{stat.correct}</td>
                      <td className="text-center text-danger">{stat.incorrect}</td>
                      <td className="text-center">
                        <strong>{stat.accuracy}%</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Category Statistics */}
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="stats-section-title">カテゴリ別統計</h2>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>カテゴリ</th>
                    <th className="text-center">回答済み</th>
                    <th className="text-center">正解数</th>
                    <th className="text-center">不正解数</th>
                    <th className="text-center">正答率</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryStats.map(stat => (
                    <tr key={stat.category}>
                      <td>{stat.category}</td>
                      <td className="text-center">
                        {stat.answered} / {stat.totalQuestions}
                      </td>
                      <td className="text-center text-success">{stat.correct}</td>
                      <td className="text-center text-danger">{stat.incorrect}</td>
                      <td className="text-center">
                        <strong>{stat.accuracy}%</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Incorrect Questions */}
        {incorrectQuestions.length > 0 && (
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="stats-section-title">間違えた問題</h2>
              <div className="list-group">
                {incorrectQuestions.map(({ question, progress }) => (
                  <div key={question.id} className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{question.question}</h5>
                      <small>
                        <span className="badge bg-success me-1">正解 {progress.correctCount}</span>
                        <span className="badge bg-danger">不正解 {progress.incorrectCount}</span>
                      </small>
                    </div>
                    <p className="mb-1 text-muted">
                      <small>カテゴリ：{question.category}</small>
                    </p>
                    <small className="text-muted">
                      <strong>正しい答え：</strong> {question.choices[question.correctAnswer]}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="stats-actions">
          <Link href={withBase('/')} className="btn btn-primary btn-lg">
            ホームに戻る
          </Link>
          <Link href={withBase('/history')} className="btn btn-secondary btn-lg">
            学習履歴を表示
          </Link>
          <button
            className="btn btn-danger btn-lg"
            onClick={handleClearProgress}
          >
            進捗をリセット
          </button>
        </div>
      </div>
    </main>
  );
}
