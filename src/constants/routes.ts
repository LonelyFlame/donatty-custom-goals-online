export const ROUTES = {
  HOME: '/',

  OPPOSITE: '/opposite/{slug}',
  CLOCK: '/clock/{slug}',
  CIRCLE: '/circle/{slug}',

  WIDGETS_OPPOSITE: '/widgets/opposite/{slug}',
  WIDGETS_CLOCK: '/widgets/clock/{slug}',
  WIDGETS_CIRCLE: '/widgets/circle/{slug}',
} satisfies Record<string, string>;
