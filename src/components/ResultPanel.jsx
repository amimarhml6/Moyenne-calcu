export default function ResultPanel({ semesterAvg, show }) {
  if (!show || semesterAvg === null) {
    return null;
  }

  const isValidated = semesterAvg >= 10;

  return (
    <div
      className={`fade-in rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-7 ${
        isValidated ? 'border-t-4 border-t-emerald-500' : 'border-t-4 border-t-rose-500'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            <span className={isValidated ? 'text-emerald-500' : 'text-rose-500'}>
              {isValidated ? '✓' : '✕'}
            </span>
            <span>{isValidated ? 'Validated semester' : 'Not validated yet'}</span>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-slate-900">
            Semester average
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Based on the modules with complete CC and exam grades.
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div
          className={`text-5xl md:text-6xl font-semibold tracking-tight ${
            isValidated ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {semesterAvg.toFixed(2)}
          <span className="ml-1 text-2xl text-slate-400">/20</span>
        </div>

        <p
          className={`mt-4 text-sm md:text-base ${
            isValidated ? 'text-emerald-700' : 'text-rose-700'
          }`}
        >
          {isValidated
            ? 'Nice work. This semester is validated – keep your rhythm and consolidate your strong modules.'
            : 'You are close. Focus on weak modules with high coefficients and you can turn this around next session.'}
        </p>
      </div>
    </div>
  );
}
