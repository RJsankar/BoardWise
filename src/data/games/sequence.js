/**
 * Sequence — abstract-strategy family
 */
const sequence = {
  game_id: 'sequence',
  title: 'Sequence',
  family: 'abstract-strategy',
  complexity: 'light',
  theme: 'Play cards from your hand to claim spaces on the board — line up five chips in a row before your opponents do.',
  player_count: '2–12',
  time_estimate: '30–60 min',

  player_goal: 'Be the first team or player to complete the required number of Sequences — five chips in a row horizontally, vertically, or diagonally.',

  setup_steps: [
    'Unfold the board and place it in the centre of the table.',
    'Divide players into 2 teams (or play individually with 2–3 players).',
    'Each player draws a starting hand: 7 cards (2 players), 6 cards (3–4 players), 5 cards (6 players).',
    'Choose a colour of chips for each team.',
    'Decide who goes first — play proceeds clockwise.',
  ],

  turn_loop: 'Play one card from your hand face-up on the discard pile, place one chip on any matching space on the board, then draw one card to refill your hand.',

  player_actions: [
    'Play a card and place a chip on a matching board space',
    'Play a two-eyed Jack (wild) — place a chip on any open space',
    'Play a one-eyed Jack (anti-wild) — remove one opponent chip from any space',
    'Call "Sequence" when you complete a row of five chips',
  ],

  end_trigger: 'The first team to complete the required number of Sequences wins: 2 Sequences for 2 teams, 1 Sequence for 3 teams.',

  scoring: 'Win by completing Sequences, not by points. A Sequence is exactly 5 chips in an unbroken row (horizontal, vertical, or diagonal). The four corner spaces are permanent free spaces that count toward any Sequence.',

  beginner_mistakes: [
    'Forgetting to draw a card after placing a chip.',
    'Trying to place on a space already occupied by any chip.',
    'Thinking one-eyed Jacks can remove chips on a completed Sequence — they cannot.',
    'Ignoring the corners — they are free spaces that count for both teams.',
    'Playing purely offensively and letting opponents build two Sequences unopposed.',
  ],

  edge_cases_to_defer: [
    'Dead card rule: if you hold a card whose spaces are all occupied, show it and draw a replacement.',
    'Sequence overlap: one chip can be shared between two Sequences.',
    'Three-team play changes win condition to 1 Sequence each.',
  ],

  example_first_turn: 'Player holds a 7 of Hearts. There are two 7-of-Hearts spaces on the board. They pick the one that extends their team\'s developing diagonal, place a chip, then draw a new card.',

  components: [
    { id: 'board', label: 'Game Board', description: '10×10 grid showing all cards twice (except Jacks). Four corner spaces are permanent free spaces.' },
    { id: 'chip', label: 'Chip', description: 'Coloured disc placed on board spaces. Teams use different colours.' },
    { id: 'card', label: 'Card', description: 'Standard playing cards (two decks). Played to claim matching board spaces.' },
    { id: 'two_eyed_jack', label: 'Two-Eyed Jack', description: 'Wild card — place a chip on any open space on the board.' },
    { id: 'one_eyed_jack', label: 'One-Eyed Jack', description: 'Anti-wild — remove one opponent chip from any space (cannot remove from a completed Sequence).' },
    { id: 'corner_space', label: 'Corner Space', description: 'Four pre-marked free spaces. No card needed. Count toward any player\'s Sequence.' },
  ],

  scenes: [
    // ── Stage 1: Intro ────────────────────────────────────────────
    {
      scene_id: 'seq_s01',
      lesson_stage: 'intro',
      title: 'Welcome to Sequence',
      narration_text: 'Sequence is a card-and-board game that mixes strategy with a little luck. Play cards from your hand to place chips on the board, build rows of five, and outmanoeuvre your opponents before they beat you to it.',
      board_focus: 'full-board',
      image: '/assets/seq-gameplay.png',
      components_involved: ['board', 'chip', 'card'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'Sequence blends card play and board strategy — first to five-in-a-row wins.',
      optional_quick_check: false,
    },

    // ── Stage 2: Objective ────────────────────────────────────────
    {
      scene_id: 'seq_s02',
      lesson_stage: 'objective',
      title: 'What Is a Sequence?',
      narration_text: 'A Sequence is five of your team\'s chips in an unbroken line — horizontally, vertically, or diagonally. The four corner spaces on the board are free for everyone and count toward any Sequence.',
      board_focus: 'board-grid',
      image: '/assets/seq-sequences-board.png',
      components_involved: ['chip', 'corner_space'],
      highlight_targets: ['chip'],
      motion_primitive: 'highlight',
      user_takeaway: 'Five chips in a row = one Sequence. Corners are free for all.',
      optional_quick_check: false,
    },
    {
      scene_id: 'seq_s03',
      lesson_stage: 'objective',
      title: 'How Many Sequences to Win?',
      narration_text: 'With 2 teams: first to complete 2 Sequences wins. With 3 teams: first to complete 1 Sequence wins. One chip can be shared between two Sequences — plan your layout to build both at once.',
      board_focus: 'board-grid',
      image: '/assets/seq-three-team.png',
      components_involved: ['chip'],
      highlight_targets: ['chip'],
      motion_primitive: 'count_up',
      user_takeaway: '2 teams → need 2 Sequences. 3 teams → need 1. Overlap chips to build both.',
      optional_quick_check: true,
    },

    // ── Stage 3: Setup ────────────────────────────────────────────
    {
      scene_id: 'seq_s04',
      lesson_stage: 'setup',
      title: 'The Board & Cards',
      narration_text: 'The board is a 10×10 grid showing every playing card twice — one in each half of the board. Each card in your hand matches exactly two spaces on the board. Jacks have no spaces — they are action cards.',
      board_focus: 'full-board',
      image: '/assets/seq-board-setup.png',
      components_involved: ['board', 'card'],
      highlight_targets: ['board'],
      motion_primitive: 'zoom_region',
      user_takeaway: 'Every card in your hand has two matching spots on the board.',
      optional_quick_check: false,
    },
    {
      scene_id: 'seq_s05',
      lesson_stage: 'setup',
      title: 'Teams & Starting Hands',
      narration_text: 'Split into 2 equal teams. Each player draws their starting hand: 7 cards for 2-player games, 6 for 3–4 players, 5 for 6 players. Keep your cards hidden. Place chip piles within reach of each team.',
      board_focus: 'chip-supply',
      components_involved: ['card', 'chip'],
      highlight_targets: ['card'],
      motion_primitive: 'flip_reveal',
      user_takeaway: 'Card hand size depends on player count. Teammates share the same chip colour.',
      optional_quick_check: false,
    },

    // ── Stage 4: Turn Loop ────────────────────────────────────────
    {
      scene_id: 'seq_s06',
      lesson_stage: 'turn-loop',
      title: 'A Turn: Play, Place, Draw',
      narration_text: 'Your entire turn is three steps: 1. Play one card from your hand face-up onto the discard pile. 2. Place one of your team\'s chips on any matching space on the board. 3. Draw one card to refill your hand to the starting size.',
      board_focus: 'full-board',
      image: '/assets/seq-place-chip.png',
      components_involved: ['card', 'chip'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'Play a card → place a chip → draw a card. Always all three, every turn.',
      optional_quick_check: true,
    },
    {
      scene_id: 'seq_s07',
      lesson_stage: 'turn-loop',
      title: 'Matching Card to Board',
      narration_text: 'Each card maps to two spots on the board — one in each half. Choose whichever space is more strategic. If both spaces for a card are already occupied, that card is "dead." Show it to everyone, discard it, and draw a replacement immediately.',
      board_focus: 'full-board',
      image: '/assets/seq-match-card.png',
      components_involved: ['card', 'board', 'chip'],
      highlight_targets: ['card', 'board'],
      motion_primitive: 'pulse_legal',
      user_takeaway: 'Each card has two board spots — pick the better one. Dead cards get replaced.',
      optional_quick_check: false,
    },

    // ── Stage 5: Core Actions ─────────────────────────────────────
    {
      scene_id: 'seq_s08',
      lesson_stage: 'core-actions',
      title: 'Two-Eyed Jack: Wild Card',
      narration_text: 'Both Jacks with two eyes are wild cards. Play one to place your chip on any open space on the board — no card match needed. Use them to complete a Sequence or block an opponent from finishing theirs.',
      board_focus: 'full-board',
      image: '/assets/seq-two-eyed-jack.png',
      components_involved: ['two_eyed_jack', 'chip'],
      highlight_targets: ['two_eyed_jack'],
      motion_primitive: 'pulse_legal',
      user_takeaway: 'Two-eyed Jack = place your chip anywhere open. Save for critical moments.',
      optional_quick_check: false,
    },
    {
      scene_id: 'seq_s09',
      lesson_stage: 'core-actions',
      title: 'One-Eyed Jack: Remove a Chip',
      narration_text: 'Both Jacks with one eye let you remove any one opponent\'s chip from the board. The space becomes open again. One-eyed Jacks cannot remove chips that are part of a completed Sequence — those are locked forever.',
      board_focus: 'full-board',
      image: '/assets/seq-one-eyed-jack.png',
      components_involved: ['one_eyed_jack', 'chip'],
      highlight_targets: ['one_eyed_jack'],
      motion_primitive: 'compare_correct_wrong',
      user_takeaway: 'One-eyed Jack removes an opponent\'s chip. Can\'t remove from a completed Sequence.',
      optional_quick_check: true,
    },
    {
      scene_id: 'seq_s10',
      lesson_stage: 'core-actions',
      title: 'The Four Corner Spaces',
      narration_text: 'The four corner spaces are pre-marked as free — no card is needed to use them, and they\'re available to everyone. They count as a chip of any colour for any Sequence. Building toward a corner can give you a huge head start.',
      board_focus: 'board-corners',
      image: '/assets/seq-row-complete.png',
      components_involved: ['corner_space', 'chip'],
      highlight_targets: ['corner_space'],
      motion_primitive: 'highlight',
      user_takeaway: 'Corner spaces are free wild tiles. Build toward them early.',
      optional_quick_check: false,
    },

    // ── Stage 6: Example Round ────────────────────────────────────
    {
      scene_id: 'seq_s11',
      lesson_stage: 'example-round',
      title: 'Example Turn',
      narration_text: 'Priya holds a 9 of Spades. There are two 9♠ spaces on the board. One extends her team\'s diagonal toward a corner — she places her chip there. She discards the card and draws a new one. Four in a row now.',
      board_focus: 'full-board',
      image: '/assets/seq-card-play.png',
      components_involved: ['card', 'chip', 'board'],
      highlight_targets: ['chip'],
      motion_primitive: 'move_token',
      user_takeaway: 'Always pick the board space that advances your best line, not just any space.',
      optional_quick_check: false,
    },
    {
      scene_id: 'seq_s12',
      lesson_stage: 'example-round',
      title: 'When to Block vs. Build',
      narration_text: 'Opponent Dev has four chips in a row — one more and they win. Priya holds a one-eyed Jack. She removes Dev\'s most central chip, breaking the line. If she\'d ignored it to extend her own row, Dev would have won next turn.',
      board_focus: 'full-board',
      image: '/assets/seq-blocking.png',
      components_involved: ['one_eyed_jack', 'chip'],
      highlight_targets: ['chip'],
      motion_primitive: 'compare_correct_wrong',
      user_takeaway: 'Block an opponent at four-in-a-row. Never let them reach five.',
      optional_quick_check: false,
    },

    // ── Stage 7: Endgame ──────────────────────────────────────────
    {
      scene_id: 'seq_s13',
      lesson_stage: 'endgame',
      title: 'Completing a Sequence',
      narration_text: 'The moment you place the fifth chip to complete a row of five, call "Sequence!" Place a sequence marker across those five chips. In a 2-team game, the first team to complete 2 Sequences wins. The game ends immediately.',
      board_focus: 'full-board',
      image: '/assets/seq-completed-sequence.png',
      components_involved: ['chip'],
      highlight_targets: ['chip'],
      motion_primitive: 'count_up',
      user_takeaway: 'Call "Sequence" the moment five chips align. First to 2 Sequences wins.',
      optional_quick_check: false,
    },

    // ── Stage 8: Quick Reference ──────────────────────────────────
    {
      scene_id: 'seq_qr1',
      lesson_stage: 'quick-reference',
      title: 'Jack Types at a Glance',
      narration_text: 'Two-eyed Jack (♣♠): place your chip anywhere open. One-eyed Jack (♥♦): remove any opponent chip not in a completed Sequence. Dead card: both spots occupied — show, discard, draw replacement. Corners: free for everyone.',
      board_focus: 'full-board',
      image: '/assets/seq-jacks-wild.png',
      components_involved: ['two_eyed_jack', 'one_eyed_jack', 'corner_space'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'Jacks and corners are the game-changers — use them at the right moment.',
      optional_quick_check: false,
    },
  ],

  quick_reference: [
    { id: 'qr1', question: 'What does a two-eyed Jack do?', answer: 'Place your chip on any open space on the board — no card match required.' },
    { id: 'qr2', question: 'What does a one-eyed Jack do?', answer: 'Remove any one opponent chip from the board. Cannot remove chips that are part of a completed Sequence.' },
    { id: 'qr3', question: 'What is a dead card?', answer: 'A card in your hand whose two matching spaces are both occupied. Show it to all players, discard it, and immediately draw a replacement.' },
    { id: 'qr4', question: 'Do corner spaces count for my Sequence?', answer: 'Yes — the four corners are free spaces for everyone and count as any colour toward any Sequence.' },
    { id: 'qr5', question: 'Can a chip be in two Sequences?', answer: 'Yes — one chip can be shared between two Sequences. Plan overlapping rows to win efficiently.' },
  ],
}

export default sequence
