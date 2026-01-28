import { moduleAvg } from '../utils/calc';

export default function CoachTips({ semesterAvg, show, modules, grades, weights }) {
  if (!show || semesterAvg === null) {
    return null;
  }

  // Calculate module averages and filter out avg == 0
  const moduleAverages = modules.map((module, index) => {
    const cc = grades[index]?.cc ?? 0;
    const exam = grades[index]?.exam ?? 0;
    const wCC = weights[index]?.wCC ?? module.wCC;
    const wExam = weights[index]?.wExam ?? module.wExam;
    
    const avg = moduleAvg(cc, exam, wCC, wExam);
    
    return {
      name: module.name,
      coef: module.coef,
      avg: avg,
      cc: cc,
      exam: exam,
    };
  }).filter(item => item.avg > 0);

  // Edge case: no analyzable modules
  if (moduleAverages.length === 0) {
    return (
      <div className="fade-in rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-7">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <span className="text-lg">💡</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Coach Tips
            </h2>
            <p className="text-sm text-slate-600">
              Enter at least one grade greater than 0 to get personalized tips.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isValidated = semesterAvg >= 10;

  // Identify weakest modules: avg>0 and avg<10, sorted by coef desc, then avg asc
  const weakestModules = moduleAverages
    .filter(item => item.avg < 10)
    .sort((a, b) => {
      if (b.coef !== a.coef) {
        return b.coef - a.coef;
      }
      return a.avg - b.avg;
    });

  // Identify strongest modules: avg>=10, sorted by avg desc
  const strongestModules = moduleAverages
    .filter(item => item.avg >= 10)
    .sort((a, b) => b.avg - a.avg);

  const topWeakModule = weakestModules[0];
  const secondWeakModule = weakestModules[1];
  const bestModule = strongestModules[0];

  if (isValidated) {
    // Success case: validated semester
    return (
      <div className="fade-in rounded-2xl border border-emerald-200 bg-white shadow-sm p-6 md:p-7">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <span className="text-lg">🎉</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold text-slate-900">
                Coach Tips
              </h2>
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                Success
              </span>
            </div>
            <p className="text-sm text-emerald-700 font-medium mb-3">
              Excellent work! You've validated this semester. Keep this momentum going.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2 text-sm text-slate-700">
            <span className="text-blue-600 font-semibold mt-0.5">•</span>
            <span>
              <strong>Maintain your strengths:</strong> Keep excelling in{' '}
              {bestModule ? (
                <span className="font-semibold text-emerald-700">{bestModule.name}</span>
              ) : (
                'your strong modules'
              )}
              . These are your foundation for continued success.
            </span>
          </div>

          {topWeakModule && (
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <span className="text-blue-600 font-semibold mt-0.5">•</span>
              <span>
                <strong>Don't neglect weaker areas:</strong> While{' '}
                <span className="font-semibold text-amber-700">{topWeakModule.name}</span> is below 10,
                maintaining a balanced performance across all modules will strengthen your overall profile.
              </span>
            </div>
          )}

          <div className="flex items-start gap-2 text-sm text-slate-700">
            <span className="text-blue-600 font-semibold mt-0.5">•</span>
            <span>
              <strong>Time management:</strong> Allocate study time proportionally to module coefficients.
              High-coefficient modules deserve more attention, but don't ignore the others.
            </span>
          </div>

          <div className="flex items-start gap-2 text-sm text-slate-700">
            <span className="text-blue-600 font-semibold mt-0.5">•</span>
            <span>
              <strong>Aim higher:</strong> Challenge yourself to improve your average next semester.
              Set incremental goals and track your progress regularly.
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    // Not validated case: need improvement
    return (
      <div className="fade-in rounded-2xl border border-amber-200 bg-white shadow-sm p-6 md:p-7">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <span className="text-lg">💪</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold text-slate-900">
                Coach Tips
              </h2>
              <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
                Action Needed
              </span>
            </div>
            <p className="text-sm text-amber-700 font-medium mb-3">
              You're close! With focused effort, you can turn this around. Here's your action plan:
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {topWeakModule && (
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <span className="text-blue-600 font-semibold mt-0.5">•</span>
              <span>
                <strong>Priority focus:</strong> Start with{' '}
                <span className="font-semibold text-amber-700">{topWeakModule.name}</span>
                {topWeakModule.coef >= 3 && ' (high coefficient)'}
                {topWeakModule.avg < 10 && (
                  <>
                    . Aim to raise it from{' '}
                    <span className="font-mono font-semibold">{topWeakModule.avg.toFixed(1)}</span> →{' '}
                    <span className="font-mono font-semibold text-emerald-700">10</span> by improving{' '}
                    {topWeakModule.exam < topWeakModule.cc ? 'exam preparation' : 'continuous assessment work'}.
                  </>
                )}
              </span>
            </div>
          )}

          {secondWeakModule && secondWeakModule.name !== topWeakModule?.name && (
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <span className="text-blue-600 font-semibold mt-0.5">•</span>
              <span>
                <strong>Secondary focus:</strong> After{' '}
                {topWeakModule ? topWeakModule.name : 'your priority module'}, work on{' '}
                <span className="font-semibold text-amber-700">{secondWeakModule.name}</span>
                {secondWeakModule.coef >= 3 && ' (high coefficient)'}
                . Target improvement from{' '}
                <span className="font-mono font-semibold">{secondWeakModule.avg.toFixed(1)}</span> →{' '}
                <span className="font-mono font-semibold text-emerald-700">10</span>.
              </span>
            </div>
          )}

          <div className="flex items-start gap-2 text-sm text-slate-700">
            <span className="text-blue-600 font-semibold mt-0.5">•</span>
            <span>
              <strong>Focus strategy:</strong> Prioritize modules that are both{' '}
              <span className="font-semibold text-slate-900">low average (&lt;10)</span> and{' '}
              <span className="font-semibold text-slate-900">high coefficient</span>. These have the
              biggest impact on your semester average.
            </span>
          </div>

          {bestModule && (
            <div className="flex items-start gap-2 text-sm text-slate-700">
              <span className="text-blue-600 font-semibold mt-0.5">•</span>
              <span>
                <strong>Leverage your strengths:</strong> Keep{' '}
                <span className="font-semibold text-emerald-700">{bestModule.name}</span> strong
                (avg: {bestModule.avg.toFixed(1)}/20). This helps balance your overall performance
                while you improve weaker modules.
              </span>
            </div>
          )}

          <div className="flex items-start gap-2 text-sm text-slate-700">
            <span className="text-blue-600 font-semibold mt-0.5">•</span>
            <span>
              <strong>Weekly study plan:</strong> Allocate 2-3 focused study blocks per week for each
              priority module. Review past papers, practice problems, and use spaced repetition for
              key concepts. Track your progress weekly.
            </span>
          </div>

          <div className="flex items-start gap-2 text-sm text-slate-700">
            <span className="text-blue-600 font-semibold mt-0.5">•</span>
            <span>
              <strong>Exam preparation:</strong> For modules where exam weight is high, dedicate extra
              time to past exam papers and timed practice sessions. Identify patterns in exam questions
              and focus on high-yield topics.
            </span>
          </div>
        </div>
      </div>
    );
  }
}
