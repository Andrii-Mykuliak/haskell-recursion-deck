import type { SlideDef } from "../deck/steps";
import { agendaSlide, introSlides } from "./intro";
import { r1Slides, r2Slides } from "./r1-basics";
import { r3Slides } from "./r2-lists";
import { r4Slides } from "./r3-types";
import { r5Slides } from "./r4-forms";
import { r6Slides } from "./r5-termination";
import { r7Slides, summarySlide } from "./r6-induction";
import { outroSlide } from "./outro";

export const SLIDES: SlideDef[] = [
  ...introSlides,
  ...r1Slides,
  agendaSlide(1),
  ...r2Slides,
  agendaSlide(2),
  ...r3Slides,
  agendaSlide(3),
  ...r4Slides,
  agendaSlide(4),
  ...r5Slides,
  agendaSlide(5),
  ...r6Slides,
  agendaSlide(6),
  ...r7Slides,
  summarySlide,
  outroSlide,
];
