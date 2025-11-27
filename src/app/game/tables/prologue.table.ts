// -----------------------------------------------------------------------------
//  Prologue Data for Aghasme
//  Each chapter corresponds to one prologue screen.
// -----------------------------------------------------------------------------

export interface PrologueChapter {
  id: number;
  image: string;   // path to the illustration for this chapter
  title: string;
  text: string;
}

// -----------------------------------------------------------------------------
//  PROLOGUE CHAPTERS
// -----------------------------------------------------------------------------

export const PROLOGUE_CHAPTERS: PrologueChapter[] = [
  {
    id: 1,
    image: 'assets/prologue/1-legend.png',
    title: "PROLOGUE.LEGEND.TITLE",
    text: "PROLOGUE.LEGEND.DESCRIPTION"
  },
  {
    id: 2,
    image: 'assets/prologue/2-anims.png',
    title: "PROLOGUE.ANIMS.TITLE",
    text: "PROLOGUE.ANIMS.DESCRIPTION"
  },
  {
    id: 3,
    image: 'assets/prologue/3-sylvaris.png',
    title: "PROLOGUE.SYLVARIS.TITLE",
    text: "PROLOGUE.SYLVARIS.DESCRIPTION"
  },
  {
    id: 4,
    image: 'assets/prologue/4-frostfires.png',
    title: "PROLOGUE.FROSTFIRES.TITLE",
    text: "PROLOGUE.FROSTFIRES.DESCRIPTION"
  },
  {
    id: 5,
    image: 'assets/prologue/5-engineers.png',
    title: "PROLOGUE.ENGINEERS.TITLE",
    text: "PROLOGUE.ENGINEERS.DESCRIPTION"
  },
  {
    id: 6,
    image: 'assets/prologue/6-decline.png',
    title: "PROLOGUE.DECLINE.TITLE",
    text: "PROLOGUE.DECLINE.DESCRIPTION"
  },
  {
    id: 7,
    image: 'assets/prologue/7-khilia.png',
    title: "PROLOGUE.KHILIA.TITLE",
    text: "PROLOGUE.KHILIA.DESCRIPTION"
  },
  {
    id: 8,
    image: 'assets/prologue/8-nowadays.png',
    title: "PROLOGUE.NOWADAYS.TITLE",
    text: "PROLOGUE.NOWADAYS.DESCRIPTION"
  }
];
