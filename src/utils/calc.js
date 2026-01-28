// Calculation utilities

/**
 * Normalize weights so they sum to 1
 * If sum is 0, fallback to default 0.4/0.6
 */
export function normalizeWeights(wCC, wExam, defaultWCC = 0.4, defaultWExam = 0.6) {
  const sum = wCC + wExam;
  
  if (sum === 0) {
    return { wCC: defaultWCC, wExam: defaultWExam };
  }
  
  return {
    wCC: wCC / sum,
    wExam: wExam / sum,
  };
}

/**
 * Calculate module average: CC*wCC + Exam*wExam
 * Treats null/NaN/undefined as 0
 */
export function moduleAvg(cc, exam, wCC, wExam) {
  // Treat null/NaN/undefined as 0
  const ccValue = (cc === null || cc === undefined || isNaN(cc)) ? 0 : cc;
  const examValue = (exam === null || exam === undefined || isNaN(exam)) ? 0 : exam;
  
  const normalized = normalizeWeights(wCC, wExam);
  return ccValue * normalized.wCC + examValue * normalized.wExam;
}

/**
 * Calculate semester average (coefficient-weighted)
 * Always includes all modules (grades default to 0)
 */
export function semesterAvg(modules, grades, weights) {
  let totalWeightedSum = 0;
  let totalCoeff = 0;
  
  modules.forEach((module, index) => {
    const cc = grades[index]?.cc ?? 0;
    const exam = grades[index]?.exam ?? 0;
    
    const modAvg = moduleAvg(cc, exam, weights[index]?.wCC ?? module.wCC, weights[index]?.wExam ?? module.wExam);
    totalWeightedSum += modAvg * module.coef;
    totalCoeff += module.coef;
  });
  
  if (totalCoeff === 0) {
    return null;
  }
  
  return totalWeightedSum / totalCoeff;
}

/**
 * Get rankings: top and bottom modules
 * Returns { top: [...], bottom: [...] }
 * Filters out modules with avg == 0 (not graded yet)
 * Strong modules: avg > 0 AND avg >= 10
 * Modules to improve: avg > 0 AND avg < 10
 */
export function getRankings(modules, grades, weights, count = 3) {
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
      index: index,
    };
  });
  
  // Filter out modules with avg == 0 (not graded yet)
  const analyzableModules = moduleAverages.filter(item => item.avg > 0);
  
  // Separate into strong (>= 10) and improve (< 10)
  const strongModules = analyzableModules.filter(item => item.avg >= 10);
  const improveModules = analyzableModules.filter(item => item.avg < 10);
  
  // Sort strong modules: avg desc, then coef desc
  strongModules.sort((a, b) => {
    if (b.avg !== a.avg) {
      return b.avg - a.avg;
    }
    return b.coef - a.coef;
  });
  
  // Sort improve modules: avg asc, then coef desc
  improveModules.sort((a, b) => {
    if (a.avg !== b.avg) {
      return a.avg - b.avg;
    }
    return b.coef - a.coef;
  });
  
  // Take top N from each category
  const top = strongModules.slice(0, Math.min(count, strongModules.length));
  const bottom = improveModules.slice(0, Math.min(count, improveModules.length));
  
  return { top, bottom };
}

/**
 * Check if any grades are missing
 */
export function hasMissingGrades(grades) {
  return grades.some(grade => 
    grade?.cc === null || grade?.cc === undefined || 
    grade?.exam === null || grade?.exam === undefined
  );
}
