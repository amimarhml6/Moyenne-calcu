export default function AnalysisPanel({ topModules, bottomModules, show, validated }) {
  if (!show) {
    return null;
  }

  // Show empty state if no analyzable modules
  if (topModules.length === 0 && bottomModules.length === 0) {
    return (
      <div
        className={`fade-in rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-7 ${
          validated ? 'border-t-4 border-t-emerald-500' : 'border-t-4 border-t-rose-500'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Strengths & focus points
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Use this view to balance effort between strong and weak modules.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 px-4 py-4 text-center">
          <p className="text-sm text-slate-600">
            Enter grades greater than 0 to see your strengths and focus areas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fade-in rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-7 ${
        validated ? 'border-t-4 border-t-emerald-500' : 'border-t-4 border-t-rose-500'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Strengths & focus points
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Use this view to balance effort between strong and weak modules.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {topModules.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-600">
                ✓
              </span>
              <h3 className="text-sm font-semibold text-slate-800">
                Strong modules
              </h3>
            </div>
            <ul className="space-y-2.5">
              {topModules.map((module, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-emerald-50/70 px-3 py-2"
                >
                  <span className="text-sm font-medium text-slate-900">
                    {module.name}
                  </span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-slate-600">
                      Coef {module.coef}
                    </span>
                    <span className="font-semibold text-emerald-700">
                      {module.avg.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {bottomModules.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-xs text-amber-700">
                !
              </span>
              <h3 className="text-sm font-semibold text-slate-800">
                Modules to improve
              </h3>
            </div>
            <ul className="space-y-2.5">
              {bottomModules.map((module, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-amber-50/80 px-3 py-2"
                >
                  <span className="text-sm font-medium text-slate-900">
                    {module.name}
                  </span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-slate-700">
                      Coef {module.coef}
                    </span>
                    <span className="font-semibold text-amber-800">
                      {module.avg.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl bg-slate-50 px-4 py-3">
        <p className="text-xs leading-relaxed text-slate-600">
          Focus first on modules with both{" "}
          <span className="font-semibold text-slate-800">low averages</span> and{" "}
          <span className="font-semibold text-slate-800">high coefficients</span>.
          Then use your strong modules to keep your overall average stable.
        </p>
      </div>
    </div>
  );
}
