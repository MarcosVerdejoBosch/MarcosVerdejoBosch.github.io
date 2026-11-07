export const site = {
  name: 'Marcos Verdejo Bosch',
  shortName: 'MVB',
  role: 'Electronic Engineer',
  description: 'I’m an electronic engineer. I work on Google Cloud infrastructure and build circuits, software, and audio tools for my own projects.',
  email: 'marcosverdejo@gmail.com',
  github: 'https://github.com/MarcosVerdejoBosch',
  linkedin: 'https://www.linkedin.com/in/marcos-verdejo-bosch-7b85b4300/',
} as const;

export const navigation = [
  { label: 'About', href: '/about/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Contact', href: '/about/#contact' },
] as const;

export const disciplines = [
  { number: '01', title: 'Cloud infrastructure', text: 'Infrastructure in Google Cloud is the focus of my current role.', tools: 'Google Cloud' },
  { number: '02', title: 'Electronics', text: 'Analog circuits, power supplies, PCB design, and embedded systems.', tools: 'KiCad · LTspice · ESP32' },
  { number: '03', title: 'Software & audio', text: 'Tools for analyzing signals and visualizing sound.', tools: 'C · C++ · Python' },
] as const;
