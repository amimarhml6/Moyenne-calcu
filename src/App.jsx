import { useState, useEffect } from 'react';
import { MODULES } from './data/modules';
import { semesterAvg, getRankings } from './utils/calc';
import ModuleTable from './components/ModuleTable';
import ResultPanel from './components/ResultPanel';
import AnalysisPanel from './components/AnalysisPanel';
import CoachTips from './components/CoachTips';
import Footer from './components/Footer';
import './index.css';

const STORAGE_KEY = 'avgCalculatorState';

const SPECIALITIES = [
  'Software Engineering',
  'Intelligence Artificielle',
  'Réseaux',
  'Science des données',
  'Computer Security',
  "Systèmes d'information",
];

function getCurrentModules(program, year, semester, speciality) {
  if (program === 'Engineer' && year === 3) {
    const bySpec = MODULES.Engineer?.[3]?.[speciality];
    return bySpec?.[semester] ?? [];
  }
  return MODULES[program]?.[year]?.[semester] ?? [];
}

function getContextKey(program, year, semester, speciality) {
  if (program === 'Engineer' && year === 3) {
    return `${program}-${year}-${speciality}-${semester}`;
  }
  return `${program}-${year}-${semester}`;
}

function App() {
  const [program, setProgram] = useState('Engineer');
  const [year, setYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [speciality, setSpeciality] = useState('Software Engineering');
  const [grades, setGrades] = useState([]);
  const [weights, setWeights] = useState([]);
  const [coefficientOverrides, setCoefficientOverrides] = useState({});
  const [calculatedAvg, setCalculatedAvg] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [rankings, setRankings] = useState({ top: [], bottom: [] });

  const contextKey = getContextKey(program, year, semester, speciality);
  const currentModules = getCurrentModules(program, year, semester, speciality);
  const effectiveModules = currentModules.map((m, i) => ({
    ...m,
    coef: (coefficientOverrides[contextKey]?.[i] ?? m.coef),
  }));

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgram(parsed.program || 'Engineer');
        setYear(parsed.year ?? 1);
        setSemester(parsed.semester ?? 1);
        setSpeciality(parsed.speciality && SPECIALITIES.includes(parsed.speciality) ? parsed.speciality : 'Software Engineering');
        const loadedGrades = (parsed.grades || []).map(grade => ({
          cc: grade?.cc === null || grade?.cc === undefined || isNaN(grade?.cc) ? 0 : Math.max(0, Math.min(20, grade.cc)),
          exam: grade?.exam === null || grade?.exam === undefined || isNaN(grade?.exam) ? 0 : Math.max(0, Math.min(20, grade.exam)),
        }));
        setGrades(loadedGrades);
        setWeights(parsed.weights || []);
        setCoefficientOverrides(parsed.coefficientOverrides || {});
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);

  // Initialize grades and weights when modules/context change; ensure weights sum to 1; lock CC/Exam when weight=1
  useEffect(() => {
    if (currentModules.length === 0) return;

    const newGrades = [];
    const newWeights = [];

    currentModules.forEach((module, index) => {
      const existingGrade = grades.length === currentModules.length ? grades[index] : null;
      const existingWeight = weights.length === currentModules.length ? weights[index] : null;

      let wCC = existingWeight?.wCC ?? module.wCC;
      let wExam = existingWeight?.wExam ?? module.wExam;
      wCC = Math.max(0, Math.min(1, Number(wCC)));
      wExam = Math.max(0, Math.min(1, Number(wExam)));
      if (Math.abs(wCC + wExam - 1) > 0.001) {
        wExam = Math.round((1 - wCC) * 100) / 100;
        wExam = Math.max(0, Math.min(1, wExam));
        wCC = Math.round((1 - wExam) * 100) / 100;
      }

      let cc = Math.max(0, Math.min(20, existingGrade?.cc ?? 0));
      let exam = Math.max(0, Math.min(20, existingGrade?.exam ?? 0));
      if (wExam >= 0.9999) {
        cc = 0;
      }
      if (wCC >= 0.9999) {
        exam = 0;
      }

      newGrades.push({ cc, exam });
      newWeights.push({
        wCC: Math.round(wCC * 100) / 100,
        wExam: Math.round(wExam * 100) / 100,
      });
    });

    setGrades(newGrades);
    setWeights(newWeights);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program, year, semester, speciality]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const state = {
      program,
      year,
      semester,
      speciality,
      grades,
      weights,
      coefficientOverrides,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [program, year, semester, speciality, grades, weights, coefficientOverrides]);

  const handleGradeChange = (index, type, value) => {
    const newGrades = [...grades];
    if (!newGrades[index]) {
      newGrades[index] = { cc: 0, exam: 0 };
    }
    // Clamp value between 0 and 20, treat empty/null/NaN as 0
    const clampedValue = value === null || value === undefined || isNaN(value) 
      ? 0 
      : Math.max(0, Math.min(20, value));
    newGrades[index] = { ...newGrades[index], [type]: clampedValue };
    setGrades(newGrades);
    setShowResults(false);
  };

  const handleWeightChange = (index, type, value) => {
    const raw = Math.max(0, Math.min(1, Number(value) || 0));
    const v = Math.round(raw * 100) / 100;
    const other = Math.round((1 - v) * 100) / 100;

    const newWeights = [...weights];
    if (!newWeights[index]) {
      newWeights[index] = { wCC: currentModules[index].wCC, wExam: currentModules[index].wExam };
    }
    newWeights[index] = type === 'wCC' ? { wCC: v, wExam: other } : { wCC: other, wExam: v };
    setWeights(newWeights);

    // Lock: when wExam===1 force CC=0; when wCC===1 force Exam=0
    const newGrades = [...grades];
    if (!newGrades[index]) {
      newGrades[index] = { cc: 0, exam: 0 };
    }
    if (v >= 0.9999 && type === 'wExam') {
      newGrades[index] = { ...newGrades[index], cc: 0 };
      setGrades(newGrades);
    } else if (v >= 0.9999 && type === 'wCC') {
      newGrades[index] = { ...newGrades[index], exam: 0 };
      setGrades(newGrades);
    }
    setShowResults(false);
  };

  const handleCoefChange = (index, value) => {
    const clamped = Math.max(0.1, Number(value) || 0.1);
    const arr = coefficientOverrides[contextKey] ?? currentModules.map((m) => m.coef);
    const next = [...arr];
    if (index >= next.length) {
      next.length = index + 1;
      currentModules.forEach((m, i) => {
        if (next[i] == null) next[i] = m.coef;
      });
    }
    next[index] = Math.round(clamped * 100) / 100;
    setCoefficientOverrides((prev) => ({ ...prev, [contextKey]: next }));
    setShowResults(false);
  };

  const handleCalculate = () => {
    const avg = semesterAvg(effectiveModules, grades, weights);
    setCalculatedAvg(avg);
    setShowResults(true);
    const ranking = getRankings(effectiveModules, grades, weights, 3);
    setRankings(ranking);
  };

  const handleReset = () => {
    const newGrades = currentModules.map(() => ({ cc: 0, exam: 0 }));
    const newWeights = currentModules.map((m) => {
      let wCC = m.wCC ?? 0.4;
      let wExam = m.wExam ?? 0.6;
      wCC = Math.max(0, Math.min(1, wCC));
      wExam = Math.max(0, Math.min(1, wExam));
      const sum = wCC + wExam;
      if (sum <= 0) {
        wCC = 0.4;
        wExam = 0.6;
      } else {
        wCC = Math.round((wCC / sum) * 100) / 100;
        wExam = Math.round((1 - wCC) * 100) / 100;
      }
      return { wCC, wExam };
    });
    setGrades(newGrades);
    setWeights(newWeights);
    setCalculatedAvg(null);
    setShowResults(false);
    setRankings({ top: [], bottom: [] });
  };

  const handleApplyTypicalWeights = () => {
    const newWeights = currentModules.map(() => ({ wCC: 0.4, wExam: 0.6 }));
    setWeights(newWeights);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8 md:mb-10 fade-in">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                Avg Calculator
              </h1>
              <p className="mt-2 max-w-2xl text-sm md:text-base text-slate-500">
                Plan your semester with clarity. Enter your grades, adjust weights,
                and understand where you are strong and where to focus.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs md:text-sm font-medium text-blue-700 ring-1 ring-blue-100">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span>{program}</span>
              <span className="text-slate-400">•</span>
              <span>{`Year ${year}`}</span>
              {program === 'Engineer' && year === 3 && (
                <>
                  <span className="text-slate-400">•</span>
                  <span>{speciality}</span>
                </>
              )}
              <span className="text-slate-400">•</span>
              <span>{`Semester ${semester}`}</span>
            </div>
          </div>
        </header>

        {/* Selectors */}
        <section className="mb-6 fade-in">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 md:p-7 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Semester context
            </h2>
            <div className={`grid grid-cols-1 gap-4 ${program === 'Engineer' && year === 3 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Program</label>
                <select
                  value={program}
                  onChange={(e) => {
                    setProgram(e.target.value);
                    setShowResults(false);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                >
                  <option value="Engineer">Engineer</option>
                  <option value="LMD">LMD</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Year</label>
                <select
                  value={year}
                  onChange={(e) => {
                    setYear(Number(e.target.value));
                    setShowResults(false);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>

              {program === 'Engineer' && year === 3 && (
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-600">Speciality</label>
                  <select
                    value={speciality}
                    onChange={(e) => {
                      setSpeciality(e.target.value);
                      setShowResults(false);
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                  >
                    {SPECIALITIES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => {
                    setSemester(Number(e.target.value));
                    setShowResults(false);
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Module Table + Actions */}
        <section className="fade-in">
          <div className="mb-4 rounded-2xl bg-white/80 p-5 md:p-7 shadow-sm ring-1 ring-slate-200/80">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Modules & grades
                </h2>
                <p className="mt-1 text-xs md:text-sm text-slate-500">
                  Enter CC and exam grades out of 20. Adjust weights if CC is more
                  or less important than the final exam.
                </p>
              </div>
            </div>

            <ModuleTable
              modules={effectiveModules}
              grades={grades}
              weights={weights}
              onGradeChange={handleGradeChange}
              onWeightChange={handleWeightChange}
              onCoefChange={handleCoefChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center">
            <button
              onClick={handleCalculate}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
            >
              Calculate semester average
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
            >
              Reset
            </button>
            <button
              onClick={handleApplyTypicalWeights}
              className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50/40 px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
            >
              Apply typical weights (0.4 / 0.6)
            </button>
          </div>
        </section>

        {/* Result + Analysis layout */}
        <section className="fade-in">
          <div className="grid gap-6 md:grid-cols-2">
            <ResultPanel semesterAvg={calculatedAvg} show={showResults} />
            <AnalysisPanel
              topModules={rankings.top}
              bottomModules={rankings.bottom}
              show={showResults}
              validated={calculatedAvg !== null && calculatedAvg >= 10}
            />
          </div>
        </section>

        {/* Coach Tips */}
        {showResults && (
          <section className="fade-in mt-6">
            <CoachTips
              semesterAvg={calculatedAvg}
              show={showResults}
              modules={effectiveModules}
              grades={grades}
              weights={weights}
            />
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;