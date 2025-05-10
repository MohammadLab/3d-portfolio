export const unrealProjects = [
  {
    id: 'unreal1',
    name: 'Advanced Movement System',
    description: 'A comprehensive character movement pack leveraging Unreal Engine\'s Blueprint system and animation morphing technology for seamless character movement.',
    image: '/images/unreal/tps.jpg',
    technologies: ['Unreal Engine 5', 'Blueprint', 'Animation Blueprint', 'IK System', 'Physics System'],
    features: [
      'Dynamic Running Mechanics: Speed adjustments based on terrain and player input',
      'Smooth Jumping System: Air control allowing players to adjust trajectory mid-air',
      'Fluid Sliding Mechanics: Triggered by user input with friction and momentum physics',
      'Advanced Mantling System: Enables smooth obstacle traversal by dynamically detecting ledges',
      'Realistic Climbing Mechanics: Uses IK (Inverse Kinematics) for precise character placement on surfaces'
    ],
    learnings: 'Mastered Blueprint scripting for complex movement systems, implemented seamless animation morphing using Animation Blueprints, integrated physics-based movement mechanics, and developed debugging tools for movement system fine-tuning. Technical implementation includes full Blueprint scripting for rapid iteration, animation state machine development, physics integration for realistic momentum, and extensive use of Unreal Engine\'s debug tools.'
  },
  {
    id: 'unreal2',
    name: 'Horror Map',
    description: 'Step into a chilling world where tension and terror await at every corner. This map combines environmental storytelling with trigger-based events for a suspenseful horror experience.',
    image: '/images/unreal/rpg.jpg',
    technologies: ['UEFN', 'Verse', 'Blueprint', 'Niagara VFX', 'Audio System'],
    features: [
      'Dynamic Lighting System: Created with Unreal Engine\'s Niagara particle system and Blueprint scripting for real-time lighting changes triggered by player actions',
      'Trigger-Based Events: Scripting via UEFN Verse to activate key gameplay sequences based on player movement and decisions',
      'Atmospheric Audio Integration: Leveraged Unreal\'s audio system for directional sound cues and dynamic ambient effects, enhancing immersion'
    ],
    learnings: 'Mastered environmental storytelling through advanced lighting and audio systems, developed complex trigger-based event systems using UEFN Verse, and created immersive horror experiences through careful pacing and atmosphere control.'
  },
  {
    id: 'unreal3',
    name: 'Speed Bridges (1V1)',
    description: 'A competitive one-on-one battle across dynamically shifting bridges. Players must outwit their opponent through mastery of combat and navigation.',
    image: '/images/unreal/vr.jpg',
    technologies: ['UEFN', 'Verse', 'Blueprint', 'Physics System'],
    features: [
      'Custom Scoring System: Built with UEFN Verse, tracks kills and objectives for balanced competition',
      'Dynamic Bridge Mechanics: Utilized physics-based animations and timed triggers to create bridges that shift and challenge players',
      'Optimized for Competitive Play: Extensive playtesting to ensure balanced gameplay and minimal lag'
    ],
    learnings: 'Developed expertise in competitive gameplay design, implemented complex scoring systems using UEFN Verse, and mastered physics-based level mechanics for dynamic player experiences.'
  },
  {
    id: 'unreal4',
    name: 'The Bridges (4v4v4v4)',
    description: 'A multi-team map designed for strategic coordination and intense gameplay.',
    image: '/images/unreal/arena.jpg',
    technologies: ['UEFN', 'Verse', 'Blueprint', 'Team Management System'],
    features: [
      'Multi-Team Management System: Implemented via UEFN Verse, supports four distinct teams with synchronized objectives',
      'Advanced Spawn Logic: Optimized spawn locations using custom Blueprint logic to reduce spawn camping',
      'Team-Based Scoring Mechanics: Dynamic scoring system rewarding teamwork and strategy'
    ],
    learnings: 'Mastered multi-team game design principles, implemented complex team management systems using UEFN Verse, and developed advanced spawn logic for balanced gameplay experiences.'
  }
];
