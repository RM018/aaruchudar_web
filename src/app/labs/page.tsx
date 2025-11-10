import Link from 'next/link';
import styles from '../hi-labs/styles.module.css';

const labs = [
  {
    id: 1,
    title: "Clarity as Culture",
    description: "Breaking confusion, Building thinking clarity",
    activeRegions: ['Frontal'],
    color: "blue"
  },
  {
    id: 2,
    title: "Memory Enhancement",
    description: "Strengthening recall and retention abilities",
    activeRegions: ['Temporal'],
    color: "orange"
  },
  {
    id: 3,
    title: "Sensory Integration",
    description: "Processing and interpreting sensory information",
    activeRegions: ['Parietal'],
    color: "green"
  },
  {
    id: 4,
    title: "Visual Processing",
    description: "Enhancing visual perception and analysis",
    activeRegions: ['Occipital'],
    color: "red"
  }
];

export default function Labs() {
  return (
    <div className={styles.labContainer}>
      <div className={styles.contentOverlay} />
      
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.labTitle}>HI Labs</h1>
            <Link href="/" className={styles.homeButton}>
              Home
            </Link>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {labs.map((lab) => (
            <Link 
              key={lab.id} 
              href={`/hi-labs/${lab.id}`}
              className={`block p-6 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm
                         hover:border-white/20 transition-all transform hover:scale-105`}
            >
              <h2 className="text-xl font-bold text-green-400 mb-2">
                Lab {lab.id}: {lab.title}
              </h2>
              <p className="text-gray-300 mb-4">{lab.description}</p>
              <div className="flex flex-wrap gap-2">
                {lab.activeRegions.map((region) => (
                  <span 
                    key={region}
                    className="px-2 py-1 text-sm rounded-full bg-cyan-500/20 text-cyan-300"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}