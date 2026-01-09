import { Github, Gitlab, Terminal, Code2 } from "lucide-react";

const DockerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V9.007a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118c.103 0 .186-.083.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m0 2.715h2.118c.103 0 .186-.083.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.954 2.715h2.119c.102 0 .185-.083.185-.185V9.007a.186.186 0 00-.185-.186H8.075a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.185m0-2.715h2.119c.102 0 .185-.083.185-.186V6.29a.186.186 0 00-.185-.185H8.075a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m-2.954 2.715h2.119c.102 0 .185-.083.185-.185V9.007a.186.186 0 00-.185-.186H5.12a.186.186 0 00-.185.185v1.887c0 .102.083.185.185.185m0-2.715h2.119c.102 0 .185-.083.185-.186V6.29a.186.186 0 00-.185-.185H5.12a.186.186 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.954 2.715h2.119c.102 0 .185-.083.185-.185V9.007a.186.186 0 00-.185-.186h-2.12a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185M.125 10.316c-.037.034-.023.096.033.109 1.59.354 3.06.36 4.45.36h.102c.027 0 .042-.012.042-.03V9.236a.185.185 0 00-.185-.185h-2.119a.186.186 0 00-.185.185v1.08zM23.954 13.414c-.532-.672-1.484-1.13-2.43-1.13H19.48c-.102 0-.186.082-.186.185v1.887c0 .102.084.185.186.185h.362c2.58 0 3.397-1.445 4.112-1.127zM18.562 14.772c-.51-.615-1.498-1.114-2.459-1.114H.125c-.125 0-.125.127-.125.25 0 5.606 4.544 10.15 10.15 10.15 10.843 0 10.598-9.207 10.598-9.207-.033-.21-.85-.12-2.186-.079z" />
  </svg>
);

const integrations = [
  {
    name: "GitHub Actions",
    icon: Github,
  },
  {
    name: "GitLab CI",
    icon: Gitlab,
  },
  {
    name: "VS Code",
    icon: Code2,
  },
  {
    name: "Docker",
    icon: DockerIcon,
  },
  {
    name: "CLI / Terminal",
    icon: Terminal,
  },
];

const Integrations = () => {
  return (
    <section className="py-24 bg-[#08080a]">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-muted-foreground uppercase tracking-widest text-sm opacity-50">
            Engineered for the modern ecosystem
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="group flex flex-col items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.08] group-hover:border-primary/20 group-hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)] transition-all duration-500">
                <item.icon
                  className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                />
              </div>
              <div className="text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <p className="text-sm font-bold text-white tracking-tight">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;