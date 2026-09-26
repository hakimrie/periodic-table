import React, { useState } from 'react';
import { generateQuizQuestions } from '../../data/quizQuestions';
import type { QuizQuestion } from '../../data/quizQuestions';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, BookOpen, Sparkles, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useI18n } from '../../utils/i18n';

interface QuizModeProps {
  onSelectElementById?: (id: number) => void;
  className?: string;
}

export const QuizMode: React.FC<QuizModeProps> = ({ onSelectElementById, className = '' }) => {
  const { t, lang } = useI18n();
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'high-school' | 'university'>('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => generateQuizQuestions(10, Date.now(), 'all', lang));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize quiz with 10 questions
  const startNewQuiz = (diff: 'all' | 'high-school' | 'university' = difficultyFilter, targetLang: 'en' | 'id' = lang) => {
    const qList = generateQuizQuestions(10, Date.now(), diff, targetLang);
    setQuestions(qList);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handleDifficultyChange = (diff: 'all' | 'high-school' | 'university') => {
    setDifficultyFilter(diff);
    startNewQuiz(diff, lang);
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
      // Trigger confetti celebration if score >= 7
      if (score + (selectedAnswer === currentQ?.correctIndex ? 1 : 0) >= 7) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  if (questions.length === 0) {
    return <div className="p-8 text-center text-slate-400">{lang === 'id' ? 'Memuat Kuis Kimia...' : 'Loading Chemistry Quiz...'}</div>;
  }

  return (
    <div className={`flex flex-col gap-6 text-slate-100 max-w-3xl mx-auto w-full ${className}`}>
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>{t('quiz.title', 'Chemistry Mastery Quiz')}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {t('quiz.subtitle', 'Test your knowledge of elements, electron configurations, trends, and properties')}
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
          <button
            onClick={() => handleDifficultyChange('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              difficultyFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('quiz.allDifficulties', 'All')}
          </button>
          <button
            onClick={() => handleDifficultyChange('high-school')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              difficultyFilter === 'high-school' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('quiz.highSchool', 'High School')}
          </button>
          <button
            onClick={() => handleDifficultyChange('university')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              difficultyFilter === 'university' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t('quiz.university', 'University')}
          </button>
        </div>
      </div>

      {/* Main Quiz Body */}
      {!isCompleted ? (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          {/* Progress bar & Current Score */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>
              {t('quiz.question', 'Question')} <strong className="text-cyan-400">{currentIndex + 1}</strong> {t('quiz.of', 'of')} {questions.length}
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{t('quiz.score', 'Score:')} <strong className="text-slate-100">{score}</strong></span>
            </span>
          </div>

          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-cyan-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="py-2">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-1">
              Category: {currentQ.category.replace(/-/g, ' ')} • {currentQ.difficulty}
            </span>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-100 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              let optionClass = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (idx === currentQ.correctIndex) {
                  optionClass = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/40 font-bold';
                } else if (isSelected) {
                  optionClass = 'bg-rose-950/50 border-rose-500 text-rose-200 ring-1 ring-rose-500/40';
                }
              } else if (isSelected) {
                optionClass = 'bg-cyan-950/40 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400/40 font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-sm ${optionClass}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-xs text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </span>

                  {isAnswerSubmitted && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Educational Explanation */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-semibold text-xs text-cyan-300">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>{t('quiz.explanation', 'Scientific Explanation:')}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>

              {currentQ.relatedElementId && onSelectElementById && (
                <button
                  onClick={() => onSelectElementById(currentQ.relatedElementId!)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium pt-1 block"
                >
                  {lang === 'id' ? `Buka Detail Unsur #${currentQ.relatedElementId} →` : `Open Element #${currentQ.relatedElementId} Details →`}
                </button>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
              >
                {t('quiz.submit', 'Submit Answer')}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
              >
                <span>{currentIndex + 1 < questions.length ? t('quiz.next', 'Next Question') : t('quiz.next', 'View Results')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center mx-auto text-2xl font-bold">
            <Award className="w-8 h-8 text-amber-400" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-100">{t('quiz.congratulations', 'Quiz Completed!')}</h3>
            <p className="text-slate-400 text-sm mt-1">
              {lang === 'id'
                ? `Skor Anda: `
                : `You scored `}
              <strong className="text-cyan-300 text-lg">{score}</strong>{' '}
              {lang === 'id' ? 'dari' : 'out of'}{' '}
              <strong className="text-slate-200">{questions.length}</strong> (
              {Math.round((score / questions.length) * 100)}%)
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 max-w-md mx-auto text-xs text-slate-300 leading-relaxed">
            {score >= 9 ? (
              <span className="text-emerald-400 font-medium">
                {t('quiz.perfectScore', 'Flawless score! You have demonstrated exceptional mastery of the periodic table.')}
              </span>
            ) : score >= 6 ? (
              <span className="text-cyan-400 font-medium">
                {t('quiz.greatScore', 'Great job! You have a solid grasp of chemical elements and periodic behavior.')}
              </span>
            ) : (
              <span className="text-slate-300">
                {t('quiz.practiceScore', 'Good effort! Review the element details and take another shot to boost your score.')}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => startNewQuiz()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('quiz.tryAgain', 'Take Another Quiz')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
