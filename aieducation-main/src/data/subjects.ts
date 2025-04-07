
// Type definitions
export interface Topic {
  id: string;
  title: string;
  description?: string;
  subtopics?: Topic[];
}

export interface Subject {
  id: string;
  title: string;
  description?: string;
  color?: string;
  icon?: string;
  topics: Topic[];
}

export const subjectsData = {
  mathematics: {
    id: 'mathematics',
    title: 'Mathematics',
    topics: [
      {
        id: 'pure-mathematics',
        title: 'Pure Mathematics',
        subtopics: [
          { id: 'proof', title: 'Proof' },
          { 
            id: 'algebra-and-functions', 
            title: 'Algebra and Functions',
            subtopics: [
              { id: 'indices-and-surds', title: 'Indices and Surds' },
              { id: 'quadratic-functions', title: 'Quadratic Functions' },
              { id: 'simultaneous-equations', title: 'Simultaneous Equations' },
              { id: 'inequalities', title: 'Inequalities' },
              { id: 'polynomials', title: 'Polynomials' },
            ]
          },
          { 
            id: 'coordinate-geometry', 
            title: 'Coordinate Geometry',
            subtopics: [
              { id: 'straight-lines', title: 'Straight Lines' },
              { id: 'circles', title: 'Circles' },
            ]
          },
          { 
            id: 'sequences-and-series', 
            title: 'Sequences and Series',
            subtopics: [
              { id: 'arithmetic-sequences', title: 'Arithmetic Sequences' },
              { id: 'geometric-sequences', title: 'Geometric Sequences' },
              { id: 'binomial-expansion', title: 'Binomial Expansion' },
            ]
          },
          { 
            id: 'trigonometry', 
            title: 'Trigonometry',
            subtopics: [
              { id: 'trigonometric-ratios', title: 'Trigonometric Ratios' },
              { id: 'trigonometric-identities', title: 'Trigonometric Identities' },
              { id: 'trigonometric-equations', title: 'Trigonometric Equations' },
            ]
          },
          { 
            id: 'exponentials-and-logarithms', 
            title: 'Exponentials and Logarithms',
            subtopics: [
              { id: 'exponential-functions', title: 'Exponential Functions' },
              { id: 'logarithmic-functions', title: 'Logarithmic Functions' },
              { id: 'exponential-models', title: 'Exponential Models' },
            ]
          },
          { 
            id: 'differentiation', 
            title: 'Differentiation',
            subtopics: [
              { id: 'differentiation-basics', title: 'Differentiation Basics' },
              { id: 'applications-of-differentiation', title: 'Applications of Differentiation' },
            ]
          },
          { 
            id: 'integration', 
            title: 'Integration',
            subtopics: [
              { id: 'integration-basics', title: 'Integration Basics' },
              { id: 'applications-of-integration', title: 'Applications of Integration' },
            ]
          },
          { id: 'numerical-methods', title: 'Numerical Methods' },
          { id: 'vectors', title: 'Vectors' },
        ]
      },
      {
        id: 'statistics',
        title: 'Statistics',
        subtopics: [
          { id: 'statistical-sampling', title: 'Statistical Sampling' },
          { id: 'data-presentation', title: 'Data Presentation and Interpretation' },
          { id: 'probability', title: 'Probability' },
          { id: 'statistical-distributions', title: 'Statistical Distributions' },
          { id: 'hypothesis-testing', title: 'Statistical Hypothesis Testing' },
        ]
      },
      {
        id: 'mechanics',
        title: 'Mechanics',
        subtopics: [
          { id: 'quantities-and-units', title: 'Quantities and Units in Mechanics' },
          { id: 'kinematics', title: 'Kinematics' },
          { id: 'forces-and-newtons-laws', title: 'Forces and Newton\'s Laws' },
          { id: 'moments', title: 'Moments' },
        ]
      },
    ]
  },
  science: {
    id: 'science',
    title: 'Science',
    topics: [
      {
        id: 'chemistry',
        title: 'Chemistry',
        subtopics: [
          { 
            id: 'physical-chemistry', 
            title: 'Physical Chemistry',
            subtopics: [
              { id: 'atomic-structure', title: 'Atomic Structure' },
              { id: 'amount-of-substance', title: 'Amount of Substance' },
              { id: 'bonding', title: 'Bonding' },
              { id: 'energetics', title: 'Energetics' },
              { id: 'kinetics', title: 'Kinetics' },
              { id: 'equilibria', title: 'Chemical Equilibria' },
              { id: 'redox', title: 'Oxidation, Reduction and Redox Equations' },
            ]
          },
          { 
            id: 'inorganic-chemistry', 
            title: 'Inorganic Chemistry',
            subtopics: [
              { id: 'periodic-table', title: 'The Periodic Table' },
              { id: 'group-2', title: 'Group 2 Elements' },
              { id: 'group-7', title: 'Group 7 Elements' },
              { id: 'transition-metals', title: 'Transition Metals' },
            ]
          },
          { 
            id: 'organic-chemistry', 
            title: 'Organic Chemistry',
            subtopics: [
              { id: 'alkanes', title: 'Alkanes' },
              { id: 'alkenes', title: 'Alkenes' },
              { id: 'alcohols', title: 'Alcohols' },
              { id: 'organic-analysis', title: 'Organic Analysis' },
            ]
          },
        ]
      },
      {
        id: 'biology',
        title: 'Biology',
        subtopics: [
          { id: 'biological-molecules', title: 'Biological Molecules' },
          { id: 'cells', title: 'Cells' },
          { id: 'organisms-exchange-substances', title: 'Organisms Exchange Substances' },
          { id: 'genetic-information', title: 'Genetic Information' },
          { id: 'energy-transfers', title: 'Energy Transfers' },
          { id: 'organisms-respond-to-changes', title: 'Organisms Respond to Changes' },
          { id: 'genetics-and-evolution', title: 'Genetics, Populations, Evolution' },
          { id: 'control-of-gene-expression', title: 'Control of Gene Expression' },
        ]
      },
      {
        id: 'physics',
        title: 'Physics',
        subtopics: [
          { id: 'measurements', title: 'Measurements and Errors' },
          { id: 'particles-and-radiation', title: 'Particles and Radiation' },
          { id: 'waves', title: 'Waves' },
          { id: 'mechanics-and-materials', title: 'Mechanics and Materials' },
          { id: 'electricity', title: 'Electricity' },
          { id: 'further-mechanics', title: 'Further Mechanics' },
          { id: 'thermal-physics', title: 'Thermal Physics' },
          { id: 'fields', title: 'Fields and Their Consequences' },
          { id: 'nuclear-physics', title: 'Nuclear Physics' },
        ]
      }
    ]
  }
};
