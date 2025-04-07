// This is a simplified data structure for highlighted terms and their definitions
// In a production application, this would be connected to a more robust content management system

export const highlightedTerms = {
  'function': {
    term: 'Function',
    shortDefinition: 'A mathematical relationship that assigns exactly one output value to each input value, usually written as f(x).',
    detailedDefinition: 'In mathematics, a function is a relation between sets that associates to every element of a first set exactly one element of the second set. Typical examples are functions from integers to integers, or from the real numbers to real numbers.',
    examples: [
      'f(x) = x² maps each number to its square',
      'g(x) = 2x + 3 is a linear function'
    ]
  },
  'parabola': {
    term: 'Parabola',
    shortDefinition: 'A U-shaped curve that represents the graph of a quadratic function, such as y = x².',
    detailedDefinition: 'A parabola is a curve where any point is at an equal distance from a fixed point (the focus) and a fixed straight line (the directrix). It is the graph of a quadratic function, such as y = x².',
    examples: [
      'The graph of y = x² is a parabola that opens upward',
      'The trajectory of a thrown object under gravity forms a parabola'
    ]
  },
  'quadratic-formula': {
    term: 'Quadratic Formula',
    shortDefinition: 'The formula x = (-b ± √(b² - 4ac)) / 2a used to solve quadratic equations in the form ax² + bx + c = 0.',
    detailedDefinition: 'The quadratic formula is the solution of the quadratic equation. When we have a quadratic equation in the form ax² + bx + c = 0, the values of x which are the solutions of the equation are given by the formula x = (-b ± √(b² - 4ac)) / 2a.',
    examples: [
      'For the equation x² + 5x + 6 = 0, a=1, b=5, c=6',
      'Using the formula: x = (-5 ± √(25 - 24)) / 2 = (-5 ± 1) / 2, which gives solutions x = -2 or x = -3'
    ]
  },
  'minimum-value': {
    term: 'Minimum Value',
    shortDefinition: 'The lowest point on a parabola when it opens upward (a > 0).',
    detailedDefinition: 'For a quadratic function f(x) = ax² + bx + c where a > 0, the parabola opens upward and has a minimum value. This minimum occurs at the vertex of the parabola, which is at x = -b/(2a).',
    examples: [
      'For f(x) = 2x² + 4x + 5, the minimum value occurs at x = -1 and equals 3'
    ]
  },
  'maximum-value': {
    term: 'Maximum Value',
    shortDefinition: 'The highest point on a parabola when it opens downward (a < 0).',
    detailedDefinition: 'For a quadratic function f(x) = ax² + bx + c where a < 0, the parabola opens downward and has a maximum value. This maximum occurs at the vertex of the parabola, which is at x = -b/(2a).',
    examples: [
      'For f(x) = -3x² + 6x + 2, the maximum value occurs at x = 1 and equals 5'
    ]
  },
  'vertex': {
    term: 'Vertex',
    shortDefinition: 'The point where a parabola changes direction, representing either a minimum or maximum value.',
    detailedDefinition: 'The vertex of a parabola is the highest or lowest point on the graph, depending on whether the parabola opens downward or upward. For a quadratic function f(x) = ax² + bx + c, the vertex occurs at x = -b/(2a) and has y-coordinate f(-b/(2a)).',
    examples: [
      'The vertex of f(x) = x² + 6x + 8 is at (-3, -1)',
      'The vertex of f(x) = -2x² + 8x - 3 is at (2, 5)'
    ]
  },
  'axis-of-symmetry': {
    term: 'Axis of Symmetry',
    shortDefinition: 'A vertical line passing through the vertex of a parabola about which the parabola is symmetric.',
    detailedDefinition: 'The axis of symmetry is a vertical line that passes through the vertex of a parabola. If you fold the graph along this line, the two halves of the parabola would match exactly. For a quadratic function f(x) = ax² + bx + c, the axis of symmetry is the vertical line x = -b/(2a).',
    examples: [
      'For the parabola y = x² + 4x + 3, the axis of symmetry is x = -2'
    ]
  }
};

export const definitions = {
  // Other definitions can be added here
};
