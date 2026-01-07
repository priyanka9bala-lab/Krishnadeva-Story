# Design Guidelines: The King of Vijayanagar Interactive Story

## Design Approach

**Reference-Based Approach** drawing from:
- **Duolingo**: Gamified learning with instant feedback and progress
- **Medium**: Narrative-focused reading experience with excellent typography
- **Interactive documentaries** (NY Times, The Boat): Immersive scrolling storytelling
- **Cultural authenticity**: Traditional Indian art motifs integrated with modern UI

**Key Principles**: 
- Immersive narrative flow with cinematic scene transitions
- Mobile-first vertical progression with generous breathing room
- Cultural authenticity through thoughtful illustration selection and ornamental details
- Clear interaction affordances at every decision point

## Typography System

**Font Stack**:
- Primary: "Playfair Display" (Google Fonts) - serif for narrative text and character dialogue, conveying historical gravitas
- Secondary: "Inter" (Google Fonts) - sans-serif for UI elements, buttons, quiz questions
- Accent: "Cinzel" (Google Fonts) - decorative serif for titles and scene headers

**Hierarchy**:
- Scene Headers: text-4xl to text-6xl, font-bold (Cinzel)
- Narrative Text: text-lg to text-xl, leading-relaxed (Playfair Display)
- Character Dialogue: text-xl, italic (Playfair Display)
- Button Labels: text-base to text-lg, font-semibold (Inter)
- Quiz Questions: text-xl, font-medium (Inter)

## Layout System

**Spacing Primitives**: Consistent use of Tailwind units: 4, 6, 8, 12, 16, 20, 24

**Container Strategy**:
- Story sections: max-w-4xl mx-auto for optimal reading width
- Scene images: Full-width on mobile, max-w-5xl on desktop
- Decision buttons: max-w-2xl centered
- Quiz interface: max-w-3xl centered

**Vertical Rhythm**:
- Scene spacing: py-16 md:py-24 between major story beats
- Content spacing: mb-8 between narrative paragraphs
- Button spacing: mt-12 mb-8 for decision points
- Quiz question spacing: py-12 between questions

## Component Library

### Scene Container
- Full-width section with generous vertical padding
- Background treatment options: subtle patterns, gradient overlays (no color specified)
- Image-first layout: large illustration (16:9 or 3:2 aspect ratio) followed by narrative text
- Ornamental borders: thin decorative lines using traditional Indian geometric patterns (implemented via border utilities or SVG)

### Audio Player Controls
- Compact inline player below each narrative segment
- Icons from **Heroicons**: play, pause, volume, replay
- Controls: text-sm with icon size 5
- Position: sticky to bottom of viewport on mobile for easy access

### Decision Point Buttons
- Large, prominent buttons: min-h-16, px-8, rounded-xl
- Full-width on mobile, max-w-md on desktop
- Clear hierarchical arrangement when multiple choices present
- Shadow treatment: shadow-lg for depth
- When over images: backdrop-blur-md with semi-transparent background

### Character Dialogue Cards
- Distinct visual treatment from narrator text
- Left-aligned with character name/title above
- Small avatar/icon (w-12 h-12, rounded-full) alongside text
- Border-l-4 accent for visual separation
- Padding: p-6, mb-8

### Quiz Interface Components

**Question Card**:
- Contained card layout: p-8, rounded-2xl, shadow-xl
- Question number indicator: small badge in corner
- Question text: large, centered, mb-8

**Answer Options**:
- Grid layout on desktop (grid-cols-1 md:grid-cols-2), single column on mobile
- Button-style answers: p-6, rounded-xl, border-2, gap-4
- Hover states: transform scale-105 transition
- Feedback states:
  - Correct: border-green-500, bg-green-50 (implementation detail for later)
  - Incorrect: border-red-500, bg-red-50, then fade to show correct answer
  - Unselected: standard border

**Progress Indicator**:
- Linear progress bar showing quiz completion: h-2, rounded-full
- Position: fixed to top of quiz section

### Navigation Elements

**Start/Restart Buttons**:
- Hero CTA treatment: text-xl, px-12, py-6, rounded-2xl
- Prominent shadow and hover elevation
- Icon from Heroicons: arrow-right or refresh

**Scene Progression**:
- Smooth scroll behavior between sections
- Optional scroll indicator on first scene (animate-bounce)

## Images Section

**Required Illustrations** (stock photos/AI-generated placeholders):

1. **Hero/Opening Scene**: Grand palace of Vijayanagar with ornate architecture, warm lighting - full-width hero, aspect ratio 21:9 on desktop, 16:9 on mobile, minimum height 60vh

2. **Court Scene**: Royal court gathering with advisors, rich textiles, authentic period details - 16:9, width: 100% of container

3. **Timmarusu Character**: Portrait of wise prime minister in traditional attire - square or 4:5 portrait orientation, w-64 md:w-80

4. **Spy/Messenger Scene**: Courtyard or palace corridor with messenger figure - 3:2 aspect ratio

5. **Battle Preparation**: Army gathering, war instruments, soldiers - cinematic 21:9 aspect ratio

6. **River Crossing**: Krishna River with armies, dramatic landscape - wide panoramic 3:1 or 21:9

7. **Victory/Celebration**: City rejoicing, palace festivities, victory parade - 16:9

8. **Historical Map**: Illustrated map showing Raichur Doab between Krishna and Tungabhadra rivers - 4:3 or square, max-w-2xl

**Image Treatment**:
- Rounded corners: rounded-2xl for contained images
- Full-bleed for cinematic moments (battle, river crossing)
- Shadow treatment: shadow-2xl for elevated cards
- Lazy loading for performance

## Animations

**Minimal, purposeful motion**:
- Scene entrance: fade-in with subtle slide-up (translate-y-8 to translate-y-0)
- Button interactions: scale-105 on hover, active:scale-95
- Quiz feedback: gentle pulse animation on correct/incorrect reveal
- Audio visualization: subtle wave or pulse near active audio segment
- No parallax, no continuous animations, no scroll-jacking

## Accessibility

- High contrast between text and backgrounds (ensure WCAG AA minimum)
- Focus visible states on all interactive elements: ring-4 ring-offset-2
- Aria labels for audio controls and quiz feedback states
- Keyboard navigation support for all decision points
- Alt text for all historical illustrations describing scene content
- Skip-to-content link for returning users

## Mobile Optimization

- Touch targets minimum 44x44px (min-h-11, px-6)
- Sticky audio controls positioned for thumb reach
- Single-column layouts throughout on mobile
- Generous tap spacing between buttons (gap-6)
- Full-width images on mobile, no horizontal scroll
- Font size scaling: base text-lg on mobile, text-xl on desktop

## Special Considerations

**Cultural Authenticity**:
- Ornamental dividers between sections using traditional Indian motifs
- Decorative flourishes at scene transitions (subtle SVG elements)
- Respectful representation in all imagery selection

**Story Flow Clarity**:
- Clear visual distinction between narrator text, character dialogue, and user choices
- Breadcrumb or subtle indicator showing which story path user has taken
- Obvious restart functionality at end

**Content Management**:
- All story text, choices, image URLs, audio URLs stored in centralized JSON object
- Clear placeholder naming convention: `scene_01_palace.jpg`, `audio_narrator_intro.mp3`
- Comments in code indicating asset swap points