export const site = {
  name: 'Marcos Verdejo Bosch',
  role: 'Electronic Engineer',
  description: 'I’m an electronic engineer. I work on Google Cloud infrastructure and build circuits, software, and audio tools for my own projects.',
  email: 'marcosverdejo@gmail.com',
  github: 'https://github.com/MarcosVerdejoBosch',
  linkedin: 'https://www.linkedin.com/in/marcos-verdejo-bosch-7b85b4300/',
} as const;

export const navigation = [
  { label: 'About', href: '/about/', description: 'Background and interests' },
  { label: 'Projects', href: '/projects/', description: 'Design notes and case studies' },
] as const;
