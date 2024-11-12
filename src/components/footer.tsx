import { Github, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex items-center justify-between bg-gradient-to-t from-my-tertiary to-text-secondary w-full md:h-24 md:rounded-lg p-4 mt-8 shadow-md shadow-black">
      <ul className="flex items-center w-full justify-between md:justify-normal gap-4 ">
        <li className="hover:text-sky-500 hover:scale-110 transition-all">
          <a href="https://www.linkedin.com/in/vitor-andes-dos-santos-3265ba243/">
            <Linkedin size={32} className="" />
          </a>
        </li>
        <li className="hover:text-violet-500 hover:scale-110 transition-all">
          <a href="https://github.com/VitorAndes">
            <Github size={32} className="" />
          </a>
        </li>
        <li className="hover:text-rose-500 hover:scale-110 transition-all">
          <a href="https://www.instagram.com/vtr_andes/">
            <Instagram size={32} className="" />
          </a>
        </li>
      </ul>
      {/* <div>
        <span>Buy me a coffee!</span>
      </div> */}
    </footer>
  );
}
