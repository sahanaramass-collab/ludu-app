import { Story } from '../types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-missing-notebook',
    title: 'The Missing Notebook',
    tagline: 'Oakridge High Mystery',
    genre: 'Mystery',
    difficulty: 'Easy',
    totalChapters: 3,
    coverGradient: 'from-amber-600 via-orange-600 to-indigo-900',
    coverIcon: 'BookOpen',
    illustrationType: 'library',
    featured: true,
    description: 'One ordinary afternoon turns into a mystery when the science team\'s master blueprint notebook disappears right before the district showcase.',
    initialSceneId: 'mn-1',
    scenes: {
      'mn-1': {
        id: 'mn-1',
        chapterNumber: 1,
        title: 'The Empty Workbench',
        speaker: 'Maya',
        speakerRole: 'Team Captain',
        illustrationType: 'library',
        narrative: 'The Oakridge High Science Lab is unusually quiet. You and Maya walk toward table four, but the leather-bound blueprint notebook is gone! Only a blue bookmark and a faint chalk arrow remain on the oak desk.',
        choices: [
          {
            id: 'c1',
            text: 'Examine the chalk arrow on the desk',
            tag: 'Investigation',
            nextSceneId: 'mn-2a',
            rewardCoins: 10,
            clueGained: 'Chalk marks pointing to Library Basement',
            friendshipPoints: 2
          },
          {
            id: 'c2',
            text: 'Ask Leo in the Robotics corner',
            tag: 'Teamwork',
            nextSceneId: 'mn-2b',
            rewardCoins: 10,
            clueGained: 'Leo saw someone with a yellow raincoat',
            friendshipPoints: 3
          },
          {
            id: 'c3',
            text: 'Check the hallway security locker roster',
            tag: 'Logic',
            nextSceneId: 'mn-2c',
            rewardCoins: 10,
            clueGained: 'Locker #42 was opened at lunch',
            friendshipPoints: 1
          }
        ]
      },
      'mn-2a': {
        id: 'mn-2a',
        chapterNumber: 2,
        title: 'The Whispering Archives',
        speaker: 'Library Assistant',
        speakerRole: 'Staff',
        illustrationType: 'library',
        narrative: 'Following the dusty chalk trace leads down into the periodicals archive. Beneath the microfiche reader, you spot a pair of yellow rain boots and a stack of freshly cataloged blueprints.',
        choices: [
          {
            id: 'c2a-1',
            text: 'Call out Maya and search section 3B together',
            tag: 'Friendship',
            nextSceneId: 'mn-3-ending-team',
            rewardCoins: 25,
            clueGained: 'Preserved Blueprints',
            friendshipPoints: 5
          },
          {
            id: 'c2a-2',
            text: 'Inspect the return cart quietly for fingerprints',
            tag: 'Detective',
            nextSceneId: 'mn-3-ending-solo',
            rewardCoins: 25,
            clueGained: 'Librarian Stamp',
            friendshipPoints: 2
          }
        ]
      },
      'mn-2b': {
        id: 'mn-2b',
        chapterNumber: 2,
        title: 'Leo\'s Wire Clues',
        speaker: 'Leo',
        speakerRole: 'Engineer',
        illustrationType: 'robotics',
        narrative: 'Leo pushes his goggles onto his forehead. "I was soldering resistors when someone hurried past wearing a yellow raincoat! They dropped this rain-resistant binder sleeve near the trophy hall."',
        choices: [
          {
            id: 'c2b-1',
            text: 'Hurry with Leo to the trophy exhibition hall',
            tag: 'Quick Action',
            nextSceneId: 'mn-3-ending-team',
            rewardCoins: 25,
            clueGained: 'Showcase Setup Slip',
            friendshipPoints: 4
          },
          {
            id: 'c2b-2',
            text: 'Analyze the binder sticker under the lab lamp',
            tag: 'Analysis',
            nextSceneId: 'mn-3-ending-solo',
            rewardCoins: 25,
            clueGained: 'District Fair Sticker',
            friendshipPoints: 3
          }
        ]
      },
      'mn-2c': {
        id: 'mn-2c',
        chapterNumber: 2,
        title: 'The Locker Note',
        speaker: 'Sam',
        speakerRole: 'Student Council',
        illustrationType: 'detective',
        narrative: 'Locker #42 belongs to the Showcase Committee! Tucked inside the louvers is a neatly folded sticky note: "Notebook relocated for rainproofing prior to presentation board setup."',
        choices: [
          {
            id: 'c2c-1',
            text: 'Head straight to the Auditorium setup stage',
            tag: 'Direct Approach',
            nextSceneId: 'mn-3-ending-team',
            rewardCoins: 25,
            clueGained: 'Auditorium Pass',
            friendshipPoints: 4
          }
        ]
      },
      'mn-3-ending-team': {
        id: 'mn-3-ending-team',
        chapterNumber: 3,
        title: 'Showcase Triumph!',
        speaker: 'Maya & Leo',
        speakerRole: 'Teammates',
        illustrationType: 'robotics',
        narrative: 'You burst into the auditorium with Maya and Leo! Principal Evans and the showcase committee are smiling. "We laminated your team\'s master notes so the morning storm wouldn\'t harm them!" Your team\'s collaboration won the Best Innovation Award!',
        choices: [],
        isEnding: true,
        endingType: 'victory'
      },
      'mn-3-ending-solo': {
        id: 'mn-3-ending-solo',
        chapterNumber: 3,
        title: 'Mystery Solved with Care',
        speaker: 'Principal Evans',
        speakerRole: 'School Head',
        illustrationType: 'library',
        narrative: 'With your methodical detective notes, you present the evidence to the showcase committee. The notebook is retrieved in pristine condition, neatly wrapped in velvet for the opening ceremony. The whole team applauds your sharp observation!',
        choices: [],
        isEnding: true,
        endingType: 'discovery'
      }
    }
  },
  {
    id: 'story-midnight-mystery',
    title: 'Midnight Mystery',
    tagline: 'The Greystone Clock Tower',
    genre: 'Detective',
    difficulty: 'Medium',
    totalChapters: 3,
    coverGradient: 'from-violet-800 via-purple-900 to-slate-950',
    coverIcon: 'Compass',
    illustrationType: 'clocktower',
    description: 'When the academy’s 100-year-old brass clock rings twelve chimes backwards, your puzzle-solving club embarks on a midnight journey.',
    initialSceneId: 'mm-1',
    scenes: {
      'mm-1': {
        id: 'mm-1',
        chapterNumber: 1,
        title: 'Twelve Chimes in Reverse',
        speaker: 'Oliver',
        speakerRole: 'Clock Tower Enthusiast',
        illustrationType: 'clocktower',
        narrative: 'DONG... DONG... The bell tolls in descending pitch. Oliver shines his pocket flashlight up the spiral granite steps of the academy tower. "The escapement gear should not reverse unless someone solved the founder’s cipher!"',
        choices: [
          {
            id: 'mm-c1',
            text: 'Decipher the Latin inscription carved into the door',
            tag: 'Knowledge',
            nextSceneId: 'mm-2a',
            rewardCoins: 15,
            clueGained: 'Translation: Time yields to the curious',
            friendshipPoints: 2
          },
          {
            id: 'mm-c2',
            text: 'Check the mechanical counterweights in the lower shaft',
            tag: 'Mechanical',
            nextSceneId: 'mm-2b',
            rewardCoins: 15,
            clueGained: 'Bronze counterweight displaced by 3 inches',
            friendshipPoints: 3
          }
        ]
      },
      'mm-2a': {
        id: 'mm-2a',
        chapterNumber: 2,
        title: 'The Starlit Dial Room',
        speaker: 'Kiran',
        speakerRole: 'Astronomy Club',
        illustrationType: 'clocktower',
        narrative: 'Behind the frosted glass dial face, moonbeams illuminate three bronze tumblers. Kiran points his telescope toward the North Star. "Aligning the hour hand with Polaris unlocks the archives!"',
        choices: [
          {
            id: 'mm-c2a-1',
            text: 'Work together to turn the heavy brass wheel to 12',
            tag: 'Teamwork',
            nextSceneId: 'mm-3-team',
            rewardCoins: 30,
            clueGained: 'Founder\'s Starlit Key',
            friendshipPoints: 5
          }
        ]
      },
      'mm-2b': {
        id: 'mm-2b',
        chapterNumber: 2,
        title: 'The Counterweight Chamber',
        speaker: 'Oliver',
        speakerRole: 'Puzzle Solver',
        illustrationType: 'clocktower',
        narrative: 'In the stone counterweight shaft, you discover a hidden compartment lined with old parchment. A grandfather clock repairman left a 1924 cipher note!',
        choices: [
          {
            id: 'mm-c2b-1',
            text: 'Solve the cipher code using reverse arithmetic',
            tag: 'Math',
            nextSceneId: 'mm-3-team',
            rewardCoins: 30,
            clueGained: 'Decoded Time Code',
            friendshipPoints: 4
          }
        ]
      },
      'mm-3-team': {
        id: 'mm-3-team',
        chapterNumber: 3,
        title: 'The Century Time Capsule',
        speaker: 'Detective Club',
        speakerRole: 'Friends',
        illustrationType: 'clocktower',
        narrative: 'With a satisfying mechanical click, a concealed mahogany drawer slides open! Inside rests Greystone Academy’s century-old time capsule, filled with vintage blueprints, compasses, and a letter commending future curious students for their teamwork.',
        choices: [],
        isEnding: true,
        endingType: 'discovery'
      }
    }
  },
  {
    id: 'story-last-train',
    title: 'The Last Train',
    tagline: 'Platform after Midnight',
    genre: 'Fantasy',
    difficulty: 'Medium',
    totalChapters: 2,
    coverGradient: 'from-emerald-700 via-teal-800 to-indigo-950',
    coverIcon: 'Sparkles',
    illustrationType: 'train',
    description: 'A whimsical nocturnal express train arrives at Platform 7 with eccentric friendly passengers needing help solving destination riddles.',
    initialSceneId: 'lt-1',
    scenes: {
      'lt-1': {
        id: 'lt-1',
        chapterNumber: 1,
        title: 'The Emerald Carriage',
        speaker: 'Conductor Sterling',
        speakerRole: 'Friendly Rail Master',
        illustrationType: 'train',
        narrative: 'The vintage steam locomotive pulls in with glowing lanterns. Conductor Sterling tips his brass-trimmed hat. "Welcome aboard the Starline Express! Next stop: Orion Observatory, but our steam compass needs four matching constellation cards."',
        choices: [
          {
            id: 'lt-c1',
            text: 'Offer to arrange the star maps on the parlor table',
            tag: 'Puzzle',
            nextSceneId: 'lt-2-victory',
            rewardCoins: 20,
            clueGained: 'Pegasus Constellation Map',
            friendshipPoints: 4
          },
          {
            id: 'lt-c2',
            text: 'Team up with the young apprentice botanist in car 2',
            tag: 'Friendship',
            nextSceneId: 'lt-2-victory',
            rewardCoins: 20,
            clueGained: 'Luminescent Orchid Compass',
            friendshipPoints: 5
          }
        ]
      },
      'lt-2-victory': {
        id: 'lt-2-victory',
        chapterNumber: 2,
        title: 'Arrival at Starlight Valley',
        speaker: 'Conductor Sterling',
        speakerRole: 'Rail Master',
        illustrationType: 'train',
        narrative: 'The engine hums with warm emerald light as the train glides safely across the starry mountain viaduct. The passengers toast hot cocoa in celebration of your quick thinking and friendly spirit!',
        choices: [],
        isEnding: true,
        endingType: 'victory'
      }
    }
  },
  {
    id: 'story-campus-detective',
    title: 'Campus Detective',
    tagline: 'Robotics Mascot Rescue',
    genre: 'Comedy',
    difficulty: 'Easy',
    totalChapters: 2,
    coverGradient: 'from-blue-600 via-indigo-700 to-slate-900',
    coverIcon: 'Shield',
    illustrationType: 'robotics',
    description: 'The beloved university robot mascot "Bolt" has rolled away right before the State Science Fair! Follow the gear oil trail.',
    initialSceneId: 'cd-1',
    scenes: {
      'cd-1': {
        id: 'cd-1',
        chapterNumber: 1,
        title: 'The Missing Mascot',
        speaker: 'Samira',
        speakerRole: 'Robotics Lead',
        illustrationType: 'robotics',
        narrative: 'Samira holds up a remote controller. "Bolt was set to autonomous charging mode, but the dock is empty! The only clue is a tiny silicone wheel track heading toward the campus cafe."',
        choices: [
          {
            id: 'cd-c1',
            text: 'Follow the wheel marks toward the pastry counter',
            tag: 'Intuition',
            nextSceneId: 'cd-2-found',
            rewardCoins: 15,
            clueGained: 'Croissant Crumb Sensor Reading',
            friendshipPoints: 3
          },
          {
            id: 'cd-c2',
            text: 'Scan for Bolt\'s Wi-Fi beacon with your tablet',
            tag: 'Tech',
            nextSceneId: 'cd-2-found',
            rewardCoins: 15,
            clueGained: 'MAC Address Ping: 98% signal',
            friendshipPoints: 3
          }
        ]
      },
      'cd-2-found': {
        id: 'cd-2-found',
        chapterNumber: 2,
        title: 'Bolt\'s Breakfast Adventure',
        speaker: 'Bolt the Robot',
        speakerRole: 'Mascot',
        illustrationType: 'robotics',
        narrative: 'Beep boop! You find Bolt happily helping the cafe staff deliver warm muffins to studying engineering students! Samira laughs and clips on the victory ribbon. The showcase is saved!',
        choices: [],
        isEnding: true,
        endingType: 'teamwork'
      }
    }
  },
  {
    id: 'story-island-adventure',
    title: 'Island Adventure',
    tagline: 'The Lost Expedition',
    genre: 'Adventure',
    difficulty: 'Challenging',
    totalChapters: 2,
    coverGradient: 'from-cyan-700 via-blue-800 to-teal-950',
    coverIcon: 'Map',
    illustrationType: 'island',
    description: 'Join an ecology youth team exploring ancient coastal ruins and deciphering tidal maps to locate a legendary fresh-water spring.',
    initialSceneId: 'ia-1',
    scenes: {
      'ia-1': {
        id: 'ia-1',
        chapterNumber: 1,
        title: 'The Coral Archway',
        speaker: 'Captain Alex',
        speakerRole: 'Marine Scout',
        illustrationType: 'island',
        narrative: 'Low tide reveals a hidden pathway through the turquoise sea cliffs. Alex checks the tide table. "We have forty-five minutes before high tide sweeps over the stepping stones."',
        choices: [
          {
            id: 'ia-c1',
            text: 'Deploy the mini survey drone to map the stone route',
            tag: 'Safety First',
            nextSceneId: 'ia-2-spring',
            rewardCoins: 20,
            clueGained: 'Safe Ridge Elevation Map',
            friendshipPoints: 4
          },
          {
            id: 'ia-c2',
            text: 'Mark the dry rock ledges with biodegradable chalk',
            tag: 'Trailblazing',
            nextSceneId: 'ia-2-spring',
            rewardCoins: 20,
            clueGained: 'Visible Return Markers',
            friendshipPoints: 4
          }
        ]
      },
      'ia-2-spring': {
        id: 'ia-2-spring',
        chapterNumber: 2,
        title: 'The Hidden Grotto',
        speaker: 'Alex & Team',
        speakerRole: 'Explorers',
        illustrationType: 'island',
        narrative: 'Following the mapped trail, the team enters an awe-inspiring cavern with crystal-clear fresh spring water surrounded by rare bioluminescent moss! Your ecological report will safeguard this sanctuary forever.',
        choices: [],
        isEnding: true,
        endingType: 'victory'
      }
    }
  }
];
