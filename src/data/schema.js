/**
 * BoardWise Universal Game Data Schema
 *
 * Every game in the system must conform to this shape.
 * Adding a new game = adding a new JSON file matching this schema.
 */

export const GAME_SCHEMA = {
  // ── Identity ──────────────────────────────────────────────
  game_id: '',           // e.g. "catan"
  title: '',             // Display name
  family: '',            // template family (see FAMILIES)
  complexity: '',        // "light" | "medium" | "heavy"
  theme: '',             // One-sentence flavour description
  player_count: '',      // e.g. "2–4"
  time_estimate: '',     // e.g. "60–120 min"

  // ── Content layer ─────────────────────────────────────────
  player_goal: '',       // What does winning look like?
  setup_steps: [],       // Ordered strings
  turn_loop: '',         // One paragraph describing a normal turn
  player_actions: [],    // Ordered list — encounter order, not alphabetical
  end_trigger: '',       // Condition that ends the game
  scoring: '',           // How points / victory are calculated
  beginner_mistakes: [], // Common mistakes to warn about
  edge_cases_to_defer: [],
  example_first_turn: '',

  // ── Scene layer ───────────────────────────────────────────
  components: [],        // { id, label, description, image_placeholder }
  scenes: [],            // See SCENE_SCHEMA below
  quick_reference: [],   // { id, question, answer }
}

export const SCENE_SCHEMA = {
  scene_id: '',
  lesson_stage: '',      // 1–8 (see STAGES)
  title: '',
  narration_text: '',
  board_focus: '',       // Which area of the board to show/zoom
  components_involved: [],
  highlight_targets: [], // Component IDs to pulse
  motion_primitive: '',  // See MOTION_PRIMITIVES
  user_takeaway: '',     // One-liner: what the player should now know
  optional_quick_check: false,
}

// ── Controlled vocabularies ───────────────────────────────────

export const STAGES = {
  1: 'intro',
  2: 'objective',
  3: 'setup',
  4: 'turn-loop',
  5: 'core-actions',
  6: 'example-round',
  7: 'endgame',
  8: 'quick-reference',
}

export const FAMILIES = [
  'resource-conversion',   // Catan
  'route-tableau',         // Ticket to Ride
  'co-op-crisis',          // Pandemic
  'party-chaos-card',      // Exploding Kittens
  'ultra-light-quickplay', // Uno
  'hidden-role-deduction', // Secret Hitler, Coup
  'engine-building',       // Dominion, Splendor
]

export const MOTION_PRIMITIVES = [
  'highlight',             // Pulse border/glow on a component
  'move_token',            // Animate token A → B
  'flip_reveal',           // Card face-down to face-up
  'fade_in_text',          // Rule text appears over board
  'count_up',              // Resource counter increments
  'zoom_region',           // Camera zooms to sub-section
  'pulse_legal',           // Highlight valid move locations
  'compare_correct_wrong', // Side-by-side right vs wrong
]
