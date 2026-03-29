/**
 * UNO — hand-management card game
 */
const uno = {
  game_id: 'uno',
  title: 'UNO',
  family: 'hand-management',
  complexity: 'light',
  theme: 'Match colours and numbers to empty your hand — but shout "UNO" when you\'re down to one card or face a penalty.',
  player_count: '2–10',
  time_estimate: '30–60 min',

  player_goal: 'Be the first player to empty your hand by playing all your cards. In multi-round play, score the fewest points across rounds.',

  setup_steps: [
    'Shuffle the 108-card deck.',
    'Deal 7 cards to each player.',
    'Place remaining cards face-down as the draw pile.',
    'Flip the top card face-up to start the discard pile.',
    'If the first flip is a Wild or Wild Draw 4, bury it and flip again.',
    'The player to the left of the dealer goes first.',
  ],

  turn_loop: 'Match the top card of the discard pile by colour OR number/symbol, then play one card. If you can\'t play, draw one card — if it matches, you may play it immediately; otherwise your turn ends.',

  player_actions: [
    'Play a matching number or colour card',
    'Play a Skip — next player loses their turn',
    'Play a Reverse — direction of play flips',
    'Play a Draw 2 — next player draws 2 and loses their turn',
    'Play a Wild — choose the new active colour',
    'Play a Wild Draw 4 — choose colour, next player draws 4 and loses turn (only legal if you have no matching colour)',
    'Draw 1 card if you can\'t play — play it immediately if it matches',
    'Call "UNO" when you play your second-to-last card',
  ],

  end_trigger: 'The round ends the moment any player plays their last card. In multi-round play, tally points and deal again. First to 500 points loses (or first to 0 wins, depending on variant).',

  scoring: 'The player who goes out scores points equal to all cards left in opponents\' hands: number cards = face value, Draw 2 / Skip / Reverse = 20 pts each, Wild / Wild Draw 4 = 50 pts each. First to 500 points (cumulative) loses.',

  beginner_mistakes: [
    'Forgetting to call "UNO" before playing your second-to-last card — if caught, draw 2 as penalty.',
    'Playing Wild Draw 4 when you have a matching colour card — it\'s only legal when you have no matching colour.',
    'Thinking Draw 2 and Wild Draw 4 stack — in standard rules they do not.',
    'Forgetting that Reverse with 2 players acts like a Skip.',
    'Not drawing when you have no playable card — you must draw.',
  ],

  edge_cases_to_defer: [
    'Stacking Draw 2 cards (house rule — not in official rules).',
    'Seven-0 variant: playing a 7 swaps hands with any player; 0 rotates all hands.',
    'Jump-in rule: play out of turn if you hold the exact same card.',
  ],

  example_first_turn: 'Top card is Red 6. Player holds Blue 6, Green Skip, Wild, Red 9, Yellow 4, Blue 3, Red 2. They play Red 9 (matches colour). Next player must match red or 9.',

  components: [
    { id: 'number_card', label: 'Number Card', description: '0–9 in four colours (Red, Blue, Green, Yellow). Match by colour or number to play.' },
    { id: 'skip_card', label: 'Skip Card', description: 'The next player in turn order loses their turn. Worth 20 points.' },
    { id: 'reverse_card', label: 'Reverse Card', description: 'Flips the direction of play. With 2 players, acts like a Skip. Worth 20 points.' },
    { id: 'draw_two', label: 'Draw 2 Card', description: 'Next player draws 2 cards and loses their turn. Must match colour to play. Worth 20 points.' },
    { id: 'wild_card', label: 'Wild Card', description: 'Can be played on any card. Declare the new active colour. Worth 50 points.' },
    { id: 'wild_draw_four', label: 'Wild Draw 4', description: 'Declare new colour; next player draws 4 and loses turn. Only legal when you have no matching colour. Worth 50 points.' },
  ],

  scenes: [
    // ── Stage 1: Intro ────────────────────────────────────────────
    {
      scene_id: 'uno_s01',
      lesson_stage: 'intro',
      title: 'Welcome to UNO',
      narration_text: 'UNO is the classic hand-shedding card game played around the world. Match the colour or number of the top card, play your cards one by one, and race to empty your hand. The twist: shout "UNO" when you\'re down to one — or face a penalty.',
      board_focus: 'full-hand',
      components_involved: ['number_card', 'wild_card', 'skip_card'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'UNO is a colour-and-number matching race. Empty your hand first to win.',
      optional_quick_check: false,
    },

    // ── Stage 2: Objective ────────────────────────────────────────
    {
      scene_id: 'uno_s02',
      lesson_stage: 'objective',
      title: 'How Do You Win?',
      narration_text: 'Play all the cards in your hand. When you play your last card, call "UNO out!" and the round ends. In single-round play, the first person out wins. In multi-round play, opponents count up the points remaining in their hands — those points go to your score. Reach 500 and you lose.',
      board_focus: 'discard-pile',
      components_involved: ['number_card', 'wild_draw_four'],
      highlight_targets: ['number_card'],
      motion_primitive: 'count_up',
      user_takeaway: 'Play your last card to end the round. High-value cards in opponents\' hands = your points.',
      optional_quick_check: false,
    },
    {
      scene_id: 'uno_s03',
      lesson_stage: 'objective',
      title: 'Matching Rules',
      narration_text: 'You can play a card if it matches the top of the discard pile by colour OR by number/symbol. Example: on a Red 7, you can play any Red card OR any 7. Wilds can be played on anything.',
      board_focus: 'discard-pile',
      components_involved: ['number_card', 'wild_card'],
      highlight_targets: ['number_card'],
      motion_primitive: 'pulse_legal',
      user_takeaway: 'Match colour OR match number/symbol. Wilds play on anything.',
      optional_quick_check: true,
    },

    // ── Stage 3: Setup ────────────────────────────────────────────
    {
      scene_id: 'uno_s04',
      lesson_stage: 'setup',
      title: 'The Deck & Your Starting Hand',
      narration_text: '108 cards total: four colours (Red, Blue, Green, Yellow), each with 0–9 twice (except one 0 per colour), plus two each of Skip, Reverse, and Draw 2, plus four Wild and four Wild Draw 4 cards. Each player starts with 7 cards.',
      board_focus: 'draw-pile',
      components_involved: ['number_card', 'skip_card', 'wild_card', 'wild_draw_four'],
      highlight_targets: [],
      motion_primitive: 'flip_reveal',
      user_takeaway: '108 cards, 4 colours, 7 cards each. Wilds and action cards are rare and powerful.',
      optional_quick_check: false,
    },

    // ── Stage 4: Turn Loop ────────────────────────────────────────
    {
      scene_id: 'uno_s05',
      lesson_stage: 'turn-loop',
      title: 'Play or Draw',
      narration_text: 'On your turn: play one matching card onto the discard pile. If you have no matching card, draw one from the draw pile. If that drawn card is playable, you may play it immediately. If not, your turn ends. You cannot pass without drawing.',
      board_focus: 'discard-pile',
      components_involved: ['number_card', 'wild_card'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'Play one card, or draw one. Always one of those two options.',
      optional_quick_check: true,
    },
    {
      scene_id: 'uno_s06',
      lesson_stage: 'turn-loop',
      title: 'Calling UNO',
      narration_text: 'When you play your second-to-last card, you MUST call "UNO" out loud before the next player takes their turn. If another player catches you with one card and you haven\'t called it, you draw 2 cards as a penalty. Calling it after being caught doesn\'t help.',
      board_focus: 'hand',
      components_involved: ['number_card'],
      highlight_targets: [],
      motion_primitive: 'compare_correct_wrong',
      user_takeaway: 'Call "UNO" before playing your second-to-last card — or draw 2 as penalty.',
      optional_quick_check: false,
    },

    // ── Stage 5: Core Actions ─────────────────────────────────────
    {
      scene_id: 'uno_s07',
      lesson_stage: 'core-actions',
      title: 'Skip & Reverse',
      narration_text: 'Skip (⊘): the next player in turn order misses their entire turn — no draw, no play. Reverse (⟲): the direction of play flips from clockwise to counter-clockwise (or vice versa). With just 2 players, Reverse acts exactly like Skip — the same player goes again.',
      board_focus: 'discard-pile',
      components_involved: ['skip_card', 'reverse_card'],
      highlight_targets: ['skip_card', 'reverse_card'],
      motion_primitive: 'highlight',
      user_takeaway: 'Skip cuts a player out. Reverse flips order. With 2 players, both act as Skip.',
      optional_quick_check: false,
    },
    {
      scene_id: 'uno_s08',
      lesson_stage: 'core-actions',
      title: 'Draw 2',
      narration_text: 'When you play a Draw 2 card, the next player must draw 2 cards from the pile and immediately lose their turn — they cannot play. Draw 2 must be played on a matching colour or on another Draw 2. In standard rules, Draw 2 cards do NOT stack.',
      board_focus: 'discard-pile',
      components_involved: ['draw_two'],
      highlight_targets: ['draw_two'],
      motion_primitive: 'count_up',
      user_takeaway: 'Draw 2: next player draws 2 and skips. Does not stack in standard rules.',
      optional_quick_check: false,
    },
    {
      scene_id: 'uno_s09',
      lesson_stage: 'core-actions',
      title: 'Wild Card',
      narration_text: 'A Wild card can be played on any card at any time on your turn — regardless of the current colour. After playing it, you declare the new colour that must be matched. Choose a colour you have more of, or a colour that hurts opponents most.',
      board_focus: 'discard-pile',
      components_involved: ['wild_card'],
      highlight_targets: ['wild_card'],
      motion_primitive: 'pulse_legal',
      user_takeaway: 'Wild plays on anything. Choose the new colour strategically — pick what you have most of.',
      optional_quick_check: false,
    },
    {
      scene_id: 'uno_s10',
      lesson_stage: 'core-actions',
      title: 'Wild Draw 4',
      narration_text: 'Wild Draw 4 lets you declare any colour AND forces the next player to draw 4 cards and lose their turn. Catch: you may only play it when you have NO card matching the current colour. If you bluff and get challenged — you draw 4 instead.',
      board_focus: 'discard-pile',
      components_involved: ['wild_draw_four'],
      highlight_targets: ['wild_draw_four'],
      motion_primitive: 'compare_correct_wrong',
      user_takeaway: 'Wild Draw 4 is legal ONLY when you have no matching colour. Save it for emergencies.',
      optional_quick_check: true,
    },

    // ── Stage 6: Example Round ────────────────────────────────────
    {
      scene_id: 'uno_s11',
      lesson_stage: 'example-round',
      title: 'Example Turn',
      narration_text: 'Top card: Green 5. Priya holds: Yellow 5, Red Skip, Blue 2, Wild, Green 8. She can play Yellow 5 (matches 5), Green 8 (matches green), or Wild (plays on anything). She plays Green 8 (keeps Wild for emergencies). Next player must match green or 8.',
      board_focus: 'discard-pile',
      components_involved: ['number_card', 'wild_card'],
      highlight_targets: ['number_card'],
      motion_primitive: 'pulse_legal',
      user_takeaway: 'Always save Wilds and Wild Draw 4s for when you\'re stuck or about to win.',
      optional_quick_check: false,
    },
    {
      scene_id: 'uno_s12',
      lesson_stage: 'example-round',
      title: 'The UNO Moment',
      narration_text: 'Priya is down to 2 cards: Red 7 and Wild. She plays Red 7. She must call "UNO" before her next opponent speaks or draws. Dev hears it and plays Blue 7 to change colour to Blue — blocking her Wild. Priya draws 1 and the moment slips away.',
      board_focus: 'hand',
      components_involved: ['number_card', 'wild_card'],
      highlight_targets: [],
      motion_primitive: 'compare_correct_wrong',
      user_takeaway: 'Call UNO loudly and immediately. Opponents will try to block you.',
      optional_quick_check: false,
    },

    // ── Stage 7: Endgame ──────────────────────────────────────────
    {
      scene_id: 'uno_s13',
      lesson_stage: 'endgame',
      title: 'Going Out & Scoring',
      narration_text: 'Play your last card and call "UNO out!" The round ends. Count the points in every other player\'s hand: number cards = face value, Skip/Reverse/Draw 2 = 20 pts, Wild/Wild Draw 4 = 50 pts. Those points go to your running score. In multi-round play, deal again and keep going until someone hits 500.',
      board_focus: 'hand',
      components_involved: ['number_card', 'wild_draw_four', 'skip_card'],
      highlight_targets: [],
      motion_primitive: 'count_up',
      user_takeaway: 'High-value cards in opponents\' hands are worth the most. Wilds cost 50 pts to hold.',
      optional_quick_check: false,
    },

    // ── Stage 8: Quick Reference ──────────────────────────────────
    {
      scene_id: 'uno_qr1',
      lesson_stage: 'quick-reference',
      title: 'Card Effects at a Glance',
      narration_text: 'Skip (20 pts): next player loses turn. Reverse (20 pts): flip direction; 2-player = Skip. Draw 2 (20 pts): next player draws 2 and skips. Wild (50 pts): play anytime, declare colour. Wild Draw 4 (50 pts): draw 4 + skip next player; only legal with no matching colour.',
      board_focus: 'full-hand',
      components_involved: ['skip_card', 'reverse_card', 'draw_two', 'wild_card', 'wild_draw_four'],
      highlight_targets: [],
      motion_primitive: 'fade_in_text',
      user_takeaway: 'Action cards score 20 pts against you. Wilds score 50. Don\'t hoard them.',
      optional_quick_check: false,
    },
  ],

  quick_reference: [
    { id: 'qr1', question: 'What can I match on?', answer: 'Match the top card by colour OR by number/symbol. Wilds and Wild Draw 4 can be played on any card.' },
    { id: 'qr2', question: 'What if I have no playable card?', answer: 'Draw one card from the pile. If it\'s playable, you may play it immediately. If not, your turn ends.' },
    { id: 'qr3', question: 'When must I call UNO?', answer: 'When you play your second-to-last card. Call it before the next player takes their turn or you draw 2 as penalty.' },
    { id: 'qr4', question: 'Can I play Wild Draw 4 whenever I want?', answer: 'No — only when you have no card matching the current colour. Playing it illegally means you draw 4 if challenged.' },
    { id: 'qr5', question: 'How does Reverse work with 2 players?', answer: 'With exactly 2 players, Reverse acts like a Skip — the same player takes another turn immediately.' },
  ],
}

export default uno
