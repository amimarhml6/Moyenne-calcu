import { moduleAvg } from '../utils/calc';

const inputBaseWCC =
  'w-[60px] sm:w-[100px] md:w-[96px] px-3 py-2.5 text-right font-mono text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 transition-shadow';

const inputBase =
  'w-full md:w-24 px-3 py-2 text-right font-mono text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 transition-shadow';
const inputDimmed =
  'w-full md:w-24 px-3 py-2 text-right font-mono text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-70';

export default function ModuleTable({
  modules,
  grades,
  weights,
  onGradeChange,
  onWeightChange,
  onCoefChange,
}) {
  return (
    <div className="rounded-2xl shadow-lg border border-slate-200 bg-white px-4 py-6 sm:px-8 sm:py-8">
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-slate-100 text-slate-600 uppercase text-xs">
              <th className="px-4 py-3 text-left font-bold">Module</th>
              <th className="px-4 py-3 text-right">Coef</th>
              <th className="px-4 py-3 text-right">CC /20</th>
              <th className="px-4 py-3 text-right">Exam /20</th>
              <th className="px-4 py-3 text-right">wCC</th>
              <th className="px-4 py-3 text-right">wExam</th>
              <th className="px-4 py-3 text-right">Module avg</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module, index) => {
              const wCC = weights[index]?.wCC ?? module.wCC;
              const wExam = weights[index]?.wExam ?? module.wExam;
              const ccLocked = wExam >= 0.9999;
              const examLocked = wCC >= 0.9999;
              const cc = ccLocked ? 2 : (grades[index]?.cc ?? 0);
              const exam = examLocked ? 0 : (grades[index]?.exam ?? 0);
              const avg = moduleAvg(cc, exam, wCC, wExam);

              return (
                <tr
                  key={index}
                  className="bg-white border-b border-slate-100 transition-colors hover:bg-slate-50"
                >
                  <td className="px-4 py-3 text-sm font-bold align-middle text-slate-900">
                    {module.name}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {onCoefChange ? (
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={module.coef}
                        onChange={(e) => {
                          const raw = parseFloat(e.target.value);
                          const v = isNaN(raw) ? 0 : Math.max(0, raw);
                          onCoefChange(index, v);
                        }}
                        className={inputBaseWCC}
                      />
                    ) : (
                      <span className="text-right text-sm text-slate-700">{module.coef}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      value={cc}
                      disabled={ccLocked}
                      onChange={(e) => {
                        if (ccLocked) return;
                        const rawValue = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        const value = isNaN(rawValue) ? 0 : Math.max(0, Math.min(20, rawValue));
                        onGradeChange(index, 'cc', value);
                      }}
                      className={ccLocked ? inputDimmed : inputBase}
                      title={ccLocked ? 'CC disabled when exam weight is 100%' : undefined}
                    />
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      value={exam}
                      disabled={examLocked}
                      onChange={(e) => {
                        if (examLocked) return;
                        const rawValue = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        const value = isNaN(rawValue) ? 0 : Math.max(0, Math.min(20, rawValue));
                        onGradeChange(index, 'exam', value);
                      }}
                      className={examLocked ? inputDimmed : inputBase}
                      title={examLocked ? 'Exam disabled when CC weight is 100%' : undefined}
                    />
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={wCC}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value) ?? 0;
                        onWeightChange(index, 'wCC', v);
                      }}
                      className={inputBaseWCC}
                    />
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={wExam}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value) ?? 0;
                        onWeightChange(index, 'wExam', v);
                      }}
                      className={inputBase}
                    />
                  </td>
                  <td className="px-4 py-3 align-middle text-right text-sm font-semibold text-slate-800">
                    {avg !== null && !isNaN(avg) ? avg.toFixed(2) : '0.00'}
                  </td>
                  <td className="px-4 py-3 align-middle text-center">
                    {avg !== null && !isNaN(avg) ? (
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-2 ${
                          avg >= 10
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                            : 'bg-amber-50 text-amber-700 ring-amber-200'
                        }`}
                      >
                        {avg >= 10 ? 'Good' : 'Needs work'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-2 bg-amber-50 text-amber-700 ring-amber-200">
                        Needs work
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
